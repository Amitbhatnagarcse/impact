import React, { useEffect, useRef, useState } from "react"
import { Text,Alert ,SafeAreaView,View ,TextInput,StyleSheet,TouchableOpacity,Image,Modal,Platform,FlatList} from 'react-native';
import Styles from './style';
import AsyncStorage from '@react-native-community/async-storage';

import backarrow from '../../../assets/img/backnew.png'

 import Item from "./Item";
 import OrientationLoadingOverlay from "react-native-orientation-loading-overlay";
 import { requestMultiple, checkMultiple, PERMISSIONS, checkNotifications, RESULTS, requestNotifications, openSettings } from 'react-native-permissions';
 import {BASE_URL,Yellowcolour} from '../../../Constants'


const PirList = ({navigation }) => {

    const [role ,setrole] = useState('')
    const [district_id ,setDistrict] = useState('')
    const [loading , setloading] = useState(false)
    const [listing ,setListing] = useState([])
    const [permisssion, setPermission] = useState(RESULTS.DENIED)


    const allowStoragePermission =  () => {
    
      if (permisssion == RESULTS.DENIED) {
          requestMultiple([PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE]).then(
              (statuses) => {
                
                  if (Platform.OS == 'android') {
  
                    if(statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] == RESULTS.BLOCKED)
                    {
                      
                      openSettings().catch(() => console.warn('cannot open settings'));
                      return;
                    }
                    setPermission( statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE])  
                  }
  
              },
          );
  
      }
      else {
        openSettings().catch(() => console.log('cannot open settings'));
      }
      }
    

    const readData = async () => {
        
          const role_id = await AsyncStorage.getItem("role")
          if (role_id !== null) {
            setrole(role_id)                         
          }
          var  district_i = await AsyncStorage.getItem('districtid')
          setDistrict(district_i)
      
      }
 
      const deletecnfrm = async (id) =>
      {
        var data = new URLSearchParams();
        data.append('PirId',id);
        data.append('Role',role)
        _retrieveData(data ,'DeletePIReport',id)
      }
      const deleteItemById = async (id) => {
        
        // const filteredData = listing.filter(item => item.PirId !== id);
        Alert.alert(
          '',
          'Are You Sure you want to delete',
          [
            {text: 'No', onPress: () => console.log('No button clicked'), style: 'cancel'},
            {text: 'Yes', onPress: () => deletecnfrm(id)},
          
          ],
          { 
            cancelable: true 
          }
        );
        // setListing(filteredData)
      
   
      }
      const editdata = async(item) => {

        navigation.navigate('InspectionReport' , { id : item } )

      }


  const _retrieveData = async (data ,front,p_id) => {

  
    setloading(true)
  
      fetch(BASE_URL+front, {
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
              console.log(responseJson)
            if(front == 'GetPIReportByDID')
            {
              setListing(responseJson.ResponseData)
            }
          
            if(front == 'DeletePIReport')
            {
              
              const filteredData = listing.filter(item => item.PirId !== p_id);
              setListing(filteredData)
            }
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
      <View style={Styles.headerView}>
      
          <View style={{ width: 50, height: 40,   zIndex: 1,alignContent:'center' ,justifyContent:'center'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
               <Image
              style={{ width: 35, height: 35,paddingLeft:10,padding:5}}
              source={backarrow}
            />
            </TouchableOpacity>
          </View>

          <Text style={{ color: 'black',  fontSize: 20,marginLeft:-50,  textAlign: 'center', width: '100%',alignContent:'center' ,justifyContent:'center' }}>Inspection Report List</Text> 
      </View>    
      )
     };

   const  _renderItem = (item , index,navigation_) => 
     {
      return (
       <Item item = {item}  index = {index}  navigation = {navigation_} actionPer={deleteItemById} editfun ={editdata} role ={role}/>  
      )
    }

    useEffect(() => {
   
        readData()
        if(district_id != '' && role != '')
        {
          var data = new URLSearchParams();
          data.append('Year','2020');
          data.append('Did',district_id);
          data.append('Role',role);
          

         _retrieveData(data ,'GetPIReportByDID')
         var date = new Date().getDate(); //Current Date
         var month = new Date().getMonth() + 1; //Current Month
         var year = new Date().getFullYear(); //Current Year
         const unsubscribe = navigation.addListener('focus', () => {
          _retrieveData(data ,'GetPIReportByDID')
         });
     
         // Return the function to unsubscribe from the event so it gets removed on unmount
         return unsubscribe;
          allowStoragePermission()
         //allowLocationPermission()
        }
        // dispatch(getDashboardRequest(data.toString()))
      }, [district_id,role]);

      return (
        <SafeAreaView style={{flex: 1, backgroundColor: Yellowcolour}} >
            
          <View style={Styles.container}>
          <OrientationLoadingOverlay visible={loading}>
          <View>
            <Image
              source={require("../../../assets/img/loadlogo.gif")}
              style={{ width: 80, height: 80 }}
            />
           
          </View>
        </OrientationLoadingOverlay>
          {_headerBar()}

          <FlatList
              style={{
               flex:1,
              backgroundColor:'#fff',width:'100%'}}
              renderItem={(item, index) => _renderItem(item.item , index,navigation)}
              data={listing}
              numColumns={1}
              bounces={false}
            />
            
          
      
           
          </View>
          <TouchableOpacity   onPress={() => navigation.navigate('InspectionReport')}>
             <Text style={{	backgroundColor:'#cc8800',padding:5,color:'white',paddingTop:15,height:60,fontSize:18,
		borderColor: 'white',width:'100%',textAlign:'center'}} >ADD Inspection Report</Text>
        </TouchableOpacity>
          </SafeAreaView> 
      )

}
export default PirList;