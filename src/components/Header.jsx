import { Link, useNavigate } from "react-router-dom";
import BurgerMenu from "./BurgerMenu";
import Button from "./button";
import { useAuth } from "../context/AuthContext";
import Dropdown from "./Dropdown";
import { useEffect } from "react";

const Header = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

 const ProfileDropdown = () => {
  useEffect(() => {
    
   console.log(auth.user.first_name)
   }, [auth])
  
 
  return (
    
    <Dropdown
      trigger={
        <img
          src={`https://ui-avatars.com/api/?name=${auth.user.first_name}+${auth.user.last_name}`}
          alt="Profile"
          className="w-8 h-8 rounded-full cursor-pointer"
        />
      }
    >
      <button
        onClick={() => navigate("/profile")}
        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
      >
        My Profile
      </button>
      <button
        onClick={() => {
          logout();
          navigate("/login");
        }}
        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
      >
        Logout
      </button>
    </Dropdown>
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
            className={`px-2 py-1.5 border-2 border-amber-400 bg-amber-300 w-15`}
          />
        </Link>
      )}
    </div>

    
  );
};

export default Header;
