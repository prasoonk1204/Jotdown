import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Home from "./pages/Home";
import Notes from "./components/home/Notes";
import Todo from "./components/home/Todo";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

const App = () => {
  const token = localStorage.getItem("jwtToken");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/home/notes" replace /> : <Navigate to="/login" replace />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />}>
          <Route path="/home/notes" element={<Notes />} />
          <Route path="/home/todo" element={<Todo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
