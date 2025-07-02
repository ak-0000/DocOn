import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true }, // ✅ fixed
  docId: { type: mongoose.Schema.Types.ObjectId, ref: "doctors", required: true }, // optional: helpful for future populate
  slotDate: { type: String, required: true },
  slotTime: { type: String, required: true },
  userData: { type: Object, required: true },  // optional; can be removed if you use populate
  docData: { type: Object, required: true },   // optional
  amount: { type: Number, required: true },
  date: { type: Number, required: true },
  cancel: { type: Boolean, default: false },
  payment: { type: Boolean, default: false },
  isCompleted: { type: Boolean, default: false },
});

const appointmentModel =
  mongoose.models.appointment ||
  mongoose.model("appointment", appointmentSchema);

export default appointmentModel;
