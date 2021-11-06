require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeMail = (email, name) => {
  sgMail.send({
    to: email,
    from: "heydjsafado@gmail.com",
    subject: "First Try",
    text: `Welcome to Task Manager App, ${name}. Let me know how you get along with the app.`,
  });
};

const sendCancelMail = (email, name) => {
  sgMail.send({
    to: email,
    from: "heydjsafado@gmail.com",
    subject: "Sorry to see you go",
    text: `Hey, ${name}. We regret to see you close your account. If there's anything we could have done differently please don't hesitate to tell us. We hope to see you again in the future.`,
  });
};

module.exports = {
  sendWelcomeMail,
  sendCancelMail,
};
