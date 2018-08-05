const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryName: { type: String, required: true },
    polls: {type: [mongoose.Schema.Types.ObjectId], ref: 'Poll', required: true}
});

let Category = mongoose.model('Category', categorySchema);

module.exports = Category;