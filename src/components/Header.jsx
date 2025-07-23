import { Link, useNavigate } from "react-router-dom";
import BurgerMenu from "./BurgerMenu";
import Button from "./Button";
import { useAuth } from "../context/AuthContext";
import Dropdown from "./Dropdown";
import { toast } from "react-toastify";

const Header = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const ProfileDropdown = () => {
    const options = [
      {
        label: (
          <Link to="/profile" className="block w-full text-left">
            My Profile
          </Link>
        ),
        value: "profile",
        className: "hover:bg-gray-100",
      },
      {
        label: "Logout",
        value: "logout",
        onClick: () => {
          logout();                          // 1. Clears auth context
          toast.success("Logged out successfully");  // 2. Toast message
          navigate("/login");               // 3. Redirect to login
        },
      }

    ];

    return (
      <Dropdown
        trigger={
          <img
            src={`https://ui-avatars.com/api/?name=${auth.user?.first_name || ""}+${auth.user?.last_name || ""}`}
            alt="Profile"
            className="w-8 h-8 rounded-full cursor-pointer"
          />
        }
        options={options}
      />
    );
  };

  return (
    <div className="flex justify-between p-1.5 bg-amber-100 items-center">
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
