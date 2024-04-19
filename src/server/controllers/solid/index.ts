import * as getAuthorization from './GetAuthorization';
import * as save from './Save';
import * as getAllSensors from './GetAllSensors';
import * as getObservations from './GetObservationsBySensor';
import * as remove from './Remove';
import * as sender from './DataSender';
import * as teste from './Teste';


export const SolidController = {
    ...getAuthorization, 
    ...save, 
    ...getAllSensors,
    ...getObservations,
    ...remove,
    ...sender,
    ...teste
};


