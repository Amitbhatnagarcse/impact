import React from 'react';
import { Platform,StyleSheet, Image, ImageBackground, BackHandler, FlatList, Text, View, TouchableHighlight, TouchableWithoutFeedback, SafeAreaView,Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';

const DEVICE_HEIGHT = Dimensions.get('window').height - ( Platform.OS === 'ios' ? 180 : 120);

import Menu from './Menu';
import SideMenu from 'react-native-side-menu';
import { Col } from 'native-base';
import background from '../../assets/img/backpinview.jpg';
import {BASE_URL,Gradientcolour, Gradientcolourbluew, Gradientcolouryellow,Gradientcolourlight,BlueColor} from '../../Constants'
//import footer from '../../assets/img/footer.jpg'
import FooterComponent from '../CommonComponent/Footer'
import { format, parse } from "date-fns";
import { id } from 'date-fns/locale';
import MyData from '../helper/MyData';

// import sha256 from 'crypto-js/sha256';
// import hmacSHA512 from 'crypto-js/hmac-sha512';
// import Base64 from 'crypto-js/enc-base64';

import CryptoJS from "crypto-js";

const arrayEarnReward = [
  // {
  //   name: 'DASHBOARD',
  //   img: require('../../assets/img/dashboard.png')
  // },
  // {
  //   name: 'Report',
  //   img: require('../../assets/img/renewal.png')
  // },
  {
    name: 'DAY \n END \nSUMMARY',
    img: require('../../assets/img/dayendsummary.png')
  },
  {
    name: 'FORM F',
    img: require('../../assets/img/formf.png')
  },
  {
    name: 'FORMF REPORT',
    img: require('../../assets/img/formfreport.png')
  },
  {
    name: 'FEEDBACK',
    img: require('../../assets/img/feedback.png')
  },
]
const rollthree = [
  {
    name: 'DASHBOARD',
    img: require('../../assets/img/dashboard.png')
  },
  {
    name: 'CENTER PROFILE',
    img: require('../../assets/img/userimage.png')
  },
  {
    name: 'PIR UPLOAD',
    img: require('../../assets/img/renewal.png')
  },
  // {
  //   name: 'DAY \n END \nSUMMARY',
  //   img: require('../../assets/img/dayendsummary.png')
  // },
  {
    name: 'FORMF REPORT',
    img: require('../../assets/img/formfreport.png')
  },
  // {
  //   name: 'FEEDBACK',
  //   img: require('../../assets/img/feedback.png')
  // }
]


var center_name = "";
var center_id = ""
class Dashboard extends React.Component {

  constructor() 
  {
    super()
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.getdataFromSharedPreference();
            this.state = {
              animating: false,
              data: [],
              token: '',
              pageType: "HomeScreen",
              title : 'IMPACT',
              arrayEarnRewards:[], 
              username :'',
              load : false,
              myrole : 5,        
            }
   }

   async getcenterdetails(id_)
   { 
      this.setState({ load: true });
     var data = new URLSearchParams();
     data.append('Cid',id_)
     data.append('MobileNo', MyData.mobile);
     data.append('TokenNo', MyData.token);
       fetch(BASE_URL+"GetCenterDetail", {
         method: "POST",
         headers: {
           'Content-Type': 'application/x-www-form-urlencoded'
         },
         body: data.toString(),
         json: true,
       })
         .then(response => response.json())
         .then(responseJson => {
          this.setState({ load: false });
          if(responseJson.Status)
          { 
            const mydate = responseJson.ResponseData.ValidThrough.substring(14,24)
           
            var datee = String(mydate).split('/');
            var datenew = (datee[2] + '/' + datee[1] + '/' + datee[0] );
            var date1 = new Date(datenew);
           
           var datev = new Date().getDate();
           var month = new Date().getMonth() + 1;
           var year = new Date().getFullYear();
           var datecureent = (datev +'/'+ month +'/'+ year); 
           
           var date2 = new Date(datecureent); 
           var Difference_In_Time = date1.getTime() - date2.getTime(); 
            
          }
          else{
            setTimeout(()=>
            {

              if(responseJson.Message.toString.includes ='Invalid request')
              {
                Alert.alert(
                  '',
                 'Session Expired please verify again',
                  [
                    {text: '', onPress: () => navigation.goBack(null), style: 'cancel'},
                    {text: 'Yes', onPress: () =>navigation.navigate('PinScreen')},
                  
                  ],
                  { 
                    cancelable: true 
                  }
                );
              }
              else 
              alert(responseJson.Message)
            },300); 
          }
          
          
         })
         .catch(error => {
           
           this.setState({ load: false });
         
         });
     }

  async getdataFromSharedPreference()
   {

    // const hashDigest = sha256('mohit');
    // console.log('encrypted text hashDigest256' + hashDigest)

    // const hmacDigest = Base64.stringify(hmacSHA512('path' + 'hashDigest', 'privateKey'));
    // console.log('encrypted text hashDigest512' + hmacDigest)

    // var data = [{id: 'token'}, {id: 'salt'}]
    // var data = ('token is best')

// // Encrypt
// var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'b14ca5898a4e4133bbce2ea2315a1916').toString();

// console.log('encrypted text aes '+ciphertext); // [{id: 1}, {id: 2}]

// var cipherdemo = "9crooGkXLc/FxyxoqUTGmA==";

// console.log('encrypted text aes  shantnu'+cipherdemo); // [{id: 1}, {id: 2}]

// // Decrypt
// var bytes  = CryptoJS.AES.decrypt(cipherdemo, 'b14ca5898a4e4133bbce2ea2315a1916');

// var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

// console.log('encrypted decrypt '+ JSON.stringify(decryptedData)); // [{id: 1}, {id: 2}]
   

        await  AsyncStorage.getItem('centrename', (err, result) => {
        this.center_name = result;
      });
    await AsyncStorage.getItem('username',(err ,result) => {
      this.setState({username : result})
    })
    await  AsyncStorage.getItem('role', (err, result) => {
        this.role = result; 
        this.setState({ 'myrole' : result})

        
       if(result == '0' || result=='1' || result =='3' )
       {
        this.setState({ arrayEarnRewards : rollthree})
        AsyncStorage.getItem('districtid', (err, result) => {
          this.center_id = result;
        });

       }
       
       else
       {
          AsyncStorage.getItem('centreid', (err, result) => {
          this.center_id = result;
          this.getcenterdetails(result)
        });
       this.setState({ arrayEarnRewards : arrayEarnReward})
        
      }
       });
           
  }

  componentDidMount()
  {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  

  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
   BackHandler.exitApp();
    //this.props.navigation.goBack(null);
    return true;
  }

 

  _renderItem(item) {
    return (
      <Col style={{ padding: 5, paddingLeft: 5}}>

        <ImageBackground
          source={item.img}
          resizeMode ={"center"}
          style={{padding:2, flex: 1, resizeMode: 'cover', height: ((DEVICE_HEIGHT) / 3 -22) }}>
             <TouchableHighlight
             style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(52, 52, 52, 0.32)', width: '100%', flex: 1,borderColor:'#fff',borderRadius:1 }}
             onPress={() => {
             
              if(item.name == 'DAY \n END \nSUMMARY')
              this.props.navigation.navigate('Home')
              else if (item.name =='FORM F')
              {
              this.props.navigation.navigate('Formf')
              }
              else if(item.name == 'PIR UPLOAD')
              {
                this.props.navigation.navigate('PirList')
              }
              else if(item.name ==  'DASHBOARD')
              {
                  this.props.navigation.navigate('DashBoardChart');
              }
              else if(item.name == 'FORMF REPORT')
              {
                this.props.navigation.navigate('FormfReport')
              }
              else if(item.name == 'FEEDBACK')
              {
                this.props.navigation.navigate('Feedback')
              }
              else if(item.name == 'CENTER PROFILE')
              {
                 if(this.state.myrole == 3)
                 this.props.navigation.navigate('DistrrictListProfile', {item : this.center_id })
                 else
                 this.props.navigation.navigate('DistrrictOwnerProfile')
              }
              else
              {
              }  
            }}>
          <View >

           
              <Text style={{ color: 'white', fontSize: 20 , fontFamily: 'Cochin', fontWeight: 'bold', textAlign: 'center' }}>{item.name}</Text>
          </View>
          </TouchableHighlight>

        </ImageBackground>

      </Col>

    )
  }

  _headerBar = () => {
    return (
      <View style={styles.headerView}>
    <TouchableWithoutFeedback onPress={() => this.toggleDrawer()}>
          <View style={{ width: 35, height: 65 }}>
            <Image
            tintColor='white'
            style={{ width: 34, height: 37, marginTop: 5 ,marginRight:4}}
            source={require("../../assets/img/drawer.png")}
            />
          </View>
        </TouchableWithoutFeedback>
        <View style = {{width:'85%',marginLeft:-15}}>
        {this.getNormalHeader()}
        {this.getsubNormalHeader()}
        </View>
        <TouchableWithoutFeedback onPress={() => this.signout()}>
          <View style={{ width: 50, height: 65 }}>
            <Image
            resizeMode='contain'
            tintColor='white'
            style={{ width: 35, height: 39, marginTop: 5 ,marginRight:4 ,        transform: [{ rotate: '90deg' }]
          }}
            source={require("../../assets/img/logout.png")}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>)
  }
  getNormalHeader(){
    return(
      <Text style={{ color: 'white',  fontFamily: 'Cochin', fontWeight: 'bold',fontSize: 28,marginLeft:20,  textAlign: 'center', width: '100%', textShadowColor:BlueColor,
      textShadowOffset:{width: 2, height: 2},
      textShadowRadius:10 }}>{this.state.title}</Text>
      

    )
  }
  getsubNormalHeader(){
    return(
      <Text style={{ color: 'white',  fontFamily: 'Cochin', fontWeight: 'bold',fontSize: 14,marginLeft:10,  textAlign: 'center', width: '100%', textShadowColor:BlueColor,
      textShadowOffset:{width: 2, height: 2},
      textShadowRadius:10 }}>Integrated System For Monitoring of PCPNDT ACT</Text>
      

    )
  }

  toggleDrawer() {

    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  signout() {
    BackHandler.exitApp();
    //this.props.navigation.navigate('SignIn')
  }
  _openDialogue()
  {
    this.setState({dialogVisible: true})
  }

 


  getItemByType(type, item) {

    var view = {
      'HomeScreen': type == 'HomeScreen' && this._renderItem(item.item)
    };
    return (view[type] || view['default']);
  }

  getArrayByType(type) {
  
    

    var array = {
    'HomeScreen':this.state.arrayEarnRewards,  
    };

    return (array[type] || array['default']);
  }

  getColumnType(type) {
    var columnType = {
      'HomeScreen': 2,
    };
    return (columnType[type] || columnType['default']);
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  onMenuItemSelected = item =>
    this.setState({
      isOpen: false,
      selectedItem: item,
    });

   

  render() {
    const columntype = this.getColumnType(this.state.pageType);

    const menu = <Menu onItemSelected={this.onMenuItemSelected} type='home'  navigation={this.props.navigation} role = {this.role} item = {this.center_id} CenterName ={this.center_name}  />;

    return (
      <SideMenu
       menu={menu}
       isOpen={this.state.isOpen}
       onChange={isOpen => this.updateMenuState(isOpen)}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: Gradientcolourbluew }}>

        <View style={styles.container}>
        <LinearGradient colors={[Gradientcolourlight, Gradientcolourlight]} style={{flex:1}}>

        {/* <ImageBackground
          source={background}
          resizeMode ={"cover"}
          backgroundColor = {'#e1e1e1'}
          style={{margin:1, width:'100%', height:'100%',resizeMode: 'contain' }}> */}
          {this._headerBar()}

          <LinearGradient colors={[BlueColor, BlueColor]} style={styles.containertabwhite}>
          <Text style={styles.tabtitledata}> Welcome</Text>
          <View style={styles.line}></View>
    <Text style={styles.tabtitledata}> {this.state.username }</Text>

          </LinearGradient>
          {this.props.loading && <MaterialIndicator color="#5B5A5F" size={30} trackWidth={2} />}
          {!this.props.loading && (this.state.pageType === "HomeScreen" ) &&
            <FlatList
              style={{ flex: 1 ,marginTop:70}}
              renderItem={(item, index) => this.getItemByType(this.state.pageType, item)}
              key={this.state.pageType}
              data={this.getArrayByType(this.state.pageType)}
              numColumns={columntype}
              bounces={false}
            />}

         
          { this.state.myrole != 5 &&
 <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Feedback')} >
 <View style={{flexDirection: 'row',justifyContent:'center',alignItems:'center' , fontSize: 15,width:'100%' ,backgroundColor: 'rgba(52, 52, 52, 0.32)',}}>
 <Image source={require("../../assets/img/feedback.png")} style={{width: 70, height: 70, borderRadius:70}} />
 <Text style={{ backgroundColor:'lightblue', alignSelf: "center" ,marginStart: 20 }}>FeebBack</Text>
 </View>
 </TouchableWithoutFeedback>
          }
         
          
          </LinearGradient>
        
         {/* </ImageBackground> */}
        </View>
    
      <FooterComponent/>
    
      </SafeAreaView>
      </SideMenu>

    );
  }
}





export default Dashboard;
//export default withAuthenticator(App);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  headerView: {
     backgroundColor: Gradientcolourbluew, alignItems: 'center', width: '100%', flexDirection: 'row', 
    justifyContent: 'flex-start',elevation:10
  },
  title_center :{
    textAlign: 'center', 
    fontSize: 18,
    marginTop: 0,
    fontFamily: ''
  },
  containertabwhite: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Gradientcolour,
		borderRadius:1,
		borderWidth: 0.5,
		borderColor: '#000'
    },
    line :{
			width:1,
			height:40,
			backgroundColor:'#000',
	  },
    tabtitledata :{
      flex:1,textAlign:'center',paddingTop:10,paddingBottom:10,color:'#fff'
      },
 
   button: {
    color: 'white',
    backgroundColor:'blue',
    alignSelf:'center',
    width:80,
    marginTop : 5,
    height : 30,
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#5372C4',
    padding: 10,
    margin:0,
    marginBottom: 0,
    borderRadius: 3,
  },

});