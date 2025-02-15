export interface TimeDataProp {
    batteryStatus: number,
    solar: {
      voltage: number,
      current: number,
      wattage: number,
    },
    teg: {
      voltage: number,
      current: number,
      wattage: number,
    },
    compostContainerOne:{
      methane: number,
      temperature: number,
      moisture: number,
    },
    compostContainerTwo:{
      methane: number,
      temperature: number,
      moisture: number,
    },
    timestamp: Date
  }
  
  export interface APIDataProp {
    _id: string
    deviceNumber: string
    realTimeData: TimeDataProp
    savedTimeFrameData: TimeDataProp[]
  } 
  
  export interface EnergyData {
    timestamp: string;
    voltage: number;
    current: number;
    wattage: number;
  }
  
  export interface CompostData {
    timestamp: string;
    methane: number;
    temperature: number;
    moisture: number;
  }
  
  export interface AllSavedDataProp {
    solar: EnergyData[]
    teg: EnergyData[]
    compostOne: CompostData[]
    compostTwo: CompostData[]
  }