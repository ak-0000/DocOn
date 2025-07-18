import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

export default function DoctorAppointments() {
  const {
    dToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);

  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  // Fetch appointments when token is available
  useEffect(() => {
    if (dToken) getAppointments();
  }, [dToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b font-semibold">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fee</p>
          <p>Action</p>
        </div>

        {appointments.length === 0 && (
          <div className="text-center text-gray-500 p-5">No Appointments Found</div>
        )}

        {appointments
          .slice()
          .reverse()
          .map((item, i) => (
            <div
              key={item._id}
              className="flex flex-wrap justify-between sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-600 py-3 px-6 border-b hover:bg-gray-50"
            >
              <p className="hidden sm:block">{i + 1}</p>

              <div className="flex items-center gap-2">
                <img
                  className="w-8 h-8 rounded-full object-cover"
                  src={item.userData?.image || assets.default_user}
                  alt="patient"
                />
                <p>{item.userData?.name || "Unknown"}</p>
              </div>

              <p className="text-xs inline border border-primary px-2 py-0.5 rounded-full">
                {item.payment ? "Online" : "Cash"}
              </p>

              <p className="hidden sm:block">
                {item.userData?.dob ? calculateAge(item.userData.dob) : "--"}
              </p>

              <p>
                {slotDateFormat(item.slotDate)}, {item.slotTime}
              </p>

              <p>
                {currency} {item.amount}
              </p>

              <div>
                {item.cancel ? (
                  <p className="text-red-500 text-xs font-medium">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-500 text-xs font-medium">Completed</p>
                ) : (
                  <div className="flex items-center gap-2">
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      className="w-5 cursor-pointer"
                      src={assets.cancel_icon}
                      alt="cancel"
                    />
                    <img
                      onClick={() => completeAppointment(item._id)}
                      className="w-5 cursor-pointer"
                      src={assets.tick_icon}
                      alt="complete"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
