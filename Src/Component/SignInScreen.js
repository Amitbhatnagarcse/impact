import React from "react";
import OrientationLoadingOverlay from "react-native-orientation-loading-overlay";
import backarrow from "../../assets/img/blackback_arrow.png";
//import background from '../../assets/img/backpinview.jpg';
import LinearGradient from 'react-native-linear-gradient';
import {BASE_URL,Gradientcolourbluew,Gradientcolouryellow,BlueColor} from '../../Constants'
import FooterComponent from '../CommonComponent/Footer'
import { CommonActions } from '@react-navigation/native';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  Image,
  ImageBackground,
  Platform,
  TouchableHighlight,
  BackHandler,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
  
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-community/async-storage';


export default class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  state = {
    username: "",
    password: "",
    code: "",
    isHidden: false,
    loginui: true,
    load: false,
    logindata: '',
    pin : ''
  };

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick() {
    BackHandler.exitApp();
        return true;
  }

  componentDidMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    this.storeItem('role','')
    this.setState({ loginui: true });

  }
  
  onChangeText(key, value) {
    this.setState({
      [key]: value
    });
  }
  // Sign in users with Auth
  async signIn() {
   
   if(this.state.username == '')
   {
     alert('Enter Mobile Number');
   }
   else
   {
   this.cllapiforgetingDistrictlist(JSON.stringify(this.state.username));
   }
  }

  async cllapiforgetingDistrictlist(id) {
    //alert(id);
     this.setState({ load: true });
    var data = new URLSearchParams();
    data.append('MobileNo',this.state.username);
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
        console.warn(JSON.stringify(responseJson))
          if(responseJson.Status)
        {
          this.setState({logindata : responseJson.ResponseData[0],loginui:false,load : false})
          setTimeout(()=>{
            alert(JSON.stringify(responseJson.ResponseData[0].OTP));
        }, 300);
        }
        else
        {
          this.setState({load :false})
          setTimeout(()=>{
            alert(JSON.stringify(responseJson.Message));
       }, 300);
          
        }
       
        
        
          //this.setState({ load: false ,dataSource : responseJson.IdentityProofType});
         
         
        })
        .catch(error => {

          this.setState({ load: false });
          setTimeout(()=>{
            alert(error);
       }, 300);
        
        
        });
    }
  async cllapiforSendToken() {
    
   this.setState({ load: true });

  var data = new URLSearchParams();
  data.append('MobileNo', this.state.username);
  fetch(BASE_URL+"PostValidateUser", {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: data.toString,
      json: true,
    })
      .then(response => response.json())
      .then(responseJson => {
      
        alert(JSON.stringify(responseJson.ResponseData[0].OTP));
        this.setState({logindata : responseJson.ResponseData[0],loginui:false,load : false})
        //this.props.navigation.navigate("Category", responseJson);
        console.log(JSON.stringify(responseJson));
      })
      .catch(error => {
        this.setState({ load: false });
        //this.props.navigation.navigate("Category");
         alert(JSON.stringify(error))
      });
  }

  async storeItem(key, item) {
    try {   
      await AsyncStorage.setItem(key, item);
    } catch (error) {
      alert(error);
    }
  }

  // ConfirmSign in users with Auth
  async confirmSign() {
       //this.setState({load :true});
       if(this.state.pin == '' )
       {
        alert('enter your pin code')
        return;
       }
       else if(this.state.pin.length != 4)
       {
         alert('enter 4 digit pin code')
         return;
       }
     else if(this.state.logindata.OTP == this.state.code)
      {

        this.storeItem("centrename", this.state.logindata.CentreName);
        this.storeItem("districtid", this.state.logindata.DistrictId.toString());
        this.storeItem("blockid", this.state.logindata.BlockId.toString());
        this.storeItem("centreid", this.state.logindata.CentreId.toString());
        this.storeItem("centreregno", this.state.logindata.CentreRegNo.toString());
        this.storeItem("centreregdate", this.state.logindata.CentreRegDate);
        this.storeItem("districtname", this.state.logindata.DistrictName);
        this.storeItem("blockname",this.state.logindata.BlockName);
        this.storeItem("pin",this.state.pin);
        this.storeItem("unitid",this.state.logindata.UnitId.toString());
        this.storeItem("userid",this.state.logindata.UserId.toString());        
        this.storeItem("username",this.state.logindata.UserName);        
        this.storeItem("role",this.state.logindata.Role.toString());

      
        this.props.navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              { name: 'PinScreen' },
              {
                name: 'PinScreen',
                params: { user: '' },
              },
            ],
          })
        );


        //this.props.navigation.navigate('PinScreen');
      }
      else
      {
       alert('otp not matched');
      }
      //this.setState({ load: false });
    
  }

  render() {
   

    return (
    
      <SafeAreaView style={styles.safecontainer}>
        <LinearGradient colors={[Gradientcolourbluew, Gradientcolouryellow]} style={styles.container}>

        {!this.state.loginui &&
        <View style={{alignContent:'flex-start',width:'100%',height:40}}>
           <TouchableHighlight
           onPress={() => this.setState({ loginui: true })}
         >
           <Image
             source={backarrow}
             style={{ width: 25, height: 25, marginLeft: 10,marginTop:10 }}
           />
         </TouchableHighlight>
         </View>
          }
        <OrientationLoadingOverlay visible={this.state.load}>
          <View>
            <Image
              source={require("../../assets/img/loadlogo.gif")}
              style={{ width: 80, height: 80 }}
            />
           
          </View>
        </OrientationLoadingOverlay>

        <KeyboardAvoidingView 
      enabled
      style = {styles.container}
     >
        <TouchableWithoutFeedback
          style={styles.container}
          onPress={Keyboard.dismiss}
        >

         
          <View style={styles.container} >
           
            {this.state.loginui && (
                     
              <View style={styles.container}>
                 
                  {/* <ImageBackground 
                   source={loginback}
                   resizeMode ={"stretch"}
                  style={styles.container}> */}
                  <View style={styles.container}>
             
                         <Image
                            resizeMode="contain"
                            source={require("../../assets/img/tiger.png")}
                          style={{ width: 100,height:80, marginTop:5 ,marginBottom:20}}
                         />
                          <Text style={styles.buttonText}>चिकित्सा , स्वास्थ्य एवं परिवार कल्याण विभाग </Text>
                          <Text style={styles.buttonText}>राजस्थान सरकार </Text>

                        <Image
                          resizeMode ={"contain"}
                          source={require("../../assets/img/logintop.png")}
                          style={{ width: 200 ,height:170,marginTop:20,marginBottom:20 }}
                         />
                       <TextInput
                        style={styles.input}
                        placeholder="Enter your mobile number"
                        placeholderTextColor="#a6a6a6"
                        returnKeyType="go"
                        autoCapitalize="none"
                        maxLength={10}
                        value = {this.state.pre_natal_diagnostic}
                        autoCorrect={false}
                        keyboardType={"numeric"}
                        onChangeText={value => this.onChangeText("username", value)}  />

                     
                    <TouchableOpacity
                      onPress={() => this.signIn()}
                      style={styles.buttonStyle}
                    >
                      <Text style={styles.buttonText}>sign in</Text>
                    </TouchableOpacity>
                  
                    <View style={{flex: 1, justifyContent: 'space-between',
                    alignItems: 'flex-start',flexDirection: 'row',marginTop:20}}>



      
                  </View>
                  </View>
                  {/* </ImageBackground> */}
               
              </View>
        
            )}

            {!this.state.loginui && (
              <View style={styles.container}>
              
               
                  <View style={styles.containerotp}>
                    <View style={{ flexDirection: "column",marginTop:-45 }}>
                      <Text
                        style={{
                          fontSize: 32,
                          margin: 10,
                          color: '#fff'
                        }}
                      >
                        {" "}
                        {" "}
                      </Text>
                      <Image
                          resizeMode ={"contain"}
                          source={require("../../assets/img/logintop.png")}
                          style={{ width: 200 ,height:170,marginTop:20,marginBottom:20 }}
                         />
                    </View>
                    <Text style={styles.itemText}>Set your otp(4) digit</Text>
                   
                      <TextInput
                        style={styles.input}
                        placeholder="enter otp "
                        placeholderTextColor="#adb4bc"
                        returnKeyType="go"
                        autoCapitalize="none"
                        maxLength ={4}
                        autoCorrect={false}
                        keyboardType={"numeric"}
                        secureTextEntry={false}
                        onChangeText={value => this.onChangeText("code", value)}
                       
                      />

                  <Text style={styles.itemText}>create your pin  code</Text>
                   
                   <TextInput
                     style={styles.input}
                     placeholder="enter pin"
                     placeholderTextColor="#adb4bc"
                     returnKeyType="go"
                     autoCapitalize="none"
                     maxLength ={4}
                     autoCorrect={false}
                     keyboardType={"numeric"}
                     secureTextEntry={false}
                     onChangeText={value => this.onChangeText("pin", value)}
                    
                   />

                  

                    <TouchableOpacity
                      onPress={() => this.confirmSign()}
                      style={styles.buttonStyle}
                    >
                      <Text style={styles.buttonText}>confirm</Text>
                    </TouchableOpacity>

                   
                  </View>
               
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        <FooterComponent/>
        </LinearGradient>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    justifyContent:'center',
    alignItems:'center',
    flexDirection: "column"
  },
  containerotp: {
    flex: 1,
    marginTop: 0,
    alignItems:'center',
    flexDirection: "column"
  },
  safecontainer: {
    flex: 1,
    marginTop: 0,
    backgroundColor:BlueColor,
    flexDirection: "column"
  },
  input: {
    height: 60,
    paddingStart:30,
    paddingEnd:30,
    borderWidth: 1,
    borderColor: Gradientcolourbluew,
    minWidth:280,
    width:'100%',
    margin: 10,
    fontSize: 17,
    textAlign :'center',
    color: "#000",
    backgroundColor : '#fff',
    borderRadius:25,
   
  },
  buttonContainer: {
    flex: 1,
    height:50
  },
  itemStyle: {
    marginBottom: 20
  },
  itemText: {
    marginBottom: 3,
    textAlign: 'center',
    marginStart: 14,
    fontSize:24,
    color : '#ffffff',
    width :'80%',
  },
  iconStyle: {
    color: "#fff",
    fontSize: 30,
    marginRight: 15
  },
  buttonStyle: {
    alignItems: "center",
    backgroundColor: Gradientcolourbluew,
    padding: 14,
    elevation :15,
    paddingStart:60,
    paddingEnd:60,
    minWidth:280,
    shadowColor:BlueColor,
    marginStart:80,
    borderRadius : 3,
    borderColor : BlueColor,
    marginEnd:80,
    margin: 14,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 20,
  },
  buttonStyleLikeText: {
    alignItems: "flex-end",
    flex: 1,
    width:'60%',
    borderWidth: 1,
    borderColor: '#fff',
    fontSize:18,
    padding: 4,
    height: 70,
    margin: 4,
    color: "#0099ff",
    backgroundColor:'#000000'
  },



  buttonText: {
    fontSize: 18,
    color: "#fff",
    elevation:10,

  },

  title_center :{
    textAlign: 'left', 
    fontSize: 18,
    marginTop: 0,
    color : '#5372C4',
    margin: 18,
  },
  title_center_right :{
    textAlign: 'right', 
    fontSize: 18,
    marginTop: 0,
    color : '#5372C4',
    margin: 18,
  },
});