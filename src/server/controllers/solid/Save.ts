import { Request, Response } from "express";
import { login, mapper, preprocess, RML_LOCAL, validation } from "../../shared/middlewares";
import { IData, IUser } from "../../database/models";
import * as yup from 'yup';
import { QueryEngine } from "@comunica/query-sparql";
import { StatusCodes } from "http-status-codes";

interface IDataUser {
    user: IUser;
    data?: Array<IData>;
}

const bodyValidation: yup.ObjectSchema<IDataUser> = yup.object().shape({
    user: yup.object().shape({
        userid: yup.string().required(),
        local_webid: yup.string().required(),
        webid: yup.string().required(),
        idp: yup.string().required(),
        username: yup.string().required(),
        password: yup.string().required(),
        podname: yup.string().required()
    }),
    data: yup.array().of(
        yup.object().shape({
            code: yup.string(),
            method: yup.string(),
            data: yup.array(),
            date: yup.string(),
            header: yup.object().shape({
                sensor: yup.string(),
                device: yup.string(),
                time: yup.object().shape({
                    collect: yup.number(),
                    publish: yup.number()
                }),
                location: yup.object().shape({
                    lat: yup.number(),
                    long: yup.number()
                })
            })
        })
    )
});

export const saveValidation = validation('body', bodyValidation);


export const save = async (req: Request<{}, {}, IDataUser>, res: Response) => {

    const user: IUser = req.body.user;
    const reqData: Array<IData> | undefined = req.body.data;
    
    if (user != undefined) {

        if (reqData != undefined) {

            let data = await preprocess(reqData);
            
            let rdfFile = await mapper(JSON.stringify(data), RML_LOCAL);
            
            const authFetch = await login(user, res);

            const sourcePath = user.idp + user.podname + "/private/store.ttl";

            const myEngine = new QueryEngine();
           
            let query = await queryInsertData(rdfFile);
            try {
                await myEngine.queryVoid(query,
                    {
                        sources: [sourcePath],
                        fetch: authFetch,
                        //destination: { type: 'patchSparqlUpdate', value: sourcePath }
                    });
                return res.status(StatusCodes.OK).send("save");        
            } catch (error) {
                console.log(error);
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
            }                        
        }        
    }
};

async function queryInsertData(rdfFile: string) {

    let query = `        
    PREFIX dc: <http://purl.org/dc/elements/1.1/>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema>
    INSERT DATA
    { ` +
        rdfFile
        +
        `}`;

    return query;
}