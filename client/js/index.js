import ViewController from './controllers/viewController.js';
import ServerController from './controllers/serverController.js';
import GameController from './controllers/gameController.js';

ViewController.start();
ServerController.initialize();
GameController.initialize();
