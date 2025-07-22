import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import InputField from "./InputField";
import { loginSchema } from "../shared/schemas/authSchemas";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const validated = loginSchema.parse(formData);
      await login(validated);
      toast.success("Logged in successfully");
      navigate("/", { replace: true });
    } catch (err) {
      if (err.name === "ZodError") { 
        err.errors.forEach((e) => toast.error(e.message));
      } else {
        toast.error(err.response?.data?.message || "Login failed");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center">
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-md w-80"
        >
          <h2 className="text-xl font-semibold text-center text-gray-800">Login</h2>

          <InputField
            type="text"
            name="identifier"
            placeholder="Email or Username"
            value={formData.identifier}
            onChange={handleChange}
          />

          <InputField
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <Button
            label="Login"
            type="submit"
            className="w-full px-4 py-2 bg-amber-400 hover:bg-amber-500 rounded-md text-white font-medium transition-colors mt-2 flex justify-center"
          />
        </form>

        <div className="mt-4 text-gray-700 text-sm">
          Don&apos;t have an account?
          <Link to="/signup" className="text-blue-600 hover:underline ml-1">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
