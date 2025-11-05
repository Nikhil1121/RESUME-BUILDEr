import { Lock, Mail, User2Icon } from 'lucide-react'
import React from 'react'

const Login = () => {

    const query = new URLSearchParams(window.location.search)
    const urlState = query.get('state')
  const [state, setState] = React.useState(urlState ||"login")

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-white px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full sm:w-[380px] md:w-[420px] text-center border border-gray-200 rounded-2xl px-8 py-10 bg-white shadow-lg"
      >
        <h1 className="text-green-900 text-3xl font-semibold">
          {state === "login" ? "Login" : "Sign up"}
        </h1>
        <p className="text-green-500 text-sm mt-2">
          Please {state === "login" ? "login" : "sign up"} to continue
        </p>

        {/* Name field - only show on signup */}
        {state !== "login" && (
          <div className="flex items-center mt-8 w-full bg-gray-50 border border-gray-300 h-12 rounded-full overflow-hidden pl-5 gap-2 focus-within:ring-2 focus-within:ring-green-400 transition">
            <User2Icon size={18} color="#687280" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full bg-transparent border-none outline-none text-gray-700 text-sm"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {/* Email field */}
        <div className="flex items-center mt-5 w-full bg-gray-50 border border-gray-300 h-12 rounded-full overflow-hidden pl-5 gap-2 focus-within:ring-2 focus-within:ring-green-400 transition">
          <Mail size={16} color="#687280" />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            className="w-full bg-transparent border-none outline-none text-gray-700 text-sm"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password field */}
        <div className="flex items-center mt-5 w-full bg-gray-50 border border-gray-300 h-12 rounded-full overflow-hidden pl-5 gap-2 focus-within:ring-2 focus-within:ring-green-400 transition">
          <Lock size={16} color="#687280" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full bg-transparent border-none outline-none text-gray-700 text-sm"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Forget password */}
        {state === "login" && (
          <div className="mt-4 text-right">
            <button
              type="reset"
              className="text-green-600 hover:underline text-sm font-medium"
            >
              Forgot password?
            </button>
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          className="mt-7 w-full h-11 rounded-full text-white font-medium bg-green-500 hover:bg-green-600 active:scale-[0.98] transition-transform duration-150"
        >
          {state === "login" ? "Login" : "Sign Up"}
        </button>

        {/* Toggle login/signup */}
        <p className="text-gray-500 text-sm mt-6">
          {state === "login" ? "Don’t have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => setState(prev => prev === "login" ? "register" : "login")}
            className="text-green-600 font-medium hover:underline cursor-pointer"
          >
            Click here
          </span>
        </p>
      </form>
    </div>
  )
}

export default Login
