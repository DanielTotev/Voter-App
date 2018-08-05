const CONTROLLERS = require('./../controllers');

module.exports = (app) => {
    app.post('/user/login', CONTROLLERS.USER_CONTROLLER.login);
    app.post('/user/register', CONTROLLERS.USER_CONTROLLER.register);

    console.log('All routes are set');
}