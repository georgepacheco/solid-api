
// Mapping constants (which SenML unit maps to which om-2 unit and quantity) (SSN/SAREF)
//export const RML_FILE = './src/rml/rml_test.ttl';
//export const RML_FILE = './src/rml/rml_ssn.ttl';

export const RML_LOCAL = './src/server/resources/rml/rml_lite.ttl';
export const RML_CLOUD = './src/server/resources/rml/rml_lite_cloud.ttl';
export const RML_TESTE = './src/server/resources/rml/museum-model.rml.ttl';

/**
 * Receive file from Python script
 */
// export const RML_FILE = '../solid-server/FotSolid/Sensor2Gateway/dist/rml/rml_lite.ttl'; 

export const RML_OPTIONS = {
    toRDF: true,
    verbose: false,
    xmlPerformanceMode: false,
    replace: false
}

export const URI = "http://example.com/soft-iot/sensor/";

// SENSORS TYPES
export const SENSORTYPES = {
    HUMIDITY: "humiditySensor",
    TEMPERATURE: "temperatureSensor",
    ENV_TEMPERATURE: "environmentTemperatureSensor",
    BODY_TEMPERATURE: "bodytemperatureSensor",
    SOIL: "soilmoistureSensor",
    BLOOD_GLUCOSE: "bloodGlucoseSensor",
    HEART_RATE: "heartrateSensor"
}

export const M3_SENSORTYPES = {
    HUMIDITY: "HumiditySensor",
    TEMPERATURE: "AirThermometer",
    ENV_TEMPERATURE: "AirThermometer",
    BODY_TEMPERATURE: "BodyThermometer",
    SOIL: "SoilHumiditySensor",
    BLOOD_GLUCOSE: "Glucometer",
    HEART_RATE: "HeartBeatSensor",
    BLOOD_PRESSURE: "BloodPressureSensor",
    ECG: "ECG"
}

// UNITS
export const UNITS_OM = {
    "m": "metre",
    "kg": "kilogram",
    "g": "gram",
    "s": "second-Time",
    "A": "ampere",
    "C": "degreeCelsius",  
    "K": "kelvin",  
    "RH": "percent",
    "%": "percent",
    "none": "undefined"
}

// QUANTITY KIND (MEASURES)
export const MEASURES_OM = {
    "m": "Length",
    "kg": "Mass",
    "g": "Mass",
    "s": "Time",
    "A": "ElectricCurrent",
    "C": "Temperature",
    "K": "Temperature",    
    "RH": "RelativeHumidity",
    "%" : "Percentage",
    "none": "undefined"
}