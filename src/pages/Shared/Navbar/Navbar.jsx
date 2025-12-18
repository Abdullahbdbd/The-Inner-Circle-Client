import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import Logo from "../../../component/Logo/Logo";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaStar } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [dbUser, setDbUser] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/${user.email}`).then((res) => {
        setDbUser(res.data);
      });
    }
  }, [user, axiosSecure]);

  const handleLogOut = async () => {
    try {
      await logOut();
      setOpenDropdown(false);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const links = (
    <div className="space-x-4">
      <NavLink to="/" className="hover:text-primary">Home</NavLink>
      <NavLink to="/dashboard/add-lessons" className="hover:text-primary">Add Lesson</NavLink>
      <NavLink to="/dashboard/my-lessons" className="hover:text-primary">My Lessons</NavLink>
      <NavLink to="/public-lessons" className="hover:text-primary">Public Lessons</NavLink>
      {dbUser?.isPremium ? (
        <span className="text-yellow-500 font-semibold">⭐ Premium</span>
      ) : (
        <NavLink to='/upgrade' className="text-blue-600">
          Upgrade
        </NavLink>
      )}
    </div>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      {/* Left */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link to="/">
          <Logo />
        </Link>
      </div>

      {/* Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      {/* Right - Auth Section */}
      <div className="navbar-end relative">
        {user ? (
          <div className="relative">
            <button
              className="btn btn-ghost btn-circle avatar"
              onClick={() => setOpenDropdown(!openDropdown)}
            >
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt="User"
                />
              </div>
            </button>

            {/* Dropdown */}
            {openDropdown && (
              <div className="absolute right-0 mt-3 w-56 bg-base-100 rounded-lg shadow-lg border border-base-300 z-10">
                <div className="p-4 text-center">
                  <p className="font-semibold flex items-center justify-center gap-1">
                    {dbUser?.displayName || user.displayName}
                  </p>
                </div>
                <hr />
                <ul className="menu p-2">
                  <li>
                    <Link to="/dashboard/profile" onClick={() => setOpenDropdown(false)}>
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard" onClick={() => setOpenDropdown(false)}>
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogOut} className="text-red-500">
                      Log Out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-outline btn-primary btn-sm">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary btn-sm">
              Signup
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
