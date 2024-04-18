import { Router } from "express";
import { StatusCodes } from 'http-status-codes';
import { login, loginBodyValidation } from "../shared/middlewares";
import { SolidController } from "../controllers";
//import {CidadesController} from './../controllers';

const router = Router();

router.get('/', (req, res) => {
    return res.send('Hello API Node for Community Solid Server!');
});

// router.post('/teste', (req, res) => {

//     // return res.send(req.body);
//     // return res.json(req.body);
//     return res.status(StatusCodes.UNAUTHORIZED).json("Não autorizado");
// });

//router.post('/cidades', CidadesController.create);

router.get('/login', loginBodyValidation, login);

router.get('/sensors', SolidController.allSensorsValidation, SolidController.getAllSensors);
router.get('/sensor/:id/observations', SolidController.observationQueryValidation,
    SolidController.observationBodyValidation,
    SolidController.getObservationsBySensor);

router.get('/getAuthorization', SolidController.userValidation, SolidController.getAuthorizationToken);

router.post ('/save', SolidController.saveValidation, SolidController.save);

router.post('/remove', SolidController.remove);

export { router };