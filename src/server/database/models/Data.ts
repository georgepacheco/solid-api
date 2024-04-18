interface ILocation {
    lat?: number;
    long?: number;
};

interface ITime {
    collect?: number;
    publish?: number;
};

interface IHeader {
    sensor?: string;
    device?: string;
    time?: ITime;
    location?: ILocation;
}


export interface IData {
    code?: string;
    method?: string;
    header?: IHeader;
    data?: Array<string>;
    date?: string;    
};