import { getServerSession } from "next-auth/next"

export default async function Dashboard() {
  // const session = await getServerSession()
// 
  // if (!session) {
  //   return <div>Please sign in to view your dashboard.</div>
  // }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome to your dashboard, !</h1>
      {/* Add more dashboard content here */}
    </div>
  )
}

