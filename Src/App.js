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
import {BASE_URL,Gradientcolourlight,Gradientcolourbluew,Gradientcolouryellow, BlueColor} from '../Constants'
import AsyncStorage from '@react-native-community/async-storage'


import DayEndSummaryList from './Component/DayEndSummaryList';
import {getBusinessRequest,getPregnancyRequest} from './actions'
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import backarrow from '../assets/img/backnew.png';
import { ro } from 'date-fns/locale';


class App extends Component {
 
  state = {
    load : false,
    date: '',
    total_sono: '',
    women_sono: ''
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
  async onSubmit()
  {
   if(this.state.date == '')
   {
     Alert.alert('please select date');
   }
   else if (this.state.total_sono == '')
   {
    Alert.alert('please enter total sonography');
   }
   else if (this.state.women_sono == '')
   {
    Alert.alert('please enter pre sonography');
   }
   else{
     this.cllapiforPregnancy();
   }
  }
  

  _headerBar = () => {
    return (
      <View style={styles.headerView}>
      
          <View style={{ width: 50, height: 40,   zIndex: 1,alignContent:'center' ,justifyContent:'center'}}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image
              style={{ width: 35, height: 35,paddingLeft:10,padding:5}}
              source={backarrow}
            />
            </TouchableOpacity>
          </View>

        {this.getNormalHeader()}
      </View>)
  }
  getNormalHeader(){
    return(
      <Text style={{ color: 'black',  fontSize: 20,marginLeft:-50,  textAlign: 'center', width: '100%',alignContent:'center' ,justifyContent:'center' }}>Day end Summary</Text>

    )
  }

  async cllapiforPregnancy() {

    this.setState({ load: true });
 
   var data = new URLSearchParams();
   data.append('Totalpatientcount', this.state.total_sono);
   data.append('Totalpragnentwomen', this.state.women_sono);
   data.append('Entrydate', this.state.date);
   data.append('cid', '3289');
   data.append('Month', '2');
   data.append('Year', '2020');
   
    
     fetch(BASE_URL+"DayEndSummary", {
       method: "POST",
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       body: data.toString(),
       json: true,
     })
       .then(response => response.json())
       .then(responseJson => {
        
         this.setState({ load: false ,date : '',total_sono:'',women_sono:''});
         //console.warn(JSON.stringify(responseJson.ResposeData));
         alert(JSON.stringify(responseJson.Message))
         //this.setState({logindata : responseJson.ResposeData[0],loginui:false})
       })
       .catch(error => {
         this.setState({ load: false });
       
       });
   }
 
  async _retrieveData  () {
  
   
    try {
      const value = await AsyncStorage.getItem('centreid');
      const role = await AsyncStorage.getItem('role')

      //mynavigation = this.props.navigation
     
      console.warn(value)
      if (value !== null && value !== '') {
        var data = new URLSearchParams();
        data.append('cid', value);
        data.append('role',role)
        var month = new Date().getMonth() + 1
        data.append('month',month);
        var year = new Date().getFullYear()
        data.append('year', year);
        console.warn(data.toString())
        this.props.getPregnancyRequest(
          data.toString())
      }else{

      }
    } catch (error) {
      // Error retrieving data
    }
  };
  componentDidMount(){
 
    this._retrieveData()
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

  
  }

  handleClick( name ,wom , dat){
  //  console.warn(name + wom + dat);
      this.setState({ total_sono: name ,women_sono : wom , date : dat});
 }
  
  render() {
     return (
      <SafeAreaView style={styles.container}>
          {this._headerBar()}
    <View style={{flex:1,height:'100%',margin:2,backgroundColor:Gradientcolourlight}}>  
  

    <View style={{flexDirection: 'row',height:50}}>
        <View style={{height:50,
    alignItems: 'center',flexDirection:'row',flex:1}} >
        <Text style={{flex:1,padding:10,fontSize:14}}>Date</Text>
        <DatePicker
        style={{width: '40%',borderColor:'#000',borderWidth:1}}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="YYYY/MM/DD"
        minDate="2018-05-01"
        maxDate="2024-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0,
            borderColor:'#000'
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />             
          </View>
      </View>



    <View style={{flexDirection: 'row',height:50,marginTop:-8}}>
        <View style={{height:50,
    alignItems: 'center',flexDirection:'row',flex:1}} >
        <Text style={{flex:1,padding:10,fontSize:14}}>Total No. of Registered for Sonography</Text>
        <TextInput
                        style={styles.input}
                        maxLength={5}
                        placeholderTextColor="#adb4bc"
                        returnKeyType="go"
                        autoCapitalize="none"
                        value = {this.state.total_sono}
                        autoCorrect={false}
                        onChangeText={value => this.onChangeText("total_sono", value)}  />
          </View>
      </View>

      <View style={{flexDirection: 'row',height:50,marginTop:-8}}>
        <View style={{height:50,
    alignItems: 'center',flexDirection:'row',flex:1}} >
        <Text style={{flex:1,padding:10,fontSize:14}}>No. of pregnant Women Registered for Sonography</Text>
        <TextInput
                        style={styles.input}
                        maxLength={5}

                        value = {this.state.women_sono}
                        returnKeyType="go"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={value => this.onChangeText("women_sono", value)}  />
          </View>
      </View>

         <TouchableOpacity  onPress={() => this.onSubmit()}>
          <Text style={styles.button}>Submit</Text>
        </TouchableOpacity>
        
        {this.props.loading ==false && <DayEndSummaryList
         data={this.props.pregnancyArray}
         func={this.handleClick.bind(this)}
       
         />}
         
         {this.props.loading &&  <ActivityIndicator/>}
         </View>
         </SafeAreaView>
    );
     }
};



const mapStateToProps = (state) => {  
 
  
  return {
    loading: state.loading,
    businesArray: state.businesPoints,
    pregnancyArray : state.pregnancyList,
  }
};

const mapDispatchToProps = {
  getBusinessRequest,
  getPregnancyRequest,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Gradientcolourbluew
  },
  labelInput: {
    color: '#673AB7',
  },
  itemText: {
    fontSize:18,
   
  },
  formInput: {    
    borderBottomWidth: 1.5, 
    marginLeft: 20,
    borderColor: '#000',       
  },
  input: {
    borderWidth: 1,
    padding:5,
    width:'15%',
    fontSize:14,
  },
  headerView: {
  backgroundColor: Gradientcolourbluew, alignItems: 'center', width: '100%', flexDirection: 'row', height: 60,
    justifyContent: 'flex-start',elevation:5
  },
  button: {
    backgroundColor: BlueColor,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    color: 'white',
   marginLeft:100,
   marginRight:100,
    fontSize: 14,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 12,
    textAlign:'center',
  }
});


export default connect(mapStateToProps,mapDispatchToProps)(App);
