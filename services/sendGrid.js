const sgMail = require('@sendgrid/mail');

const config = require('../config/config');

sgMail.setApiKey(config.sendGridKey);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'laurel.milliken@gmail.com',
    subject: 'Welcome to Stock Scorecard',
    text: `Welcome ${name}!`
  });
};

const sendCancelEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'laurel.milliken@gmail.com',
    subject: 'Account Cancellation Confirmed',
    text: `${name}, you account has been cancelled.`
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelEmail
};
