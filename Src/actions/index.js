import * as Types from '../types'


export const createAction = (type, payload) => {
    if (!type) {
      throw new Error('Action Type must be truthy');
    }
    if (payload && payload.type) {
      throw new Error(
        "Action payload cannot have a 'type' field - it would overwrite the Action's type"
      );
    }
    return { type, ...payload };
  };

  
  export const getFORMFREPORTRequest = (requestBody) =>
  createAction(Types.GET_FORMFREPORT_LIST_REQUEST,{requestBody});
  export const getFORMFREPORTStarted = () =>
  createAction(Types.GET_FORMFREPORT_LIST_STARTED);
  export const getFORMFREPORTSuccess = (response) =>
  createAction(Types.GET_FORMFREPORT_LIST_SUCCESS,{response});
  export const getFORMFREPORTFailure = (response) =>
  createAction(Types.GET_FORMFREPORT_LIST_FAILURE,{response});



  export const getBusinessRequest = (requestBody) =>
  createAction(Types.GET_BUSINESS_REWARDS_REQUEST,{requestBody});
  export const getBusinessStarted = () =>
  createAction(Types.GET_BUSINESS_REWARDS_STARTED);
  export const getBusinessSuccess = (response) =>
  createAction(Types.GET_BUSINESS_REWARDS_SUCCESS,{response});
  export const getBusinessFailure = (response) =>
  createAction(Types.GET_BUSINESS_REWARDS_FAILURE,{response});


    export const getPregnancyRequest = (requestBody) =>
    createAction(Types.GET_PREGNANCY_LIST_REQUEST,{requestBody});
    export const getPregnancyStarted = () =>
    createAction(Types.GET_PREGNANCY_LIST_STARTED);
    export const getPregnancySuccess = (response) =>
    createAction(Types.GET_PREGNANCY_LIST_SUCCESS,{response});
    export const getPregnancyFailure = (response) =>
    createAction(Types.GET_PREGNANCY_LIST_FAILURE,{response});

    export const getDashboardRequest = (requestBody) =>
    createAction(Types.GET_DASHBOARD_LIST_REQUEST,{requestBody});
    
    export const getDashboardStarted = (requestBody) =>
    createAction(Types.GET_DASHBOARD_LIST_STARTED,{requestBody});
    export const getDashboardSuccess = (requestBody) =>
    createAction(Types.GET_DASHBOARD_LIST_SUCCESS,{requestBody});
    export const getDashboardFailure = (requestBody) =>
    createAction(Types.GET_DASHBOARD_LIST_FAILURE,{requestBody});