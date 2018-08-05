const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
    title: { type: String, required: true },
    options: {type: [mongoose.Schema.Types.ObjectId], ref: 'Option', required: true}
});

const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;