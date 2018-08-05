const CONTROLLERS = require('./../controllers');
const AUTH_CHECK = require('./../middleware/auth-check');

module.exports = (app) => {
    app.post('/user/login', CONTROLLERS.USER_CONTROLLER.login);
    app.post('/user/register', CONTROLLERS.USER_CONTROLLER.register);

    app.post('/category/create', AUTH_CHECK, CONTROLLERS.CATEGORY_CONTROLLER.create)

    console.log('All routes are set');
}