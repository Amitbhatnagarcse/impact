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


const window = Dimensions.get('window');

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    padding: 20,
    marginTop:40
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
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 15,
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 40,
  },
});

export default function Menu({ onItemSelected ,type,navigation }) {

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

      <Text
        onPress={() =>
          {
          onItemSelected()
         navigation.navigate('SignIn')}}
        style={styles.item}
      >Logout
      </Text>
     
     
{(type !='category') &&
      <>
     
      <Text
        onPress={() =>  {
          onItemSelected()
        navigation.navigate('Notification')}}
        style={styles.item}
      >
        Notification
      </Text>
      </>
}
    </ScrollView>
  );
}

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};