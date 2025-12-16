import React from "react";
import { Link, Outlet } from "react-router";
import Logo from "../component/Logo/Logo";
import { BiSolidBookAdd } from "react-icons/bi";
import { FaBookBookmark, FaBookOpenReader } from "react-icons/fa6";
import { FaHome, FaUserCircle, FaUsers } from "react-icons/fa";
import useRole from "../hooks/useRole";
import { MdAdminPanelSettings, MdReport } from "react-icons/md";
import { LuNotebookPen } from "react-icons/lu";


const DashboardLayout = () => {
  const { role } = useRole();
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4">
            <Link to="/">
              {" "}
              <Logo></Logo>
            </Link>
          </div>
        </nav>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* Home Section*/}
            <li>
              <Link
                to="/dashboard"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                {/* Home icon */}
                <FaHome />
                <span className="is-drawer-close:hidden">Homepage</span>
              </Link>
            </li>

            {/* Profile Section*/}
            <li>
              <Link
                to="/dashboard/profile"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Profile"
              >
                {/* Profile icon */}
                <FaUserCircle />
                <span className="is-drawer-close:hidden">Profile</span>
              </Link>
            </li>

            {/* Add Lessons Section */}
            <li>
              <Link
                to="/dashboard/add-lessons"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Add Lessons"
              >
                {/* Settings icon */}
                <BiSolidBookAdd />
                <span className="is-drawer-close:hidden">Add Lessons</span>
              </Link>
            </li>

            {/* My Lessons Section */}
            <li>
              <Link
                to="/dashboard/my-lessons"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Lessons"
              >
                {/* Settings icon */}
                <FaBookOpenReader />
                <span className="is-drawer-close:hidden">My Lessons</span>
              </Link>
            </li>

            {/* My Favorites Section */}
            <li>
              <Link
                to="/dashboard/my-favorites"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Favorites"
              >
                {/* Settings icon */}
                <FaBookBookmark />
                <span className="is-drawer-close:hidden">My Favorites</span>
              </Link>
            </li>

            {role === "admin" && (
              <>
                {/* Admin Dashboard Home  */}
                <li>
                  <Link
                    to="/dashboard/admin-summary"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Admin Dashboard Home"
                  >
                    {/* Settings icon */}
                    <MdAdminPanelSettings />
                    <span className="is-drawer-close:hidden">
                      Admin Dashboard Home
                    </span>
                  </Link>
                </li>

                {/* User Management Section */}
                <li>
                  <Link
                    to="/dashboard/user-management"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="User Management"
                  >
                    {/* Settings icon */}
                    <FaUsers />
                    <span className="is-drawer-close:hidden">
                      User Management
                    </span>
                  </Link>
                </li>

                {/* Manage Lessons  Section */}
                <li>
                  <Link
                    to="/dashboard/manage-lessons"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Manage Lessons"
                  >
                    {/* Settings icon */}
                    <LuNotebookPen />
                    <span className="is-drawer-close:hidden">
                      Manage Lessons
                    </span>
                  </Link>
                </li>

                {/* Reported Lessons  Section */}
                <li>
                  <Link
                    to="/dashboard/reported-lessons"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Reported Lessons"
                  >
                    {/* Settings icon */}
                    <MdReport />
                    <span className="is-drawer-close:hidden">
                     Reported Lessons
                    </span>
                  </Link>
                </li>


              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
