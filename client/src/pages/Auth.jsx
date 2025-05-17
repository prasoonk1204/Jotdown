import { useState } from "react";
import Signup from "../components/auth/Signup";
import Login from "../components/auth/Login";

const Auth = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 gap-12 font-mono">
      <div>
        <h1 className="text-3xl font-bold mb-6">Welcome to Our App</h1>

        <div className="mb-4">
          <button
            onClick={() => setShowLogin(true)}
            className={`px-4 py-2 mr-2 rounded ${
              showLogin ? "bg-blue-600 text-white" : "bg-gray-300 text-black"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setShowLogin(false)}
            className={`px-4 py-2 rounded ${
              !showLogin ? "bg-blue-600 text-white" : "bg-gray-300 text-black"
            }`}
          >
            Signup
          </button>
        </div>
      </div>

      <div className="w-full max-w-md">
        {showLogin ? <Login /> : <Signup />}
      </div>
    </div>
  );
};

export default Auth;
