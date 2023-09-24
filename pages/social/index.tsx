import { SignInWithLens, Size } from "@lens-protocol/widgets-react"
import dynamic from "next/dynamic"
import Head from "next/head"
import TelegramLoginButton, { TelegramUser } from "telegram-login-button"
import { Button } from "components/Button/Button"

import Image from "next/image"
import { useSDK } from "@metamask/sdk-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import useTelegram from "hooks/useTelegram"

interface EnsResponse {
  address: string
  identity: string
}

const SignInComponent = dynamic(() => import("../../components/SignInComponent"), { ssr: false })

export default function Web() {
  const [account, setAccount] = useState<string>()
  const [addressFrom, setAddressFrom] = useState<string | null>(null)
  const { sdk, connected, connecting, provider, chainId } = useSDK()

  const [ens, setEns] = useState<string>("noname.eth")

  const { call } = useTelegram()

  const router = useRouter()

  const telegramConnect = async () => {
    routeAfterConnect()
  }

  const handleTelegramConnect = async () => {
    await telegramConnect()
  }

  // route 이동
  const routeAfterConnect = () => {
    if (addressFrom) {
      // query에 address 넣어서 보내기
      router.push(`/beconnect?name=${addressFrom}`)
    } else {
      router.push(`/profile/${localStorage.getItem("metamask_account")}`)
    }
  }

  // 다른 사람 qr 찍고 들어온 것인지 확인
  useEffect(() => {
    const addressFromURL = router.query.addressFrom
    if (addressFromURL && typeof addressFromURL === "string") {
      setAddressFrom(addressFromURL)
    }
  }, [router.query])

  useEffect(() => {
    const account = localStorage.getItem("metamask_account")
    if (!account) return

    // api로 부터 ens 받아오기
    const getEns = async () => {
      try {
        const res = await fetch(`https://api.web3.bio/profile/ens/${account}`)

        if (!res.ok) {
          throw new Error(`Failed to fetch ENS with status ${res.status}`)
        }
        const data: EnsResponse = (await res.json()) as EnsResponse
        console.log(data, typeof data)

        setEns(data.identity)
        localStorage.setItem("ens", data.identity)
      } catch (err) {
        console.log("Error fetching ENS: ", err)
        localStorage.setItem("ens", "noname.eth")
      }
    }
    getEns()
  }, [])

  const onSignIn = async (tokens: any, profile: any) => {
    console.log("onSignIn", tokens, profile)
    // telegram signin을 마쳐주세요.
    alert("Thanks! After you sign in with Telegram, you will be redirected to your profile.")
    // routeAfterConnect()
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
        <script
          async
          src="https://telegram.org/js/telegram-widget.js?22"
          data-telegram-login="KarmaProtocolBot"
          data-size="large"
          data-onauth="onTelegramAuth(user)"
          data-request-access="write"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          function onTelegramAuth(user) {
            alert('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')');
          }
        `,
          }}
        ></script>
        <script
          async
          src="https://telegram.org/js/telegram-widget.js?22"
          data-telegram-login="KarmaProtocolBot"
          data-size="large"
          data-userpic="false"
          data-auth-url=""
          data-request-access="write"
        ></script>
      </Head>
      <main className="flex h-screen w-screen flex-col items-center justify-center">
        {/* <div className="">
          <Image src="/karma_logo.png" width={46.45} height={39} alt="" />
          <span className="font-sans text-[39px] text-main">KARMA</span>
        </div> */}
        <div className="flex items-center">
          <div style={{ minWidth: "312px", minHeight: "83px" }}>
            <Image src="/zk_logo.png" width={312} height={83} alt="" />
          </div>
        </div>
        <div className="h-[60px]" />
        <span className="w-[335px] text-left font-sans text-[16px] font-extralight text-white">
          Use your .eth as your username <br />
          on &quot;ZK Bellman Ford&quot;.
        </span>
        <div className="h-[12px]" />
        <button className="flex h-[54px] w-[335px] items-center justify-between space-x-2 rounded-full bg-white px-[17px] py-[16px]">
          <div className="flex items-center justify-center">
            <div style={{ minWidth: "32px", minHeight: "32px" }}>
              <Image src="/icon_ens.png" width={32} height={32} alt="" />
            </div>
            <div className="w-[8px]" />
            <div className="text-left font-sans text-lg font-bold leading-[140%] tracking-[0.15px] text-[#282E29]">
              @{ens}
            </div>
          </div>
          <div style={{ minWidth: "24px", minHeight: "24px" }}>
            <Image src="/icon_downarrow.png" width={24} height={24} alt="" />
          </div>
        </button>

        <div className="h-[40px]" />
        <span className="w-[335px] text-left font-sans text-[16px] font-extralight text-white">
          Connect with your social accounts.
        </span>
        <div className="h-[12px]" />

        <SignInComponent onSignIn={onSignIn} />
        {/* <button className="mt-[12px] flex h-[54px] w-[335px] items-center justify-center space-x-2 rounded-full bg-[#FFEBB8] px-[17px] py-[16px]">
          <div style={{ minWidth: "32px", minHeight: "32px" }}>
            <Image src="/icon_telegram.png" width={32} height={32} alt="" />
          </div>
          <div className="text-center font-sans text-lg font-bold leading-[140%] tracking-[0.15px] text-[#282E29]">
            Telegram Connect
          </div>
        </button> */}

        <div className="h-[12px]" />
        <TelegramLoginButton
          botName="KarmaProtocolBot"
          dataOnauth={(user: TelegramUser) => {
            console.log(user)
            localStorage.setItem("telegram_account", user.id.toString())
            handleTelegramConnect()
          }}
        />

        {/* <button data-telegram-login="KarmaProtocolBot" className="h-[100px] w-[100px] bg-white"></button> */}
        {/* <TelegramLoginButton dataOnauth={handleTelegramConnect} botName="KarmaProtocolBot" /> */}
      </main>
    </>
  )
}
