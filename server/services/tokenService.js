import jwt from 'jsonwebtoken';

export function signToken(user) {
    const token = jwt.sign({ ...user }, process.env.PASSWORD_KEY, { expiresIn: '10m' });

    return token;
}

export function verifyToken(req, res, next) {
    const token = req.headers['authorization'].split(' ')[1];
    jwt.verify(token, process.env.PASSWORD_KEY, (err, decoded) => {
        if (err) return res.sendStatus(401);
        else next();
    });
}