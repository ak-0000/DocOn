import React, { useContext } from "react";
import { AdminContext } from "../context/adminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { DoctorContext } from "../context/DoctorContext";


const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  const navItemStyle = ({ isActive }) =>
    `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
      isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
    }`;

  return (
    <div className="min-h-screen bg-white border-r">
      {/* Admin Sidebar */}
      {aToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink to="/admin-dashboard" className={navItemStyle}>
            <img src={assets.home_icon} alt="dashboard" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>

          <NavLink to="/all-appointments" className={navItemStyle}>
            <img src={assets.appointment_icon} alt="appointments" />
            <p className="hidden md:block">Appointments</p>
          </NavLink>

          <NavLink to="/add-doctors" className={navItemStyle}>
            <img src={assets.add_icon} alt="add doctor" />
            <p className="hidden md:block">Add Doctor</p>
          </NavLink>

          <NavLink to="/doctorlist" className={navItemStyle}>
            <img src={assets.people_icon} alt="doctors list" />
            <p className="hidden md:block">Doctors List</p>
          </NavLink>
        </ul>
      )}

      {/* Doctor Sidebar */}
      {dToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink to="/doctor-dashboard" className={navItemStyle}>
            <img src={assets.home_icon} alt="doctor dashboard" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>

          <NavLink to="/doctor-appointments" className={navItemStyle}>
            <img src={assets.appointment_icon} alt="doctor appointments" />
            <p className="hidden md:block">Appointments</p>
          </NavLink>

          <NavLink to="/doctor-profile" className={navItemStyle}>
            <img src={assets.people_icon} alt="doctor profile" />
            <p className="hidden md:block">Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
