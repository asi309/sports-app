const express = require('express');
const multer = require('multer');

const EventController = require('./controllers/EventController');
const UserController = require('./controllers/UserController');
const uploadConfig = require('./config/upload');

const routes = express.Router();
const upload = multer(uploadConfig);


routes.get('/', (request, response) => {
    response.send('hello from express');
});

routes.post('/user/register', UserController.createUser);

routes.get('/user/:userId', UserController.getUserById);


routes.post('/event', upload.single("thumbnail"), EventController.createEvent);
routes.get('/event/:eventId', EventController.getEventById);

module.exports = routes;