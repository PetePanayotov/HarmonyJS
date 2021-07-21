import { createDraft, Draft } from 'immer';
import { createReducerCase } from '@base/features/base-decorator';
import { createReducer, createActions } from 'reduxsauce';
import { ApplicationState } from 'actions';
import { MyFormActionState, TypesNames, ActionCreator, SetTempAction, MySagaAction } from './interface';

// TODO: Do not for get add your reducer to index file

/* ------------- Types and Action Creators ------------- */

const { Creators } = createActions<TypesNames, ActionCreator>({
	mySaga: ['city'], // handle by saga
	setTemp: ['temp'],
});

export const MyFormActionTypes = TypesNames;
export const MyFormActionActions = Creators;

/* ------------- Initial State ------------- */

const INITIAL_STATE = createDraft<MyFormActionState>({
	city: '',
	temp: 0,
});

/* ------------- Selectors ------------- */

export const MyFormActionSelector = {
	selectTemp: (state: ApplicationState) => state.weather.temp,
	selectCity: (state: ApplicationState) => state.weather.city,
};

/* ------------- Reducers ------------- */

const setTempReducer = (draft: Draft<MyFormActionState>, action: SetTempAction) => {
	const { temp } = action;
	draft.temp = temp;
};

const mySagaReducer = (draft: Draft<MyFormActionState>, action: MySagaAction) => {
	const { city } = action;
	draft.city = city;
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer<any, any>(INITIAL_STATE, {
	[TypesNames.MY_SAGA]: createReducerCase(mySagaReducer),
	[TypesNames.SET_TEMP]: createReducerCase(setTempReducer),
});
