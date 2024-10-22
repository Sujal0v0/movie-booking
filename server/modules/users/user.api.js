import express from "express";
import { secure } from "../../utils/secure.js";
import validator from "./user.validator.js";
import multer from "multer";
import { profile } from "console";
import userController from "./user.controller.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname.concat(
        "-",
        Date.now(),
        ".",
        file.originalname.split(".")[1]
      )
    );
  },
});

const upload = multer({ storage: storage, limits: { fileSize: 1000000 } });
const router = express.Router();

router.post(
  "/register",
  upload.single("profile"),
  validator,
  async (req, res, next) => {
    try {
      if (req.file) {
        req.body.profile = req.file.path;
      }
      const result = await userController.create(req.body);

      res.json({ message: "User registered successfully.", data: result });
    } catch (error) {
      next(error);
    }
  }
);

router.post("/login", async (req, res, next) => {
  try {
    const result = await userController.login(req.body);
    res.json({ message: "User logged in successfully.", data: result });
  } catch (error) {
    next(error);
  }
});

router.post("/generate-email-token", async (req, res, next) => {
  try {
    const result = await userController.generateEmailToken(req.body);
    res.json({ message: "Email sent successfully.", data: result });
  } catch (error) {
    next(error);
  }
});

router.post("/verify-email", async (req, res, next) => {
  try {
    const result = await userController.verifyEmailToken(req.body);
    res.json({ message: "Email verified successfully.", data: result });
  } catch (error) {
    next(error);
  }
});

router.get("/", secure(["admin"]), async (req, res, next) => {
  try {
    // TODO Advanced Operations
    const { page, limit, name, email } = req.query;
    const search = { name, email };
    const data = await userController.list({ page, limit, search });
    res.json({ message: "User listed successfully,", data });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/block", secure(["admin"]), async (req, res, next) => {
  try {
    const result = await userController.blockUser(req.params.id);
    res.json({ msg: "User status updated successfully", data: result });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", secure(["admin"]), async (req, res, next) => {
  try {
    const result = await userController.removeById(req.params.id);
    res.json({
      message: `Deleted user with id ${req.params.id} successfully.`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/profile", secure([]), async (req, res, next) => {
  try {
    const result = await userController.getProfile(req.currentUser);
    console.log(req.currentUser);
    res.json({ message: "User profile generated.", data: result });
  } catch (error) {
    next(error);
  }
});

router.put("/profile", secure([]), async (req, res, next) => {
  try {
    const result = await userController.updateById(req.currentUser, req.body);
    res.json({ message: "User profile updated.", data: result });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", secure(["admin"]), async (req, res, next) => {
  try {
    const result = await userController.getById(req.params.id);
    res.json({ message: "User detail generated ", data: result });
  } catch (error) {
    next(error);
  }
});

router.post("/change-password", secure([]), async (req, res, next) => {
  try {
    console.log(req.currentUser);
    const result = await userController.changePassword(
      req.currentUser,
      req.body
    );
    res.json({ message: "User password changed successfully.", data: result });
  } catch (error) {
    next(error);
  }
});

router.post("/reset-password", secure(["admin"]), async (req, res, next) => {
  try {
    const { id, newPassword } = req.body;
    if (!id || !newPassword) throw new Error("Something is missing.");
    const result = await userController.resetPassword(id, newPassword);
    res.json({ message: "Password Reset Successfully.", data: result });
  } catch (error) {
    next(error);
  }
});

router.post("/forget-password-token", async (req, res, next) => {
  try {
    const result = await userController.forgetPasswordTokenGen(req.body);
    res.json({ message: "Forget Password Token sent.", data: result });
  } catch (error) {
    next(error);
  }
});

router.post("/forget-password", async (req, res, next) => {
  try {
    const result = await userController.forgetPasswordPasswordChange(req.body);
    res.json({ message: "Password changed successfully.", data: result });
  } catch (error) {
    next(error);
  }
});

export default router;
/*
Register
Login
Forget Password
Reset Password
Change Password
Verify token
Change status of user
Delete user
List user 
Update user
Update my Profile
Get one user
*/
