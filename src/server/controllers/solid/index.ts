import * as create from './Create';
import * as add from './Add';
import * as getAllSensors from './GetAllSensors';
import * as getObservations from './GetObservationsBySensor';

export const SolidController = {
    ...create, 
    ...add, 
    ...getAllSensors,
    ...getObservations
};


