import Head from "next/head"
import Image from "next/image"
import { use, useEffect, useState } from "react"
import { useRouter } from "next/router"

interface EnsResponse {
  address: string
  identity: string
}

export default function BeConnect() {
  const [conterParty, setCounterParty] = useState("Billy.eth")
  const [interParties, setInterParties] = useState(["Bob", "Joe", "Jane"])

  const router = useRouter()

  const { addressFrom } = router.query

  useEffect(() => {
    const getEns = async () => {
      try {
        const res = await fetch(`https://api.web3.bio/profile/ens/${addressFrom}`)

        if (!res.ok) {
          throw new Error(`Failed to fetch ENS with status ${res.status}`)
        }
        const data: EnsResponse = (await res.json()) as EnsResponse
        console.log(data, typeof data)
        setCounterParty(data.identity)
      } catch (err) {
        console.warn(`failed to connect..`, err)
      }
    }
    getEns()
  }, [])

  const handleConnect = () => {
    if (addressFrom) {
      router.push(`/profile/${addressFrom}`)
    } else {
      router.push(`/profile/${localStorage.getItem("metamask_account")}`)
    }
  }

  return (
    <>
      <Head>
        <meta property="og:url" content="https://next-enterprise.vercel.app/" />
        <meta
          property="og:image"
          content="https://raw.githubusercontent.com/Blazity/next-enterprise/main/project-logo.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <title>Karma Protocol</title>
      </Head>
      <main className="flex h-screen w-screen flex-col items-center justify-center">
        <div className="text-center font-sans text-lg font-bold leading-normal text-white">Me ↔ {conterParty}</div>
        <div className="h-[51px]" />
        {/* connect graph */}
        <div className="flex flex-col items-center">
          {/* between */}
          <div className="flex w-[260px] justify-between">
            <div className="flex flex-col">
              <div className="relative" style={{ minWidth: "92px", minHeight: "105.351px" }}>
                <Image src="/icon_human_background.png" width={92} height={105.351} alt="" />
                <div className="absolute left-[20px] top-[16px]" style={{ minWidth: "52px", minHeight: "52px" }}>
                  <Image src="/icon_me.png" width={52} height={52} alt="" />
                </div>
              </div>
              <div className="text-center font-sans text-[18px] font-bold leading-normal text-main">Me</div>
            </div>
            <div className="flex flex-col">
              <div className="relative" style={{ minWidth: "92px", minHeight: "105.351px" }}>
                <Image src="/icon_human_background.png" width={92} height={105.351} alt="" />
                <div className="absolute left-[20px] top-[16px]" style={{ minWidth: "52px", minHeight: "52px" }}>
                  <Image src="/icon_counter.png" width={52} height={52} alt="" />
                </div>
              </div>
              <div className="text-center font-sans text-[18px] font-bold leading-normal text-main">{conterParty}</div>
            </div>
          </div>
          {/* inter parties */}
          <div className="relative" style={{ minWidth: "162px", minHeight: "40px" }}>
            <Image src="/beconnect_line.png" width={162} height={26} alt="" />
            <div className="absolute left-[40px] top-[6px]" style={{ minWidth: "40px", minHeight: "40px" }}>
              <Image src="/white_circle.png" width={40} height={40} alt="" />
              <div className="absolute left-[10px] top-[6px]" style={{ minWidth: "24px", minHeight: "24px" }}>
                <Image src="/icon_ninza.png" width={24} height={24} alt="" />
              </div>
            </div>
            <div className="absolute left-[70px] top-[6px]" style={{ minWidth: "40px", minHeight: "40px" }}>
              <Image src="/white_circle.png" width={40} height={40} alt="" />
              <div className="absolute left-[10px] top-[6px]" style={{ minWidth: "24px", minHeight: "24px" }}>
                <Image src="/icon_magic.png" width={24} height={24} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="h-[52px]" />
        <div className="flex w-[335px] flex-col items-start space-y-7 rounded-[20px] bg-[#393E3A] p-6">
          <div>
            <span className="text-center font-sans text-[30px] font-black leading-normal text-main">2 ppl </span>
            <span className="text-center font-sans text-[30px] font-semibold leading-normal text-main">between us</span>
          </div>

          <div className="flex flex-col justify-start">
            {
              <div className="flex justify-start">
                <div className="relative" style={{ minWidth: "40px", minHeight: "40px" }}>
                  <Image src="/white_circle.png" width={40} height={40} alt="" />
                  <div className="absolute left-[9px] top-[6px]" style={{ minWidth: "24px", minHeight: "24px" }}>
                    <Image src="/icon_ninza.png" width={24} height={24} alt="" />
                  </div>
                </div>
                <div className="w-[8px]" />
                <div className="flex flex-col">
                  <span className="text-start font-sans text-[18px] font-bold leading-normal text-white">
                    Daisy albero
                  </span>
                  <div className="flex">
                    <span>📍</span>
                    <span className="text-start font-sans text-[14px] font-bold leading-normal text-[#C3E4CD]">
                      Opensea
                    </span>
                    <span className="w-[4px]" />
                    <span className="text-start font-sans text-[14px] font-normal leading-normal text-white">
                      0xb2...c2x1
                    </span>
                  </div>
                </div>
              </div>
            }
            {
              <div className="mt-4 flex justify-start">
                <div className="relative" style={{ minWidth: "40px", minHeight: "40px" }}>
                  <Image src="/white_circle.png" width={40} height={40} alt="" />
                  <div className="absolute left-[9px] top-[6px]" style={{ minWidth: "24px", minHeight: "24px" }}>
                    <Image src="/icon_magic.png" width={24} height={24} alt="" />
                  </div>
                </div>
                <div className="w-[8px]" />
                <div className="flex flex-col">
                  <span className="text-start font-sans text-[18px] font-bold leading-normal text-white">Pinkly</span>
                  <div className="flex">
                    <span>📍</span>
                    <span className="text-start font-sans text-[14px] font-bold leading-normal text-[#C3E4CD]">
                      Blur
                    </span>
                    <span className="w-[4px]" />
                    <span className="text-start font-sans text-[14px] font-normal leading-normal text-white">
                      0xba...12ad
                    </span>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
        <div className="h-[61px]" />

        <button className="flex h-[54px] w-[335px] items-center justify-center space-x-2 rounded-full bg-[#FFEBB8] px-[17px] py-[16px]">
          <div
            onClick={handleConnect}
            className="text-center font-sans text-lg font-bold leading-[140%] tracking-[0.15px] text-[#282E29]"
          >
            Connect
          </div>
        </button>
      </main>
    </>
  )
}
