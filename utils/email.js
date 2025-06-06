const nodemailer = require("nodemailer");
require("dotenv").config();
const sendMail = async (usermail, htmltemplate, subject) => {
  const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
      user: process.env.HOST,
      pass: process.env.APP_PASS,
    },
  });
  const info = await transporter.sendMail({
    from: process.env.HOST,
    to: usermail,
    subject: subject,
    html: htmltemplate,
  });
  return info;
};

module.exports = sendMail;
