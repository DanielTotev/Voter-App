const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
    category: { type: String, required: true},
    title: { type: String, required: true },
    options: {type: [], required: true}
});

const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;