import { transport } from "../config/nodemailer"

type EmailType = {
    username: string,
    email: string,
    token: string
}

export class AuthEmail {
    static sendConfirmationEmail = async (user: EmailType) => {
        const email = await transport.sendMail({
            from: "Cognit <admin@cognit.website>",
            to: user.email,
            subject: "Cognit - Confirmar compte",
            html: `
                <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; border-radius: 10px; max-width: 600px; margin: auto; border: 2px solid #086375;">
                    <h1 style="color: #086375; text-align: center;">Hola ${user.username}!</h1>
                    <p style="font-size: 16px; color: #333; text-align: justify;">
                        T'has registrat a <strong style="color: #086375;">COGNIT</strong>, només queda que confirmis el teu registre per formar part de tota la comunitat. Pots fer-ho clicant a:
                    </p>
                    <div style="text-align: center; margin: 20px 0;">
                        <a href="${process.env.FRONTEND_URL}/confirm-account" 
                        style="background-color: #086375; color: #AFFC41; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                        Confirma el teu compte
                        </a>
                    </div>
                    <p style="font-size: 16px; color: #333; text-align: center;">
                        Indica aquest codi de registre:
                    </p>
                    <p style="font-size: 20px; color: #086375; font-weight: bold; text-align: center; background-color: #AFFC41; padding: 10px; border-radius: 5px; display: inline-block;">
                        ${user.token}
                    </p>
                </div>
            `
        })
    }

    static sendPasswordResetToken = async (user: EmailType) => {
        const email = await transport.sendMail({
            from: "Cognit <admin@cognit.website>",
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