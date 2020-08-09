const express = require('express');
const routes = express.Router();
const UserController = require('./controllers/UserController');

routes.get('/', (request, response) => {
    response.send('hello from express');
});

routes.post('/user/register', UserController.store);

module.exports = routes;