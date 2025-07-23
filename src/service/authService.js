import axiosAuthInstance from "../utils/axiosAuthInstance";
import axiosOtpInstance from "../utils/axiosOtpInstance";

export const getOtpService = async (email) => {
  const res = await axiosOtpInstance.post("/get-otp", { email });
  return res.data;
};

export const signupService = async (formData) => {
  const res = await axiosAuthInstance.post("/signup", formData);
  return res.data;
};

export const loginService = async (formData) => {
    const res = await axiosAuthInstance.post('/login', formData)
    return res.data;
}

export const verifyOtpService = async (email, otp) => {
  const res = await axiosOtpInstance.post("/verify-otp", { email, otp });
  return res.data;
};

