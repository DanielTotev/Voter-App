const jwt = require('jsonwebtoken');
const User = require('./../models/User');
const encryption = require('./../utils/encryption');
const Poll = require('./../models/Poll');

module.exports = {
    register: (req, res) => {
        let { email, username, password, repeatPass } = req.body;

        if (!email || email == '' || !username || username == '' || !password || password == '') {
            res.status(400).send({ message: 'All fields must be field' });
            return;
        }

        if(username.length < 4) {
            res.status(400).send({ message: 'Username must be atleast 4 symbols long' });
        }

        // if (password != repeatPass) {
        //     res.status(400).send({ message: 'Both passwords should match!' });
        //     return;
        // }

        let salt = encryption.generateSalt();
        let hashedPass = encryption.generateHashedPassword(salt, password);
        console.log(email + ' ' + username + ' ' + password);
        User.create({
            email,
            username,
            salt,
            hashedPass,
            roles: [],
        }).then((user, err) => {
            if (err) {
                res.status(401).send({ message: err.message });
                return;
            }
            // create a token
            const payload = {
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                sub: user._id
            };

            let token = jwt.sign({ payload }, 's0m3 r4nd0m str1ng');
            res.status(200).send({ user: user, authtoken: token, message: 'Registered successfully!' });
        });
    },

    login: (req, res) => {
        let reqUser = req.body;
        User.findOne({ email: reqUser.email })
            .then(user => {
                if (!user) {
                    res.status(401).send({ message: 'Invalid credentials' });
                    return;
                }
                let salt = user.salt;
                let hashedPass = user.hashedPass;
                if (encryption.generateHashedPassword(salt, reqUser.password) !== hashedPass) {
                    res.status(401).send({ message: 'Invalid credentials' });
                    return;
                }
                // create a token
                const payload = {
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    sub: user._id
                };

                let token = jwt.sign({ payload }, 's0m3 r4nd0m str1ng');
                res.status(200).send({ user: user, authtoken: token, message: 'Logged in successfully!' });
            });
    },

    getStats: async (req, res) => {
        let username = req.user.username;
        let polls = await Poll.find({author: username});
        let totalVotes = 0;
        let pollsCount;
        if(polls.length === 0) {
            pollsCount = 'No polls created yet!';
        } else {
            for(let poll of polls) {
                for(let option of poll.options) {
                    totalVotes += option.points;
                }
            }
            pollsCount = polls.length;
        }

        res.status(200).send({ pollsCount: pollsCount, totalVotes: totalVotes})
    }
};