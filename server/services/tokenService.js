import jwt from 'jsonwebtoken';

const passwordKey = process.env.PASSWORD_KEY;

export function signToken(user) {
    const token = jwt.sign({ ...user }, passwordKey, { expiresIn: '10m' });

    return token;
}

export function verifyToken(token) {
    const isTokenCorrect = jwt.decode(token, passwordKey, (err, decoded) => {
        if (err) return false;
    });
    return true;
}