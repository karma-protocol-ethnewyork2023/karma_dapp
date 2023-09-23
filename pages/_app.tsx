import "../styles/tailwind.css"
import { Work_Sans } from "next/font/google"

import { AppProps } from "next/app"

const workSans = Work_Sans({ subsets: ["latin"] })

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={workSans.className}>
      <Component {...pageProps} />
    </main>
  )
}

export default MyApp
