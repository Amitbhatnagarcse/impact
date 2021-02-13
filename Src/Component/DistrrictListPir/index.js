import React, { useEffect,useState } from "react"
import { View, Text ,Image ,TouchableOpacity ,SafeAreaView,FlatList,BackHandler} from 'react-native';
import Styles from './style';
import AsyncStorage from '@react-native-community/async-storage';
import pngIcons  from '../../../assets/img/images';
import {BASE_URL,Gradientcolourbluew} from '../../../Constants'
import FooterComponent from '../../CommonComponent/Footer'
import OrientationLoadingOverlay from "react-native-orientation-loading-overlay";
import Item from "./Item";
import MyData from "../../helper/MyData";
import { SinglePickerMaterialDialog } from 'react-native-material-dialog';
import down from '../../../assets/img/downspinner.png';
import { tr } from "date-fns/locale";
var relation = {
  "relation_array": [
    { "Code": 2012, "CodeText": "2012" },
    { "Code": 2013, "CodeText": "2013" },
    { "Code": 2014, "CodeText": "2014" },
    { "Code": 2015, "CodeText": "2015" },
    { "Code": 2016, "CodeText": "2016" },
    { "Code": 2017, "CodeText": "2017" },
    { "Code": 2018, "CodeText": "2018" },
    { "Code": 2019, "CodeText": "2019" },
    { "Code": 2020, "CodeText": "2020" },
    { "Code": 2021, "CodeText": "2021" },
  ]
};


const DistrrictListPir = ( {navigation , route} ) => {

 
    const [role ,setrole] = useState('')

    const [district ,setDistrict] = useState('')
    const [date , setDate] = useState('')
    const [yearselect ,setYear] = useState('')
    const [userid ,setUserid] = useState('')
    const [unitid ,setUnitid] = useState('')
    const [loading, setloading] = useState(false);   
    const [listingall, setListingAll] = useState([]);
    const [singlePickerVisible, setsinglePickerVisible] = useState(false);

  
    
    const deleteItemById = async (id) => {
      }
 
    const  _renderItem = (item , index) => 
    {
      return (
      <Item item = {item}  index = {index}  navigation = {navigation} role ={yearselect} actiondel={deleteItemById}/>  
      )
    }
    const _retrieveData = async (data ,front,id) => {

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
        .then(responseJson => 
          {

          setloading(false)
          if(responseJson.Status)
          {
            console.warn(JSON.stringify(responseJson.ResponseData))

              console.warn('response' + JSON.stringify(responseJson.ResponseData))
              if(role == '3')
              {
                data = responseJson.ResponseData.filter(function(item){
                  return item.DNameEnglish == district;
               })
               setListingAll(data);
              }
              else
              setListingAll(responseJson.ResponseData); 
            setTimeout(()=>{
              
           },1000)            
           
            }
            else{
              alert(responseJson.Message)
            }
        })
        .catch(error => {
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
                  source={pngIcons.backnew}
                />
                </TouchableOpacity>
              </View>
    
              <Text style={{ color: 'white',  fontSize: 20,marginLeft:-50,  textAlign: 'center', width: '100%',alignContent:'center' ,justifyContent:'center' }}>District PIR</Text> 
          </View>    
          )
         };

         const readData = async () => {
        
            const role_id = await AsyncStorage.getItem("role")
          
            if (role_id !== null) {
                setrole(role_id) 
                                        
              }
          var  district_name = await AsyncStorage.getItem('districtname');
          if (district_name !== null) {
            setDistrict(district_name)
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
              var data = new URLSearchParams();
              //data.append('Unitid',item);
              var yearr = new Date().getFullYear(); //Current Year
              setYear(yearr)
              data.append('Year',yearr);
              data.append('Role','3');
              data.append('MobileNo', MyData.mobile);
              data.append('tv.Year',yearr);
              data.append('TokenNo', MyData.token);
            
              _retrieveData(data ,'GetPIRDistCount')
            }

            const unsubscribe = navigation.addListener('focus', () => {
  
              BackHandler.addEventListener("hardwareBackPress", backAction);
  
              return () =>
                BackHandler.removeEventListener("hardwareBackPress", backAction);
            });
        
            // Return the function to unsubscribe from the event so it gets removed on unmount
            return unsubscribe;
            
          }, [role,district]);

          
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Gradientcolourbluew}} > 
    <View style={Styles.container}>

    {_headerBar()}  

    <SinglePickerMaterialDialog
          title={'Select Year'}
          scrolled
          items={relation.relation_array.map((row, index) =>
            ({ value: row.Code, label: row.CodeText }))}
          visible={singlePickerVisible}
          selectedItem={''}
          onCancel={() => setsinglePickerVisible(true) }
          onOk={result => {
            if (typeof (result.selectedItem) !== 'undefined' || result.selectedItem != null) {

              setYear(result.selectedItem.value)
              // this.setState({ singlePickerVisible: false });
              setsinglePickerVisible(false)
             

              var data = new URLSearchParams();
              //data.append('Unitid',item);
           
              data.append('Year',result.selectedItem.value);
              data.append('Role','3');
              data.append('MobileNo', MyData.mobile);
              data.append('tv.Year',result.selectedItem.value);
              data.append('TokenNo', MyData.token);
            
              _retrieveData(data ,'GetPIRDistCount')
              //this.cllapiforselectdis(result.selectedItem.value)

            } else {
              alert('please select year');
            }

          }}
        />

    <View style={Styles.inputboxview} >   
        <Text style={Styles.inputtext}>Year</Text>
       <TouchableOpacity style={{width:'50%',flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',}} onPress = {() => setsinglePickerVisible(true)}>
         <Text style={Styles.inputliketext}
              >{yearselect}</Text>
              <Image source={down} style={{position: "absolute", bottom: 0, right: 5,height:20,width:20,  justifyContent: 'center',
        marginBottom:3,alignItems: 'center',}}/>
           </TouchableOpacity>
          </View>
   
        <FlatList
              style={{
               flex:1,
             width:'100%'}}
              renderItem={(item , index) => _renderItem(item.item , index )}
              data={listingall}
            />
   
      

    <OrientationLoadingOverlay visible={loading}>
          <View>
            <Image
              source={require("../../../assets/img/loadlogo.gif")}
              style={{ width: 80, height: 80 }}
            />
           
          </View>
        </OrientationLoadingOverlay>
  
    
        </View>
<FooterComponent/>
</SafeAreaView> 
 );
};

export default DistrrictListPir;