import jwt from 'jsonwebtoken'
import { JWT_NAME, JWT_SECRET_KEY } from '../config/common.js'
import { InvalidTokenException } from '../errors/invalidToken.exeption.js'
import { MissingTokenException } from '../errors/missingToken.exception.js'

export default function (req, res, next) {
    const token = req.header(JWT_NAME)

    try {
        if (!token) throw new MissingTokenException()

        const bearer = token.split(' ')[1]

        jwt.verify(bearer, JWT_SECRET_KEY, (err, user) => {
            if (err) throw new InvalidTokenException()

            req.user = user
        })

        next()
    } catch (error) {
        next(error)
    }
}