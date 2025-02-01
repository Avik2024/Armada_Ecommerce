import React, { useState } from "react";
import ROLE from "../common/role";
import { IoMdClose } from "react-icons/io";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const ChangeUserRole = ({ name, email, role, userId, onClose, callFunc }) => {
  const [userRole, setUserRole] = useState(role);

  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value);
    console.log("Selected Role:", e.target.value); // Debugging log
  };

  const updateUserRole = async () => {
    try {
      console.log("Attempting to update role for:", userId, "to:", userRole);

      const fetchResponse = await fetch(SummaryApi.updateUser.url, {
        method: SummaryApi.updateUser.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          // Add CSRF token here if needed
          // "X-CSRF-Token": csrfToken,  // Uncomment and replace csrfToken if required
        },
        body: JSON.stringify({
          userId: userId,
          role: userRole,
        }),
      });

      if (!fetchResponse.ok) {
        // Capture specific status code
        console.error("Error status:", fetchResponse.status);
        if (fetchResponse.status === 403) {
          toast.error(
            "Forbidden: You don't have permission to perform this action."
          );
        } else {
          toast.error(`An error occurred: ${fetchResponse.statusText}`);
        }
        return;
      }

      const responseData = await fetchResponse.json();

      if (responseData.success) {
        console.log("Role updated successfully");

        toast.success(responseData.message || "Role updated successfully");
        onClose(); // Close modal
        callFunc(); // Refresh data in parent component
      } else {
        console.error("Failed to update role:", responseData.message);
        toast.error(responseData.message || "Failed to update role");
      }

      console.log("Response Data:", responseData);
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error("An error occurred while updating the role");
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50">
      <div className="mx-auto bg-white shadow-md p-4 w-full max-w-sm">
        <button className="block ml-auto" onClick={onClose}>
          <IoMdClose />
        </button>

        <h1 className="pb-4 text-lg font-medium">Change User Role</h1>

        <p>Name: {name}</p>
        <p>Email: {email}</p>

        <div className="flex items-center justify-between my-4">
          <p>Role:</p>
          <select
            className="border px-4 py-1"
            value={userRole}
            onChange={handleOnChangeSelect}
          >
            {Object.values(ROLE).map((el) => (
              <option value={el} key={el}>
                {el}
              </option>
            ))}
          </select>
        </div>

        <button
          className="w-fit mx-auto block py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700"
          onClick={updateUserRole}
        >
          Change Role
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
