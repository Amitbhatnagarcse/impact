
import * as Types from '../types';
import Immutable from 'seamless-immutable';

export const createReducer = (initialState, config) => {
    return (state = initialState, action) => {
        if (config[action.type]) {
            
            return config[action.type](state, action);
        }
        return state;
    };
};

export const initialState =  Immutable.from({

    loading: false,
    businesPoints: [],
    pregnancyList : [],
    dashboardList : [],


});


export const getBusinessCallStarted = state =>
    state.merge({
        loading: true,

    })
    ;
export const getBusinessCallSuccess = (state, response) =>
    state.merge({
        loading: false,
        businesPoints: response.response.data

    });
export const getBusinessCallFailure = state =>
    state.merge({
        loading: false,
    }); 

    export const getPregnancyCallStarted = state =>
    state.merge({
        loading: true,

    })
    ;
export const getPreganancyCallSuccess = (state, response) =>
  
    state.merge({
        loading: false,
        pregnancyList: response.response.ResponseData,
        
    });
export const getPreganancyCallFailure = state =>
    state.merge({
        loading: false,
    }); 

    export const getDashboardStarted = state =>
    state.merge({
        loading: true,
    });

    export const getDashboardCallSuccess = (state, response) =>
  
    state.merge({
        loading: false,
        dashboardList: response.response.ResponseData, 
    });
    export const getDashboardCallFailure = state =>
    state.merge({
        loading: false,
    }); 


    const appReducer = createReducer(initialState, {
 

        [Types.GET_BUSINESS_REWARDS_STARTED]: getBusinessCallStarted,
        [Types.GET_BUSINESS_REWARDS_SUCCESS]: getBusinessCallSuccess,
        [Types.GET_BUSINESS_REWARDS_FAILURE]: getBusinessCallFailure,
        [Types.GET_PREGNANCY_LIST_STARTED]: getPregnancyCallStarted,
        [Types.GET_PREGNANCY_LIST_SUCCESS]: getPreganancyCallSuccess,
        [Types.GET_PREGNANCY_LIST_FAILURE]: getPreganancyCallFailure,
        [Types.GET_DASHBOARD_LIST_REQUEST]: getDashboardStarted,
        [Types.GET_DASHBOARD_LIST_SUCCESS]: getDashboardCallSuccess,
        [Types.GET_DASHBOARD_LIST_FAILURE]: getDashboardCallFailure,
      
      
      });
      
      export default appReducer;