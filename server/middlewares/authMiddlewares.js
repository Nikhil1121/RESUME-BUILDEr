import jwt from 'jsonwebtoken'

// const protect =async (req, res, next) => {       
//     const token = req.headers.authorization;
//     if (!token) {
//         return res.status(401).json({ message: 'Unauthorized'});
        
//     }
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET)
//         req.userId = decoded.userId;
//         next();
//     } catch (error) {
//         return res.status(401).json({ message: 'Unauthorized'});
//     }
// }
// export default protect;

// import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // token check
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // 🔥 support both:
    // Authorization: token
    // Authorization: Bearer token
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default protect;
