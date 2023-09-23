import Head from "next/head"
import { Button } from "components/Button/Button"
import { LP_GRID_ITEMS } from "../lp-items"
import Image from "next/image"
import { useSDK } from "@metamask/sdk-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

export default function Web() {
  const [account, setAccount] = useState<string>()
  const [addressFrom, setAddressFrom] = useState<string | null>(null)
  const { sdk, connected, connecting, provider, chainId } = useSDK()

  const router = useRouter()

  const metamaskConnect = async () => {
    try {
      const accounts = await sdk?.connect()
      console.log(`connected`, accounts)
      if (!accounts) return

      const account = (accounts as string[])[0]
      setAccount(account)
      localStorage.setItem("metamask_account", account)
      routeAfterConnect()
    } catch (err) {
      console.warn(`failed to connect..`, err)
    }
  }

  const handleMetamaskConnect = async () => {
    await metamaskConnect()
  }

  // route 이동
  const routeAfterConnect = () => {
    if (addressFrom) {
      router.push(`/beconnect`)
    } else {
      router.push(`/profile/${account}`)
    }
  }

  // 다른 사람 qr 찍고 들어온 것인지 확인
  useEffect(() => {
    const addressFromURL = router.query.addressFrom
    if (addressFromURL && typeof addressFromURL === "string") {
      setAddressFrom(addressFromURL)
    }
  }, [router.query])

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
        {/* <div className="">
          <Image src="/karma_logo.png" width={46.45} height={39} alt="" />
          <span className="font-sans text-[39px] text-main">KARMA</span>
        </div> */}
        <div className="flex items-center">
          <div style={{ minWidth: "46.45px", minHeight: "39px" }}>
            <Image src="/karma_logo.png" width={46.45} height={39} alt="" />
          </div>
          <span className="ml-2 font-sans text-[45px] text-main">KARMA</span>
        </div>
        <div className="h-[60px]" />

        <button
          className="flex h-[54px] w-[335px] items-center justify-center space-x-2 rounded-full bg-[#FFEBB8] px-[17px] py-[16px]"
          onClick={handleMetamaskConnect}
        >
          <div style={{ minWidth: "32px", minHeight: "32px" }}>
            <Image src="/icon_metamask.png" width={32} height={32} alt="" />
          </div>
          <div className="text-center font-sans text-lg font-bold leading-[140%] tracking-[0.15px] text-[#282E29]">
            Metamask Connect
          </div>
        </button>
        <button className="mt-[12px] flex h-[54px] w-[335px] items-center justify-center space-x-2 rounded-full bg-[#FFEBB8] px-[17px] py-[16px]">
          <div style={{ minWidth: "32px", minHeight: "32px" }}>
            <Image src="/icon_metamask.png" width={32} height={32} alt="" />
          </div>
          <div className="text-center font-sans text-lg font-bold leading-[140%] tracking-[0.15px] text-[#282E29]">
            Metamask Connect
          </div>
        </button>
      </main>
    </>
  )
}
