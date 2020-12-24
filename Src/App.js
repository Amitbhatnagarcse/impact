/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  Button,
  BackHandler,
  Alert,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { BASE_URL, Gradientcolourlight, Gradientcolourbluew, Gradientcolouryellow, BlueColor, getFormatedDateForServer } from '../Constants'
import AsyncStorage from '@react-native-community/async-storage'


import DayEndSummaryList from './Component/DayEndSummaryList';
import { getBusinessRequest, getPregnancyRequest } from './actions'
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import backarrow from '../assets/img/backnew.png';
import { ro } from 'date-fns/locale';
import MyData from './helper/MyData';


var cid__my = ''

class App extends Component {

  state = {
    load: false,
    date: '',
    total_sono: '',
    women_sono: '',
  };


  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    alert('please use back arrow this back press is disabled for security reason')
    //mynavigation.goBack(null);
    // this.props.navigation.goBack()
  }

  onChangeText(key, value) {
    this.setState({
      [key]: value
    });
  }
  async onUpdate() {
    this.onChangeText("total_sono", '0')
    this.onChangeText("women_sono", '0')

  }
  async onSubmit() {


    if (this.state.date == '') {
      Alert.alert('please select date');
    }
    else if (this.state.total_sono == '') {
      Alert.alert('please enter total sonography');
    }
    else if (this.state.women_sono == '') {
      Alert.alert('please enter pre sonography');
    }
    else {
      this.cllapiforPregnancy();
    }
  }


  _headerBar = () => {
    return (
      <View style={styles.headerView}>

        <View style={{ width: 50, height: 40, zIndex: 1, alignContent: 'center', justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image
              style={{ width: 35, height: 35, paddingLeft: 10, padding: 5 }}
              source={backarrow}
            />
          </TouchableOpacity>
        </View>

        {this.getNormalHeader()}
      </View>)
  }
  getNormalHeader() {
    return (
      <Text style={{ color: 'white', fontSize: 20, marginLeft: -50, textAlign: 'center', width: '100%', alignContent: 'center', justifyContent: 'center' }}>Day end Summary</Text>

    )
  }

  async cllapiforPregnancy() {

    this.setState({ load: true });

    var data = new URLSearchParams();
    data.append('Totalpatientcount', this.state.total_sono);
    data.append('Totalpragnentwomen', this.state.women_sono);
    data.append('Entrydate', getFormatedDateForServer(this.state.date));
    data.append('cid', cid__my);
    data.append('Month', this.state.date.substring(5, 7));
    data.append('Year', this.state.date.substring(0, 4));
    data.append('MobileNo', MyData.mobile);
    data.append('TokenNo', MyData.token);


    fetch(BASE_URL + "DayEndSummary", {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: data.toString(),
      json: true,
    })
      .then(response => response.json())
      .then(responseJson => {

        this.setState({ load: false, date: '', total_sono: '', women_sono: '' });

        //alert(JSON.stringify(responseJson.Message))

        setTimeout(() => {
          if (responseJson.Status) {
            alert(responseJson.Message)
          }
          else {
            if (responseJson.Message == 'Invalid Request') {
              Alert.alert(
                '',
                'Session Expired please verify again',
                [
                  { text: '', onPress: () => navigation.goBack(null), style: 'cancel' },
                  { text: 'Yes', onPress: () => this.props.navigation.navigate('PinScreen') },

                ],
                {
                  cancelable: true
                }
              );
            }
            else
              alert(responseJson.Message)
          }

        }, 300);
        //this.setState({logindata : responseJson.ResposeData[0],loginui:false})
      })
      .catch(error => {
        this.setState({ load: false });

      });
  }

  async _retrieveData() {


    try {
      const value = await AsyncStorage.getItem('centreid');
      const role = await AsyncStorage.getItem('role')
      cid__my = value;
      //mynavigation = this.props.navigation

      console.warn(value)
      if (value !== null && value !== '') {
        var data = new URLSearchParams();
        data.append('cid', value);
        data.append('role', role)
        var month = new Date().getMonth() + 1
        data.append('month', month);
        var year = new Date().getFullYear()
        data.append('year', year);
        data.append('MobileNo', MyData.mobile);
        data.append('TokenNo', MyData.token);
        console.warn(data.toString())
        this.props.getPregnancyRequest(
          data.toString())
      } else {

      }
    } catch (error) {
      // Error retrieving data
    }
  };
  componentDidMount() {

    this._retrieveData()
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year

    this.setState({
      date:
        date + '-' + month + '-' + year,
    })

  }

  handleClick(name, wom, dat) {
    //  console.warn(name + wom + dat);
    this.setState({ total_sono: name, women_sono: wom, date: dat });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this._headerBar()}
        <View style={{ flex: 1, height: '100%', margin: 2, backgroundColor: Gradientcolourlight }}>


          <View style={{ flexDirection: 'row', height: 50, marginEnd: 5 }}>
            <View style={{
              height: 50,
              alignItems: 'center', flexDirection: 'row', flex: 1
            }} >
              <Text style={{ flex: 1, padding: 10, fontSize: 14, fontWeight: "bold" }}>Date</Text>
              <DatePicker
                style={{ width: '40%', borderColor: '#000', borderWidth: 1, marginEnd: 3 }}
                date={this.state.date}
                mode="date"
                placeholder="select date"
                format="DD/MM/YYYY"
                minDate="05-01-2018"
                maxDate="06-01-2024"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                    borderColor: '#000'
                  },
                  dateInput: {
                    marginLeft: 36,

                  },
                  placeholderText: {
                    color: '#000'
                  }
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => { this.setState({ date: date }) }}
              />
            </View>
          </View>



          <View style={{ flexDirection: 'row', marginTop: -8, marginEnd: 5 }}>
            <View style={{
              alignItems: 'center', flexDirection: 'row', flex: 1
            }} >
              <Text style={{ flex: 1, padding: 10, fontSize: 14, fontWeight: "bold" }}>Total No. of Registered for Sonography</Text>
              <TextInput
                style={styles.input}
                maxLength={5}
                placeholderTextColor="#adb4bc"
                returnKeyType="go"
                autoCapitalize="none"
                value={this.state.total_sono}
                autoCorrect={false}
                onChangeText={value => this.onChangeText("total_sono", value)} />
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginTop: -8, marginEnd: 5 }}>
            <View style={{
              alignItems: 'center', flexDirection: 'row', flex: 1
            }} >
              <Text style={{ flex: 1, padding: 10, fontSize: 14, fontWeight: "bold" }}>No. of pregnant Women Registered for Sonography</Text>
              <TextInput
                style={styles.input}
                maxLength={5}

                value={this.state.women_sono}
                returnKeyType="go"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={value => this.onChangeText("women_sono", value)} />
            </View>
          </View>

          <View style={{
            justifyContent: 'space-between',
            flexDirection: 'row', width: '100%', height: 60
          }} >

            <TouchableOpacity style={{ marginLeft: -30 }} onPress={() => this.onUpdate()}>
              <Text style={styles.button}  >0 Data </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginRight: 45, width: 160 }} onPress={() => this.onSubmit()}>
              <Text style={styles.button} >Submit</Text>
            </TouchableOpacity>

          </View>

          {this.props.loading == false && <DayEndSummaryList
            data={this.props.pregnancyArray}
            func={this.handleClick.bind(this)}

          />}

          {this.props.loading && <ActivityIndicator />}
        </View>
      </SafeAreaView>
    );
  }
};



const mapStateToProps = (state) => {


  return {
    loading: state.loading,
    businesArray: state.businesPoints,
    pregnancyArray: state.pregnancyList,
  }
};

const mapDispatchToProps = {
  getBusinessRequest,
  getPregnancyRequest,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Gradientcolourbluew
  },
  labelInput: {
    color: '#673AB7',
  },
  itemText: {
    fontSize: 18,

  },
  formInput: {
    borderBottomWidth: 1.5,
    marginLeft: 20,
    borderColor: '#000',
  },
  input: {
    borderWidth: 1,
    padding: 5,
    width: '40%',
    fontSize: 14,
    marginEnd: 3,

  },
  headerView: {
    backgroundColor: Gradientcolourbluew, alignItems: 'center', width: '100%', flexDirection: 'row', height: 60,
    justifyContent: 'flex-start', elevation: 5
  },
  button: {
    backgroundColor: BlueColor,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    width: '100%',
    color: 'white',
    marginLeft: 40,
    marginRight: 40,
    fontSize: 14,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 12,
    textAlign: 'center',
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);