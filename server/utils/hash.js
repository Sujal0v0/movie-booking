import Bcrypt from "bcryptjs";

export const generateHash = (payload) => {
  return Bcrypt.hashSync(payload, Number(process.env.SALT_ROUND));
};

export const compareHash = (hashPayload, payload) => {
  return Bcrypt.compareSync(payload, hashPayload);
};
