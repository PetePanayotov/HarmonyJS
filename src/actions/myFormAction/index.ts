import { all, fork, takeLatest } from 'redux-saga/effects';
import { createSaga } from '@base/features/base-decorator';
import * as Sagas from 'actions/myFormAction/sagas';
import { MyFormActionTypes } from 'actions/myFormAction';

/* ------------- Export Redux ------------- */
export * from 'actions/myFormAction/redux';

/* ------------- Export Sagas ------------- */
function* watchMySaga() {
	yield takeLatest(MyFormActionTypes.MY_SAGA, createSaga(Sagas.mySaga));
}

// TODO: Do Not Forget to Add your new saga to index file
export function* myFormActionSaga() {
	yield all([fork(watchMySaga)]);
}
