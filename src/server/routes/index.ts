import { Router } from "express";
import {StatusCodes} from 'http-status-codes';

const router = Router();

router.get('/', (req, res) => {
    return res.send('Hello');
});

router.post('/teste', (req, res) => {

    // return res.send(req.body);
    // return res.json(req.body);
    return res.status(StatusCodes.UNAUTHORIZED).json("Não autorizado");
});


export { router };