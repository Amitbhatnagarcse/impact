/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState ,useEffect} from 'react';
import OrientationLoadingOverlay from "react-native-orientation-loading-overlay";
import {
  Alert,
  SafeAreaView,
  Button,
  Image,
  Platform,
  TextInput,
  Dimensions,
  TouchableOpacity,
  BackHandler,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {BASE_URL,Gradientcolourbluew, Gradientcolourlight} from '../../Constants'
import AsyncStorage from '@react-native-community/async-storage';

import backarrow from '../../assets/img/backnew.png';
import {
  PieChart,
} from "react-native-chart-kit";
import { useSelector, useDispatch } from 'react-redux';
import {getDashboardRequest} from '../actions'
import MyData from '../helper/MyData';
import { da } from 'date-fns/locale';


const DashBoardChart = ({navigation}) => {

  const screenWidth  = Dimensions.get("window").width;
  const [loading , setloading] = useState([false]); 
  const [role , setrole] = useState(['']); 
  const [unitid , setunitid] = useState(['']); 
  const [did , setDid] = useState(['']); 

  const loadings = useSelector((state) => state.loading);
  const [listing ,setListing] = useState([{ "TotFormFInYear": 0,
  "TotFormFInMonth": 0,
  "TotFormFInDate": 0,
  "NewCentresInMonth": 0,
  "NewCentresInYear": 0,
  "TotFormAPending": 0,
  "NewCentresApprovedInYear": 0,
  "NewCentresRejectedInYear": 0,
  "NewCentresPendingInYear": 0,
  "TotFormAReceivedInyear": 0,
  "NewCentresApprovedAllYears": 0,
  "NewCentresRejectedInYearAllYears": 0,
  "NewCentresPendingInYearAllYears": 0,
  "TotFormAReceivedInyearAllYears": 0}])

  const [listingtwo ,setListingtwo] = useState([{ 
  "FormAPending": 0,
  "FormAGranted": 0,
  "FormARejected": 0,
 }])


  const dispatch = useDispatch();

  const readData = async () => {
        
    const role_id = await AsyncStorage.getItem("role")
    setrole(role_id) 
    const unit_id = await AsyncStorage.getItem('unitid')
     setunitid(unit_id) 
     const d_id = await AsyncStorage.getItem('districtid')
     setDid(d_id) 

  
}


const backAction = () => {

  navigation.goBack(null)
  return true;
};
	useEffect(() => {

    readData()

    if(role != '' && unitid !='')
    {
      _retrieveData()
    }
    if(role == '3')
    {
      if(role != '' && unitid !='')
      {
        _retrieveDataform()
      }
    }
    else
    {
      if(role != '' )
      {
        _retrieveDataform()
      }
    }
   
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    
  }, [role,unitid]);
  
  const _retrieveData = async () => {
 
    setloading(true)
    var data = new URLSearchParams();
    data.append('Role',role);
    data.append('UnitId',unitid);
    data.append('MobileNo', MyData.mobile);
    data.append('TokenNo', MyData.token);

    console.warn(JSON.stringify(data.toString()))
      fetch(BASE_URL+"DashboardData", {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data.toString(),
        json: true,
      })
        .then(response => response.json())
        .then(responseJson => {
        console.warn(responseJson)
          setloading(false)
          if(responseJson.Status)
          {
            setTimeout(()=>{
              setListing(responseJson.ResponseData)}, 300);
          }
          else{
            setTimeout(()=>
            {

              if(responseJson.Message =='Invalid request')
              {
                Alert.alert(
                  '',
                 'Session Expired please verify again',
                  [
                    {text: '', onPress: () => navigation.goBack(null), style: 'cancel'},
                    {text: 'Yes', onPress: () =>navigation.navigate('PinScreen')},
                  
                  ],
                  { 
                    cancelable: true 
                  }
                );
              }
              else 
              alert(responseJson.Message)
            },300);   
          }
        })
        .catch(error => {
          //this.setState({ load: false });
          setloading(false)
        
        });
    
   }

   const _retrieveDataform = async () => {
 
    var data = new URLSearchParams();
    data.append('Role',role);
    if(role =='3')
    data.append('Did',did);
    data.append('MobileNo', MyData.mobile);
    data.append('TokenNo', MyData.token);
      fetch(BASE_URL+"RenewalReport", {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data.toString(),
        json: true,
      })
        .then(response => response.json())
        .then(responseJson => {
          if(responseJson.Status)
          {
            setTimeout(()=>{
              setListingtwo(responseJson.ResponseData)}, 300);
          }
          else{
            // setTimeout(()=>{
            //   alert(responseJson.Message)    },300);
          }
        })
        .catch(error => {  
        });
    
   }

  const _headerBar = () => {
    return (
      <View style={styles.headerView}>
      
          <View style={{ width: 50, height: 40,   zIndex: 1,alignContent:'center' ,justifyContent:'center'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={{ width: 35, height: 35,paddingLeft:10,padding:5}}
              source={backarrow}
            />
            </TouchableOpacity>
          </View>

          <Text style={{ color: 'white',  fontSize: 20,marginLeft:-50,  textAlign: 'center', width: '100%',alignContent:'center' ,justifyContent:'center' }}>Impact Dashboard</Text>
        
      </View>)
  };
  
  

  const datapie = [
    {
      name: "Approved",
      population: listing[0].NewCentresApprovedAllYears,
      color: "green",
      legendFontColor: "green",
      legendFontSize: 18,
      
    },
    {
      name: "In Process",
      population: listing[0].NewCentresPendingInYearAllYears,
      color: "#cc8800",
      legendFontColor: "#cc8800",
      legendFontSize: 18
    },
    {
      name: "Rejected",
      population: listing[0].NewCentresRejectedInYearAllYears,
      color: "red",
      legendFontColor: "red",
      legendFontSize: 18
    },
   
  ];
  const datapie2 = [
    {
      name: "Approved",
      population: listingtwo[0].FormAGranted,
      color: "blue",
      legendFontColor: "blue",
      legendFontSize: 18
    },
    {
      name: " In Process",
      population: listingtwo[0].FormAPending,
      color: "brown",
      legendFontColor: "#fff",
      legendFontSize: 18
    },
    {
      name: "Rejected",
      population: listingtwo[0].FormARejected,
      color: "red",
      legendFontColor: "red",
      legendFontSize: 18
    },
   
  ];
  const chartConfig = {
    labelColor: (opacity = 0) => `rgba(126, 99, 7, ${opacity})`,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 1, // optional, default 3
    useShadowColorFromDataset: false // optional
  };
  const chartConfig2={
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726"
    }
  };

 
  return (
    <SafeAreaView style={styles.containersafe}>
        <OrientationLoadingOverlay visible={loading}>
          <View>
            <Image
              source={require("../../assets/img/loadlogo.gif")}
              style={{ width: 80, height: 80 }}
            />
           
          </View>
        </OrientationLoadingOverlay>
     
    <View style={styles.container}>
        {_headerBar()}
     

      <View style={styles.container}>

      <View>
       <View style ={{
        marginTop : 15,
        backgroundColor:'#ffffff',
        width:'100%',
         shadowColor: '#cc8800',
         shadowOffset: { width: 0, height: 1 },
         shadowOpacity: 0.9,
         shadowRadius: 2,
         padding:10,
         elevation: 2}}> 
      
      <Text style={{ color: 'black',  fontSize: 20,  textAlign: 'center',alignContent:'center' ,justifyContent:'center',paddingLeft :10,paddingRight:10 }}>Registration Application Received Online</Text>
           
         </View>
       <View style ={{
        marginTop : 15,
        backgroundColor:'#ffffff',
         shadowColor: '#cc8800',
         shadowOffset: { width: 10, height: 1 },
         shadowOpacity: 0.9,
         shadowRadius: 2,
         elevation: 2}}>
      
      <PieChart
        data={datapie}
        width={screenWidth-2}
        height={245}
        showLegend = {false}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="5"
        absolute
      />
      </View>
      </View>
      
     
      <View style ={{
  marginTop : 15,
  width:'100%',
  backgroundColor:'#ffffff',
   shadowColor: '#cc8800',
   width:'100%',
   shadowOffset: { width: 0, height: 1 },
   shadowOpacity: 0.9,
   shadowRadius: 2,
   padding:10,
   elevation: 2}}>

<Text style={{ color: 'black',  fontSize: 20,  textAlign: 'center', width: '100%',alignContent:'center' ,justifyContent:'center',paddingLeft :40,paddingRight:40 }}>Renewal  Application Received Online</Text>
     
   </View>
      <View style ={{
  marginTop : 15,
  backgroundColor:'#cc8800',
   shadowColor: '#cc8800',
   shadowOffset: { width: 0, height: 1 },
   shadowOpacity: 0.9,
   shadowRadius: 2,
   elevation: 2}}>
     
<PieChart
  data={datapie2}
  width={screenWidth-2}
  height={245}
  showLegend = {false}
  chartConfig={chartConfig2}
  accessor="population"
  backgroundColor="transparent"
  paddingLeft="5"

  absolute
/>
</View>
  </View>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Gradientcolourlight,
  },
  containersafe: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Gradientcolourbluew,
  },
  textInput: {
    borderBottomColor: '#151313',
    borderBottomWidth: 1,
    marginRight: 10,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  resultTitle: {
    marginTop: 20,
    fontSize: 20,
  },
  result: {
    fontSize: 14,
    margin: 10,
  },
  optionsRow: {
    justifyContent: 'space-between',
  },
  searchPackageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  headerView: {
    backgroundColor: Gradientcolourbluew, alignItems: 'center', width: '100%', flexDirection: 'row', height: 60,
      justifyContent: 'flex-start',elevation:5,
    },
});

export default DashBoardChart;
