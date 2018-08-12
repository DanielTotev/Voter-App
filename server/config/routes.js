const CONTROLLERS = require('./../controllers');
const AUTH_CHECK = require('./../middleware/auth-check');

module.exports = (app) => {
    app.post('/user/login', CONTROLLERS.USER_CONTROLLER.login);
    app.post('/user/register', CONTROLLERS.USER_CONTROLLER.register);

    app.post('/category/create', AUTH_CHECK, CONTROLLERS.CATEGORY_CONTROLLER.create);

    app.post('/poll/create', AUTH_CHECK, CONTROLLERS.POLL_CONTROLLER.create);
    app.get('/poll/getAll', CONTROLLERS.POLL_CONTROLLER.getAll);
    app.get('/poll/:id', CONTROLLERS.POLL_CONTROLLER.getById);
    app.post('/poll/vote', AUTH_CHECK, CONTROLLERS.POLL_CONTROLLER.vote);

    console.log('All routes are set');
}