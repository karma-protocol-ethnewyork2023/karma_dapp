import { useRouter } from "next/router"
import Image from "next/image"
import { use, useEffect, useState } from "react"

interface User {
  name: string
}

function ProfilePage({ user }: { user: User }) {
  const router = useRouter()
  const { name } = router.query

  const [profileName, setProfileName] = useState("")

  const [nodes, setNodes] = useState(0)
  const [superNodes, setSuperNodes] = useState(0)
  const [edges, setEdges] = useState(0)

  useEffect(() => {
    if (user.name.length > 10) {
      setProfileName(`${user.name.slice(0, 10)}...`)
    } else {
      setProfileName(user.name)
    }
  }, [router.query])

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <main className="relative h-screen w-screen">
      {/* header */}
      <div className="absolute left-0 top-0 flex h-[56px] w-screen items-center justify-between bg-[#393E3A] px-[16px]">
        <h1 className="font-sans text-[20px] font-bold text-white">{profileName}&rsquo;s Profile</h1>
        <button style={{ minWidth: "28px", minHeight: "28px" }}>
          <Image src="/icon_search.png" width={28} height={28} alt="" />
        </button>
      </div>
      <div className="absolute top-[56px] flex w-screen flex-col items-center">
        <div className="h-[18px]" />
        {/* graph */}
        <div style={{ minWidth: "285px", minHeight: "285px" }}>
          <Image src="/graph_back.png" width={285} height={285} alt="" />
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
        <button className="flex h-[54px] w-[335px] items-center justify-center space-x-2 rounded-full bg-[#FFEBB8] px-[17px] py-[16px]">
          <div className="text-center font-sans text-lg font-bold leading-[140%] tracking-[0.15px] text-[#282E29]">
            Message via Telegram
          </div>
        </button>
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
