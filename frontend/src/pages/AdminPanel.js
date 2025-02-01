import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaRegCircleUser, FaBars } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../common/role"; // Ensure ROLE is correctly imported

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user); // Get the user from redux store
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false); // For toggling sidebar on mobile

  useEffect(() => {
    // If the user is not an admin, redirect them to the home page or login page
    if (user?.role !== ROLE.ADMIN) {
      navigate("/"); // Redirect to the home page or any page you prefer
    }
  }, [user, navigate]);

  if (!user) {
    // Handle the case when user is not available yet
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile Sidebar Toggle Button */}
      <button
        className="md:hidden p-2 absolute top-4 left-4 z-50"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <FaBars className="text-2xl" />
      </button>

      {/* Sidebar (Only on desktop, toggleable on mobile) */}
      <aside
        className={`${
          sidebarOpen ? "block" : "hidden"
        } md:block bg-white w-full md:w-64 min-h-full customShadow p-4 md:p-6`}
      >
        <div className="h-32 flex justify-center items-center flex-col">
          <div className="text-5xl cursor-pointer relative flex justify-center">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                className="w-20 h-20 rounded-full"
                alt={user?.name}
              />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <p className="capitalize text-lg font-semibold">{user?.name}</p>
          <p className="text-sm">{user?.role}</p>
        </div>

        {/* Admin Navigation Links */}
        <div className="mt-4">
          <nav className="grid gap-4">
            <Link
              to={"all-users"}
              className="block px-4 py-2 text-sm hover:bg-slate-100 rounded-md"
            >
              All Users
            </Link>
            <Link
              to={"all-products"}
              className="block px-4 py-2 text-sm hover:bg-slate-100 rounded-md"
            >
              All Products
            </Link>
            <Link to={"all-orders"} className="px-2 py-1 hover:bg-slate-100">
              All Orders
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`w-full ${
          sidebarOpen ? "md:w-[calc(100%-256px)]" : "md:w-[calc(100%-64px)]"
        } p-4`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
