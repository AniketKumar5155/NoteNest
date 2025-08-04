import { createContext, useContext, useState, useEffect } from "react";
import {
  getOtpService,
  verifyOtpService,
  signupService,
  loginService,
} from "../service/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    accessToken: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const user = localStorage.getItem("user");

    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);
        setAuth({ accessToken: token, user: parsedUser });
      } catch (err) {
        logout();
      }
    }
  }, []);

  const signup = async (formData) => {
    const data = await signupService(formData);
    const { user, accessToken } = data;
    setAuth({ user, accessToken });
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("user", JSON.stringify(user));
    return data;
  };

  const login = async (formData) => {
    const data = await loginService(formData);
    const { user, accessToken } = data;
    setAuth({ user, accessToken });
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("user", JSON.stringify(user));
    (accessToken)
    return data;
  };

  const getOtp = async (email) => {
    return await getOtpService(email);
  };

  const verifyOtp = async (email, otp) => {
    return await verifyOtpService(email, otp);
  };

  const logout = () => {
    setAuth({ user: null, accessToken: null });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        signup,
        login,
        logout,
        getOtp,
        verifyOtp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
