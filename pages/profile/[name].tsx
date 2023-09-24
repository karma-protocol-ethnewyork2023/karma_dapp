import { useRouter } from "next/router"
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

function ProfilePage({ user }: { user: User }) {
  const router = useRouter()
  const { name } = router.query
  const containerRef = useRef<HTMLDivElement>(null)

  const [isGraphLoaded, setIsGraphLoaded] = useState(false)

  const [profileName, setProfileName] = useState("")

  const [isMyProfile, setIsMyProfile] = useState(false)

  const [nodes, setNodes] = useState(6)
  const [superNodes, setSuperNodes] = useState(2)
  const [edges, setEdges] = useState(9)

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
    } else {
      if (user.name.length > 10) {
        setProfileName(`${user.name.slice(0, 10)}...`)
      } else {
        setProfileName(`${user.name}'s`)
      }
      setIsMyProfile(false)
    }
  }, [])

  useEffect(() => {
    if (containerRef.current !== null && !isGraphLoaded) {
      // Dynamic import
      import("vis-network/peer").then((visNetwork) => {
        import("vis-data/peer").then((visData) => {
          const nodes = new visData.DataSet([
            { id: 1, shape: "circularImage", image: "/graph_icon_me.png", size: 50 },
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
            const network = new visNetwork.Network(containerRef.current, data, options)
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
  }

  const handleSendTelegramMsg = () => {
    console.log("qr code click")
  }

  return (
    <main className="relative h-screen w-screen">
      {/* header */}
      <div className="absolute left-0 top-0 flex h-[56px] w-screen items-center justify-between bg-[#393E3A] px-[16px]">
        <h1 className="font-sans text-[20px] font-bold text-white">{profileName} Profile</h1>
        <button style={{ minWidth: "28px", minHeight: "28px" }}>
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
