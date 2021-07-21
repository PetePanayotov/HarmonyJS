/**
 * Here you add all the apis urls defenition
 */

import request from '@base/features/base-api';
import { AxiosResponse } from 'axios';
import { config } from 'config';
import GenericMobileImage from 'public/assets/images/generic-mobile.jpg';
import responseExample from './mocks/response_example.json';
import { Device } from 'actions/catalog/interface';
import { WeatherResponse } from 'actions/myFormAction/interface';

export interface Api {
	getDevices: () => Promise<AxiosResponse>;
	getDevicesMock: () => any;
	getWeatherData: (cityName: string, apiKey: string) => Promise<WeatherResponse>;
}

export const createApi = (baseURL = config.ROOT_SERVER_URL): Api => ({
	getDevices: () =>
		request.call({
			baseURL: 'http://6ew7g.mocklab.io/' || baseURL,
			method: 'get',
			url: '/getlatestWithCustomResponseCode',
		}),
	getDevicesMock: () => {
		const genericImage = GenericMobileImage;

		const mock = (responseExample as Device[]).map((item) => {
			const temp = { ...item };
			temp.image = genericImage;
			return temp;
		});

		return {
			status: 200,
			data: mock,
		};
	},

	getWeatherData: (cityName: string, apiKey: string) =>
		request.call({
			baseURL: 'https://api.openweathermap.org/' || baseURL,
			method: 'get',
			url: `data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`,
		}),
});

export default createApi();
