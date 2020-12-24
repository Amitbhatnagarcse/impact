import React, { useEffect,useState } from "react"
import { View, Text,TextInput ,Image ,TouchableOpacity ,SafeAreaView,FlatList,BackHandler, Alert} from 'react-native';
import Styles from './style';
import AsyncStorage from '@react-native-community/async-storage';
import pngIcons  from '../../../assets/img/images';
import {BASE_URL,Gradientcolourbluew} from '../../../Constants'
import FooterComponent from '../../CommonComponent/Footer'
import OrientationLoadingOverlay from "react-native-orientation-loading-overlay";
import RadioForm from 'react-native-simple-radio-button';
import Item from "./Item";
import { da } from "date-fns/locale";
import MyData from "../../helper/MyData";



const DistrrictListProfile = ( {navigation , route} ) => {

  const { item } = route.params;


    const [role ,setrole] = useState('')
    const [userid ,setUserid] = useState('')
    const [unitid ,setUnitid] = useState('')
    const [loading, setloading] = useState(false);
    const [flagvalue, setFlagvalue] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [listingfilter, setListingfilter] = useState([]);
    const [listingall, setListingAll] = useState([]);

    
    const radio_props = [
      {label: 'Functional Centres', value: '0' },
      {label: 'Non Functional Centres', value: '1' }
    ];



    const deletecnfrm = async (id) =>
    {
      var data = new URLSearchParams();
      data.append('FeedbackId',id);
      data.append('Role','role')
      _retrieveData(data ,'DeleteFeedback',id)
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
      }
   
   
 
    const  _renderItem = (item , index) => 
    {
      return (
      <Item item = {item}  index = {index}  navigation = {navigation} role ={role} actiondel={deleteItemById}/>  
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
            console.log(JSON.stringify(responseJson.ResponseData))

            if(front == 'OwnerProfile')
            {
              console.warn('response' + JSON.stringify(responseJson.ResponseData))
              setListingAll(responseJson.ResponseData); 
              const data =  responseJson.ResponseData.filter(data => data.Flag == "1");
              setListingfilter( data.sort((a,b) => {
                return a.CenterName > b.CenterName;
            }))
            
            }

            setTimeout(()=>{
            setFeedback('')
           },1000)            
           if(front == 'DeleteFeedback')
            {
             const filteredData = listing.filter(item => item.feedbackId !== id);
            setListing(filteredData)       
               }
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
    
              <Text style={{ color: 'white',  fontSize: 20,marginLeft:-50,  textAlign: 'center', width: '100%',alignContent:'center' ,justifyContent:'center' }}>Centre List Profile</Text> 
          </View>    
          )
         };

         const readData = async () => {
        
            const role_id = await AsyncStorage.getItem("role")
           
            
            if (role_id !== null) {
                setrole(role_id)                         
              }
        }


          const backAction = () => {

            navigation.goBack(null)
            return true;
          };

          

          useEffect(() =>  {

            if(flagvalue == 1)
            var data =  listingall.filter(data => data.Flag == "2");
            if(flagvalue == 0)
            var data =  listingall.filter(data => data.Flag == "1");
           
            setListingfilter( data.sort((a,b) => {
              return a.CenterName > b.CenterName;
          }))

          },[flagvalue])

          useEffect(() => {
   
            readData()
            if(role != '')
            { 
              var data = new URLSearchParams();
              data.append('Unitid',item);
              data.append('Role','3');
              data.append('MobileNo', MyData.mobile);
              data.append('TokenNo', MyData.token);
              console.log('request ' + data.toString())
              _retrieveData(data ,'OwnerProfile')
            }

            const unsubscribe = navigation.addListener('focus', () => {
  
              BackHandler.addEventListener("hardwareBackPress", backAction);
  
              return () =>
                BackHandler.removeEventListener("hardwareBackPress", backAction);
            });
        
            // Return the function to unsubscribe from the event so it gets removed on unmount
            return unsubscribe;
            
          }, [role,unitid]);

          
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Gradientcolourbluew}} > 
    <View style={Styles.container}>

    {_headerBar()}  

    <RadioForm style={{width:'60%',marginTop:4}}
  radio_props={radio_props}
  initial={flagvalue}
  formHorizontal={true}
  labelHorizontal={true}
  buttonColor={'#2196f3'}
  animation={true}
  buttonStyle={{margin:4}}
  labelStyle={{fontSize: 12, color: '#000',marginRight:10}}
  onPress={(value) => {setFlagvalue(value)}}
  buttonSize={10}
  buttonOuterSize={20}
/>
   
        <FlatList
              style={{
               flex:1,
             width:'100%'}}
              renderItem={(item , index) => _renderItem(item.item , index )}
              data={listingfilter}
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

export default DistrrictListProfile;