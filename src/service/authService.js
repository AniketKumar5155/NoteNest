import axiosAuthInstance from "../utils/axiosAuthInstance";
import axiosOtpInstance from "../utils/axiosOtpInstance";

export const getOtpService = async (email) => {
  return await axiosOtpInstance.post("/get-otp", { email });
};

export const signupService = async (formData) => {
  return await axiosAuthInstance.post("/signup", formData);
};

export const loginService = async (formData) => {
    return await axiosAuthInstance.post('/login', formData)
}

export const verifyOtpService = async (email, otp) => {
  return await axiosOtpInstance.post("/verify-otp", { email, otp });
};

