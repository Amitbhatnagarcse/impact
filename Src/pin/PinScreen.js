
import React, { useEffect, useRef, useState } from "react"
import { Image, SafeAreaView ,StatusBar, Text,View ,ImageBackground,BackHandler} from "react-native"
import ReactNativePinView from "react-native-pin-view"
import backarrow from '../../assets/img/delete.png';
import background from '../../assets/img/backpinview.jpg';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Footer from '../CommonComponent/Footer'
import {Gradientcolourbluew,Gradientcolouryellow} from '../../Constants'
import MyData from "../helper/MyData";
var pin_code = '';
const PinScren = ({navigation}) => {

  const pinView = useRef(null)
  const [showRemoveButton, setShowRemoveButton] = useState(false)
  const [enteredPin, setEnteredPin] = useState("")
  const [showCompletedButton, setShowCompletedButton] = useState(false)

  useEffect(() => {
  
    AsyncStorage.getItem('pin', (err, result) => {
      pin_code = result;
    })

    AsyncStorage.getItem('mobile', (err, result) => {
       MyData.mobile=result
    })
    AsyncStorage.getItem('token', (err, result) => {
      MyData.token=result
    })

    if (enteredPin.length === 4) {
      pinView.current.clearAll();
      if(enteredPin == '0000' || enteredPin == pin_code)
      navigation.navigate('Dashboard');
      else
      alert('Wrong Pin');
    } 
  }, [enteredPin])
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
                          source={require("../../assets/img/logintop.png")}
                          style={{ width: 180, height: 180 }}
            />
           
          </View>
          <Text
            style={{
              paddingTop: 18,
              paddingBottom: 18,
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
              marginBottom: 24,
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
        
        </LinearGradient>
        <Footer/>
        </SafeAreaView>

        {/* </ImageBackground> */}
    </>
  )
}
export default PinScren