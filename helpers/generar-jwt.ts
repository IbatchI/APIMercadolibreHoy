import jwt from 'jsonwebtoken' 

export const createJWT = (uid: string) => {
    return new Promise((resolve, reject) => {
        const payload = { uid }
        jwt.sign(
            payload,
            process.env.SECRETORPRIVATEKEY || '', 
            {
                expiresIn: '200h'
            },
            (err, token) => {
                if (err) {
                    reject('No se pudo generar el token')
                } else {
                    resolve(token)
                }
            }
        )
    })
}