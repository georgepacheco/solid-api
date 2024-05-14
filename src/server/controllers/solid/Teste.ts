import { Request, Response } from "express";
import { mapper, RML_TESTE } from "../../shared/middlewares";


export const teste = async (req: Request, res: Response) => {

    let rdfFile = await mapper(JSON.stringify(req.body), RML_TESTE);
    console.log(rdfFile);

    return res.send("oi");
}