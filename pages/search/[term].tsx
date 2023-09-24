import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"

interface Search {
  term: string
  // Add other properties here
}

function ProfilePage({ search }: { search: Search }) {
  const router = useRouter()
  const { term } = router.query

  const [results, setResults] = useState(2)

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  const handleBackButton = () => {
    router.back()
  }

  return (
    <main className="relative h-screen w-screen">
      {/* header */}
      <div className="absolute left-0 top-0 flex h-[56px] w-screen items-center justify-between bg-[#393E3A] px-[16px]">
        <div className="flex">
          <button onClick={handleBackButton} style={{ minWidth: "28px", minHeight: "28px" }}>
            <Image src="/icon_arrowleft.png" width={28} height={28} alt="" />
          </button>
          <div className="w-[8px]" />
          <h1 className="font-sans text-[20px] font-bold text-white">{search.term}</h1>
        </div>
        {/* <button style={{ minWidth: "28px", minHeight: "28px" }}>
          <Image src="/icon_search.png" width={28} height={28} alt="" />
        </button> */}
      </div>
      {/* results */}
      <div className="absolute left-0 top-[56px] flex w-screen flex-col p-[24px]">
        <div className="flex">
          <span className="font-sans text-[24px] font-bold text-main">{results}</span>
          <div className="w-[8px]" />
          <span className="font-sans text-[24px] font-bold text-main">Results</span>
        </div>
        <div className="h-[24px]" />
        {
          <div className="flex items-center justify-start">
            <div className="relative" style={{ minWidth: "40px", minHeight: "40px" }}>
              <Image src="/white_circle.png" width={40} height={40} alt="" />
              <div className="absolute left-[9px] top-[6px]" style={{ minWidth: "24px", minHeight: "24px" }}>
                <Image src="/icon_ninza.png" width={24} height={24} alt="" />
              </div>
            </div>
            <div className="w-[8px]" />
            <div className="flex flex-col items-start">
              <span className="text-start font-sans text-[18px] font-bold leading-normal text-white">Mark Cuban</span>
              <div className="flex justify-start">
                <span className="text-start">📍</span>
                <span className="text-start font-sans text-[14px] font-bold leading-normal text-[#C3E4CD]">
                  Opensea
                </span>
                <span className="w-[4px]" />
                <span className="text-start font-sans text-[14px] font-normal leading-normal text-white">
                  0xca...c234
                </span>
              </div>
            </div>
          </div>
        }
        <div className="h-[20px]" />
        {
          <div className="flex items-center justify-start">
            <div className="relative" style={{ minWidth: "40px", minHeight: "40px" }}>
              <Image src="/white_circle.png" width={40} height={40} alt="" />
              <div className="absolute left-[9px] top-[6px]" style={{ minWidth: "24px", minHeight: "24px" }}>
                <Image src="/icon_magic.png" width={24} height={24} alt="" />
              </div>
            </div>
            <div className="w-[8px]" />
            <div className="flex flex-col items-start">
              <span className="text-start font-sans text-[18px] font-bold leading-normal text-white">3LAU</span>
              <div className="flex justify-start">
                <span className="text-start">📍</span>
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
      </div>
    </main>
  )
}

export async function getServerSideProps(context: { params: { term: unknown } }) {
  const term = context.params.term

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
    props: { search: { term: term as string } },
  }
}

export default ProfilePage
