import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Notes from "./components/home/Notes";
import Todo from "./components/home/Todo";

const App = () => {
  const token = localStorage.getItem("jwtToken");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/home/notes" replace /> : <Auth />}
        />
        <Route path="/home" element={<Home />}>
          <Route path="/home/notes" element={<Notes />} />
          <Route path="/home/todo" element={<Todo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
