import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backend_url } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        Address: profileData.address,
        fee: profileData.fee,
        available: profileData.available,
      };

      const { data } = await axios.post(
        `${backend_url}/api/doctor/update-profile`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${dToken}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData(); // Refresh updated profile
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  // ✅ Ensure profile is loaded before rendering
  if (!profileData || Object.keys(profileData).length === 0) {
    return <p className="p-5 text-sm text-gray-500">Loading profile...</p>;
  }

  return (
    <div>
      <div className="flex flex-col">
        {/* Profile Image */}
        <div>
          <img
            className="w-32 h-32 object-cover rounded-full border"
            src={profileData.image}
            alt="Doctor"
          />
        </div>

        {/* Doctor Basic Info */}
        <div className="mt-4">
          <p className="text-xl font-semibold">{profileData.name}</p>
          <p className="text-gray-600 text-sm mt-1">
            {profileData.degree} - {profileData.speciality}
          </p>
          <button className="mt-2 py-0.5 px-2 border text-xs rounded-full bg-blue-100">
            {profileData.experience} yrs experience
          </button>
        </div>

        {/* About Section */}
        <div className="mt-4 text-sm text-neutral-800">
          <p className="text-gray-600 font-medium">About:</p>
          <p>{profileData.about}</p>
        </div>

        {/* Fee Section */}
        <p className="text-gray-600 font-medium mt-4">
          Appointment Fee:
          <span className="text-gray-800 ml-2">
            {currency}
            {isEdit ? (
              <input
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    fee: e.target.value,
                  }))
                }
                value={profileData.fee}
                type="number"
                className="ml-2 border px-2 py-1 rounded w-24"
              />
            ) : (
              profileData.fee
            )}
          </span>
        </p>

        {/* Address Section */}
        <div className="mt-4 text-sm text-gray-700">
          <p className="font-medium">Address:</p>
          {isEdit ? (
            <div className="flex flex-col gap-1">
              <input
                type="text"
                className="border px-2 py-1 rounded"
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                value={profileData.address?.line1 || ""}
                placeholder="Line 1"
              />
              <input
                type="text"
                className="border px-2 py-1 rounded"
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                value={profileData.address?.line2 || ""}
                placeholder="Line 2"
              />
            </div>
          ) : (
            <p>
              {profileData.address?.line1}
              <br />
              {profileData.address?.line2}
            </p>
          )}
        </div>

        {/* Availability */}
        <div className="flex items-center gap-2 mt-4">
          <input
            onChange={() =>
              isEdit &&
              setProfileData((prev) => ({
                ...prev,
                available: !prev.available,
              }))
            }
            checked={profileData.available}
            type="checkbox"
            className="cursor-pointer"
          />
          <label className="text-sm">Available</label>
        </div>

        {/* Action Buttons */}
        <div className="mt-6">
          {isEdit ? (
            <button
              onClick={updateProfile}
              className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="px-4 py-2 border border-primary text-sm rounded-full mt-2 hover:bg-primary hover:text-white transition-all"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
