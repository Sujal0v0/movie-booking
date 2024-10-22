import userModel from "./user.model.js";
import { generateHash, compareHash } from "../../utils/hash.js";
import { sendMail } from "../../services/mailer.js";
import event from "events";
import { generateToken, generateOTP } from "../../utils/token.js";

const eventEmitter = new event.EventEmitter();

const login = async (payload) => {
  const { email, password } = payload;
  //check for email
  const user = await userModel
    .findOne({ email, isActive: true })
    .select("+password");
  if (!user) throw new Error("User not found!");
  const isVerified = user?.isEmailVerified;
  console.log(user);
  if (!isVerified) throw new Error("Email Verification required!");
  const isValidPassword = compareHash(user?.password, password);
  if (!isValidPassword) throw new Error("Email or password invalid!");
  const tokenPayload = {
    name: user?.name,
    email: user?.email,
  };
  const token = generateToken(tokenPayload);
  if (!token) throw new Error("Something went wrong.");
  return token;
};

eventEmitter.addListener("signup", (email) =>
  sendMail({
    email,
    subject: "Moviemate Signup",
    htmlMsg: "Thank you for joining Moviemate",
  })
);

eventEmitter.addListener("emailVerification", (email, otp) =>
  sendMail({
    email,
    subject: "Moviemate Email Verification",
    htmlMsg: `<b>${otp}</b> This is your otp token `,
  })
);

const create = async (payload) => {
  const { email, password } = payload;
  const duplicateEmail = await userModel.findOne({ email });
  if (duplicateEmail) throw new Error("Email already exists.");
  payload.password = generateHash(password);
  const result = await userModel.create(payload);
  //call nodemailer
  eventEmitter.emit("signup", email);
  return result;
};

const getById = (id) => {
  return userModel.findOne({ _id: id });
};

const list = async ({ page = 1, limit = 10, search }) => {
  const query = [];
  //Search
  if (search?.name) {
    query.push({
      $match: {
        name: new RegExp(search?.name, "gi"),
      },
    });
  }
  if (search?.email) {
    query.push({
      $match: {
        name: new RegExp(search?.email, "gi"),
      },
    });
  }
  //Sort
  query.push({
    $sort: {
      createdAt: 1,
    },
  });
  //Filter

  //Pagination
  query.push(
    {
      $facet: {
        metadata: [
          {
            $count: "total",
          },
        ],
        data: [
          {
            $skip: (+page - 1) * +limit,
          },
          {
            $limit: +limit,
          },
        ],
      },
    },
    {
      $addFields: {
        total: {
          $arrayElemAt: ["$metadata.total", 0],
        },
      },
    },
    {
      $project: {
        metadata: 0,
        "data.password": 0,
      },
    }
  );
  const result = await userModel.aggregate(query);
  return {
    total: result[0]?.total || 0,
    users: result[0]?.data,
    page: +page,
    limit: +limit,
    skip: (+page - 1) * +limit,
  };
};

const updateById = (id, payload) => {
  return userModel.findOneAndUpdate({ _id: id }, payload, { new: true });
};

const removeById = (id) => {
  return userModel.deleteOne({ _id: id });
};

const generateEmailToken = async (payload) => {
  const { email } = payload;
  const user = await userModel.findOne({ email, isActive: true });
  if (!user) throw new Error("User not found.");
  const isVerified = user?.isEmailVerified;
  if (!isVerified) {
    const otp = generateOTP();
    const updateUser = await userModel.updateOne({ _id: user?._id }, { otp });
    if (!updateUser) throw Error("Something went wrong");
    console.log({ otp });
    eventEmitter.emit("emailVerification", email, otp);
  }
  return true;
};

const verifyEmailToken = async (payload) => {
  const { email, token } = payload;
  const user = await userModel.findOne({ email, isActive: true });
  if (!user) throw new Error("User not found.");
  const isTokenValid = user?.otp === token;
  if (!isTokenValid) throw new Error("Token not matching.");
  const result = await userModel.updateOne(
    { _id: user?._id },
    { isEmailVerified: true, otp: "" }
  );
  if (!result) throw new Error("Something went wrong.");
  return isTokenValid;
};

const blockUser = async (payload) => {
  const user = await userModel.findOne({ _id: payload });
  if (!user) throw new Error("User not found.");
  const statusPayload = {
    isActive: !user?.isActive,
  };
  const updatedUser = await userModel.updateOne(
    { _id: payload },
    statusPayload
  );
  if (!updatedUser) throw new Error("Something went wrong");
  return true;
};

const getProfile = (_id) => {
  return userModel.findOne({ _id });
};

const changePassword = async (id, payload) => {
  const { oldPassword, newPassword } = payload;
  const user = await userModel
    .findOne({ _id: id, isActive: true, isEmailVerified: true })
    .select("+password");
  const isValidPassword = compareHash(user?.password, oldPassword);
  if (!isValidPassword) throw new Error("Password mismatch.");
  const data = {
    password: generateHash(newPassword),
  };
  return userModel.updateOne({ _id: id }, data);
};

const resetPassword = async (id, newPassword) => {
  const user = await userModel.findOne({
    _id: id,
    isActive: true,
    isEmailVerified: true,
  });
  if (!user) throw new Error("User not found");
  const hashPassword = generateHash(newPassword);
  return await userModel.updateOne({ _id: id }, { password: hashPassword });
};

const forgetPasswordTokenGen = async (payload) => {
  const { email } = payload;
  //find the user
  const user = await userModel.findOne({
    email,
    isActive: true,
    isEmailVerified: true,
  });

  if (!user) throw new Error("User not found");
  //generate the token
  const otp = generateOTP();
  //save the token in database
  const updatedUser = await userModel.updateOne({ email }, { otp });
  if (!updatedUser) throw new Error("Something went wrong.");
  //sent the token using nodemailer
  eventEmitter.emit("emailVerification", email, otp);
  return true;
};

const forgetPasswordPasswordChange = async (payload) => {
  const { email, otp, newPassword } = payload;
  const user = await userModel.findOne({
    email,
    isActive: true,
    isEmailVerified: true,
  });
  if (!user) throw new Error("User not found.");
  const isValidOTP = otp === user?.otp;
  if (!isValidOTP) throw new Error("OTP mismatch");
  const hashPassword = generateHash(newPassword);
  const updatedUser = await userModel.updateOne(
    { email },
    { password: hashPassword, otp: "" }
  );
  if (!updatedUser) throw new Error("Something went wrong.");
  return true;
};

export default {
  forgetPasswordPasswordChange,
  forgetPasswordTokenGen,
  resetPassword,
  changePassword,
  getProfile,
  blockUser,
  login,
  create,
  getById,
  list,
  updateById,
  removeById,
  generateEmailToken,
  verifyEmailToken,
};
