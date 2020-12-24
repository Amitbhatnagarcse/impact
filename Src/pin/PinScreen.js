
import React, { useEffect, useRef, useState } from "react"
import { Image, SafeAreaView ,StatusBar, Text,View ,TouchableOpacity,BackHandler} from "react-native"
import ReactNativePinView from "react-native-pin-view"
import backarrow from '../../assets/img/delete.png';
import background from '../../assets/img/backpinview.jpg';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Footer from '../CommonComponent/Footer'
import {Gradientcolourbluew,Gradientcolouryellow,BASE_URL,BlueColor} from '../../Constants'
import MyData from "../helper/MyData";
var pin_code = '';
const PinScren = ({navigation}) => {

  const pinView = useRef(null)
  const [showRemoveButton, setShowRemoveButton] = useState(false)
  const [enteredPin, setEnteredPin] = useState("")
  const [mobileno, setMobileNo] = useState("")

  const [showCompletedButton, setShowCompletedButton] = useState(false)

  useEffect(() => {
  
    AsyncStorage.getItem('pin', (err, result) => {
      pin_code = result;
    })

    AsyncStorage.getItem('mobile', (err, result) => {
      MyData.mobile = result;
       setMobileNo(result);
    })
    AsyncStorage.getItem('token', (err, result) => {
      //MyData.token=result
    })

    if (enteredPin.length === 4) {

      pinView.current.clearAll();
      _retrieveData();
      // if(enteredPin == '0000' || enteredPin == pin_code)
      // navigation.navigate('Dashboard');
      // else
      // alert('Wrong Pin');
    } 

    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    
  }, [enteredPin])

  const backAction = () => {

    BackHandler.exitApp()
    return true;
  };
  const _retrieveData = async () => {
  
    //alert(id);
     //this.setState({ load: true });
    var data = new URLSearchParams();
    data.append('MobileNo',mobileno);
    //data.append('Otp',this.state.code);
    data.append('UserPin',enteredPin)
      fetch(BASE_URL+"PostValidateUser", {
        method: "POST",
        headers: {
          'Accept' : "application/json",
          'Content-Type': 'application/x-www-form-urlencoded'        
        },
        body: data.toString(),
        json: true,
      })
        .then(response => response.json())
        .then(responseJson => {
        
          //console.warn(JSON.stringify(responseJson.ResponseData))
          if(responseJson.Status)
           {
            MyData.token = responseJson.ResponseData;
          // this.setState({logindata : responseJson.ResponseData[0],loginui:false,load : false})
          // this.storeItem("centrename", responseJson.ResponseData[0].CentreName);
          // this.storeItem("districtid", responseJson.ResponseData[0].DistrictId.toString());
          // this.storeItem("blockid", responseJson.ResponseData[0].BlockId.toString());
          // this.storeItem("centreid", responseJson.ResponseData[0].CentreId.toString());
          // this.storeItem("centreregno", responseJson.ResponseData[0].CentreRegNo.toString());
          // this.storeItem("centreregdate", responseJson.ResponseData[0].CentreRegDate);
          // this.storeItem("districtname", responseJson.ResponseData[0].DistrictName);
          // this.storeItem("blockname",responseJson.ResponseData[0].BlockName);
          // this.storeItem("pin",this.state.pin);
          // this.storeItem("unitid",responseJson.ResponseData[0].UnitId.toString());
          // this.storeItem("userid",responseJson.ResponseData[0].UserId.toString());        
          // this.storeItem("username",responseJson.ResponseData[0].UserName);        
          // this.storeItem("role",responseJson.ResponseData[0].Role.toString());
          // this.storeItem("token",this.state.logindata.TokenNo);
          // this.storeItem("mobile",this.state.username);
  
          navigation.navigate('Dashboard');
        }
        else
        {
          setTimeout(()=>{
            alert(JSON.stringify(responseJson.Message));
       }, 300);
          
        }
       
         
        })
        .catch(error => {

          this.setState({ load: false });
          setTimeout(()=>{
            alert(error);
       }, 300);
        
        
        });
    }

  return (
    <>
      <StatusBar barStyle="light-content" />
      {/* <ImageBackground
          source={background}
          resizeMode ={"cover"}
          backgroundColor = {'#e1e1e1'}
          style={{margin:1, width:'100%', height:'100%',resizeMode: 'contain' }}> */}

        <SafeAreaView
          style={{ flex: 1, backgroundColor: Gradientcolourbluew}}>
                            <LinearGradient colors={[Gradientcolourbluew, Gradientcolouryellow]} style={{flex:1, justifyContent: "center", alignItems: "center" }}>

          <View>
            <Image
                          source={require("../../assets/img/nhm.png")}
                          style={{ width: 225, height: 180 }}
            />
           
          </View>
          <Text
            style={{
              paddingTop: 8,
              paddingBottom: 8,
              color: "rgba(255,255,255,0.9)",
              fontSize: 48,
            }}>
            PCPNDT
          </Text>
          <ReactNativePinView

            inputSize={32}
            ref={pinView}
            pinLength={4}
            buttonSize={60}
            onValueChange={value => setEnteredPin(value)}
            buttonAreaStyle={{
              marginTop: 4,
            }}
            inputAreaStyle={{
              marginBottom: 14,
            }}
            inputViewEmptyStyle={{
              backgroundColor: "transparent",
              borderWidth: 1,
              borderColor: "#FFF",
            }}
            inputViewFilledStyle={{
              backgroundColor: "#000",
            }}
            buttonViewStyle={{
              borderWidth: 1,
              borderColor: "#FFF",
            }}
            buttonTextStyle={{
              color: "#FFF",
            }}
            onButtonPress={key => {
              if (key === "custom_left") {
                pinView.current.clear()
              }
              if (key === "custom_right") {
                alert("Entered Pin: " + enteredPin)
              }
              // if (key === "three") {
              //   alert("You can't use 3")
              // }
            }}
            customLeftButton={showRemoveButton ? <Image   style={{ width: 40, height: 40, marginTop: 10 }}
            source={backarrow} size={36} color={"#FFF"} /> :  <Image   style={{ width: 40, height: 40, marginTop: 10 }}
            source={backarrow} size={36} color={"#FFF"} /> }
            customRightButton={showCompletedButton ? <Image source={backarrow} size={36} color={"#FFF"} /> : undefined}
          />
         <TouchableOpacity   onPress={() => navigation.navigate('SignIn')}>
             <Text style={{	color :BlueColor,padding:5,paddingTop:12,height:40,fontSize:20,
		width:'100%',textAlign:'center'}} >FORGOT PIN ?</Text>
        </TouchableOpacity>
        </LinearGradient>
        <Footer/>
        </SafeAreaView>

        {/* </ImageBackground> */}
    </>
  )
}
export default PinScren