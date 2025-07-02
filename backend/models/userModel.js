import mongoose from "mongoose";
import validator from "validator";

// ✅ Use backticks for long base64 string to prevent SyntaxError
const defaultImage = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABV0lEQVR4nKWTTUtCURSGn3NnZgbFQUFhZl4UpURUs8hCKElF8B/AuXAoMVeQhX+Aj+gGVFEZlFBJvJvZmbO+ZsBwn0kM9n5szvvdN/Nd3kzZmnDaeSloRToGrgFZwEvQQV9WvYAkchz8MA3AnqgpzDxpoAL1T3AK/gkA8RVmA5Gn+7t5CA9DCRvmjE8zNmDNmQZ7RYRu1Yx9HtLfqPzFZGrNdo6naHZ1zJ2idLk9k1Njv16uYF6hMkl4FY0IMMXm3zvuhM7wEHq4Dd+EWguhP+w0GcQA1c/wPpPR+fA0vRjZONITiA3CvZPcvQlmcEcNdsAcQJXpksLYANbQWJPngub66EdZBZ7aYyyVUs4g9xevEvNQKh8iw9xkPgDDgOuc4clpgsAAAAASUVORK5CYII=`;

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: { type: String, required: true },
  image: {
    type: String,
    default: defaultImage,
  },
  address: {
    type: Object,
    default: {
      line1: "",
      line2: "", // ✅ no extra backticks here
    },
  },
  gender: { type: String, default: "Not Selected" },
  dob: { type: String, default: "Not Selected" },
  phone: { type: String, default: "0000000000" },
});

// ✅ Register the model correctly
const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
