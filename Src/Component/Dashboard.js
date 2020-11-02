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
  {
    name: 'FEEDBACK',
    img: require('../../assets/img/feedback.png')
  }
]

var role ="";
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
              load : false        
            }
   }

   async getcenterdetails(id_)
   { 
      this.setState({ load: true });
     var data = new URLSearchParams();
     data.append('Cid',id_)
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
           const mydate = responseJson.ResponseData.ValidThrough.substring(14,24)
           
           var datee = String(mydate).split('/');
          
           var datenew = (datee[2] + '/' + datee[1] + '/' + datee[0] );
           var date1 = new Date(datenew);
            console.warn(date1)
          
          var datev = new Date().getDate();
          var month = new Date().getMonth() + 1;
          var year = new Date().getFullYear();
          var datecureent = (datev +'/'+ month +'/'+ year); 
          
          var date2 = new Date(datecureent); 
          console.warn(date2)
          var Difference_In_Time = date1.getTime() - date2.getTime(); 
          console.warn(JSON.stringify(Difference_In_Time))
          
         })
         .catch(error => {
           
           this.setState({ load: false });
         
         });
     }

  async getdataFromSharedPreference()
   {

  

    await  AsyncStorage.getItem('centrename', (err, result) => {
        this.center_name = result;
      });
    await AsyncStorage.getItem('username',(err ,result) => {
      this.setState({username : result})
    })
    await  AsyncStorage.getItem('role', (err, result) => {
        this.role = result; 
        
       if(result == '0' || result=='1' || result =='3' )
       {
        this.setState({ arrayEarnRewards : rollthree})
        AsyncStorage.getItem('districtid', (err, result) => {
          console.warn('dist'+result)
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
            style={{ width: 35, height: 39, marginTop: 5 ,marginRight:4}}
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

    this.props.navigation.navigate('SignIn')
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