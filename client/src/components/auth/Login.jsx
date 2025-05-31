import { useNavigate } from "react-router";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4001";

const Login = () => {
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    fetch(`${BACKEND_URL}/auth/login`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Invalid credentials");
        }

        const result = await response.json();
        const token = result.token;
        const user = result.user;
        if (!user) {
          throw new Error("User not found in response");
        }

        if (token) {
          localStorage.setItem("jwtToken", token);
          localStorage.setItem("user", JSON.stringify(user));
          console.log("Login successful");
          window.location.href = "/home/notes";
        } else {
          console.error("Token not found in response");
        }
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-zinc-800 to-zinc-950 text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-black/25 backdrop-blur-xl border border-zinc-700 rounded-xl px-8 py-10 w-full max-w-md shadow-2xl"
      >
        <h1 className="text-3xl font-bold text-emerald-500 text-center mb-8">
          Jotdown Login
        </h1>

        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="abc@gmail.com"
            required
            className="w-full px-4 py-2 bg-zinc-800 text-white border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="********"
            required
            className="w-full px-4 py-2 bg-zinc-800 text-white border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-500 transition-all duration-200 text-white font-bold py-2 px-4 rounded-lg hover:scale-95"
        >
          Log In
        </button>

        <p className="mt-10 text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-emerald-400 hover:underline hover:text-emerald-300"
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
