const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryTitle: { type: String, required: true },
    polls: {type: [mongoose.Schema.Types.ObjectId], ref: 'Poll', required: true}
});

let Category = mongoose.model('Category', categorySchema);

module.exports = Category;