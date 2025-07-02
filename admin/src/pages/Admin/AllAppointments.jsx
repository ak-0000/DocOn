import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/adminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import axios from "axios";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments } = useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const cancelAppointmentFrontend = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/admin/cancel-appointment`, // ✅ Correct endpoint
        { appointmentId },
        {
          headers: {
            aToken: aToken,
          },
        }
      );

      if (data.success) {
        getAllAppointments();
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error("Cancel error:", err.message);
    }
  };

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  // ✅ Safe fallback helper
  const safeValue = (val, fallback = "N/A") =>
    val !== undefined && val !== null && val !== "" ? val : fallback;

  const safeAmount = (amount) =>
    isNaN(amount) || amount === undefined ? "0" : amount;

  const safeAge = (dob) => {
    try {
      const age = calculateAge(dob);
      return isNaN(age) ? "N/A" : age;
    } catch {
      return "N/A";
    }
  };

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date</p>
          <p>Time</p>
          <p>Doctor</p>
          <p>Fee</p>
          <p>Actions</p>
        </div>

        {appointments.map((item, index) => {
          const user = item.userData || {};
          const doctor = item.docData || {};
          const dob = user.dob || "";

          return (
            <div
              className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
              key={item._id || index}
            >
              <p className="max-sm:hidden">{index + 1}</p>

              <div className="flex items-center gap-2">
                <img
                  className="w-8 h-8 object-cover rounded-full"
                  src={safeValue(user.image, assets.default_user_icon)}
                  alt="User"
                />
                <p>{safeValue(user.name)}</p>
              </div>

              <p className="max-sm:hidden">{safeAge(dob)}</p>

              <p>
                {slotDateFormat(item.slotDate)} , {safeValue(item.slotTime)}
              </p>

              <div className="flex items-center gap-2">
                <img
                  className="w-8 h-8 object-cover rounded-full bg-gray-200"
                  src={safeValue(doctor.image, assets.default_user_icon)}
                  alt="Doctor"
                />
                <p>{safeValue(doctor.name)}</p>
              </div>

              <p>
                {currency}
                {safeAmount(item.amount)}
              </p>

              {item.cancel ? (
                <p className="text-red-400 text-xs font-medium">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-gray-500 text-xs font-medium">Completed</p>
              ) : (
                <img
                  onClick={() => cancelAppointmentFrontend(item._id)}
                  className="w-6 cursor-pointer"
                  src={assets.cancel_icon}
                  alt="Cancel"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllAppointments;
