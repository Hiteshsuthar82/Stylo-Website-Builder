import React, { useState, useEffect, useId } from "react";
import {
  Menu,
  X,
  Users,
  Crown,
  UserCheck,
  UserX,
  UserCircle,
  DiamondPlus,
  LogOut,
} from "lucide-react";
import axios from "axios";
import { getCurrentUser, logout } from "../../features/authslice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NotFound from "../NotFound";
import CreateAdmin from "./CreateAdmin";
import loader from "../../assets/page-loader.gif";

const AdminDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState("allusers");
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchingUser, setFetchingUser] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  console.log(user);

  const routes = [
    { name: "All Users", path: "allusers", icon: Users },
    { name: "Premium Users", path: "premium-users", icon: Crown },
    { name: "Non-Premium Users", path: "non-premium-users", icon: UserCircle },
    { name: "Verified Users", path: "verified-users", icon: UserCheck },
    { name: "Non-Verified Users", path: "non-verified-users", icon: UserX },
  ];
  const apiurl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    setFetchingUser(true);
    const currentUser = await dispatch(getCurrentUser());
    if (currentUser) {
      setFetchingUser(false);
    }
  };

  const fetchUsers = async (route) => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiurl}/admin/${route}`, {
        withCredentials: true,
      });

      console.log(response);

      if (response?.status === 200) {
        setUserData(response?.data.data.users || []);
      } else {
        setUserData([]);
      }
    } catch (error) {
      console.log(error);
      setUserData([]);

      console.error("Error fetching users:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers(activeRoute);
  }, [activeRoute]);

  const handleDeleteUser = async (userId) => {
    console.log(userId);

    if (window.confirm("Are you sure you want to delete this user?", userId)) {
      try {
        const response = await axios.delete(
          `${apiurl}/admin/delete-user/${userId}`,
          { withCredentials: true }
        );
        if (response?.status === 200) {
          fetchUsers(activeRoute);
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleLogout = async () => {
    console.log("logout");

    const response = await dispatch(logout());
    if (response) {
      navigate("/");
    }
  };

  if (!fetchingUser && !user) {
    navigate("/login");
  }

  if (fetchingUser) {
    return (
      <div className="h-[100vh] w-full flex items-center justify-center">
        <img src={loader} alt="Loading.." className="h-40" />
      </div>
    );
  }

  return user?.role === "admin" && !fetchingUser ? (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-20">
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="p-2 bg-white rounded-lg shadow-lg"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-10 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Admin Panel</h2>
          <nav className="space-y-2">
            {routes.map((route) => {
              const Icon = route.icon;
              return (
                <button
                  key={route.path}
                  onClick={() => {
                    setActiveRoute(route.path);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                    activeRoute === route.path
                      ? "bg-blue-500 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon size={20} />
                  <span>{route.name}</span>
                </button>
              );
            })}
          </nav>
          <button
            onClick={() => {
              setActiveRoute("create-admin");
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
              activeRoute === "create-admin"
                ? "bg-blue-500 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <DiamondPlus size={20} />
            <span>Create Admin</span>
          </button>
          <button
            onClick={handleLogout}
            className={`w-full flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors text-red-600 hover:bg-red-50`}
          >
            <LogOut size={20} />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 p-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          {routes.find((r) => r.path === activeRoute)?.name && (
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              {routes.find((r) => r.path === activeRoute)?.name || "Users"}
            </h1>
          )}

          {activeRoute === "create-admin" ? (
            <CreateAdmin />
          ) : loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userData.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-500 font-medium">
                                {user.username?.charAt(0) || "U"}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.fullName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.isVerified
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {user.isVerified ? "Verified" : "Unverified"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : user ? (
    <NotFound />
  ) : (
    ""
  );
};

export default AdminDashboard;
