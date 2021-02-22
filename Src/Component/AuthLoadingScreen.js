import React from 'react'
import {
  StyleSheet,
  View,
  ActivityIndicator,
  BackHandler,
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';


export default class AuthLoadingScreen extends React.Component {
  state = {
    userToken: false
  }

  componentWillUnmount() {
  }
  componentDidMount() {
    this._retrieveData('role')
    var pkg = require('../../package.json');

  }

  handleBackButtonClick() {
    BackHandler.exitApp();
    //this.props.navigation.goBack(null);
    return true;
  }
  _retrieveData = async (username) => {

    try {
      const value = await AsyncStorage.getItem(username);
      if (value !== null && value !== '') {
        // We have data!!
        this.props.navigation.replace('PinScreen');
        //this.props.navigation.navigate('SignIn')

      } else {
        this.props.navigation.navigate('SignIn');
        //this.props.navigation.navigate( 'PinScreen')

      }
    } catch (error) {
      // Error retrieving data
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
