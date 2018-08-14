const Poll = require('./../models/Poll');
const Category = require('./../models/Category');
const Pusher = require('pusher');

const pusher = new Pusher({
    appId: '572498',
    key: '17f5653de317564ed3b2',
    secret: '6a2d5e4c14cd52def86a',
    cluster: 'eu',
    encrypted: true
});

module.exports = {
    create: (req, res) => {
        if (!req.user || req.user.roles[0] !== 'Admin') {
            return res.status(401).json({ message: 'Not authorized' });
        }

        let poll = {};
        poll.title = req.body.title;
        poll.options = req.body.options;
        poll.category = req.body.category;

        if (!poll.title || poll.title === '') {
            return res.status(400).json({ message: 'Title is required' });
        }

        if (!poll.options || poll.options.length === 0) {
            return res.status(400).json({ message: 'Options are required' });
        }

        Category.findOne({ categoryTitle: poll.category })
            .then(requestedCategory => {
                Poll.create(poll)
                    .then(createadPoll => {
                        requestedCategory.polls.push(createadPoll._id);
                        requestedCategory.save()
                            .then(() => {
                                res.status(200).json({ message: 'Poll created successfully', poll: createadPoll });
                            })
                    })
                    .catch(err => {
                        console.log(err);
                        return res.status(400).json({ message: 'Something went wrong' });
                    })
            })
            .catch(err => {
                return res.status(400).json({ message: 'Category not found' });
            })
    },

    vote: (req, res) => {
        let pollId = req.body.id;
        let selectedOption = req.body.optionName;

        Poll.findById(pollId)
            .then(poll => {
                if (!poll) {
                    return res.status(400).json({ message: 'This poll does not exist anymore' });
                }
                let optionExists = false;

                for (let option of poll.options) {
                    console.log(poll.options);
                    if (option.name === selectedOption) {
                        console.log(option);
                        option.points = option.points + 1;
                        optionExists = true;
                        console.log(option);
                        break;
                    }
                }
                console.log(poll.options);

                if (!optionExists) {
                    return res.status(400).json({ message: 'Invalid option selected' });
                }

                poll.markModified('options');
                poll.save(function (err) {
                    if (err) throw new Error(err.message);
                    pusher.trigger('poll', 'vote', {
                        points: 1,
                        option: selectedOption
                    });
                    res.status(200).json({ message: 'Your vote has been accepted' });
                });
            })
            .catch(err => console.log(err));
    },
    edit: (req, res) => {
        if (!req.user || req.user.roles[0] !== 'Admin') {
            return res.status(401).json({ message: 'Not authorized' });
        }
        let id = req.params.id;
        let poll = req.body;

        Poll.findById(id)
            .then(pollFromDb => {
                if (!pollFromDb) {
                    return res.status(400).json({ message: 'Poll not found!' });
                }

                pollFromDb.title = poll.title;
                pollFromDb.options = poll.options;
                pollFromDb.category = poll.category;

                pollFromDb.save()
                    .then(() => {
                        return res.status(200).json({ message: 'Poll updated Successfully!' });
                    });
            })
            .catch(err => {
                console.warn(err);
            })
    },
    deletePoll: (req, res) => {
        if (!req.user || req.user.roles[0] !== 'Admin') {
            return res.status(401).json({ message: 'Not authorized' });
        }

        let id = req.params.id;
        Poll.findOneAndRemove({ _id: id })
            .then(() => {
                res.status(200).send({ message: 'Poll deleted successfully' });
            })
            .catch(err => {
                res.status(400).send({ message: 'Poll does not exists' });
            })
    },

    getAll: (req, res) => {
        Poll.find({})
            .then(polls => {
                res.status(200).json(polls)
            })
    },

    getById: (req, res) => {
        let id = req.params.id;

        Poll.findById(id)
            .then(poll => {
                res.status(200).json(poll);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json({ message: 'Poll not found!' })
            })
    }
};