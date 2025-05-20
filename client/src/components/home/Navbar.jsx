import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("notes");
  const handleNotes = () => {
    setActive("notes");
    navigate("/home/notes");
  };
  const handleTodo = () => {
    setActive("todo");
    navigate("/home/todo");
  };

  const updateActiveClass = () => {
    const headings = document.querySelectorAll("h2");
    headings.forEach((heading) => {
      if (heading.textContent.toLowerCase() === active) {
        heading.classList.add("font-bold");
        heading.classList.add("text-white");
      } else {
        heading.classList.remove("font-bold");
        heading.classList.remove("text-white");
      }
    });
  };

  useEffect(() => {
    updateActiveClass();
  }, [active]);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    window.location.href = "/";
  };
  return (
    <div className="bg-black/25 w-full backdrop-blur-lg absolute top-0 left-0 z-10 h-18 flex justify-center">
      <div className="w-[70vw] text-gray-200 py-4 flex justify-between items-center text-lg min-w-[600px]">
        <h1 className="text-emerald-500 font-bold">Jotdown</h1>
        <div className="flex gap-10">
          <h2 className="cursor-pointer" onClick={handleNotes}>
            Notes
          </h2>
          <h2 className="cursor-pointer" onClick={handleTodo}>
            Todo
          </h2>
        </div>
        <div
          onClick={handleLogout}
          className="border-[0.5px] border-gray-500 px-4 py-1 rounded-lg hover:bg-gray-500 transition-all cursor-pointer text-white duration-200 hover:scale-95"
        >
          Logout
        </div>
      </div>
    </div>
  );
};

export default Navbar;
