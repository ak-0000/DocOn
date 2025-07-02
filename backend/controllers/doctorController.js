import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

// ✅ Toggle doctor availability
export const changeAvailabilty = async (req, res) => {
  try {
    const docId = req.user.docId;
    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({ success: true, message: "Availability Changed" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ✅ List all doctors (public)
export const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    res.json({ success: true, doctors });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ✅ Login doctor and generate token
export const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);

    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// ✅ Get appointments for logged-in doctor
// ✅ Get appointments for logged-in doctor
export const appointmemtDoctor = async (req, res) => {
  try {
    const docId = req.user.docId;

    // 1. Fetch appointments for the doctor and populate userId with required patient fields
    const appointments = await appointmentModel
      .find({ docId })
      .populate("userId", "name image dob");

    // 2. Format appointments to include userData field expected by frontend
    const updatedAppointments = appointments.map((item) => ({
      ...item._doc,
      userData: item.userId,
    }));

    // 3. Send response
    res.json({ success: true, appointments: updatedAppointments });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// ✅ Mark an appointment as completed
export const appointmentComplete = async (req, res) => {
  try {
    const docId = req.user.docId;
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    // ✅ FIX: Compare ObjectId strings
    if (
      appointmentData &&
      appointmentData.docId.toString() === docId.toString()
    ) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });

      return res.json({ success: true, message: "Appointment completed" });
    } else {
      return res.json({ success: false, message: "Mark failed" });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// ✅ Cancel an appointment
export const appointmentCancelled = async (req, res) => {
  try {
    const docId = req.user.docId;
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (
      appointmentData &&
      appointmentData.docId.toString() === docId.toString()
    ) {
      await appointmentModel.findByIdAndDelete(appointmentId);

      return res.json({ success: true, message: "Appointment cancelled" });
    } else {
      res.json({ success: false, message: "Cancellation failed" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ✅ Get dashboard stats for doctor
export const doctorDashboard = async (req, res) => {
  try {
    const docId = req.user.docId;

    const appointments = await appointmentModel.find({ docId });

    let earnings = 0;
    let patients = [];

    appointments.forEach((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
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

// ✅ Get doctor profile info
export const doctorProfile = async (req, res) => {
  try {
    const docId = req.user.docId;
    const profileData = await doctorModel.findById(docId).select("-password");

    res.json({ success: true, profileData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ Update doctor profile info
export const updateDoctorProfile = async (req, res) => {
  try {
    const docId = req.user.docId;
    const { fee, Address, available } = req.body;

    await doctorModel.findByIdAndUpdate(docId, { fee, Address, available });

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
