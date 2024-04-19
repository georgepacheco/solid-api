import { Request, Response } from "express";
import { ISensor, IUser } from "../../database/models";
import { StatusCodes } from "http-status-codes";
import { QueryEngine } from '@comunica/query-sparql-solid';
import { login, mapper, RML_CLOUD, RML_LOCAL } from "../../shared/middlewares";


interface IDataUser {
    user: IUser;
    data?: Array<ISensor>;
}

export const sender = async (req: Request<{}, {}, IDataUser>, res: Response) => {
    
    const user: IUser = req.body.user;
    const data: Array<ISensor> | undefined = req.body.data;        

    if (user != undefined) {

        if (data != undefined) {
            // console.log(data[0].observation);  
            // console.log(JSON.stringify(data));
            let rdfFile = await mapper(JSON.stringify(data), RML_CLOUD);
            console.log(rdfFile);            

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