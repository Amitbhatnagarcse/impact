import React, { useEffect,useState } from "react"
import { View, Text ,Image ,TouchableOpacity ,SafeAreaView,FlatList,BackHandler} from 'react-native';
import Styles from './style';
import AsyncStorage from '@react-native-community/async-storage';
import pngIcons  from '../../../assets/img/images';
import {BASE_URL,Yellowcolour} from '../../../Constants'
import FooterComponent from '../../CommonComponent/Footer'
import { useSelector, useDispatch } from 'react-redux';
import { getFORMFREPORTRequest } from '../../actions';

import OrientationLoadingOverlay from "react-native-orientation-loading-overlay";
import DatePicker from 'react-native-datepicker';    



const Feedback = ( {navigation} ) => {

    const dispatch = useDispatch()
    const loading = useSelector((state) => state.loading);
    const foflisting = useSelector((state) => state.formfreport);

    const [date , setDate] = useState('')
    const [maxdate , setMaxDate] = useState('')
    const [role ,setrole] = useState('')
    const [selectedValue, setSelectedValue] = useState("java");

   
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
    
              <Text style={{ color: 'black',  fontSize: 20,marginLeft:-50,  textAlign: 'center', width: '100%',alignContent:'center' ,justifyContent:'center' }}>FEEDBACK</Text> 
          </View>    
          )
         };

         const readData = async () => {
        
            const role_id = await AsyncStorage.getItem("role")
         
            if (role_id !== null) {
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
                // FromDate=2018/07/15&Did=101&Role=3
                // var data = new URLSearchParams();
                // data.append('FromDate','2018/07/15');
                // if(role =='3' || role =='5')
                // data.append('did',did);
                // data.append('Role',role);
                // console.log(data.toString())
                // dispatch(getFORMFREPORTRequest(data.toString()))
            }

            BackHandler.addEventListener("hardwareBackPress", backAction);

            return () =>
              BackHandler.removeEventListener("hardwareBackPress", backAction);
            
          }, [role]);

          
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Yellowcolour}} > 
    <View style={Styles.container}>
    {_headerBar()}  
    <DatePicker
        style={{width: '50%',borderColor:'#000',borderWidth:1,height:35,backgroundColor:'white'}}
        date={date}
        mode="date"
        placeholder="select date"
        format="YYYY/MM/DD"
        minDate="2018-05-01"
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
        onDateChange={(date) => {setDate(date)}}
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