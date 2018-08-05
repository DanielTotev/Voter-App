const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    points: { type: Number, default: 0 }
});

const Option = mongoose.model('Option', optionSchema);

module.exports = Option;