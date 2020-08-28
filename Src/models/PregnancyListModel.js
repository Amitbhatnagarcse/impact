import * as Constants from '../../Constants';

import { callApi } from './BaseModelXX';

export default class PregnancyListModel {

    static getPregnancyListmy(requestBody) {
       
        return callApi(Constants.METHOD_TYPE_POST, Constants.API_GET_PGREGNANCY_LIST, requestBody)
    }
    static getDashboardChart(requestBody) {
       
        return callApi(Constants.METHOD_TYPE_POST, Constants.API_GET_DASHBOARD_CHART, requestBody)
    }

}