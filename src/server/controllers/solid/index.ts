import * as create from './Create';
import * as save from './Save';
import * as getAllSensors from './GetAllSensors';
import * as getObservations from './GetObservationsBySensor';
import * as remove from './Remove';

export const SolidController = {
    ...create, 
    ...save, 
    ...getAllSensors,
    ...getObservations,
    ...remove,      
};


