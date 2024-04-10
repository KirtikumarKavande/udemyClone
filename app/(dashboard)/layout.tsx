import Sidebar from "./_components/Sidebar"

const layout = () => {
  return (
    <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
    <Sidebar />
  </div>
  )
}

export default layout