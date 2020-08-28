import React, { useEffect, useRef, useState } from "react"
import { Text ,SafeAreaView,View ,TextInput,StyleSheet,TouchableOpacity,Image,AsyncStorage,Modal,Platform,FlatList} from 'react-native';
import Styles from './style';
import backarrow from '../../../assets/img/backnew.png'
import down from '../../../assets/img/downspinner.png';
import file_upload from '../../../assets/img/file_upload.png';
 import Item from "./Item";
 import OrientationLoadingOverlay from "react-native-orientation-loading-overlay";


const PirList = ({navigation}) => {

    const [role ,setrole] = useState('')
    const [district_id ,setDistrict] = useState('')
    const [loading , setloading] = useState(false)
    const [listing ,setListing] = useState([])

    const readData = async () => {
        
          const role_id = await AsyncStorage.getItem("role")
          if (role_id !== null) {
            setrole(role_id)                         
          }
          var  district_i = await AsyncStorage.getItem('districtid')
          setDistrict(district_i)
      
      }

      const deleteItemById = async (id) => {
        
        // const filteredData = listing.filter(item => item.PirId !== id);
        // setListing(filteredData)
        var data = new URLSearchParams();
        data.append('PirId',id);
        data.append('Role','3')
        _retrieveData(data ,'DeletePIReport',id)
   
      }
      const editdata = async(item) => {

        navigation.navigate('InspectionReport' , { id : item.PirId } )

      }


  const _retrieveData = async (data ,front,p_id) => {

    console.warn(district_id + " cal " +role)
    setloading(true)
  
      fetch("http://164.100.153.176/pcpndtdemo/api/User/"+front, {
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
            setListing(responseJson.ResponseData)
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
       <Item item = {item }  index = {index}  navigation = {navigation_} actionPer={deleteItemById} editfun ={editdata}/>  
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
       
        
         //allowLocationPermission()
        }
        // dispatch(getDashboardRequest(data.toString()))
      }, [district_id,role]);

      return (
        <SafeAreaView style={Styles.container} >
            
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
             <TouchableOpacity    onPress={() => navigation.navigate('InspectionReport')}>
             <Text style={{	backgroundColor:'#cc8800',padding:5,color:'white',
		borderColor: 'white',width:'100%',textAlign:'center'}} >ADD Inspection Report</Text>
        </TouchableOpacity>
           
          </View>
          </SafeAreaView>
      )

}
export default PirList;