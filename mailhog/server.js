const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
const port = 3000;

const transporter = nodemailer.createTransport({
  host: "mailhog",
  port: 1025
});

app.get('/', (req, res) => {
  const url = `http://localhost:${port}/send/johndoe@example.com`;
  const mailhogUrl = `http://localhost:8025`;
  return res.send(`Welcome to Mailhog demo app. Try visiting <a href="${url}">${url}</a> to send an email intercepted by Mailhog, then visit <a href="${mailhogUrl}">${mailhogUrl}</a> to check the email on Mailhog's web app`);
});

app.get('/send/:email', (req, res) => {

  const { email } = req.params;

  const messageStatus = transporter.sendMail({
    from: 'ACME <noreply@acme.com>',
    to: email,
    subject: 'This is a subject',
    text: 'This is the <em>email</em> content in <strong>HTML</strong> formatting',
  });

  if (!messageStatus) {
    return res.status(500).send('Could not send email');
  }

  res.send(`Email sent to ${email}`);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
