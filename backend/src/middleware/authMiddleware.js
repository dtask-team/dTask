// // import jwt from 'jsonwebtoken';
// // import User from '../models/User.js';

// // const JWT_SECRET = process.env.JWT_SECRET || 'dTaskSecret';

// // export const protect = async (req, res, next) => {
// //   try {
// //     const token = req.headers.authorization?.split(" ")[1];
// //     if (!token) {
// //       return res.status(401).json({ message: "No token provided" });
// //     }

// //     const decoded = jwt.verify(token, JWT_SECRET);
// //     const user = await User.findById(decoded.id).select("-password");

// //     if (!user) {
// //       return res.status(401).json({ message: "User not found" });
// //     }

// //     req.user = user;
// //     req.userId = user._id; // optional but helpful
// //     next();
// //   } catch (err) {
// //     console.error("❌ Auth error:", err.message);
// //     return res.status(401).json({ message: "Invalid token or session expired" });
// //   }
// // };


// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// const JWT_SECRET = process.env.JWT_SECRET || 'dTaskSecret';

// export const protect = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) {
//       return res.status(401).json({ message: "No token provided" });
//     }

//     const decoded = jwt.verify(token, JWT_SECRET);
//     const user = await User.findById(decoded.id).select("-password");

//     if (!user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     req.user = user;
//     req.userId = user._id; // optional but helpful
//     next();
//   } catch (err) {
//     console.error("❌ Auth error:", err.message);
//     return res.status(401).json({ message: "Invalid token or session expired" });
//   }
// };




import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'dTaskSecret';

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    // 🟡 Use both ID and role from token to fetch correct user (support multiple wallet roles)
    const user = await User.findOne({ _id: decoded.id, role: decoded.role }).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found for this role" });
    }

    // ✅ Attach both user object and id/role for downstream use
    req.user = user;
    req.userId = user._id;
    req.userRole = user.role;

    next();
  } catch (err) {
    console.error("❌ Auth error:", err.message);
    return res.status(401).json({ message: "Invalid token or session expired" });
  }
};
