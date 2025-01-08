import { transport } from "../config/nodemailer"

type EmailType = {
    username: string,
    email: string,
    token: string
}

export class AuthEmail {
    static sendConfirmationEmail = async (user: EmailType) => {
        const email = await transport.sendMail({
            from: "Comynity <admin@comynit.com>",
            to: user.email,
            subject: "Comynit - Confirmar compte",
            html: `
                <h1> Hola ${user.username}! </h1>
                <p>T'has registrat a Comynit, només queda que confirmis el teu registre per formar part de tota la comynitat, així doncs</p>
                <a href=${process.env.FRONTEND_URL}/auth/confirm-account>confirma el teu compte</a>,
                <p>indicant el codi de registre: ${user.token}</p>
            `
        })
    }

    static sendPasswordResetToken = async (user: EmailType) => {
        const email = await transport.sendMail({
            from: "Comynity <admin@comynit.com>",
            to: user.email,
            subject: "Comynit - Reestableix contrasenya",
            html: `
                <h1> Hola ${user.username}! </h1>
                <p>Has sol·licitat reestablir la contrasenya. Si no has estat tu siusplau elimina aquest missatge o fes-nos indicació siusplau</p>
                <a href=${process.env.FRONTEND_URL}/auth/new-password>reestableir contrassenya</a>,
                <p>indicant el codi de reestabliment: ${user.token}</p>
            `
        })
    }
}