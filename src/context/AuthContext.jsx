import { createContext, useContext, useState, useEffect } from "react";

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
      setAuth({
        accessToken: token,
        user: JSON.parse(user),
      });
    }
  }, []);

  const signup = (user, token) => {
    setAuth({ user, accessToken: token });
    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const login = (user, token) => {
    setAuth({ user, accessToken: token });
    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setAuth({ user: null, accessToken: null });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ auth, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

