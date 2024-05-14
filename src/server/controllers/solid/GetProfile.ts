import { Response, Request } from "express";
import { getDefaultSession, handleIncomingRedirect, ISessionInfo, login, Session, fetch } from "@inrupt/solid-client-authn-browser";
import { BindingsStream } from '@comunica/types';
import { QueryEngine } from '@comunica/query-sparql-solid';


export const getProfile = async (req: Request<{}, {}, Session>, res: Response) => {

    const session = req.body;
    if (session.info.isLoggedIn) {
        // const session: ISessionInfo = req.query.func;

        if (session.info.webId) {
            const sourcePath = getSourcePath(session.info.webId) + "/private/store.ttl";


            const myEngine = new QueryEngine();

            const query = await querySelectSensorByUser();
            const bindingsStream = await myEngine.queryBindings(query,
                {
                    sources: [sourcePath],
                    fetch: session.fetch,
                    //destination: { type: 'patchSparqlUpdate', value: sourcePath }
                });
        }
    }


    // return res.send(req.body.idp);



}

const getSourcePath = (webid: string) => {

    const parts = webid.split('/'); // Divide a string em partes usando '/' como delimitador
    const baseUrl = parts.slice(0, 4).join('/'); // Seleciona as primeiras 4 partes e junta-as novamente com '/'

    return baseUrl;
}

async function querySelectSensorByUser() {
    let query = `
        PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>
        PREFIX iot-lite: <http://purl.oclc.org/NET/UNIS/fiware/iot-lite#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX m3: <http://purl.org/iot/vocab/m3-lite#>
        PREFIX sosa: <http://www.w3.org/ns/sosa/>
        PREFIX ssn: <https://www.w3.org/ns/ssn/>
        
        SELECT ?sensor ?parentClass ?sensorType ?coverage ?point ?latitude ?longitude ?unitType ?quKind
        WHERE {
            ?sensor rdfs:subClassOf ssn:SensingDevice .
            ?sensor rdfs:subClassOf ?parentClass .
            ?sensor rdf:type ?sensorType .
            ?sensor iot-lite:hasCoverage ?coverage .
            ?coverage geo:location ?point .
            ?point geo:lat ?latitude .
            ?point geo:long ?longitude .
            ?sensor iot-lite:hasUnit ?unitType .
            ?sensor iot-lite:quantityKind ?quKind
        }   
    
    `;

    return query;
}