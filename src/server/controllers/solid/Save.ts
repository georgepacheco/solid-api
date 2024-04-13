import { Request, Response } from "express";
import { login } from "../../shared/middlewares";



export const save = async (req: Request, res: Response) => {
    // const authFetch = await login(req, res);

    return res.send("save");
};  