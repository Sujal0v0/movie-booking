import { checkRole, verifyToken } from "./token.js";
import userModel from "../modules/users/user.model.js";

export const secure = (sysRole) => {
  return async (req, res, next) => {
    try {
      const { token } = req.headers;
      //?if no token
      if (!token) throw new Error("Token is missing.");

      //?check if token is valid
      const isValid = verifyToken(token);

      //if token expired?
      if (!isValid) throw new Error("Token is expired.");
      const { data } = isValid;
      // check if user is blocked
      const userInfo = await userModel.findOne({
        email: data?.email,
        isActive: true,
        isEmailVerified: true,
      });
      if (!userInfo) throw new Error("User not found.");

      const validRole = checkRole({ sysRole, userRole: userInfo?.roles || [] });
      if (!validRole) throw new Error("Unauthorized User.");
      req.currentUser = userInfo?._id;
      req.isAdmin = userInfo?.roles.includes("admin");
      next();
    } catch (error) {
      next(error);
    }
  };
};
