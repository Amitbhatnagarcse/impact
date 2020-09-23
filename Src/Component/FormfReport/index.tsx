import React, { useEffect,useState } from "react"
import { View, Text ,Image ,TouchableOpacity ,SafeAreaView,FlatList,BackHandler} from 'react-native';
import Styles from './style';
import AsyncStorage from '@react-native-community/async-storage';
import pngIcons  from '../../../assets/img/images';
import {BASE_URL,Yellowcolour} from '../../../Constants'
import FooterComponent from '../../CommonComponent/Footer'
import { useSelector, useDispatch } from 'react-redux';
import { getFORMFREPORTRequest } from '../../actions';
import TabZeroComponent from '../FormfReport/TabZero';
import TabFiveComponent from '../FormfReport/TabFive';
import TabThreeComponent from '../FormfReport/TabThree';
import TabFiveData from '../FormfReport/TabFiveData';
import TabThreeData from './TabThreeData'
import TabZeroData from './TabZeroData'
import OrientationLoadingOverlay from "react-native-orientation-loading-overlay";
import DatePicker from 'react-native-datepicker';    
import { compareAsc, format } from 'date-fns'
import { da } from "date-fns/locale";


var did = ''

const FormfReport = ( {navigation} ) => {

    const dispatch = useDispatch()
    const loading = useSelector((state) => state.loading);
    const foflisting = useSelector((state) => state.formfreport);

    const [dates , setDate] = useState('')
    const [maxdate , setMaxDate] = useState('')
    const [role ,setrole] = useState('')
    const setTableHeader = ()=>
    {
         if(role == '3')
        return(<TabThreeComponent navigation = {navigation}/>)
        else if(role =='5')
        return(<TabFiveComponent navigation = {navigation}/>)
        else
        return(<TabZeroComponent navigation = {navigation}/>)
    }
  
    const setFunctionDate = async(dat) =>
    {
      console.warn('call api')
     await setDate(dat)
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
    
              <Text style={{ color: 'black',  fontSize: 20,marginLeft:-50,  textAlign: 'center', width: '100%',alignContent:'center' ,justifyContent:'center' }}>FORM F REPORT</Text> 
          </View>    
          )
         };

         const getDaten = async () =>{
          var date = new Date().getDate(); //Current Date
          var month = new Date().getMonth() + 1; //Current Month
          var year = new Date().getFullYear(); //Current Year
         
          var yesterday = new Date(Date.now() - 864e5);
           setDate(''+format(new Date(yesterday), 'yyyy/MM/dd'))  
           setMaxDate(year + '-' + month + '-' + date)
         }
         const readData = async () => {
        
            const role_id = await AsyncStorage.getItem("role")
           if(role_id == '3')
           {
             did = await AsyncStorage.getItem('districtid')
           }
            if(role_id =='5')
            {
             did = await AsyncStorage.getItem('centreid')
            }
            if (role_id !== null) {
                setrole(role_id)                         
              }
        }
         const  _renderItem = (item , index) => 
          {       
            if(role == '3')
            return(  <TabThreeData item={item} navigation = {navigation}/> )
            else if(role =='5')
            return(  <TabFiveData item={item} navigation = {navigation}/> )
            else
            return(  <TabZeroData item={item} navigation = {navigation}/> )
          }

const backAction = () => {

  navigation.goBack(null)
  return true;
};

          useEffect(() => {
   
            readData()
            if(dates == '')
            getDaten()
            if(role != '' && dates !='')
            {
               //  FromDate=2018/07/15&Did=101&Role=3
                var data = new URLSearchParams();
                data.append('FromDate',dates);
                if(role =='3' || role =='5')
                data.append('did',did);
                data.append('Role',role);
                console.warn(data.toString())
                dispatch(getFORMFREPORTRequest(data.toString()))
            }
            BackHandler.addEventListener("hardwareBackPress", backAction);

            return () =>
              BackHandler.removeEventListener("hardwareBackPress", backAction);
          }, [role,dates]);

          
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Yellowcolour}} > 
    <View style={Styles.container}>
    {_headerBar()}  
    <DatePicker
        style={{margin :10,width: '90%',borderColor:'#000',borderWidth:1,height:40,backgroundColor:'white'}}
        date={dates}
        mode="date"
        placeholder="select date"
        format="YYYY/MM/DD"
        minDate="2018/05/01"
        maxDate={maxdate}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0,
            borderColor:'#e1e1e1'
          },
          dateInput: {
            marginLeft: 34
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) =>    setFunctionDate(date)  }
      />  

    <OrientationLoadingOverlay visible={loading}>
          <View>
            <Image
              source={require("../../../assets/img/loadlogo.gif")}
              style={{ width: 80, height: 80 }}
            />
           
          </View>
        </OrientationLoadingOverlay>
  
    {setTableHeader()}
  
    {loading == false &&
        <FlatList 
              style={{
               flex:1,
              backgroundColor:'#fff',width:'100%'}}
              renderItem={(item, index) => _renderItem(item.item,index)}
              data={foflisting}
              numColumns={1}
              bounces={false}
            />
    }
        </View>
<FooterComponent/>
</SafeAreaView> 
 );
};

export default FormfReport;