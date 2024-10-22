import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";
export const generateToken = (payload) => {
  return jwt.sign(
    {
      data: payload,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_DURATION }
  );
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const checkRole = ({ sysRole, userRole }) =>
  sysRole.length === 0 ? true : userRole.some((role) => sysRole.includes(role));

export const generateOTP = () => {
  return crypto.randomInt(100000, 999999);
};
