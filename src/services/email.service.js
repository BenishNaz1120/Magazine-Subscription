const nodemailer = require('nodemailer');
const config = require('../config/index'); 

// Create a transporter using your email service credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.emailUser, // Your email
    pass: config.emailPass, // Your email app password
  },
});

// Function to send an email
exports.sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: config.emailUser,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
    return { message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};
