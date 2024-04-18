import * as getAuthorization from './GetAuthorization';
import * as save from './Save';
import * as getAllSensors from './GetAllSensors';
import * as getObservations from './GetObservationsBySensor';
import * as remove from './Remove';

export const SolidController = {
    ...getAuthorization, 
    ...save, 
    ...getAllSensors,
    ...getObservations,
    ...remove,      
};


