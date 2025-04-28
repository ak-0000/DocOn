import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

export const changeAvailabilty = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({ success: true, message: "Availability Changed" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    res.json({ success: true, doctors });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// api for doctor login

export const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      return res.json({ success: false, message: "invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);

    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "invalid credentials" });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// api to get doctor appointment for doctors panel

export const appointmemtDoctor = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await appointmentModel.find({ docId });
    res.json({ success: true, appointments });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//  api to mark appointment complted for doctor panel
export const appointmentComplete = async (req, res) => {
  try {
    const docId = req.user.docId;
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndDelete(appointmentId, {
        isCompleted: true,
      });

      return res.json({ success: true, message: "appointment completed" });
    } else {
      res.json({ success: false, message: "Mark Failed" });
    }
  } catch (error) {
    toast.error(error.message);
    res.json({ success: false, message: error.message });
  }
};

//  api to mark appointment cancelled for doctor panel

export const appointmentCancelled = async (req, res) => {
  try {
    const docId = req.user.docId;
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndDelete(appointmentId, {
        cancel: true,
      });

      return res.json({ success: true, message: "appointment cancelled" });
    } else {
      res.json({ success: false, message: "Cancellation  Failed" });
    }
  } catch (error) {
    toast.error(error.message);
    res.json({ success: false, message: error.message });
  }
};

// api to get dashboard data for doctor panel

export const doctorDashboard = async (req, res) => {
  try {
    const { docId } = req.body;

    const appointments = await appointmentModel.find({ docId });

    let earnings = 0;
    appointments.map((item, index) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
    });

    let patients = [];
    appointments.map((item, index) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });
    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const doctorProfile = async (req, res) => {
  try {
    const { docId } = req.body;
    const profileData = await doctorModel.find(docId).select("-password");

    res.json({ success: true, profileData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const updateDoctorProfile = async (req, res) => {
  try {
    const { docId, fees, Address, available } = req.body;
    await doctorModel.findByIdAndUpdate(docId, { fees, Address, available });

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    error;
    res.json({ success: false, message: error.message });
  }
};
