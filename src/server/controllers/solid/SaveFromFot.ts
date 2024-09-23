import { Request, Response } from "express";
import { login, mapper, RML_CLOUD, SERVER_ADDRESS } from "../../shared/middlewares";
import { IData, IDataFot, IUser } from "../../database/models";
import * as yup from 'yup';
import { QueryEngine } from '@comunica/query-sparql';
import { StatusCodes } from "http-status-codes";

const extractSensorTypeName = (sensorType: string): String => {
    // Divide a string por '#' ou '/', e retorna a última parte

    const parts = sensorType.split(/[#/]/);
    return parts[parts.length - 1];
}

export const saveFromFot = async (req: Request<{}, {}, IDataFot>, res: Response) => {

    // const user: IUser = req.body.user;
    const reqData: IDataFot | undefined = req.body;
    const user: IUser = {
        userid: "16523",
        local_webid: SERVER_ADDRESS + "DefaultUser/profile/card#me",
        webid: SERVER_ADDRESS + "DefaultUser/profile/card#me",
        idp: SERVER_ADDRESS,
        username: "default@example.com",
        podname: "DefaultUser",
        password: "1234",
    }

    // if (user != undefined) {

    if (reqData != undefined) {

        // let data = await preprocess(reqData);    

        let rdfFile = await mapper(JSON.stringify(reqData), RML_CLOUD);

        // console.log("rdf file: \n" + rdfFile);

        const authFetch = await login(user, res);

        let sensorName = extractSensorTypeName(reqData.data.sensorType);

        const sourcePath = user.idp + user.podname + `/private/sensors/${sensorName}.ttl`;

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
    return res.status(StatusCodes.OK).send("savefot undefined data");
    // }
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