import * as getAuthorization from './GetAuthorization';
import * as save from './Save';
import * as getAllSensors from './GetAllSensors';
import * as getObservations from './GetObservationsBySensor';
import * as remove from './Remove';
import * as sender from './DataSender';
import * as savefot from './SaveFromFot';
import * as getProfile from './GetProfile';
import * as teste from './Teste';


export const SolidController = {
    ...getAuthorization, 
    ...save, 
    ...getAllSensors,
    ...getObservations,
    ...remove,
    ...sender,
    ...getProfile,
    ...savefot,
    ...teste
};


