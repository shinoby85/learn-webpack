interface IWeatherItem {
    description: string;
    icon: string;
    id: number;
    main: string;
}

interface IMain {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_max: number;
    temp_min: number;
}

interface IWind{
    deg: number;
    gust: number;
    speed: number;
}

export interface IOpenWeatherResponse {
    weather: IWeatherItem[];
    main: IMain;
    cod: number;
    wind: IWind;
}

export interface ITaskObj {
    pendingArray: string[];
    completedArray: string[];
}