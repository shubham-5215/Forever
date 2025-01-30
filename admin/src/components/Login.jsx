import { useState } from "react";
import { backendUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      toast.error("Please fill in both fields.");
      return;
    }

    setLoading(true); // Start loading

    try {
      const response = await axios.post(backendUrl + '/api/user/admin', { email, password });

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful!");
        setTimeout(() => {
          window.location.reload(); // Reload to apply authentication
        }, 1000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-2 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Email Address</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="email"
              placeholder="your@email.com"
              required
              disabled={loading}
            />
          </div>
          <div className="mb-2 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="password"
              placeholder="Enter your Password"
              required
              disabled={loading}
            />
          </div>
          <button
            className={`mt-2 w-full py-2 px-4 rounded-md text-white ${
              loading ? "bg-gray-600" : "bg-black"
            }`}
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;



// import { useState } from "react";
// import { backendUrl } from "../App";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Login = ({ setToken }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();

//     // Basic validation
//     if (!email || !password) {
//       toast.error("Please fill in both fields.");
//       return;
//     }

//     try {
//         const response = await axios.post(`http://localhost:4000` + '/api/user/admin', { email, password });
//       console.log(response);
//       if (response.data.success) {
//         setToken(response.data.token);
//         toast.success("Login successful!");
//       } else {
        
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center w-full">
//       <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
//         <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
//         <form onSubmit={onSubmitHandler}>
//           <div className="mb-2 min-w-72">
//             <p className="text-sm font-medium text-gray-700 mb-2">Email Address</p>
//             <input
//               onChange={(e) => setEmail(e.target.value)}
//               value={email}
//               className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
//               type="email"
//               placeholder="your@email.com"
//               required
//             />
//           </div>
//           <div className="mb-2 min-w-72">
//             <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
//             <input
//               onChange={(e) => setPassword(e.target.value)}
//               value={password}
//               className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
//               type="password"
//               placeholder="Enter your Password"
//               required
//             />
//           </div>
//           <button className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black" type="submit">
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
