import Head from "next/head"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import QRCode from "react-qr-code"

interface User {
  name: string
}

export default function QrCode({ user }: { user: User }) {
  const router = useRouter()
  const { name } = router.query

  const [isMyProfile, setIsMyProfile] = useState(false)
  const [profileName, setProfileName] = useState("")

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

  if (router.isFallback) {
    return <div>Loading...</div>
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
        <div className="absolute left-0 top-0 flex h-[56px] w-screen items-center justify-between px-[16px]">
          <h1 className="font-sans text-[20px] font-bold text-white">QR Code</h1>
          <button style={{ minWidth: "28px", minHeight: "28px" }}>
            <Image src="/icon_cross.png" width={28} height={28} alt="" />
          </button>
        </div>
        <div className="absolute top-[56px] flex min-h-[570px] w-screen flex-col items-center justify-center">
          <div className="relative min-h-[302px] min-w-[302px] rounded-[40px] bg-main p-[36.24px]">
            <div className="absolute -top-[73px] left-[104px] min-h-[92px] min-w-[92px]">
              <div className="relative">
                <Image
                  src={isMyProfile ? "/qr_profile_circle.png" : "/qr_profile_circle_other.png"}
                  width={92}
                  height={92}
                  alt=""
                />
                <div className="absolute top-0 flex h-full w-full flex-col items-center justify-center -space-y-5">
                  <span className="text-[50px]">‍👤</span>
                  <span className="font-sans text-[18px] font-bold text-[#282E29]">{profileName}</span>
                </div>
              </div>
            </div>
            <QRCode
              size={200}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={`https://karma-dapp.vercel.app?addressFrom=${user.name}`}
              viewBox={`0 0 256 256`}
              bgColor="#FFEBBB"
            />
          </div>
        </div>
      </main>
    </>
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
