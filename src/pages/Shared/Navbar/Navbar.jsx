import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import Logo from "../../../component/Logo/Logo";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [dbUser, setDbUser] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/${user.email}`)
        .then((res) => setDbUser(res.data));
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

  const linkClass = ({ isActive }) =>
    `relative font-medium transition-all duration-300 hover:text-teal-400 ${
      isActive
        ? "text-teal-400 after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-blue-600 after:via-teal-500 after:to-green-500 after:rounded-full"
        : "text-slate-300"
    }`;

  const links = (
    <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8 text-sm">
      <NavLink to="/" className={linkClass}>
        Home
      </NavLink>
      <NavLink to="/dashboard/add-lessons" className={linkClass}>
        Add Lesson
      </NavLink>
      <NavLink to="/dashboard/my-lessons" className={linkClass}>
        My Lessons
      </NavLink>
      <NavLink to="/public-lessons" className={linkClass}>
        Public Lessons
      </NavLink>

      {dbUser?.isPremium ? (
        <div className="relative group cursor-default">
          {/* Outer Glow Effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-yellow-300 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500"></div>

          {/* Main Badge */}
          <div className="relative flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-amber-500/50 rounded-full shadow-2xl">
            <span className="text-[11px] font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 uppercase">
              Premium
            </span>
          </div>
        </div>
      ) : (
        <NavLink
          to="/upgrade"
          className="group relative px-4 py-1.5 flex items-center justify-center"
        >
          {/* Subtle Background Animation */}
          <div className="absolute inset-0 bg-white/5 rounded-lg border border-white/10 group-hover:border-teal-500/50 transition-all duration-300"></div>

          <span className="relative text-sm font-bold text-slate-400 group-hover:text-teal-400 transition-colors duration-300">
            Upgrade Plan
          </span>
        </NavLink>
      )}
    </div>
  );

  return (
    <div className="navbar bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50 px-4 md:px-8 shadow-md">
      {/* Left Section */}
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost text-slate-200 lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-slate-900/95 backdrop-blur-md rounded-box mt-3 w-52 p-3 shadow-lg border border-slate-800 text-slate-200"
          >
            {links}
          </ul>
        </div>

        <Link to="/" className="flex items-center gap-2">
          <Logo />
        </Link>
      </div>

      {/* Center Section */}
      <div className="navbar-center hidden lg:flex">{links}</div>

      {/* Right Section */}
      <div className="navbar-end relative">
        {user ? (
          <div className="relative">
            <button
              className="btn btn-ghost btn-circle avatar hover:ring-2 hover:ring-teal-400 transition-all"
              onClick={() => setOpenDropdown(!openDropdown)}
            >
              <div className="w-9 rounded-full ring ring-teal-500 ring-offset-slate-900 ring-offset-2">
                <img src={user.photoURL || "/default-avatar.png"} alt="User" />
              </div>
            </button>

            {openDropdown && (
              <div className="absolute right-0 mt-3 w-56 bg-slate-900/95 backdrop-blur-md rounded-lg shadow-lg border border-slate-800 z-10 text-slate-300">
                <div className="p-4 text-center border-b border-slate-700">
                  <p className="font-semibold text-slate-200">
                    {dbUser?.displayName || user.displayName}
                  </p>
                </div>
                <ul className="menu p-2">
                  <li>
                    <Link
                      to="/dashboard/profile"
                      onClick={() => setOpenDropdown(false)}
                      className="hover:text-teal-400"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard"
                      onClick={() => setOpenDropdown(false)}
                      className="hover:text-teal-400"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogOut}
                      className="text-red-400 hover:text-red-500 font-medium"
                    >
                      Log Out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-2">
            <Link
              to="/login"
              className="btn btn-outline btn-sm border-teal-500 text-teal-400 hover:bg-gradient-to-r hover:from-blue-600 hover:via-teal-500 hover:to-green-500 hover:border-transparent hover:text-white"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="btn btn-sm bg-gradient-to-r from-blue-600 via-teal-500 to-green-500 text-white border-none hover:opacity-90"
            >
              Signup
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
