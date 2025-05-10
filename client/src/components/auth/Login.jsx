const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    fetch("http://localhost:5000/auth/login", {
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

        if (token) {
          localStorage.setItem("jwtToken", token);
          console.log("Login successful");
          window.location.href = "/home";
        } else {
          console.error("Token not found in response");
        }
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  const loginAsTestUser = () => {
    const testToken = "jwt-token";
    localStorage.setItem("jwtToken", testToken);
    console.log("Logged in as test user");
    window.location.href = "/home";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-3xl font-bold mb-6">Login</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md"
      >
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-4"
        >
          Log In
        </button>

        {/* Bypass button */}
        <button
          type="button"
          onClick={loginAsTestUser}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Login as Test User
        </button>
      </form>
    </div>
  );
};

export default Login;
