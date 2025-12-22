import React from "react";
import { Link, Outlet } from "react-router";
import Logo from "../component/Logo/Logo";
import { BiSolidBookAdd } from "react-icons/bi";
import { FaBookBookmark, FaBookOpenReader } from "react-icons/fa6";
import { FaHome, FaUserCircle, FaUsers } from "react-icons/fa";
import { MdAdminPanelSettings, MdReport } from "react-icons/md";
import { LuNotebookPen } from "react-icons/lu";
import useRole from "../hooks/useRole";
import ScrollToTop from "../component/ScrollToTop/ScrollToTop";

const DashboardLayout = () => {
  const { role } = useRole();

  return (
    <div className="drawer lg:drawer-open bg-slate-950 text-slate-200 min-h-screen">
      {/* Drawer Toggle */}
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <nav className="flex items-center justify-between bg-slate-900/95 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 px-4 py-2 shadow-md">
          <div className="flex items-center gap-2">
            {/* Drawer toggle button */}
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-ghost btn-sm text-slate-300 hover:text-teal-400"
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
            </label>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <Logo />
            </Link>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-teal-500/30 bg-teal-500/10 text-teal-400 font-bold hover:bg-teal-500 hover:text-white shadow-[0_0_15px_rgba(20,184,166,0.1)] transition-all duration-300"
          >
            <FaHome />
            <span className="tracking-wide">Back To Home</span>
          </Link>
        </nav>

        {/* Page Content */}

        <Outlet />

        <ScrollToTop />
      </div>

      {/* Sidebar Drawer */}
      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="flex min-h-full flex-col items-start bg-slate-900/95 backdrop-blur-md border-r border-slate-800 shadow-xl is-drawer-close:w-16 is-drawer-open:w-64 transition-all duration-300">
          {/* Sidebar Content */}
          <ul className="menu w-full grow pt-4">
            {/* User Section */}
            {role === "user" && (
              <li>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800/70 hover:text-teal-400 transition-all duration-300 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Homepage"
                >
                  <FaHome />
                  <span className="is-drawer-close:hidden">Homepage</span>
                </Link>
              </li>
            )}

            {/* Profile */}
            <li>
              <Link
                to="/dashboard/profile"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800/70 hover:text-teal-400 transition-all duration-300 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Profile"
              >
                <FaUserCircle />
                <span className="is-drawer-close:hidden">Profile</span>
              </Link>
            </li>

            {/* Admin Routes */}
            {role === "admin" && (
              <>
                <li>
                  <Link
                    to="/dashboard/admin-summary"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800/70 hover:text-teal-400 transition-all duration-300 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Admin Dashboard"
                  >
                    <MdAdminPanelSettings />
                    <span className="is-drawer-close:hidden">
                      Admin Dashboard
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard/user-management"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800/70 hover:text-teal-400 transition-all duration-300 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="User Management"
                  >
                    <FaUsers />
                    <span className="is-drawer-close:hidden">
                      User Management
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard/manage-lessons"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800/70 hover:text-teal-400 transition-all duration-300 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Manage Lessons"
                  >
                    <LuNotebookPen />
                    <span className="is-drawer-close:hidden">
                      Manage Lessons
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard/reported-lessons"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800/70 hover:text-teal-400 transition-all duration-300 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Reported Lessons"
                  >
                    <MdReport />
                    <span className="is-drawer-close:hidden">
                      Reported Lessons
                    </span>
                  </Link>
                </li>
              </>
            )}

            {/* Add Lessons */}
            <li>
              <Link
                to="/dashboard/add-lessons"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800/70 hover:text-teal-400 transition-all duration-300 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Add Lessons"
              >
                <BiSolidBookAdd />
                <span className="is-drawer-close:hidden">Add Lessons</span>
              </Link>
            </li>

            {/* My Lessons */}
            <li>
              <Link
                to="/dashboard/my-lessons"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800/70 hover:text-teal-400 transition-all duration-300 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Lessons"
              >
                <FaBookOpenReader />
                <span className="is-drawer-close:hidden">My Lessons</span>
              </Link>
            </li>

            {/* My Favorites */}
            <li>
              <Link
                to="/dashboard/my-favorites"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800/70 hover:text-teal-400 transition-all duration-300 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Favorites"
              >
                <FaBookBookmark />
                <span className="is-drawer-close:hidden">My Favorites</span>
              </Link>
            </li>
          </ul>

          {/* Gradient Footer Line */}
          <div className="h-[2px] bg-gradient-to-r from-blue-600 via-teal-500 to-green-500 w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
