const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // CORS preflight request
    if (req.method === 'OPTIONS') {
        next();
    } else {
        const token = req.body.token || req.query.token || req.headers['authorization'];

        if (!token) {
            return res.status(403).send({ errors: ['No token provided.'] });
        }

        jwt.verify(token, process.env.AUTH_SECRET, function(error, decoded) {
            if (error) {
                return res.status(403).send({ errors: ['Failed to authenticate token.'] });
            } else {
                // req.decoded = decoded;
                next();
            }
        });
    }
};
