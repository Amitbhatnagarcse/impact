import * as Constants from '../../Constants';

import { callApi } from '../models/BaseModel';

export default class BusinessModel {

    static getBusinessRewards(requestBody) {
        return callApi(Constants.METHOD_TYPE_POST, Constants.API_GET_BUSINESS_REWARD, requestBody)
    }

}