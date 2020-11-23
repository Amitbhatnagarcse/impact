import React, { useEffect,useState } from "react"
import { View, Text,TextInput ,Image ,TouchableOpacity ,SafeAreaView,FlatList,BackHandler, Alert} from 'react-native';
import Styles from './style';
import AsyncStorage from '@react-native-community/async-storage';
import pngIcons  from '../../../assets/img/images';
import {BASE_URL,Gradientcolourbluew,BlueColor} from '../../../Constants'
import FooterComponent from '../../CommonComponent/Footer'
import OrientationLoadingOverlay from "react-native-orientation-loading-overlay";
import file_upload from '../../../assets/img/file_download.png';
import RNFetchBlob from 'rn-fetch-blob'
import { it, ro, tr } from "date-fns/locale";
import MyData from "../../helper/MyData";

const FeedbackDetails = ( {navigation , route} ) => {

    const {item} = route.params;
    const [role ,setrole] = useState('')
    const [loading, setloading] = useState(false)
    const [feedback, setFeedback] = useState('')
    const [editable,setEditable] = useState(false)
    
  
    const deletecnfrm = async (id) =>
    {
      var data = new URLSearchParams();
      data.append('FeedbackId',id);
      data.append('Role',role)
      _retrieveData(data ,'DeleteFeedback',id)
    }
    const editfun = async () =>
    {
      if(role == '0' || role =='1')
      {
        var data = new URLSearchParams();
        data.append('fquestion',item.fquestion);
        data.append('qType',item.qType)
        data.append('feedbackid',item.feedbackId)
        data.append('fanswer',feedback)
        data.append('answerById',role)
        data.append('MobileNo', MyData.mobile);
        data.append('TokenNo', MyData.token);
        console.log(data.toString())
        _retrieveData(data ,'FeedbackForm',item.feedbackId)
      }
      else
        alert('You are not autorized to give answer for the question')
   
    }

    const updatesuccefully = async (message) =>
    {
      Alert.alert(
        '',
       'Data Updated Succesfully',
        [
          {text: '', onPress: () => navigation.goBack(null), style: 'cancel'},
          {text: 'Yes', onPress: () =>navigation.goBack(null)},
        
        ],
        { 
          cancelable: true 
        }
      );
    }

    const deleteItemById = async (id) => 
    {
            if(role == '0')
            {
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
            else
            {
              alert('You are not authorized to delete this question.')
            }

      }
    const reset_data = () => {
      settypevalue(-1)
      setFeedback('')
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
            console.log(JSON.stringify(responseJson))
          setloading(false)
          if(responseJson.Status)
          {
           if(front == 'FeedbackForm')
            {
              setTimeout(()=>{
                updatesuccefully(responseJson.Message)
            }, 500);
            }
           if(front == 'DeleteFeedback')
            {
             navigation.goBack(null)   
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
    
              <Text style={{ color: 'white',  fontSize: 20,marginLeft:-50,  textAlign: 'center', width: '100%',alignContent:'center' ,justifyContent:'center' }}>FEEDBACK </Text> 
          </View>    
          )
         };

         const readData = async () => {
        
            const role_id = await AsyncStorage.getItem("role")
         
            if (role_id !== null) {
              setFeedback(item.fanswer)
              
      if(item.status == 'A')
      setEditable(true)
    else
      setEditable(false)

                setrole(role_id)                         
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
           
            }

            BackHandler.addEventListener("hardwareBackPress", backAction);

            return () =>
              BackHandler.removeEventListener("hardwareBackPress", backAction);
            
          }, [role]);
             return (
                  <SafeAreaView style={{flex: 1, backgroundColor: Gradientcolourbluew}} > 
                  <View style={Styles.container}>

                  {_headerBar()}  
                  <View style={Styles.inputboxview} >
                      <Text style={Styles.inputtext}>Query Type</Text>
                      <Text style={Styles.input}  >{item.qType =='S' ? 'Suggestion':'Feedback'} </Text>
                        </View> 

                        <View style={Styles.inputboxview} >
                      <Text style={Styles.inputtext}>FeedBack By</Text>
                      <Text style={Styles.input}  >{item.username} </Text>
                        </View> 

                        <View style={Styles.inputboxview} >
                      <Text style={Styles.inputtext}>Suggestion/Query</Text>
                      <Text style={Styles.input}  >{item.fquestion}  </Text>
                        </View> 
                    
                        <View style={Styles.inputboxview} >
                      <Text style={Styles.inputtext}>Feedback date</Text>
                      <Text style={Styles.input}  >{item.questionDate.substring(0,10)} </Text>
                        </View> 

                        <View style={Styles.inputboxview} >
                      <Text style={Styles.inputtext}>Reply date</Text>
                      <Text style={Styles.input}  >{item.answerDate == null ? '' :item.answerDate.substring(0,10) } </Text>
                        </View> 

                      

                        <View style={Styles.inputboxview} >
                      <Text style={Styles.inputtext}>Reply</Text>
                      { editable ?    <Text style={Styles.input}> {feedback} </Text>
                      :  <TextInput
                      style={Styles.inputorange}
                      placeholderTextColor="#adb4bc"
                      returnKeyType="next"
                      maxLength = {200}
                      multiline={true}
                      autoCapitalize="none"
                      value = {feedback}
                      autoCorrect={false}
                      keyboardType={'default'}
                      onChangeText={value => setFeedback(value)}  />  
                      }
                   


                  
                        </View> 

                        <View style={Styles.inputboxview} >
                      <Text style={Styles.inputtext}>Replied by</Text>
                      <Text style={Styles.input}  >{ item.status== 'A' ?  item.answerById =='1' ? 'Help Desk' : 'Admin' : ''} </Text>
                        </View> 

                      
                        <View style={Styles.inputboxview} >

                     { editable ?
                <TouchableOpacity style={Styles.buttonsubmit} onPress={() => setEditable(false)  }>
                <Text style={{	backgroundColor:BlueColor,padding:5,color:'white',
                borderColor: 'white',width:'100%',textAlign:'center'}} >Edit</Text>
                </TouchableOpacity> 
                :
                <TouchableOpacity style={Styles.buttonsubmit} onPress={() => editfun() }>
                <Text style={{	backgroundColor:BlueColor,padding:5 ,color:'white',
                borderColor: 'white',width:'100%',textAlign:'center'}} >Reply</Text>
                </TouchableOpacity> 

                     }
                     
                      
                              

                      <TouchableOpacity style={Styles.buttonsubmit} onPress={() => deleteItemById(item.feedbackId)}>
                      <Text style={{	backgroundColor:Gradientcolourbluew,padding:5,color:'white',
                  borderColor: 'white',width:'100%',textAlign:'center'}}>Delete</Text>
                      </TouchableOpacity>
                      {/* <TouchableOpacity style={Styles.buttonsubmityellow} onPress={() => 
                        _retrieveData('GetPIReportDetail',item.PirId)
                        }>
                      <Image source={file_upload} style={{ bottom: 0, right: 2,height:30,width:30,  justifyContent: 'center',
                      marginBottom:2,alignItems: 'center'}}/>
                      </TouchableOpacity> */}
                        </View> 

                
                    

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

export default FeedbackDetails;