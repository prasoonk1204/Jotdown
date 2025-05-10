import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Auth from "./pages/Auth";
import Home from "./pages/Home";

const App = () => {
  const token = localStorage.getItem("jwtToken");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/home" replace /> : <Auth />}
        />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
