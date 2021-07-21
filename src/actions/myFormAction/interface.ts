import { Action } from 'redux';

/* ------------- Define Actions and State ------------- */
export interface MyFormActionState {
	city: string;
	temp: number;
}

export enum TypesNames {
	SET_TEMP = 'SET_TEMP',
	MY_SAGA = 'MY_SAGA',
}

export declare function MySagaFunction(cityName: string): MySagaAction;
export declare function SetTemFunction(temp: number): SetTempAction;

export interface ActionCreator {
	setTemp: typeof SetTemFunction;
	mySaga: typeof MySagaFunction;
}

export interface MySagaAction extends Action<TypesNames.MY_SAGA> {
	city: string;
}

export interface SetTempAction extends Action<TypesNames.SET_TEMP> {
	temp: number;
}

/* ------------- Define Any Interfaces ------------- */

export interface WeatherResponse {
	coord: Coord;
	weather: Weather[];
	base: string;
	main: Main;
	visibility: number;
	wind: Wind;
	clouds: Clouds;
	dt: number;
	sys: Sys;
	timezone: number;
	id: number;
	name: string;
	cod: number;
}

export interface Coord {
	lon: number;
	lat: number;
}

export interface Weather {
	id: number;
	main: string;
	description: string;
	icon: string;
}

export interface Main {
	temp: number;
	feels_like: number;
	temp_min: number;
	temp_max: number;
	pressure: number;
	humidity: number;
}

export interface Wind {
	speed: number;
	deg: number;
}

export interface Clouds {
	all: number;
}

export interface Sys {
	type: number;
	id: number;
	country: string;
	sunrise: number;
	sunset: number;
}
