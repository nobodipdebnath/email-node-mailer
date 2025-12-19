const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Backend is running............");
})


const emailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.ZAP_EMAIL,
        pass: process.env.ZAP_EMAIL_PASS
    }
})


app.get('/send-payment-email', async (req, res) => {
    const paymentInfo = {
        transactionId: 'sdgauywte37asduygf8',
        user: 'nobodipdebnath45@gmail.com',
        parcelInfo: 'send 20 kg mango',
    };

    const emailObj = {
        from: `"Zap Email Sender" <${process.env.ZAP_EMAIL}>`,
        to: paymentInfo.user,
        subject: "Zap Parcel Delivery Payment Confirmation",
        html: `
            <p>Thank you for the payment. We have received your delivery payment.</p>
            <br/>
            <h3>Transaction Id: ${paymentInfo.transactionId}</h3>
            <br/>
            <p>Parcel Info: ${paymentInfo.parcelInfo}</p>
            <br/>
            <p>If you face any issue, please reply to this email.</p>
            <button>Click Here</button>
        `
    };

    try {
        const emailInfo = await emailTransporter.sendMail(emailObj);
        console.log("Email sent:", emailInfo.messageId);
        res.send({ success: true, message: "Email sent successfully" });
    } catch (error) {
        console.error("Email Send Error:", error);
        res.status(500).send({ success: false, message: "Failed to send email" });
    }
});

app.listen(port, ()=> {
    console.log(`Server running on localhost Port: ${port}`);
})