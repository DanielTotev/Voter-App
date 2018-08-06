const Poll = require('./../models/Poll');
const Category = require('./../models/Category');

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
        
        Category.findById(pollId)
            .then(poll => {
                if(!poll) {
                    return res.status(400).json({ message: 'This poll does not exist anymore' });
                }
                let optionExists = false;

                for(let option of poll.options) {
                    if(option.name === selectedOption) {
                        option.points = option.points + 1;
                        optionExists = true;
                        break;
                    }
                }

                if(!optionExists) {
                    return res.status(400).json({ message: 'Invalid option selected' });
                }

                poll.save()
                    .then(() => {
                        res.status(200).json({ message: 'Your vote has been accepted'});
                    })
            })
            .catch(err => console.log(err));
    },
    edit: (req, res) => {

    },
    deletePoll: (req, res) => {

    }
};