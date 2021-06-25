const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // transporter - email service provider
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // email options
  const mailOptions = {
    from: "Patryk N <hello@patryk.io>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // sending the email
  await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;
