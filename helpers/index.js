const nodemailer = require("nodemailer");

function sendEmail(message) {
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "0ab8f4cddd5b55",
      pass: "3457ceb4b10ae2",
    },
  });

  message.from = "mrnchrn06@gmail.com";

  return transport.sendMail(message);
}

module.exports = { sendEmail };
