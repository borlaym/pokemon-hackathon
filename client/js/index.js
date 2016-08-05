import ViewController from './controllers/viewController.js';
import ServerController from './controllers/serverController.js';
import GameController from './controllers/gameController.js';
import ViewActionController from './controllers/viewActionController.js';

ServerController.initialize();
let gameController = GameController.initialize();
ViewActionController.initialize();
ViewController.start(gameController);
