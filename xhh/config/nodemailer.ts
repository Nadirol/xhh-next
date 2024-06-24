import nodemailer from "nodemailer"

const email = process.env.EMAIL
const recipient = process.env.RECIPIENT
const pass = process.env.EMAIL_PASS

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email,
        pass,
    }
});

export const mailOptions = {
    from: `Xuân Hoà Home Website <${email}>`,
    to: `${recipient}`
}