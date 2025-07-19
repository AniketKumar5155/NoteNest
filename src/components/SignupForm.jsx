import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import InputField from "./InputField";
import axiosOtpInstance from "../utils/axiosOtpInstance";
import axiosAuthInstance from "../utils/axiosAuthInstance";
import { signupSchema } from "../shared/schemas/authSchemas";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const SignupForm = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [sentOtp, setSentOtp] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "Aniket",
    last_name: "Kumar",
    username: "Aniketkr@",
    email: "aniketkumar5155@gmail.com",
    password: "Aniketkr@5155",
    confirm_password: "Aniketkr@5155",
    otp: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getOtp = async () => {
    try {
      const { email } = formData;
      if (!email) {
        toast.error("Please enter your email to receive OTP");
        return;
      }

      const res = await axiosOtpInstance.post("/get-otp", { email });
      toast.success(res.data.message || "OTP sent successfully");
      setSentOtp(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleSignup = async (e) => {
  e.preventDefault();


  try {
    const validatedData = signupSchema.parse(formData);

    const { email, otp } = formData;

    if (!otp || otp.length !== 6) {
      toast.error("Enter the 6-digit OTP before signing up.");
      return;
    }

    const verifyRes = await axiosOtpInstance.post("/verify-otp", { email, otp });
    toast.success(verifyRes.data?.message || "OTP verified");

    const res = await axiosAuthInstance.post("/signup", validatedData);
    const { accessToken, user } = res.data;

    signup(user, accessToken); 
    toast.success("Signup successful");
    navigate("/", { replace: true });
  } catch (err) {
    if (err.name === "ZodError") {
      err.errors.forEach((e) => toast.error(e.message));
    } else {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  }
};


  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 overflow-hidden">
      <form
        className="flex flex-col justify-center items-center gap-3 bg-white p-6 rounded-xl shadow-lg w-80"
        onSubmit={handleSignup}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Create an Account</h2>

        <div className="flex gap-3 w-full">
          <InputField type="text" name="first_name" placeholder="First name" value={formData.first_name} onChange={handleChange} />
          <InputField type="text" name="last_name" placeholder="Last name" value={formData.last_name} onChange={handleChange} />
        </div>

        <InputField type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
        <InputField type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <InputField type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        <InputField type="password" name="confirm_password" placeholder="Confirm Password" value={formData.confirm_password} onChange={handleChange} />

        <div className="flex gap-2 w-full">
          <InputField
            type="text"
            name="otp"
            placeholder="OTP"
            value={formData.otp}
            onChange={handleChange}
          />
          {!sentOtp ? (
            <Button
              label="Get OTP"
              type="button"
              onClick={getOtp}
              className="px-4 py-2 text-xs bg-amber-400 hover:bg-amber-500 rounded-md text-white font-medium transition-colors mt-2"
            />
          ) : (
            <p className="text-green-600 text-sm mt-2">📨 OTP Sent</p>
          )}
        </div>

        <Button
          label="Sign Up"
          type="submit"
          disabled={!sentOtp}
          title={!sentOtp ? "Please get OTP first" : ""}
          className={`w-full px-4 py-2 rounded-md text-white font-medium transition-colors mt-2 flex justify-center ${sentOtp ? "bg-amber-400 hover:bg-amber-500" : "bg-gray-400 cursor-not-allowed"
            }`}
        />
      </form>

      <div className="mt-5">
        Already have an account?
        <Link to="/login">
          <span className="text-blue-600 hover:underline"> login</span>
        </Link>
      </div>
    </div>
  );
};

export default SignupForm;
