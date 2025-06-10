import { useEffect, useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4001";

const Checkbox = ({ checked, onChange }) => (
  <label className="inline-flex items-center cursor-pointer group">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="sr-only peer"
    />
    <div className="w-5 h-5 rounded-md border-[1.5px] border-gray-400 peer-checked:border-emerald-500 peer-checked:bg-emerald-500 flex items-center justify-center transition-all duration-200 group-hover:scale-105">
      {checked && (
        <svg
          className="w-3 h-3 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </div>
  </label>
);

const TodoItem = ({ todo, handleToggle, handleDelete, deletingId }) => {
  const formattedDate = new Date(todo.createdAt).toLocaleString();

  return (
    <div className="bg-black/25 p-4 my-2 rounded-lg flex justify-between sm:items-center flex-col sm:flex-row gap-3">
      <div className="flex items-center gap-4 overflow-hidden">
        <Checkbox checked={todo.done} onChange={() => handleToggle(todo)} />
        <div>
          <span
            className={`text-[16px] sm:text-lg block  ${
              todo.done ? "line-through text-gray-400" : ""
            }`}
          >
            {todo.task}
          </span>
          <span className="text-xs text-gray-500">
            Created: {formattedDate}
          </span>
        </div>
      </div>
      <button
        onClick={() => handleDelete(todo._id)}
        disabled={deletingId === todo._id}
        className={`bg-black/25 px-4 py-2 border-[0.5px] border-gray-500 rounded-lg cursor-pointer hover:bg-gray-700 transition-all duration-200 hover:scale-95 text-sm sm:text-[16px] ${
          deletingId === todo._id ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Delete
      </button>
    </div>
  );
};

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);
  const [showCompleted, setShowCompleted] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const getToken = () => localStorage.getItem("jwtToken");

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${BACKEND_URL}/todos?sort=createdAt&order=desc`,
        {
          credentials: "include",
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch todos");
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      window.alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAdd = async () => {
    if (!newTask.trim()) {
      window.alert("Can't add empty task")
      return};
    try {
      const res = await fetch(`${BACKEND_URL}/todos`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ task: newTask }),
      });
      if (!res.ok) throw new Error("Failed to add todo");
      const added = await res.json();
      setTodos((prev) => [added, ...prev]);
      setNewTask("");
    } catch (err) {
      window.alert(err.message);
    }
  };

  const handleToggle = async (todo) => {
    try {
      const res = await fetch(`${BACKEND_URL}/todos/${todo._id}`, {
        credentials: "include",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ done: !todo.done }),
      });
      if (!res.ok) throw new Error("Failed to update todo");
      const updated = await res.json();
      setTodos((prev) =>
        prev.map((t) => (t._id === updated._id ? updated : t))
      );
    } catch (err) {
      window.alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      const res = await fetch(`${BACKEND_URL}/todos/${id}`, {
        credentials: "include",
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (!res.ok) throw new Error("Failed to delete todo");
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (err) {
      window.alert(err.message);
    } finally {
      window.alert("Task deleted successfully")
      setDeletingId(null);
    }
  };

  const activeTodos = todos.filter((todo) => !todo.done);
  const completedTodos = todos.filter((todo) => todo.done);

  if (loading) return <p className="text-white/80 self-center w-[70vw]">Loading todos...</p>;

  return (
    <div className="text-white bg-black/25 backdrop-blur-2xl w-[90vw] md:w-[70vw] p-4 rounded-lg h-screen overflow-y-scroll scrollbar self-center">

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task..."
          className="flex-grow p-2 rounded-lg bg-zinc-800 border border-gray-600 text-white focus:outline-none"
        />
        <button
          onClick={handleAdd}
          className="bg-emerald-500 px-6 py-2 rounded-lg hover:bg-emerald-600 transition-all duration-200 hover:scale-95"
        >
          Add
        </button>
      </div>

      {activeTodos.length === 0 && completedTodos.length === 0 ? (
        <p className="text-gray-400">No todos yet.</p>
      ) : (
        <div>
          {activeTodos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              handleToggle={handleToggle}
              handleDelete={handleDelete}
              deletingId={deletingId}
            />
          ))}

          {completedTodos.length > 0 && (
            <div className="mt-6">
              <button
                onClick={() => setShowCompleted((prev) => !prev)}
                className="text-sm text-emerald-400 hover:underline mb-2"
              >
                {showCompleted ? "Hide" : "Show"} completed tasks (
                {completedTodos.length})
              </button>
              {showCompleted &&
                completedTodos.map((todo) => (
                  <TodoItem
                    key={todo._id}
                    todo={todo}
                    handleToggle={handleToggle}
                    handleDelete={handleDelete}
                    deletingId={deletingId}
                  />
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Todo;
