
import jwt from "jsonwebtoken";

// 🧍 Buyer Auth Middleware (Already Exists)
export const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token)
    return res.status(401).json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(400).json({ message: "Invalid or expired token." });
  }
};

// 🧑‍💼 Seller Auth Middleware
export const sellerAuthMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token)
    return res.status(401).json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "seller")
      return res.status(403).json({ message: "Forbidden: Seller access only" });

    req.seller = decoded;
    next();
  } catch {
    res.status(400).json({ message: "Invalid or expired token." });
  }
};
