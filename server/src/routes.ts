import express from 'express';
import UsersController from './controllers/UsersController';

const routes = express.Router();
const usersController = new UsersController();

routes.post('/login', usersController.login);
routes.post('/users', usersController.create);
routes.get('/users', usersController.index);
routes.put('/users', usersController.edit);
routes.get('/loggedUser', usersController.verifyJWT, usersController.loggedUser);



export default routes;