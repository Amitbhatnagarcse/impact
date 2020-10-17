/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';


import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SigninScreen from '../Component/SignInScreen';
import AuthLoading from '../Component/AuthLoadingScreen';
import Dashboard from '../Component/Dashboard';
import Home from '../App';
import PinScreen from '../pin/PinScreen';
import Formf from '../Component/FormF';
import Project from '../Component/Project';
import FormFSecond from '../Component/FormFSecond';
import FormFInvansive from '../Component/FormFInvensive';
import MultiSelectExample from '../Component/MultiSelectExample';
import PDFExample from '../Component/PDFExample';
import ShareDemo from '../Component/ShareDemo';
import DashBoardChart from '../Component/DashBoardChart';
import InspectionReport from '../Component/InspectionReport';
import PirList from '../Component/PirList';
import FormfReport from '../Component/FormfReport';
import Feedback from '../Component/Feedback';
import FeedbackDetails from '../Component/FeedbackDetails';
import DistrrictOwnerProfile from '../Component/DistrrictOwnerProfile';


import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

class NewStack extends React.Component{

  render()
  {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
         
        </ScrollView>
      </SafeAreaView>
    </>
  );
          }
};
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },


});
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer > 
      <Stack.Navigator screenOptions={{
    headerShown: false
  }} >
      <Stack.Screen  name="Loading" component={AuthLoading} Header={null}/>
      <Stack.Screen name="SignIn" component={SigninScreen}  />
      <Stack.Screen name="NewStack" component={NewStack} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="DashBoardChart" component={DashBoardChart} />
      <Stack.Screen name="PinScreen" component={PinScreen} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Formf" component={Formf} />
      <Stack.Screen name="Project" component={Project} />
      <Stack.Screen name="FormFSecond" component={FormFSecond} />
      <Stack.Screen name="FormFInvansive" component={FormFInvansive} />
      <Stack.Screen name="MultiSelectExample" component={MultiSelectExample} />
      <Stack.Screen name="PDFExample" component={PDFExample} />
      <Stack.Screen name="ShareDemo" component={ShareDemo} />
      <Stack.Screen name="InspectionReport" component={InspectionReport} />
      <Stack.Screen name="PirList" component={PirList} />
      <Stack.Screen name="FormfReport" component={FormfReport} />
      <Stack.Screen name="Feedback" component={Feedback} />
      <Stack.Screen name="FeedbackDetail" component={FeedbackDetails} />
      <Stack.Screen name="DistrrictOwnerProfile" component={DistrrictOwnerProfile} />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;