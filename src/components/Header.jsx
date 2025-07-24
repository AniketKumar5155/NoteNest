import { Link, useNavigate } from "react-router-dom";
import BurgerMenu from "./BurgerMenu";
import Button from "./Button";
import { useAuth, } from "../context/AuthContext";
import { useState } from "react";
import { toast } from "react-toastify";

const Header = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const ProfileDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleProfile = () => {
      setIsOpen(false);
      navigate("/profile");
    };
    const handleLogout = () => {
      setIsOpen(false);
      logout();
      toast.success("Logged out successfully");
      navigate("/login");
    };
    return (
      <div className="relative inline-block text-left">
        <img
          src={`https://ui-avatars.com/api/?name=${auth.user.first_name}+${auth.user.last_name}`}
          alt="Profile"
          className="w-8 h-8 rounded-full cursor-pointer"
          onClick={() => setIsOpen((prev) => !prev)}
        />
        {isOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg z-50 overflow-hidden border border-gray-200">
            <div className="py-2">
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                onClick={handleProfile}
              >
                My Profile
              </div>
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-red-600"
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex justify-between p-1.5 bg-amber-100 items-center h-[44px]">
      <BurgerMenu />
      <div className="font-bold text-2xl">NoteNest</div>
      {auth.user ? (
        <ProfileDropdown />
      ) : (
        <Link to="/signup">
          <Button
            label="Signup"
            className="px-2 py-1.5 border-2 border-amber-400 bg-amber-300 w-15"
          />
        </Link>
      )}
    </div>
  );
};

export default Header;
