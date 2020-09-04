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

import {BASE_URL} from '../../Constants'

import backarrow from '../../assets/img/backnew.png';
import {
  PieChart,
} from "react-native-chart-kit";
import { useSelector, useDispatch } from 'react-redux';
import {getDashboardRequest} from '../actions'


const DashBoardChart = ({navigation}) => {

  const screenWidth  = Dimensions.get("window").width;
  const [loading , setloading] = useState([false]); 
  const loadings = useSelector((state) => state.loading);
  const [listing ,setListing] = useState([{"TotFormFInYear":20000,"TotFormFInMonth":20000,"TotFormFInDate":20000,"NewCentresInMonth":20000,"NewCentresInYear":20000,"TotFormAPending":20000}])

  const dispatch = useDispatch();
	useEffect(() => {

    //_retrieveData()
    
    // dispatch(getDashboardRequest(data.toString()))
    
  }, [loadings]);
  
  const _retrieveData = async () => {
 
    setloading(true)
    var data = new URLSearchParams();
    data.append('Role','2');
    data.append('UnitId','3');
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
          setloading(false)
          if(responseJson.Status)
          {
            setListing(responseJson.ResponseData)
          console.warn(JSON.stringify(responseJson));
          }
          else{
            alert(responseJson.Message)
          }
        })
        .catch(error => {
          //this.setState({ load: false });
          setloading(false)
        
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

          <Text style={{ color: 'black',  fontSize: 20,marginLeft:-50,  textAlign: 'center', width: '100%',alignContent:'center' ,justifyContent:'center' }}>Impact Dashboard</Text>
        
      </View>)
  };
  
  

  const datapie = [
    {
      name: "Current Year",
      population: listing[0].NewCentresInYear,
      color: "rgba(126, 99, 7, 0.7)",
      legendFontColor: "#000",
      legendFontSize: 18,
      
    },
    {
      name: "Current Month",
      population: listing[0].NewCentresInMonth,
      color: "brown",
      legendFontColor: "#cc8800",
      legendFontSize: 18
    },
    {
      name: "Approval Pending ",
      population: listing[0].TotFormAPending,
      color: "red",
      legendFontColor: "#cc8800",
      legendFontSize: 18
    },
   
  ];
  const datapie2 = [
    {
      name: "Tot In Year",
      population: listing[0].TotFormFInYear,
      color: "rgba(74, 96, 232, 0.8)",
      legendFontColor: "#fff",
      legendFontSize: 18
    },
    {
      name: "Tot In Month",
      population: listing[0].TotFormFInMonth,
      color: "brown",
      legendFontColor: "#fff",
      legendFontSize: 18
    },
    {
      name: "Tot In Date",
      population: listing[0].TotFormFInDate,
      color: "red",
      legendFontColor: "#fff",
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
    <SafeAreaView style={styles.container}>
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

<Text style={{ color: 'black',  fontSize: 20,  textAlign: 'center',alignContent:'center' ,justifyContent:'center',paddingLeft :40,paddingRight:40 }}>Registration Application Received</Text>
     
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

<Text style={{ color: 'black',  fontSize: 20,  textAlign: 'center', width: '100%',alignContent:'center' ,justifyContent:'center',paddingLeft :40,paddingRight:40 }}>Form F Received</Text>
     
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
    backgroundColor: '#F5FCFF',
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
    backgroundColor: '#cc8800', alignItems: 'center', width: '100%', flexDirection: 'row', height: 60,
      justifyContent: 'flex-start',elevation:5,
    },
});

export default DashBoardChart;
