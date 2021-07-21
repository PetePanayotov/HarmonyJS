import { AxiosResponse } from 'axios';
import { call, put } from 'redux-saga/effects';
import api from 'requests';
import { MySagaAction, WeatherResponse } from 'actions/myFormAction/interface';
import { config } from 'config';
import { MyFormActionActions } from './redux';
import { startFlow } from 'actions/flowManager/sagas';
import { TypesNames } from 'actions/flowManager/interface';
import FlowManagerConfig from 'public/config/flow-manager/types.json';

const { flowTypes, stepTypes } = FlowManagerConfig;

export function* mySaga(action: MySagaAction) {
	yield call(startFlow, {
		type: TypesNames.START_FLOW,
		flowType: flowTypes.TEST,
		currentStep: stepTypes.MY_FORM.name,
	});
	const { city } = action;
	const response: AxiosResponse<WeatherResponse> = yield call(() => api.getWeatherData(city, config.API_KEY!));

	const temp = response.data.main.temp;

	yield put(MyFormActionActions.setTemp(temp));
}
