const Category = require('./../models/Category');

module.exports = {
    create: (req, res) => {
        if(!req.user || req.user.roles[0] !== 'Admin') {
            return res.status(401).json({ message: ' Not authorized!'})
        }
        let categoryTitle = req.body.categoryTitle;

        if(!categoryTitle || categoryTitle === '') {
            return res.status(400).send( {message: 'Category title is required' });
        }

        Category.create({ categoryTitle })
            .then(category => {
                return res.status(200).json({ category: category, message: 'Success' });
            })
    },

    getCategoriesNames: (req, res) => {
        Category.find({})
            .then(categories => {
                categories = categories.map(x => x.categoryTitle);
                res.json(categories);
            });
    }
};