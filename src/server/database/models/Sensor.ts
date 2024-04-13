import { IObservation } from "./Observation";

export interface ISensor {
    sensor: string | undefined;
    sensorType: string | undefined;
    lat: string | undefined;
    long: string | undefined;    
    unitType: string | undefined;
    observation?: Array<IObservation>;
};