import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import Logo from "../../../component/Logo/Logo";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [dbUser, setDbUser] = useState(null);

  axiosSecure.get(`/users/${user?.email}`).then((res) => {
    setDbUser(res.data);
  });

  const links = (
    <div className="space-x-4">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/dashboard/add-lessons">Add Lesson</NavLink>
      <NavLink to="/public-lessons">Public Lesson</NavLink>
      {dbUser?.isPremium === true ? (
        <NavLink>Premium ⭐</NavLink>
      ) : (
        <NavLink to="/upgrade">Upgrade</NavLink>
      )}
    </div>
  );

  //   Handle Log Out
  const handleLogOut = () => {
    logOut()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
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
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
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
          <Logo></Logo>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      {/* Auth section  */}

      <div className="navbar-end">
        {user ? (
          <Link onClick={handleLogOut} className="btn">
            Log Out
          </Link>
        ) : (
          <>
            <Link to="/login" className="btn">
              Login
            </Link>
            <Link to="/register" className="btn">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
