import React from "react";
import OrientationLoadingOverlay from "react-native-orientation-loading-overlay";
import backarrow from "../../assets/img/blackback_arrow.png";
//import background from '../../assets/img/backpinview.jpg';
import LinearGradient from 'react-native-linear-gradient';
import {BASE_URL} from '../../Constants'

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
         //this.setState({ load: false });
        if(responseJson.Status)
        {
          this.setState({logindata : responseJson.ResponseData[0],loginui:false,load : false})
        }
        else
        {
          this.setState({load :false})
          setTimeout(()=>{
            alert(JSON.stringify(responseJson.Message));
       }, 300);
          
        }
        setTimeout(()=>{
          alert(JSON.stringify(responseJson));
     }, 300);
        
        
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
      
       alert(JSON.stringify(responseJson));
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

        this.props.navigation.navigate('PinScreen');
      }
      else
      {
       alert('otp not matched');
      }
      //this.setState({ load: false });
    
  }

  render() {
   

    return (
      <SafeAreaView style={styles.container}>
      
     
        <OrientationLoadingOverlay visible={this.state.load}>
          <View>
            <Image
              source={require("../../assets/img/loadlogo.gif")}
              style={{ width: 80, height: 80 }}
            />
           
          </View>
        </OrientationLoadingOverlay>
        <StatusBar />

        <TouchableWithoutFeedback
          style={styles.container}
          onPress={Keyboard.dismiss}
        >
          <View style={styles.container} behavior="padding">
            {this.state.loginui && (
              
              <View style={styles.container}>
                  <View style={styles.container}>
                  <LinearGradient colors={['#66d9ff', '#ffc34d']} style={styles.container}>
                  <Text
            style={{
              paddingTop: 18,
              paddingBottom: 18,
              color: "#ffffff",
              textAlign : 'center',
              fontSize: 68,
              textShadowColor: 'rgba(0, 0, 0, 0.75)',
              textShadowOffset: {width: -1, height: 1},
              textShadowRadius: 10
            }}>
            PCPNDT
          </Text>
          <View style={{ flexDirection: "column" }}>
                  <Text
                    style={{
                      fontSize: 30,
                      margin: 10,
                      marginBottom:30,
                      textAlign : 'center',
                      color: "#ffffff",
                      textShadowColor: 'rgba(0, 0, 0, 0.55)',
                      textShadowOffset: {width: -1, height: 1},
                      textShadowRadius: 5
                    }}
                  >
                    {" "}
                    sign in to your account{" "}
                  </Text>
                </View>
                    <Text style={styles.itemText}>enter your mobile number</Text>
                     
                       <TextInput
                        style={styles.input}
                        placeholder="type here"
                        placeholderTextColor="#a6a6a6"
                        returnKeyType="go"
                        autoCapitalize="none"
                        maxLength={12}
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
       </LinearGradient>
                  </View>
               
              </View>
             
            )}

            {!this.state.loginui && (
              <View style={styles.container}>
                <TouchableHighlight
                  onPress={() => this.setState({ loginui: true })}
                >
                  <Image
                    source={backarrow}
                    style={{ width: 25, height: 25, marginLeft: 10 }}
                  />
                </TouchableHighlight>

               
                  <View style={styles.container}>
                    <View style={{ flexDirection: "column" }}>
                      <Text
                        style={{
                          fontSize: 22,
                          margin: 10,
                          color: '#000'
                        }}
                      >
                        {" "}
                        confirm sign in{" "}
                      </Text>
                    </View>
                    <Text style={styles.itemText}>enter your otp  code</Text>
                   
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
   
       
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    
    backgroundColor: "#ffc34d",
    flexDirection: "column"
  },
  input: {
    height: 60,
    borderWidth: 1,
    borderColor: '#ff9933',
    marginLeft:40,
    marginRight:40,
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
    color : '#ffffff'
   
  },
  iconStyle: {
    color: "#fff",
    fontSize: 30,
    marginRight: 15
  },
  buttonStyle: {
    alignItems: "center",
    backgroundColor: "#0099ff",
    padding: 14,
    marginStart:80,
    borderRadius : 3,
    borderColor : '#fff',
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