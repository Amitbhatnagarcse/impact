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
import MyData from "../../helper/MyData";


const Feedback = ( {navigation} ) => {

    const [role ,setrole] = useState('')
    const [userid ,setUserid] = useState('')
    const [unitid ,setUnitid] = useState('')
    const [loading, setloading] = useState(false);
    const [typevalue, settypevalue] = useState(-1);
    const [feedback, setFeedback] = useState('');
    const [listing, setListing] = useState('');
    const radio_props = [
      {label: 'Suggestion', value: 'S' },
      {label: 'Query', value: 'Q' }
    ];


    const deletecnfrm = async (id) =>
    {
      var data = new URLSearchParams();
      data.append('FeedbackId',id);
      data.append('Role','role');
      data.append('MobileNo', MyData.mobile);
      data.append('TokenNo', MyData.token);
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
    const reset_data = () => {
      settypevalue(-1)
      setFeedback('')
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
            if(front == 'FeedbackList')
            {
              setListing(responseJson.ResponseData)
            }
            if(front == 'FeedbackForm')
            {
              var data = new URLSearchParams();
              data.append('userid',userid);
              data.append('unitid',unitid);
              data.append('Role',role);
              data.append('MobileNo', MyData.mobile);
              data.append('TokenNo', MyData.token);

              _retrieveData(data ,'FeedbackList')
              setTimeout(()=>{
               alert(responseJson.Message)
            },500)            }

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

   
    const submit  = () =>{

      if(typevalue == -1)
      {
        alert('please select feedback type')
        return
      }
      if(feedback == '')
      {
        alert('please enter feedback')
        return
      }
      var data = new URLSearchParams();
      data.append('userid',userid);
      data.append('qType',typevalue+'');
      data.append('fquestion',feedback);
      data.append('MobileNo', MyData.mobile);
      data.append('TokenNo', MyData.token);
      
      console.warn(data.toString())
      _retrieveData(data,'FeedbackForm')

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
    
              <Text style={{ color: 'white',  fontSize: 20,marginLeft:-50,  textAlign: 'center', width: '100%',alignContent:'center' ,justifyContent:'center' }}>FEEDBACK</Text> 
          </View>    
          )
         };

         const readData = async () => {
        
            const role_id = await AsyncStorage.getItem("role")
            const user_id = await AsyncStorage.getItem("userid")
            const unit_id = await AsyncStorage.getItem("unitid")
            debugger
            if (role_id !== null) {
                setrole(role_id)    
                setUserid(user_id)
                setUnitid(unit_id)                     
              }
        }


          const backAction = () => {

            navigation.goBack(null)
            return true;
          };


          useEffect(() => {
   
            readData()
            if(role != '' && userid != '' && unitid != '')
            { 
              var data = new URLSearchParams();
              data.append('userid',userid);
              data.append('unitid',unitid);
              data.append('Role',role);
              data.append('MobileNo', MyData.mobile);
              data.append('TokenNo', MyData.token);
              console.warn(data.toString());
              _retrieveData(data ,'FeedbackList')
            }

            const unsubscribe = navigation.addListener('focus', () => {

              _retrieveData(data ,'FeedbackList')
  
              BackHandler.addEventListener("hardwareBackPress", backAction);
  
              return () =>
                BackHandler.removeEventListener("hardwareBackPress", backAction);
            });
        
            // Return the function to unsubscribe from the event so it gets removed on unmount
            return unsubscribe;
            
          }, [role,userid,unitid]);

          
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Gradientcolourbluew}} > 
    <View style={Styles.container}>

    {_headerBar()}  

      
    <View style={Styles.inputboxview} >
        <Text style={Styles.inputtext}>Feedback Type</Text>
        <RadioForm style={{width:'50%',marginTop:4}}
          radio_props={radio_props}
          initial={typevalue}
          formHorizontal={true}
          labelHorizontal={true}
          buttonColor={'#2196f3'}
          animation={true}
          buttonStyle={{margin:4}}
          labelStyle={{fontSize: 12, color: '#000',marginRight:10}}
          onPress={(value) => {settypevalue(value)}}
          buttonSize={10}
          buttonOuterSize={20}
/>
          </View>
          <View style={Styles.inputboxview} >
        <Text style={Styles.inputtext}>FeedBack</Text>
        <TextInput
                        style={Styles.input}
                        placeholderTextColor="#adb4bc"
                        returnKeyType="next"
                        maxLength = {200}
                        multiline={true}
                        autoCapitalize="none"
                        value = {feedback}
                        autoCorrect={false}
                        keyboardType={'default'}
                        onChangeText={value => setFeedback(value)}  />
          </View>

          <TouchableOpacity  onPress={() => submit()}>
          <Text style={Styles.button}>Submit</Text>
        </TouchableOpacity>
        <FlatList
              style={{
               flex:1,
              backgroundColor:'#fff',width:'100%'}}
              renderItem={(item , index) => _renderItem(item.item , index )}
              data={listing}
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

export default Feedback;