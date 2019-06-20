const sgMail = require('@sendgrid/mail');

const config = require('./config/config');

sgMail.setApiKey(config.sendGridKey);

sgMail.send({
  to: 'millifly@gmail.com',
  from: 'millifly@gmail.com',
  subject: 'test',
  text: 'this is the text'
});
