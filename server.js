const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors()); // This should be before the routes

app.post('/contact-form', (req, res) => {
    const { FullName, Email, number, Subject, Message } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'srini.academics@gmail.com',
            pass: 'Srini@5303' // Consider using environment variables
        }
    });

    let mailOptions = {
        from: Email,
        to: 'srini.academics@gmail.com',
        subject: `Contact Form Submission: ${Subject}`,
        text: `Name: ${FullName}\nEmail: ${Email}\nPhone: ${number}\nMessage: ${Message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).json({ message: 'Message sent successfully!' });
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
