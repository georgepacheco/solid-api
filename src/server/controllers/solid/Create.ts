import { Request, Response } from "express";

export const create = (req: Request, res: Response) => {
    
    console.log(req.body);

    return res.send('Create');
};