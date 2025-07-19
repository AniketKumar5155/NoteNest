import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import InputField from "./InputField";
import { loginSchema } from "../shared/schemas/authSchemas";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { loginService } from "../service/authService";

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
      const res = await loginService(validated);
      const { accessToken, user } = res.data;

      login(user, accessToken);

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
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 overflow-hidden">
      <form
        className="flex flex-col justify-center items-center gap-3 bg-white p-6 rounded-xl shadow-lg w-80"
        onSubmit={handleLogin}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Login</h2>

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

      <div className="mt-5">
        Don’t have an account?
        <Link to="/signup">
          <span className="text-blue-600 hover:underline"> signup</span>
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
