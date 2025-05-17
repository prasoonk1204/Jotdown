import Navbar from "../components/home/Navbar"
import { Outlet } from "react-router"

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-zinc-800 to-zinc-950 relative h-screen min-h-screen p-4 flex flex-col gap-4 pt-24 font-mono">
      {/* <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/bgimg.png)" }}
      ></div> */}
      

      <Navbar />
      <Outlet />
    </div>
  );
}

export default Home