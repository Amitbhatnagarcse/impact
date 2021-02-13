import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native';
import {BlueColor} from '../../Constants'
import { version } from '../../package.json';


const window = Dimensions.get('window');

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    padding: 20,
    paddingTop:60,
    backgroundColor :BlueColor
  },
  avatarContainer: {
    marginBottom: 20,
    flexDirection: 'column'
  },
  avatar: {
    marginLeft: 40,
    width: 100,
    height: 100,
    borderRadius: 148 / 2,
  },
  name: {
    marginTop: 15,
    fontSize: 15,
    width: '50%',
    textAlign: 'center',
    letterSpacing: 0.4,
    fontFamily: 'Poppins-ExtraBold'
  },
  item1: {
    fontSize: 22,
    fontWeight: '300',
    color:'#fff',
    paddingTop: 1,
  },
  item: {
    fontSize: 22,
    fontWeight: '300',
    paddingTop: 10,
    color:'#fff',

  },
  itembottom: {
    fontSize: 12,
    fontWeight: '300',
    color:'#fff',
    
    marginTop: -20
  },
});

export default function Menu({ onItemSelected , type , navigation , role , item , CenterName }) {

  return (
    <ScrollView scrollsToTop={false} style={styles.menu}>
     
      <Text
        onPress={() => {
          onItemSelected()
          navigation.navigate('Dashboard')
        }}
        style={styles.item1}
      >
        Home
      </Text>
        <View style ={{width:'100%',height:1,backgroundColor:'white'}}/>

        <Text
        onPress={() => {
          console.warn(item)
          onItemSelected()
          if(role == 5)
          navigation.navigate('UserProfile', {item : item , CenterName : CenterName})
          else if(role == 3)
          navigation.navigate('DistrrictListProfile', {item : item })
          else
          navigation.navigate('DistrrictOwnerProfile')
        }}
        style={styles.item}
      >
       Centre Profile
      </Text>
        <View style ={{width:'100%',height:1,backgroundColor:'white'}}/>


      <Text
        onPress={() =>
          {
          onItemSelected()
         navigation.navigate('SignIn')}}
        style={styles.item}
      >Logout
      </Text>
      <View style ={{width:'100%',height:1,backgroundColor:'white'}}/>

     
     
{(type !='category') &&
      <>
     
      <Text
        onPress={() =>  {
          onItemSelected()
        navigation.navigate('Notification')}}
        style={styles.item}
      >
        
      </Text>
      </>
}

<Text
        onPress={() =>
          {
          onItemSelected()
         }}
        style={styles.itembottom}
      >Version {version}
      </Text>

    </ScrollView>
 
  );
}

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};