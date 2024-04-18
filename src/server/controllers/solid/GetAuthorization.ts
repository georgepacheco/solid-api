import { Request, Response } from "express";
import { getAuthorization, validation } from "../../shared/middlewares";
import * as yup from 'yup';
import { IUser } from "../../database/models";



const bodyValidation: yup.ObjectSchema<IUser> = yup.object().shape({
    userid: yup.string().required(),
    local_webid: yup.string().required(),
    webid: yup.string().required(),
    idp: yup.string().required(),
    username: yup.string().required(),
    password: yup.string().required(),
    podname: yup.string().required()
});
    
export const userValidation = validation('body', bodyValidation);


export const getAuthorizationToken = async (req: Request, res: Response) => {
    
    const token = await getAuthorization(req.body);

    return res.send(token);
};