import { transport } from "../config/nodemailer"

type EmailType = {
    username: string,
    email: string,
    token: string
}

export class AuthEmail {
    static sendConfirmationEmail = async (user: EmailType) => {
        const email = await transport.sendMail({
            from: "Cognit <admin@cognit.com>",
            to: user.email,
            subject: "Cognit - Confirmar compte",
            html: `
                <h1> Hola ${user.username}! </h1>
                <p>T'has registrat a COGNIT, només queda que confirmis el teu registre per formar part de tota la comunitat, pots fer-ho clicant a </p>
                <a href="${process.env.FRONTEND_URL}/confirm-account">confirma el teu compte</a>,
                <p>indicant el codi de registre: ${user.token}</p>
            `
        })
    }

    static sendPasswordResetToken = async (user: EmailType) => {
        const email = await transport.sendMail({
            from: "Cognit <admin@cognit.com>",
            to: user.email,
            subject: "Cognit - Reestableix contrasenya",
            html: `
                <h1> Hola ${user.username}! </h1>
                <p>Has sol·licitat reestablir la contrasenya. Si no has estat tu siusplau elimina aquest missatge o fes-nos indicació siusplau</p>
                <a href=${process.env.FRONTEND_URL}/auth/new-password>reestableir contrassenya</a>,
                <p>indicant el codi de reestabliment: ${user.token}</p>
            `
        })
    }
}