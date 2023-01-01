import nodeMailer from 'nodemailer';

const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS || 'hoang.nguyen@glowpacific.com';
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || 'Hoang@123';

const transporter = nodeMailer.createTransport({
    host: 'mail.glowpacific.com',
    port: 465,
    secure: true,
    auth: {
        user: EMAIL_ADDRESS,
        pass: EMAIL_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take our messages');
    }
});

export const sendEmail = async (to: string, subject: string, html: string) => {
    const mailOptions = {
        from: EMAIL_ADDRESS,
        to,
        subject,
        html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}




