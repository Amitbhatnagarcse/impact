import { put, takeLatest, all } from 'redux-saga/effects';
import * as Types from '../types';

import BusinessModel from '../models/BusinessModel';
import BusinessModelXX from '../models/PregnancyListModel';




import * as Actions from '../actions';



export function* getBusinessRequest(action) {
    try {
       
        yield put(Actions.getBusinessStarted());
       
        const responseObj = yield BusinessModel.getBusinessRewards(action.requestBody);
       
        if (responseObj.statusCode === 200 || responseObj.statusCode === 201) {
            yield put(Actions.getBusinessSuccess(responseObj.data))
            if (responseObj.data && (responseObj.data.message)) {
                alert(responseObj.data.message)
            }
        } else {
            if (responseObj.data && (responseObj.data.message)) {
                alert(responseObj.data.message)
            } else {
                alert(strings('somethingWentWrong'))
            }
            yield put(Actions.getBusinessFailure())
        }
    } catch (error) {
        yield put(Actions.getBusinessFailure());
        alert(error)
    }
}

export function* getPregnancyList(action) {
    try {
       
        yield put(Actions.getPregnancyStarted());
       
        const responseObj = yield BusinessModelXX.getPregnancyListmy(action.requestBody);
        if (responseObj.statusCode === 200 || responseObj.statusCode === 201) {
        
        yield put(Actions.getPregnancySuccess(responseObj.data))
               
        } else {
            if (responseObj.data && (responseObj.data.message)) {
                alert(responseObj.data.message)
            } else {
                alert('somethingWentWrong')
            }
            yield put(Actions.getPregnancyFailure())
        }
    } catch (error) {
        yield put(Actions.getPregnancyFailure());
        alert(error)
    }
}
export function* getformflistList(action) {
    try {
       
        yield put(Actions.getFORMFREPORTStarted());
       
        const responseObj = yield BusinessModelXX.getFormFReport(action.requestBody);
        if (responseObj.statusCode === 200 || responseObj.statusCode === 201) {
        console.warn(JSON.stringify(responseObj))
        yield put(Actions.getFORMFREPORTSuccess(responseObj.data))
               
        } else {
            if (responseObj.data && (responseObj.data.message)) {
                alert(responseObj.data.message)
            } else {
                alert('somethingWentWrong')
            }
            yield put(Actions.getFORMFREPORTFailure())
        }
    } catch (error) {
        yield put(Actions.getFORMFREPORTFailure());
        alert(error)
    }
}
export function* getDashboardList(action) {
    try {
       
        yield put(Actions.getDashboardStarted());
       
        const responseObj = yield BusinessModelXX.getDashboardChart(action.requestBody);
    
        if (responseObj.statusCode === 200 || responseObj.statusCode === 201) {
    
                  yield put(Actions.getDashboardSuccess(responseObj.data))
          
        } else {
            if (responseObj.data && (responseObj.data.message)) {
                alert(responseObj.data.message)
            } else {
                alert('somethingWentWrong')
            }
            yield put(Actions.getDashboardFailure())
        }
    } catch (error) {
        yield put(Actions.getDashboardFailure());
        alert(error)
    }
}

export function* actionWatcher() {
    yield takeLatest(Types.GET_BUSINESS_REWARDS_REQUEST, getBusinessRequest)
    yield takeLatest(Types.GET_PREGNANCY_LIST_REQUEST, getPregnancyList)
    yield takeLatest(Types.GET_DASHBOARD_LIST_REQUEST,getDashboardList)
    yield takeLatest(Types.GET_FORMFREPORT_LIST_REQUEST,getformflistList)

}
export default function* rootSaga() {
    yield all([
        actionWatcher(),
    ]);
}