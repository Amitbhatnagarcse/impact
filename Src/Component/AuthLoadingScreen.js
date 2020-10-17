import React from 'react'
import {
  StyleSheet,
  View,
  ActivityIndicator
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';


export default class AuthLoadingScreen extends React.Component {
  state = {
    userToken: false
  }
   componentDidMount () {
   this._retrieveData('role')
   var pkg = require('../../package.json');     
  }

  _retrieveData = async (username) => {
  
    try {
      const value = await AsyncStorage.getItem(username);
      console.log(value)
      if (value !== null && value !== '') {
        // We have data!!
        this.props.navigation.navigate('PinScreen');
        //this.props.navigation.navigate('SignIn')

      }else{
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
