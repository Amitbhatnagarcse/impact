import React from 'react';
import { Platform,StyleSheet, Image, ImageBackground, BackHandler, FlatList, Text, View, TouchableHighlight, TouchableWithoutFeedback, SafeAreaView,Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const DEVICE_HEIGHT = Dimensions.get('window').height - ( Platform.OS === 'ios' ? 180 : 120);

import Menu from './Menu';
import SideMenu from 'react-native-side-menu';
import { Col } from 'native-base';
import background from '../../assets/img/backpinview.jpg';
import {Yellowcolour} from '../../Constants'
//import footer from '../../assets/img/footer.jpg'
import FooterComponent from '../CommonComponent/Footer'

const arrayEarnReward = [
  {
    name: 'DASHBOARD',
    img: require('../../assets/img/dashboard.png')
  },
  {
    name: 'Report',
    img: require('../../assets/img/renewal.png')
  },
  {
    name: 'DAY \n END \nSUMMARY',
    img: require('../../assets/img/dayendsummary.png')
  },
  {
    name: 'FORM F',
    img: require('../../assets/img/formf.png')
  },
  {
    name: 'Feedback',
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
  {
    name: 'DAY \n END \nSUMMARY',
    img: require('../../assets/img/dayendsummary.png')
  },
  {
    name: 'Report',
    img: require('../../assets/img/formf.png')
  },
  {
    name: 'Feedback',
    img: require('../../assets/img/feedback.png')
  },
]

var role ="";
var center_name = "";
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
              title : 'Impact',
              arrayEarnRewards:[],         
            }
   }

  async getdataFromSharedPreference()
   {

    await  AsyncStorage.getItem('centrename', (err, result) => {
        this.center_name = result;

      });

    await  AsyncStorage.getItem('role', (err, result) => {
        this.role = result; 
        
       if(result == '5' || result =='3')
       {
        this.setState({ arrayEarnRewards : rollthree})
       }
       else
       {
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
    //alert('hello');
    BackHandler.exitApp();
    //this.props.navigation.goBack(null);
    return true;
  }

 

  _renderItem(item) {
    return (
      <Col style={{ padding: 1, paddingLeft: 0 ,margin:2}}>

        <ImageBackground
          source={item.img}
          resizeMode ={"center"}
          style={{padding:2, flex: 1, resizeMode: 'cover', height: ((DEVICE_HEIGHT) / 3 -20) }}>
             <TouchableHighlight
             style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(52, 52, 52, 0.4)', width: '100%', flex: 1,borderColor:'#fff',borderRadius:1 }}
             onPress={() => {
             
              if(item.name == 'DAY \n END \nSUMMARY')
              this.props.navigation.navigate('Home')
              else if (item.name =='FORM F')
              {
              this.props.navigation.navigate('Formf')
              }
              else if(item.name == 'PIR UPLOAD')
              {
                //this.props.navigation.navigate('InspectionReport')
                this.props.navigation.navigate('PirList')
                //this.props.navigation.navigate('PDFExample');
                //this.props.navigation.navigate('ShareDemo');
              }
              else if(item.name ==  'DASHBOARD')
              {
                  this.props.navigation.navigate('DashBoardChart');
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
          <View style={{ width: 50, height: 60,   backgroundColor: '#cc8800', zIndex: 1 }}>
            <Image
              style={{ width: 30, height: 30, marginTop: 15 }}
              source={{ uri: 'https://cdn4.iconfinder.com/data/icons/yellow-commerce/100/.svg-19-512.png' }}
            />
          </View>
        </TouchableWithoutFeedback>
        {this.getNormalHeader()}
      </View>)
  }
  getNormalHeader(){
    return(
      <Text style={{ color: 'black',  fontFamily: 'Cochin', fontWeight: 'bold',fontSize: 28,marginLeft:-50,  textAlign: 'center', width: '100%' }}>{this.state.title}</Text>

    )
  }

  toggleDrawer() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
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

    const menu = <Menu onItemSelected={this.onMenuItemSelected} type='home'  navigation={this.props.navigation}
    />;

    return (
      <SideMenu
       menu={menu}
       isOpen={this.state.isOpen}
       onChange={isOpen => this.updateMenuState(isOpen)}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: Yellowcolour }}>

        <View style={styles.container}>
        <ImageBackground
          source={background}
          resizeMode ={"cover"}
          backgroundColor = {'#e1e1e1'}
          style={{margin:1, width:'100%', height:'100%',resizeMode: 'contain' }}>
        {this._headerBar()}
          {this.props.loading && <MaterialIndicator color="#5B5A5F" size={30} trackWidth={2} />}
          {!this.props.loading && (this.state.pageType === "HomeScreen" ) &&
            <FlatList
              style={{ flex: 1 }}
              renderItem={(item, index) => this.getItemByType(this.state.pageType, item)}
              key={this.state.pageType}
              data={this.getArrayByType(this.state.pageType)}
              numColumns={columntype}
              bounces={false}
            />}



         </ImageBackground>
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
     backgroundColor: '#cc8800', alignItems: 'center', width: '100%', flexDirection: 'row', height: 60,
    justifyContent: 'flex-start',elevation:10
  },
  title_center :{
    textAlign: 'center', 
    fontSize: 18,
    marginTop: 0,
    fontFamily: ''
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





