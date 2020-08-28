import * as Constants from '../../Constants';


export async function callApi(methodType, apiUrl, requestBody) {
  if (methodType == Constants.METHOD_TYPE_POST) {
    return await fetch(apiUrl, {
      method: methodType,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then(response => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then(([statusCode, data]) => {
      
        const responseObj = {
          data: data,
          statusCode: statusCode,
        };
        return responseObj;
      })
      .catch(error => {
        console.error(error);
      });
  }
  else if (methodType == Constants.METHOD_TYPE_GET) {
    return await fetch(apiUrl, {
      method: methodType,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then(([statusCode, data]) => {
        //console.log('statusCode', statusCode);
        //console.log('data', data);
        const responseObj = {
          data: data,
          statusCode: statusCode,
        };
        return responseObj;
      })
      .catch(error => {
        console.error(error);
      });
  }
}