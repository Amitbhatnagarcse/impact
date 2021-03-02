
import React, { useEffect, useRef, useState } from "react"
import { Text ,SafeAreaView,View ,TextInput,StyleSheet,TouchableOpacity,Image,Modal,Platform,Alert,BackHandler} from 'react-native';
import Styles from './style';
import AsyncStorage from '@react-native-community/async-storage';

import DatePicker from 'react-native-datepicker';
import OrientationLoadingOverlay from "react-native-orientation-loading-overlay";
import backarrow from '../../../assets/img/backnew.png'
import { requestMultiple, PERMISSIONS, checkNotifications, RESULTS, requestNotifications, openSettings } from 'react-native-permissions';

import {BASE_URL, BlueColor ,getFormatedDateForServer} from '../../../Constants'
import Geolocation from '@react-native-community/geolocation';
import { da, fil } from "date-fns/locale";
import MyData from "../../helper/MyData";

var pid_id = ''


var block_id =''
var _unit =''
var o_role = ''
var user_id = ''

const InspectionReportView = ({navigation ,route}) => {

  const [pir_no, setPir] = useState("")  
  const [district_name, setDistrict_name] = useState("")  
  const [center_name, setCenter_name] = useState("")  
  const [center_id, setCenter_id] = useState("")  
  const [center_address ,setCenterAdddrress] = useState("")
  const [center_reg_no , setRegNo] = useState("")
  const [date , setDate] = useState("")
  const [time , setTime] = useState("select time")
  const [authority , setAuthority] = useState("")
  const [loading , setloading] = useState(false)

  const [role ,setrole] = useState([])



  const [maxdate,setMaxDate] = useState('')
  const [show,setShow] = useState(false)     
 

    const readData = async () => {
   
        const role_id = await AsyncStorage.getItem("role")
        var my_role = await AsyncStorage.getItem("orole");
        if (my_role !== null)
        {
          o_role = my_role;
        }
        
        if (role_id !== null) {
        setrole(role_id)
        }
        block_id = await AsyncStorage.getItem('blockid')
        _unit = await AsyncStorage.getItem('unitid')
        setUnitId(_unit)
       
       if(role_id == '3')
       {
        var districtidv = await AsyncStorage.getItem('districtid')
        if (districtidv !== null) {
          setDistrict(districtidv)
        }
        var districtnamev = await AsyncStorage.getItem('districtname')
        if (districtnamev !== null) {
          setDistrict_name(districtnamev)
          }
       }
       if(role_id == '1')
       {
         user_id = await AsyncStorage.getItem('userid')   
          const{ did } = route.params; 
          setDistrict(did)
          var data = new URLSearchParams();
          data.append('Did',did);
          data.append('MobileNo', MyData.mobile);
          data.append('TokenNo', MyData.token);
          _retrieveData(data.toString() ,'GetCentersByDID')
       }
       
     
    }
  

  

    const backAction = () => {

      navigation.goBack(null)
      return true;
    };
   
   
    useEffect(() => {
    
    readData()
    if(role != '')
    {
      try{
        const{ id } = route.params; 
        pid_id = ''+id.PirId
        setPir(''+id.PIRNo)
        //setDate(id.PIRDate)
        var datee = String(id.PIRDate).split('/');
        setDate(datee[0] + '/' + datee[1] + '/' + datee[2] )
        setTime(id.PIRTime)
        setAuthority(id.PIRAppAuth)
        setCenter_id(id.Cid)
        setCenter_name(id.CenterName)
        var data = new URLSearchParams();
        data.append('Cid',id.Cid);
        data.append('MobileNo', MyData.mobile);
        data.append('TokenNo', MyData.token);
        _retrieveData(data.toString() ,'GetCenterDetail')
       
      }
      catch(e)
      {
      }   
      try{
        const{ district_name } = route.params;
        setDistrict_name(district_name)
      }
      catch(e){}
  
      if(role =='3')
      {
        
        var data = new URLSearchParams();
        data.append('Did',district_id);

        data.append('MobileNo', MyData.mobile);
        data.append('TokenNo', MyData.token);

        _retrieveData(data.toString() ,'GetCentersByDID')
      }

      var date = new Date().getDate(); //Current Date
      var month = new Date().getMonth() + 1; //Current Month
      var year = new Date().getFullYear(); //Current Year
      setMaxDate(date + '/' + month + '/' + year)
      
     }
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, [role,district_id]);


  const _retrieveData = async (data ,front) => {
   
    console.log( 'data' +data.toString);
    console.log( 'data' +front);
    setloading(true)
      fetch(BASE_URL+front, {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data,
        json: true,
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log( 'data' + responseJson.toString);

          setloading(false)
          if(responseJson.Status)
          console.log( 'front' +  front ,responseJson.ResponseData)
          {
           
            if(front == 'GetAllDistrict')
            {
              setDistrictListing(responseJson.ResponseData)
            }
             if(front =='GetCentersByDID')
             {
                
                  if(o_role != null && o_role == '4')
                  {
                    try{
                      const filtereddata =  responseJson.ResponseData.filter(person => person.BlockId == block_id);
                      setCenterListing(filtereddata)
                    }
                   catch(e)
                   {

                   }
                  }
                  else
                  {
                    setCenterListing(responseJson.ResponseData)
                  }
              
             }
              if(front == 'GetCenterDetail')
              {
                setCenterAdddrress(responseJson.ResponseData.CenterAddress)
                setRegNo(responseJson.ResponseData.RegNo +  " "+ responseJson.ResponseData.ValidThrough)
              }
              if(front == 'SavePIReport')
                  { 
                    Alert.alert(  
                      'IMPACT',  
                    responseJson.Message,  
                      [  
                          {text: 'OK', onPress: () => navigation.goBack()},  
                      ]  
                  );  
                  }
            }
            
        }
      
        
        )
        .catch(error => {
          alert(''+error)
          //this.setState({ load: false });
          setloading(false)
        
        });
    
   }

   const _headerBar = () => {
    return (
      <View style={Styles.headerView}>
      
          <View style={{ width: 50, height: 40,   zIndex: 1,alignContent:'center' ,justifyContent:'center'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
               <Image
              style={{ width: 35, height: 35,paddingLeft:10,padding:5}}
              source={backarrow}
            />
            </TouchableOpacity>
          </View>

          <Text style={{ color: 'white',  fontSize: 20,marginLeft:-50,  textAlign: 'center', width: '100%',alignContent:'center' ,justifyContent:'center' }}>Inspection Report</Text>

      </View>
   )
   };
    return (
      <SafeAreaView style={Styles.containersafe} >
          
        <View style={Styles.container}>
        {_headerBar()}
          
        <OrientationLoadingOverlay visible={loading}>
          <View>
            <Image
              source={require("../../../assets/img/loadlogo.gif")}
              style={{ width: 80, height: 80 }}
            />
           
          </View>
        </OrientationLoadingOverlay>

     
        <View style={Styles.inputboxview} >
        <Text style={Styles.inputtext}> District </Text>
  
         <Text style={Styles.inputliketext}
              >{district_name}</Text>
              {/* <Image source={down} style={{position: "absolute", bottom: 0, right: 5,height:20,width:20,  justifyContent: 'center',
        marginBottom:3,alignItems: 'center',}}/> */}
          </View>

          <View style={Styles.inputboxview} >
        <Text style={Styles.inputtext}> Center Name </Text>
       
         <Text style={Styles.inputliketext}
              >{center_name}</Text>
             
          </View>
 

          <View style={Styles.inputboxview} >
        <Text style={Styles.inputtext}>Centre Address</Text>
        <Text style={Styles.input}  >{center_address} </Text>
          </View>

          <View style={Styles.inputboxview} >
        <Text style={Styles.inputtext}>Center Reg No. Validity Date</Text>
        <Text style={Styles.input}  > { center_reg_no } </Text>
          </View>

          <View style={Styles.inputboxview} >
        <Text style={Styles.inputtext}>PIR No.</Text>
        <Text
         style={Styles.inputfixheight}>
         {pir_no}
         </Text>
          </View>

          <View style={Styles.inputboxview} >
        <Text style={Styles.inputtext}>Appropriate Authority</Text>
        <Text
            style={Styles.inputfixheight}>
                  {authority}
                        </Text>
                       
                        </View>

          <View style={Styles.inputboxview} >
        <Text style={Styles.inputtext}>Date</Text>
        <DatePicker
        style={{width: '50%',borderColor:'#000',borderWidth:1,height:40,backgroundColor:'white'}}
        date={date}
        mode="date"
        placeholder="select date"
        format="DD/MM/YYYY"
        minDate="2018/05/01"
        maxDate={maxdate}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0,
            borderColor:'#fff'
          },
          dateInput: {
            marginLeft: 34
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {setDate(date)}}
      />  
          </View>
          <View style={Styles.inputboxview} >
        <Text style={Styles.inputtext}>Time</Text>
        { !show &&(
        <TouchableOpacity style={{width:'50%',flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',}} onPress = {() => setShow(false)}>
         <Text style={Styles.inputlikefile}
              >{time}</Text>
  
           </TouchableOpacity>
        )}
          
       
        </View>
         
          </View>

       
       </SafeAreaView>
    );
  }       

export default InspectionReportView;