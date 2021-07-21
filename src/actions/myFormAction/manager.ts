// Here you right all the "sdk" ( managers, utils etc .. )
// actually here is a function that are not saga and should return simple values without dispatch
// for example function that get a and b and return a + b
import { Store } from '@base/features';
import { MyFormActionSelector } from 'actions/myFormAction';

export const goToPageOne = async () => {
	const city = MyFormActionSelector.selectCity(Store.getState());

	if (city === 'Sofia') {
		return Promise.resolve();
	}

	return Promise.reject();
};

export const goToPageTwo = async () => {
	const city = MyFormActionSelector.selectCity(Store.getState());

	if (city === 'Dupnitsa') {
		return Promise.resolve();
	}

	return Promise.reject();
};
