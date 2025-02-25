import React, { useEffect, useState } from "react";
import { LogOut, Check, Pencil, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import { getCurrentUser } from "../../features/authslice";
import DeleteConfirmationDialog from "../DeleteConfirmationDialog";

const ProfilePage = () => {
  const user = useSelector((state) => state.auth.user);
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.email);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [showDeletedToast, setShowDeletedToast] = useState(false);
  const [updating, setUpdating] = useState(false);
  const apiurl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);
  useEffect(() => {
    setEmail(user.email);
    setName(user.fullName);
  }, [user]);

  const onupdateEmail = async () => {
    setUpdating(true);
    console.log("email updating");

    try {
      const response = await axios.patch(
        `${apiurl}/user/update-profile`,
        { email: email },
        { withCredentials: true }
      );
      console.log(response);
      if (response?.data.success) {
        const currentUser = await dispatch(getCurrentUser());        
        setUpdating(false);
        setShowEmailModal(false);
      }
    } catch (error) {
      console.log(error);

      setShowEmailModal(false);
      setUpdating(false);
    }
  };

  const onupdateName = async () => {
    setUpdating(true);
    console.log("name updating");

    try {
      const response = await axios.patch(
        `${apiurl}/user/update-profile`,
        { fullName: name },
        { withCredentials: true }
      );
      if (response?.data.success) {
        const currentUser = await dispatch(getCurrentUser());        
        setUpdating(false);
        setShowNameModal(false);
      }
    } catch (error) {
      console.log(error);

      setShowNameModal(false);
      setUpdating(false);
    }
  };

  const onUpdatePassword = async () => {
    setUpdating(true);
    console.log("password updating");

    try {
      const response = await axios.patch(
        `${apiurl}/user/change-password`,
        { oldPassword: oldPass, newPassword: newPass },
        { withCredentials: true }
      );
      if (response?.data.success) {
        setShowPasswordModal(false);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        setUpdating(false);
      } else {
        setShowErrorToast(true);
        setTimeout(() => setShowErrorToast(false), 3000);
        setUpdating(false);
      }
    } catch (error) {
      console.log(error);
      setShowErrorToast(true);
      setTimeout(() => setShowErrorToast(false), 3000);
      setShowEmailModal(false);
      setUpdating(false);
    }
  };

  const onDeleteAccount = async () => {
    setUpdating(true);
    console.log("deleting account");

    try {
      const response = await axios.delete(`${apiurl}/user/delete-account`, {
        withCredentials: true,
      });
      if (response?.data.success) {
        setShowDeleteConfirm(false);
        setShowDeletedToast(true);
        setTimeout(() => {
          setShowDeletedToast(false);
          navigate("/login");
          dispatch(getCurrentUser());
        }, 2000);
        setUpdating(false);
      } else {
        setUpdating(false);
      }
    } catch (error) {
      console.log(error);
      setUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Profile Settings</h1>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-4 gap-6">
          {/* Left Column - Profile Card */}
          <div className="bg-white shadow-lg rounded-lg p-6 md:col-span-1 h-fit">
            <div className="flex flex-col items-center">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
                  <div className="absolute bottom-0 right-0 bg-blue-500 p-1 rounded-full border-2 border-white">
                    <Check className="w-4 h-4 text-white" />
                  </div>
              </div>
              <h2 className="mt-4 text-xl font-semibold text-gray-800">
                {user.username}
              </h2>
              <span className="text-gray-500 text-sm">
                Member From {new Date(user.createdAt).getFullYear()}
              </span>
              <div className="mt-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    user.isPremium
                      ? "bg-gradient-to-r from-purple-600 to-pink-500 shadow-md hover:from-purple-700 hover:to-pink-600 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {user.isPremium ? user?.planDetails?.planType : "Free Plan"}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="bg-white shadow-lg rounded-lg p-6 md:col-span-3">
            <div className="space-y-3">
              {/* Full name Section */}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Full Name
                </label>
                <div className="flex items-center gap-3">
                  <span className="text-gray-800">{user.fullName}</span>
                  <button
                    onClick={() => setShowNameModal(true)}
                    className="px-4 py-2 rounded-lg text-black hover:text-gray-600 transition-colors"
                  >
                    <Pencil size={18} />
                  </button>
                </div>
              </div>
              {/* Email Section */}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Email Address
                </label>
                <div className="flex items-center gap-3">
                  <span className="text-gray-800">{user.email}</span>
                  <button
                    onClick={() => setShowEmailModal(true)}
                    className="px-4 py-2 rounded-lg text-black hover:text-gray-600 transition-colors"
                  >
                    <Pencil size={18} />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-4">
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="w-full p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-between"
                >
                  <span className="text-gray-800">Change Password</span>
                  <span className="text-gray-400">●●●●●●●●</span>
                </button>

                <button
                  className="w-full p-3 rounded-lg border border-red-200 hover:bg-red-50 transition-colors flex items-center justify-between text-red-600"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <span>{updating ? "Deleting..." : "Delete Account"}</span>
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Email Modal */}
        {showEmailModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Update Email</h3>
                <button
                  onClick={() => setShowEmailModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <input
                  type="email"
                  defaultValue={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter new Email"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />

                <button
                  onClick={onupdateEmail}
                  className="w-full p-3 rounded-lg bg-slate-800 text-white hover:bg-slate-600 transition-colors"
                >
                  {updating ? "updating..." : "Update Email"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Name Modal */}
        {showNameModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Update Full Name</h3>
                <button
                  onClick={() => setShowNameModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <input
                  type="email"
                  defaultValue={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter new Email"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />

                <button
                  onClick={onupdateName}
                  className="w-full p-3 rounded-lg bg-slate-800 text-white hover:bg-slate-600 transition-colors"
                >
                  {updating ? "updating..." : "Update Full Name"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Password Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Change Password</h3>
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <input
                  type="password"
                  value={oldPass}
                  onChange={(e) => setOldPass(e.target.value)}
                  placeholder="Current Password"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <input
                  type="password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  placeholder="New Password"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <button
                  onClick={onUpdatePassword}
                  className="w-full p-3 rounded-lg bg-slate-800 text-white hover:bg-slate-600 transition-colors"
                >
                  {updating ? "updating..." : "Update Password"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Toast Notification */}
        {showToast && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
            <Check className="w-5 h-5" />
            <span>Changes saved successfully!</span>
          </div>
        )}

        {/* Toast Error Notification */}
        {showErrorToast && (
          <div className="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
            <X className="w-5 h-5" />
            <span>current password is not currect!</span>
          </div>
        )}

        {/* Toast Error Notification */}
        {showDeletedToast && (
          <div className="fixed bottom-4 right-4 bg-orange-400 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
            <Check className="w-5 h-5" />
            <span>Account Deleted Successfully!</span>
          </div>
        )}

        {showDeleteConfirm ? (
          <DeleteConfirmationDialog
            websiteName="Your Account"
            deleting={updating}
            onCancelClick={() => setShowDeleteConfirm(false)}
            onDeleteClick={onDeleteAccount}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
