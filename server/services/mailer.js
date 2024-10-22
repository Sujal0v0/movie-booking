import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// async..await is not allowed in global scope, must use a wrapper
export const sendMail = async ({ email, subject, htmlMsg }) => {
  // send mail with defined transport object
  const { messageId } = await transporter.sendMail({
    from: '"Sujal Bajracharya" <bajracharyasujal80@gmail.com>', // sender address
    to: email, // list of receivers
    subject, // Subject line
    html: `<b>${htmlMsg}</b>`, // html body
  });
  return messageId;
};
