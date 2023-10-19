import React from "react";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const {currentUser} = useSelector((state) => state.user);
  console.log(currentUser);
  return (
    <header className="bg-slate-100 shadow-md">
      <div className="flex flex-row justify-between items-center max-w-6xl p-3 m-auto">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">E-</span>
            <span className="text-slate-700">State</span>
          </h1>
        </Link>
        <form className="p-3 border rounded-lg bg-slate-100 flex flex-row items-center">
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64 "
          />
          <Link to="">
            <BiSearch size={20} className="text-slate-600" />
          </Link>
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>
         
          {currentUser ? (
            <Link to="/profile">
                    <img src = {currentUser.avatar} alt = "profile image" className="h-8 w-8 rounded-full " /> </Link>
          ):( <Link to = '/sign-In'><li className=" sm:inline text-slate-700 hover:underline">
          {" "}
          Sign In
        </li></Link> )}
          
         
          
        </ul>
      </div>
    </header>
  );
};

export default Header;
