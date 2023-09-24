import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import Image from "next/image"
import { use, useEffect, useRef, useState } from "react"
import { DataSet } from "vis-data/peer"
import { Network } from "vis-network/peer"
import { useSDK } from "@metamask/sdk-react"
import useTelegram from "hooks/useTelegram"

interface User {
  name: string
}
const tele_api_id = process.env.NEXT_PUBLIC_TELEGRAM_APP_API_ID
const tele_api_hash = process.env.NEXT_PUBLIC_TELEGRAM_APP_API_HASH
const tele_api_key = process.env.NEXT_PUBLIC_TELEGRAM_APP_API_KEY

const FollowOnLensComponent = dynamic(() => import("../../components/FollowOnLensComponent"), { ssr: false })

function ProfilePage({ user }: { user: User }) {
  const router = useRouter()
  const { name } = router.query
  const containerRef = useRef<HTMLDivElement>(null)

  const [isGraphLoaded, setIsGraphLoaded] = useState(false)

  const [profileName, setProfileName] = useState("")
  const [profileEns, setProfileEns] = useState("noname.eth")
  const [profileAddress, setProfileAddress] = useState("0x0000000")

  const [lensHandle, setLensHandle] = useState("vitalik")

  const [isMyProfile, setIsMyProfile] = useState(false)

  const [nodes, setNodes] = useState(1934)
  const [superNodes, setSuperNodes] = useState(84)
  const [edges, setEdges] = useState(327)

  const { getNearestDc, authSendCode, authSignIn, getUserInfoByUsername } = useTelegram()

  useEffect(() => {
    getNearestDc()
    // authSendCode("821064348327")
    // getUserInfoByUsername("Jewelrykim")
  }, [])

  useEffect(() => {
    console.log(user.name, localStorage.getItem("metamask_account"))
    if (user.name === localStorage.getItem("metamask_account")) {
      setIsMyProfile(true)
      setProfileName("My")
      const ens = localStorage.getItem("ens")
      if (ens) {
        setProfileEns(ens)
        const slicedEns = ens.slice(0, ens.length - 4)
        setLensHandle(slicedEns)
      }
      const address = localStorage.getItem("metamask_account")
      if (address) {
        const shortAddress = `${address.slice(0, 6)}...${address.slice(address.length - 4, address.length)}`
        setProfileAddress(shortAddress)
      }
    } else {
      if (user.name.length > 10) {
        setProfileName(`${user.name.slice(0, 10)}...`)
        const shortAddress = `${user.name.slice(0, 6)}...${user.name.slice(user.name.length - 4, user.name.length)}`
        setProfileAddress(shortAddress)
      } else {
        setProfileName(`${user.name}'s`)
      }
      setIsMyProfile(false)
    }

    const getEns = async () => {
      try {
        const res = await fetch(`https://api.web3.bio/profile/ens/${user.name}`)

        if (!res.ok) {
          throw new Error(`Failed to fetch ENS with status ${res.status}`)
        }
        const data: { address: string; identity: string } = (await res.json()) as {
          address: string
          identity: string
        }
        console.log(data, typeof data)
        setProfileName(data.identity)
        setProfileEns(data.identity)
        localStorage.setItem("ens", data.identity)
      } catch (err) {
        console.warn(`failed to connect..`, err)
      }
    }
    getEns()
  }, [])

  useEffect(() => {
    if (containerRef.current !== null && !isGraphLoaded) {
      // Dynamic import
      import("vis-network/peer").then((visNetwork) => {
        import("vis-data/peer").then((visData) => {
          const mainNode =
            user.name === localStorage.getItem("metamask_account")
              ? {
                  id: 1,
                  shape: "circularImage",
                  image: "/graph_icon_me.png",
                  size: 50,
                }
              : {
                  id: 1,
                  shape: "circularImage",
                  image: "/qr_profile_circle_other.png",
                  label: profileName,
                  title: profileName,
                  size: 50,
                }
          const nodes = new visData.DataSet([
            mainNode,
            { id: 2, shape: "circularImage", image: "/graph_icon_node.png" },
            { id: 3, shape: "circularImage", image: "/graph_icon_node.png" },
            { id: 4, shape: "circularImage", image: "/graph_icon_supernode.png" },
            { id: 5, shape: "circularImage", image: "/graph_icon_node.png" },
            { id: 6, shape: "circularImage", image: "/graph_icon_node.png" },
            { id: 7, shape: "circularImage", image: "/graph_icon_supernode.png" },
          ])

          const edges = new visData.DataSet<any>()
          edges.add([
            { from: 1, to: 2 },
            { from: 1, to: 3 },
            { from: 1, to: 4 },
            { from: 1, to: 5 },
            { from: 1, to: 6 },
            { from: 1, to: 7 },

            { from: 4, to: 3 },
          ])

          const data = {
            nodes: nodes,
            edges: edges,
          }

          const options = {
            nodes: {
              borderWidth: 2,
              size: 30,
              color: {
                border: "#222222",
                background: "#666666",
              },
              font: { color: "#eeeeee" },
            },
            edges: {
              color: "white",
              width: 2,
            },
          }

          // Check again just in case
          if (containerRef.current && !isGraphLoaded) {
            console.log("network")
            const network = new visNetwork.Network(containerRef.current, data, options)

            const exampleAddress = "0xd8da6bf26964af9d7eed9e03e53415d37aa96045" // vitalik
            //http://localhost:3000/profile/0xd8da6bf26964af9d7eed9e03e53415d37aa96045
            // node click event
            network.on("click", function (params) {
              if (params.nodes.length > 0) {
                console.log(params.nodes[0])
                if (params.nodes[0] === 1) {
                  return
                } else {
                  // to exampleAddress profile page and reload profile page
                  router.push(`/profile/${exampleAddress}`).then(() => window.location.reload())
                }

                // router.push(`/profile/${params.nodes[0]}`)
              }
            })

            setIsGraphLoaded(true)
          }
        })
      })
    }
  }, [])

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  const handleQrCodeClick = () => {
    console.log("qr code click")
    router.push(`/qrcode/${localStorage.getItem("metamask_account")}`)
  }

  const handleSendTelegramMsg = () => {
    console.log("send telegram click")
    // telegramSendMsgByBot("5272740163") // jewel
    telegramSendMsgByBot("5247807425") // juho
  }

  const handleSearchClick = () => {
    router.push("/search/opensea")
  }

  const telegramSendMsgByBot = async (userid: string) => {
    const message =
      "Name: julia kim \nCompany: zk social graph\nTitle: developer\nEmail: julia@zkzk.com\n\nMake most of your network with zk social graph!"
    const encodedMessage = encodeURIComponent(message)
    // api call
    const url = `https://api.telegram.org/bot${tele_api_key}/sendMessage?chat_id=${userid}&text=${encodedMessage}`
    const res = await fetch(url)
    const data = await res.json()
    console.log(data)
  }

  return (
    <main className="relative h-screen w-screen">
      {/* header */}
      <div className="absolute left-0 top-0 flex h-[56px] w-screen items-center justify-between bg-[#393E3A] px-[16px]">
        <h1 className="font-sans text-[20px] font-bold text-white">{profileName} Profile</h1>
        <button onClick={handleSearchClick} style={{ minWidth: "28px", minHeight: "28px" }}>
          <Image src="/icon_search.png" width={28} height={28} alt="" />
        </button>
      </div>
      <div className="absolute top-[56px] flex w-screen flex-col items-center">
        <div className="h-[18px]" />
        {/* graph */}

        <div style={{ minWidth: "285px", minHeight: "285px" }} className="relative">
          <Image src="/graph_back.png" width={285} height={285} alt="" />
          <div ref={containerRef} style={{ width: "285px", height: "285px" }} className="absolute top-0"></div>
        </div>

        <div className="h-[33px]" />
        {/* profile */}
        <div className="flex flex-col items-center justify-center">
          <span className="font-sans text-[30px] font-bold text-main">{profileEns}</span>
          <span className="font-sans text-[16px] font-light text-main">{profileAddress}</span>
        </div>
        <div className="h-[33px]" />
        {/* datas */}
        <div className="flex w-[335px] flex-col items-center space-y-[8px] rounded-[20px] bg-[#393E3A] px-[20px] py-[16px]">
          <span className="font-sans text-[32px] font-bold text-main">{nodes}</span>
          <div className="flex items-center">
            <div style={{ minWidth: "16px", minHeight: "16px" }}>
              <Image src="/icon_node.png" width={16} height={16} alt="" />
            </div>
            <div className="w-[4px]" />
            <span className="text-start font-sans text-[16px] font-light leading-normal text-white">Node</span>
          </div>
        </div>
        <div className="h-[12px]" />
        <div className="flex justify-between">
          <div className="flex w-[162px] flex-col items-center space-y-[8px] rounded-[20px] bg-[#393E3A] px-[20px] py-[16px]">
            <span className="font-sans text-[32px] font-bold text-main">{superNodes}</span>
            <div className="flex items-center">
              <div style={{ minWidth: "16px", minHeight: "16px" }}>
                <Image src="/icon_supernode.png" width={16} height={16} alt="" />
              </div>
              <div className="w-[4px]" />
              <span className="text-start font-sans text-[16px] font-light leading-normal text-white">Super Node</span>
            </div>
          </div>
          <div className="w-[11px]" />
          <div className="flex w-[162px] flex-col items-center space-y-[8px] rounded-[20px] bg-[#393E3A] px-[20px] py-[16px]">
            <span className="font-sans text-[32px] font-bold text-main">{edges}</span>
            <div className="flex items-center">
              <div style={{ minWidth: "16px", minHeight: "16px" }}>
                <Image src="/icon_edge.png" width={16} height={16} alt="" />
              </div>
              <div className="w-[4px]" />
              <span className="text-start font-sans text-[16px] font-light leading-normal text-white">Edge</span>
            </div>
          </div>
        </div>

        <div className="h-[16px]" />

        {/* button */}
        {isMyProfile ? (
          <button
            onClick={handleQrCodeClick}
            className="flex h-[54px] w-[335px] items-center justify-center space-x-2 rounded-full bg-[#FFEBB8] px-[17px] py-[16px]"
          >
            <div className="text-center font-sans text-lg font-bold leading-[140%] tracking-[0.15px] text-[#282E29]">
              QR Code
            </div>
          </button>
        ) : (
          <button
            onClick={handleSendTelegramMsg}
            className="flex h-[54px] w-[335px] items-center justify-center space-x-2 rounded-full bg-[#FFEBB8] px-[17px] py-[16px]"
          >
            <div className="text-center font-sans text-lg font-bold leading-[140%] tracking-[0.15px] text-[#282E29]">
              Message via Telegram
            </div>
          </button>
        )}
        {!isMyProfile && <FollowOnLensComponent handle={lensHandle} />}

        <div className="h-[20px]" />
        {/* Feed */}
        <span className="w-[335px] font-sans text-[20px] font-bold text-main">Feed</span>

        <div className="h-[20px]" />

        <div className="flex w-[335px] flex-col items-center space-y-[8px] rounded-[20px] bg-[#393E3A] px-[20px] py-[16px]">
          <div style={{ minWidth: "295px", minHeight: "402px" }}>
            <Image src="/example.png" width={295} height={402} alt="" />
          </div>
        </div>

        <div className="h-[40px]" />
      </div>
    </main>
  )
}

export async function getServerSideProps(context: { params: { name: unknown } }) {
  const name = context.params.name

  // Fetch user data from your API or database
  //   const res = await fetch(`https://your-api-endpoint/users/${name}`)
  //   const user = await res.json()

  // If no user data is found, return a 404 status
  //   if (!user) {
  //     return {
  //       notFound: true,
  //     }
  //   }

  return {
    // props: { user },
    props: { user: { name: name as string } },
  }
}

export default ProfilePage
