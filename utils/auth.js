const jwt = require('jsonwebtoken');
const {JWT_SECRET_KEY} = process.env;

module.exports = {
    auth: async (req, res, next) => {
        try {
            const {authorization} = req.headers;

            console.log('TOKEN :', authorization);
            if (!authorization) {
                return res.status(401).json({
                    status: false,
                    message: 'you\'re not authorized!',
                    data: null
                });
            }

            const data = await jwt.verify(authorization, JWT_SECRET_KEY);
            req.user = {
                id: data.id,
                name: data.name,
                email: data.email,
                role: data.role
            };

            next();
        } catch (err) {
            next(err);
        }
    },

    adminOnly: (req, res, next) => {
        let role = req.user.role
        role = role === 'admin' ? next() : res.status(403).json({
            status: false,
            message: 'you\'re not authorized!',
            data: null
        });
    }
};