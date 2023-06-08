const {User} = require('../models');
const nodemailer = require('../utils/nodemailer');
const bcryp = require('bcrypt');
const jwt = require('jsonwebtoken');
const {JWT_SECRET_KEY} = process.env;
const oauth2 = require('../utils/oauth');
const imagekit = require('../utils/imagekit');

module.exports = {
    register: async (req, res) => {
        try {
            const {name, email, password} = req.body;

            const exist = await User.findOne({where: {email}});
            if (exist) {
                return res.status(400).json({
                    status: false,
                    message: 'email already used!',
                    data: null
                });
            }

            let role = req.body.role === "admin" || "user"

            if(role === true){
                role = "admin";
            }
            const hashPassword = await bcryp.hash(password, 10);


            const user = await User.create({
                name, email, password: hashPassword, user_type: 'basic', role
            });

            const payload = {
                id: user.id
            };
            const token = await jwt.sign(payload, JWT_SECRET_KEY);
            const url = `${req.protocol}://${req.get('host')}/activation?token=${token}`;

            const html = await nodemailer.getHtml('activationAcc.ejs', {user: {name: user.name}, url});
            nodemailer.sendMail(user.email, 'Activation', html);

            return res.status(201).json({
                status: true,
                message: 'Check your email for activation your account'
            });
        } catch (error) {
            throw error;
        }
    },

    login: async (req, res) => {
        try {
            const {email, password} = req.body;

            const user = await User.findOne({where: {email}});
            if (!user) {
                return res.status(400).json({
                    status: false,
                    message: 'email or password invalid!',
                });
            }

            if(!user.activation){
                return res.status(400).json({
                    status: false,
                    message: 'your account not activated!',
                });
            }


            if (user.user_type == 'google' && !user.password) {
                return res.status(400).json({
                    status: false,
                    message: 'your accont is registered with google oauth, you need to login with google oauth2!',
                });
            }

            const passwordCorrect = await bcryp.compare(password, user.password);
            if (!passwordCorrect) {
                return res.status(400).json({
                    status: false,
                    message: 'email or password invalid!',
                });
            }

            const payload = {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            };

            const token = await jwt.sign(payload, JWT_SECRET_KEY);
            return res.status(200).json({
                status: true,
                message: 'login success!',
                data: {
                    token: token
                }
            });

        } catch (error) {
            throw error;
        }
    },

    whoami: async (req, res) => {
        try {
            return res.status(200).json({
                status: true,
                message: 'fetch user success!',
                data: req.user
            });
        } catch (error) {
            throw error;
        }
    },

    activationAcc: async (req,res) => {
        try {
            const {token} = req.query;
            if (!token) {
                return res.status(400).json({
                    status: false,
                    message: 'invalid token'
                });
            }

            const data = await jwt.verify(token, JWT_SECRET_KEY);
            const updated = await User.update({activation : true}, {where: {id: data.id}});
            if (updated[0] == 0) {
                return res.status(400).json({
                    status: false,
                    message: 'activation failed'
                });
            }

            return res.status(200).json({
                status: true,
                message: 'activation succes'
            });
        } catch (err) {
            throw err;
        }
    },

    googleOauth2: async (req, res) => {
        try {
            const {code} = req.query;
        if (!code) {
            const googleLoginUrl = oauth2.generateAuthUrl();
            return res.redirect(googleLoginUrl);
        }

        await oauth2.setCreadentials(code);
        const {data} = await oauth2.getUserData();

        let user = await User.findOne({where: {email: data.email}});
        if (!user) {
            user = await User.create({
                name: data.name,
                email: data.email,
                user_type: 'google'
            });
        }

        if(!user.activation){
            const payload = {
                id: user.id
            };
            const token = await jwt.sign(payload, JWT_SECRET_KEY);
            const url = `${req.protocol}://${req.get('host')}/activationAcc?token=${token}`;

            const html = await nodemailer.getHtml('activationAcc.ejs', {user: {name: user.name}, url});
            nodemailer.sendMail(user.email, 'Activation', html);

            return res.status(201).json({
                status: true,
                message: 'Check your email for activation your account'
            });
        }


        const payload = {
            id: user.id,
            name: user.name,
            email: user.email
        };

        const token = await jwt.sign(payload, JWT_SECRET_KEY);
        return res.status(200).json({
            status: true,
            message: 'login success!',
            data: {
                token: token
            }
        });
        } catch (error) {
            throw error
        }
    },

    update: async (req,res) => {
        
        const{id} = req.user;
        const stringFile = req.file.buffer.toString('base64');

            const uploadFile = await imagekit.upload({
                fileName: req.file.originalname,
                file: stringFile
            });


        const updated = await User.update({profilePict: uploadFile.url}, {where: {id: id}});

        if (updated[0] == 0) {
            return res.status(404).json({
                status: false,
                message: `can't find user with id ${id}!`,
                data: null
            });
        }

        return res.status(201).json({
            status: true,
            message: 'success',
            data: {
                url_image: uploadFile.url
            }
        });
    }
};