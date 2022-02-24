export class AqiData{
    uid: number;
    aqi: string;
    station: AqiStation;
    time: AqiTime;
  }

  export class AqiStation{
    name: string;
    geo: number[];
    url: string;
    country: string;
  }

  export class AqiTime{
    tz: string;
    sTime: string;
    vTime: number;
  }
  