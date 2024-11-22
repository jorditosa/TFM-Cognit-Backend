import { transport } from "../config/nodemailer"

type EmailType = {
    username: string
    email: string
    token: string
}
export class AuthEmail {
    static sendConfirmationEmail = async (user: EmailType) => {
        const email = await transport.sendMail({
            from: 'Cognit',
            to: user.email,
            subject: 'Please confirm your account',
            html: `
            <p>Hello ${user.username}, please confirm your account by clicking on the following link and introducing the confirmation code:</p>
            <a href="http://localhost:3000/api/users/confirm/${user.token}">Confirm my account</a>
            <p>Convirmation code: ${user.token}</p>
            `
        })

        console.log('Email sent', email.messageId)
    }
}