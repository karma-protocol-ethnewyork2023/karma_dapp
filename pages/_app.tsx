import "../styles/tailwind.css"
import dotenv from "dotenv"
import { Work_Sans } from "next/font/google"
import { AppProps } from "next/app"
import { MetaMaskProvider } from "@metamask/sdk-react"
import { useEffect, useState } from "react"

const workSans = Work_Sans({ subsets: ["latin"] })

function MyApp({ Component, pageProps }: AppProps) {
  const [host, setHost] = useState<string>("")

  dotenv.config()

  useEffect(() => {
    setHost(window.location.host)
  }, [])

  return (
    <MetaMaskProvider
      debug={false}
      sdkOptions={{
        logging: {
          developerMode: false,
        },
        // communicationServerUrl: process.env.REACT_APP_COMM_SERVER_URL,
        checkInstallationImmediately: false, // This will automatically connect to MetaMask on page load
        dappMetadata: {
          name: "KARMA PROTOCOL DApp",
          url: host,
        },
      }}
    >
      <main className={workSans.className}>
        <Component {...pageProps} />
      </main>
    </MetaMaskProvider>
  )
}

export default MyApp
