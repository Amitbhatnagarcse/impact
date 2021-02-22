import { setJSExceptionHandler } from 'react-native-exception-handler';
import crashlytics from '@react-native-firebase/crashlytics';
import { BackHandler } from 'react-native';
import MyData from './helper/MyData';

// customise error handler:
const exceptionhandler = (error) => {
  if (MyData.sharedInstance.screenName === "DashBorad") {
    BackHandler.exitApp();
  }
  crashlytics().log('RN Error log = ' + error);
  crashlytics().recordError(error);
};

/*
setJSExceptionHandler method
@params - exceptionhandler is the exception handler function
@params - allowInDevMode is an optional parameter is a boolean.

 Note: If set to true the handler to be called in place of RED screen
   in development mode also.
*/


setJSExceptionHandler(exceptionhandler, true);

