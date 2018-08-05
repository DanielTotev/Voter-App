const jwt = require('jsonwebtoken');
const User = require('./../models/User');
const encryption = require('./../utils/encryption');

module.exports = {
    register: (req, res) => {
        let { email, fullName, password, repeatPass } = req.body;

        if (!email || email == '' || !fullName || fullName == '' || !password || password == '') {
            res.status(400).send({ message: 'All fields must be field' });
            return;
        }

        if (password != repeatPass) {
            res.status(400).send({ message: 'Both passwords should match!' });
            return;
        }

        let salt = encryption.generateSalt();
        let hashedPass = encryption.generateHashedPassword(salt, password);
        console.log(email + ' ' + fullName + ' ' + password);
        User.create({
            email,
            fullName,
            salt,
            hashedPass,
            roles: [],
        }).then((user, err) => {
            if (err) {
                res.status(400).send({ message: err.message });
                return;
            }
            // create a token
            const payload = {
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                sub: user._id
            };

            let token = jwt.sign({ payload }, 's0m3 r4nd0m str1ng');
            res.status(200).send({ user: user, authtoken: token });
        });
    },

    login: (req, res) => {
        let reqUser = req.body;
        User.findOne({ email: reqUser.email })
            .then(user => {
                if (!user) {
                    res.status(400).send({ message: 'Invalid credentials' });
                    return;
                }
                let salt = user.salt;
                let hashedPass = user.hashedPass;
                if (encryption.generateHashedPassword(salt, reqUser.password) !== hashedPass) {
                    res.status(400).send({ message: 'Invalid credentials' });
                    return;
                }
                // create a token
                const payload = {
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    sub: user._id
                };

                let token = jwt.sign({ payload }, 's0m3 r4nd0m str1ng');
                res.status(200).send({ user: user, authtoken: token });
            });
    }
};