import { OAuth2Client } from "google-auth-library"

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

export const googleVerify = async (id_token: string) => {
    const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: process.env.GOOGLE_CLIENT_ID
    })
    const tokenPayload = ticket.getPayload()
    const name = tokenPayload?.name
    const email = tokenPayload?.email
    const picture = tokenPayload?.picture
    return { name, email, picture }
}