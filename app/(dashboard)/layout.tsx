import Navbar from "./_components/Navbar";
import Sidebar from "./_components/Sidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-56 inset-y-0 w-full z-50">
        <Navbar/>
      </div>
    <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
      <Sidebar />
    </div>
    <main className="md:ml-56 h-full">
      {children}
    </main>
    </div>
  );
};

export default layout;
