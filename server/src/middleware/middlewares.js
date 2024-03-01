import jwt from 'jsonwebtoken';

export function isLoggedIn(req, res, next) {
    const authorizationHeader = req.header('Authorization');

    console.log(authorizationHeader);
    if (!authorizationHeader) {
        return res.status(401).json({error: 'Unauthorized'});
    }

    const token = authorizationHeader.split(' ')[1];

    jwt.verify(token, 'secretKey', (err, user) => {
        if (err) {
            return res.status(401).json({error: 'Unauthorized'});
        }
        req.user = user;
        next();
    });
}

export function isAdmin(req, res, next) {
    if (req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({error: 'Permission denied'});
    }
}

export function isDeveloper(req, res, next) {
    if (req.user.role === 'developer' || req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({error: 'Permission denied'});
    }
}