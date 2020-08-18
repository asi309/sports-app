const express = require('express');
const multer = require('multer');

const ApprovalController = require('./controllers/ApprovalController');
const DashboardController = require('./controllers/DashboardController');
const EventController = require('./controllers/EventController');
const LoginController = require('./controllers/LoginController');
const RegistrationController = require('./controllers/RegistrationController');
const RejectionController = require('./controllers/RejectionController');
const UserController = require('./controllers/UserController');
const uploadConfig = require('./config/upload');

const routes = express.Router();
const upload = multer(uploadConfig);


routes.get('/', (request, response) => {
    response.send('hello from express');
});

//Dashboard
routes.get('/dashboard/:sport', DashboardController.getAllEvents);
routes.get('/dashboard', DashboardController.getAllEvents);
routes.get('/user/events', DashboardController.getEventsByUser);
routes.get('/event/:eventId', DashboardController.getEventById);

//Events
routes.post('/event', upload.single("thumbnail"), EventController.createEvent);
routes.delete('/event/:eventId', EventController.deleteEvent);

//Login
routes.post('/login', LoginController.store);

//Registration
routes.post('/registration/:eventId', RegistrationController.create);
routes.get('/registration/:registrationId', RegistrationController.getRegistration);

//Approvals
routes.post('/registration/:registrationId/approval', ApprovalController.approval);
//Rejections
routes.post('/registration/:registrationId/rejection', RejectionController.rejection);

//Users
routes.post('/user/register', UserController.createUser);
routes.get('/user/:userId', UserController.getUserById);

module.exports = routes;