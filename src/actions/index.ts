import { combineReducers, Reducer } from 'redux';
import { fork, all } from 'redux-saga/effects';
import baseReducers, { BaseApplicationState } from '@base/features/base-reducers';

/* ------------- Import States ------------- */
import { CatalogState } from 'actions/catalog/interface';
import { CartState } from 'actions/cart/interface';

/* ------------- Import Sagas ------------- */
import { catalogSaga } from 'actions/catalog';
import { flowManagerSaga } from 'actions/flowManager';
import makeCart from '@base/features/base-cart';
import { myFormActionSaga } from './myFormAction';
import { MyFormActionState } from './myFormAction/interface';

const baseCartReducer = makeCart('cart').reducer;

/* ------------- Define ApplicationState ------------- */
export interface ApplicationState extends BaseApplicationState {
	cart: CartState;
	catalog: CatalogState;
	weather: MyFormActionState;
}

/* ------------- Export Reducers ------------- */
export const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
	...baseReducers,

	cart: require('./cart').reducer(baseCartReducer),
	catalog: require('./catalog').reducer,
	weather: require('./myFormAction').reducer,
});

/* ------------- Export Sagas ------------- */
export const rootSaga = function* () {
	yield all([fork(flowManagerSaga)]);
	yield all([fork(require('./cart').cartSaga)]);
	yield all([fork(catalogSaga)]);
	yield all([fork(myFormActionSaga)]);
};
