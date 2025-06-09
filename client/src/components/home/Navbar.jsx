import { useNavigate, useLocation } from "react-router";
import { useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab = location.pathname.includes("todo") ? "todo" : "notes";

  const handleNotes = () => {
    navigate("/home/notes");
  };

  const handleTodo = () => {
    navigate("/home/todo");
  };

  const updateActiveClass = () => {
    const headings = document.querySelectorAll("h2[data-tab]");
    headings.forEach((heading) => {
      if (heading.dataset.tab === activeTab) {
        heading.classList.add("font-bold", "text-white");
      } else {
        heading.classList.remove("font-bold", "text-white");
      }
    });
  };

  useEffect(() => {
    updateActiveClass();
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    window.location.href = "/";
  };

  return (
    <div className="bg-black/25 w-full backdrop-blur-lg absolute top-0 left-0 z-10 h-34 sm:h-18 flex justify-center">
      <div className="w-[70vw] text-gray-200 py-4 flex flex-col sm:flex-row justify-between items-center text-lg ">
        <h1 className="text-emerald-500 font-bold order-1">Jotdown</h1>
        <div className="flex justify-between gap-10 w-full sm:w-fit order-3 sm:order-2">
          <h2 data-tab="notes" className="cursor-pointer" onClick={handleNotes}>
            Notes
          </h2>
          <h2 data-tab="todo" className="cursor-pointer" onClick={handleTodo}>
            Todo
          </h2>
        </div>
        <div
          onClick={handleLogout}
          className="border-[0.5px] border-gray-500 px-4 py-1 rounded-lg hover:bg-gray-500 transition-all cursor-pointer text-white duration-200 hover:scale-95 order-2 sm:order-3"
        >
          Logout
        </div>
      </div>
    </div>
  );
};

export default Navbar;
