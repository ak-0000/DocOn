import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/Appcontext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Myappointments = () => {
  const { BACKEND_URL, token, getDoctorsData } = useContext(AppContext);
  const [showAppointments, setShowAppointments] = useState([]);

  const navigate = useNavigate();
  const months = [
    " ",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(
        BACKEND_URL + "/api/user/my-appointments",
        { headers: { token } }
      );
      console.log(data);
      if (data.success) {
        setShowAppointments(data.appointments.reverse());
        console.log(data.appointments);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        BACKEND_URL + "/api/user/cancel-appointment",
        { appointmentId },
        {
          headers: { token },
        }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const initPay = async(order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amout: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);

        try {
          const { data } = await axios.post(
            BACKEND_URL + "/api/user/verifyRazorpay",
            response,
            { headers: { token } }
          );
          if (data.success) {
            getAppointments();
            navigate("/my-appointments");
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        BACKEND_URL + "/api/user/payment-razorpay",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        console.log(data.order);
        initPay(data.order);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getAppointments();
    }
  }, [token]);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My appointments
      </p>
      <div>
        {showAppointments.slice(0, 3).map((item, index) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
            key={index}
          >
            <div>
              <img
                className="w-32 bg-indigo-50"
                src={item?.docData?.image}
                alt="Doctor"
              />
            </div>
  
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">
                {item?.docData?.name}
              </p>
              <p>{item?.docData?.speciality}</p>
              <p className="text-zinc-700 font-medium mt-1">Address:</p>
              <p className="text-xs">{item?.docData?.Address?.line1}</p>
              <p className="text-xs">{item?.docData?.Address?.line2}</p>
              <p className="text-sm mt-1">
                <span className="text-sm text-neutral-700 font-medium">
                  Date & Time:{" "}
                </span>
                {slotDateFormat(item?.slotDate)} | {item?.slotTime}
              </p>
            </div>
  
            <div className="flex flex-col gap-2 justify-end">
              {item?.isCompleted && (
                <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">
                  Appointment Completed
                </button>
              )}
  
              {!item?.isCompleted && item?.cancel && (
                <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500  mb-9">
                  Appointment Cancelled
                </button>
              )}
  
              {!item?.isCompleted && !item?.cancel && item?.payment && (
                <button className="sm:min-w-48 py-2 border rounded text-white bg-green-500 mb-9">
                  Paid
                </button>
              )}
  
              {!item?.isCompleted && !item?.cancel && !item?.payment && (
                <>
                  <button
                    onClick={() => appointmentRazorpay(item._id)}
                    className="text-sm text-center text-stone-500 sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    Pay here
                  </button>
  
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="text-sm text-center text-stone-500 sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                  >
                    Cancel appointment
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default Myappointments;
