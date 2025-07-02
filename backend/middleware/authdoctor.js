import jwt from "jsonwebtoken";

const authDoctor = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Not authorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { docId: decoded.id }; // ✅ Make sure this line exists

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};

export default authDoctor;
