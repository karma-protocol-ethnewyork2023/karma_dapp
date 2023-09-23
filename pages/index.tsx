import Head from "next/head"
import { Button } from "components/Button/Button"
import { LP_GRID_ITEMS } from "../lp-items"
import Image from "next/image"

export default function Web() {
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

        <button className="flex h-[54px] w-[335px] items-center justify-center space-x-2 rounded-full bg-[#FFEBB8] px-[17px] py-[16px]">
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
