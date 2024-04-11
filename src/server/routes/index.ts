import { Router } from "express";
import {StatusCodes} from 'http-status-codes';
import { login, loginBodyValidation } from "../shared/middlewares";
import { SolidController } from "../controllers";
//import {CidadesController} from './../controllers';

const router = Router();

router.get('/', (req, res) => {
    return res.send('Hello people!');
});

router.post('/teste', (req, res) => {

    // return res.send(req.body);
    // return res.json(req.body);
    return res.status(StatusCodes.UNAUTHORIZED).json("Não autorizado");
});

//router.post('/cidades', CidadesController.create);

router.post('/login', loginBodyValidation, login);


router.get('/sensors', SolidController.allSensorsValidation, SolidController.getAllSensors)
router.get('/sensor/:id/observations', SolidController.allSensorsValidation, SolidController.getAllSensors)

export { router };