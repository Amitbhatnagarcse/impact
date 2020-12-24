/* eslint-disable quotes */
import React, { useEffect, useRef, useState } from "react"
import { Text, Alert, SafeAreaView, View, TextInput, StyleSheet, TouchableOpacity, Image, Modal, Platform, FlatList, BackHandler } from 'react-native';
import Styles from './style';
import AsyncStorage from '@react-native-community/async-storage';
import backarrow from '../../../assets/img/backnew.png'
import down from '../../../assets/img/downspinner.png';
import { SinglePickerMaterialDialog } from 'react-native-material-dialog';

import Item from "./Item";
import OrientationLoadingOverlay from "react-native-orientation-loading-overlay";
import { requestMultiple, checkMultiple, PERMISSIONS, checkNotifications, RESULTS, requestNotifications, openSettings } from 'react-native-permissions';
import { BASE_URL, BlueColor, Gradientcolourbluew, Yellowcolour } from '../../../Constants'
import MyData from "../../helper/MyData";
import FooterComponent from '../../CommonComponent/Footer'
var o_role = ''
var block_id = ''
import { useIsFocused } from '@react-navigation/native';
import { ScrollView } from "react-native-gesture-handler";

const PirList = ({ navigation, route }) => {

  const { item, distname, year_my } = route.params;

  const [role, setrole] = useState('')
  const [district_id, setDistrict] = useState('')
  const [loading, setloading] = useState(false)
  const [listing, setListing] = useState([''])
  const [permisssion, setPermission] = useState(RESULTS.DENIED)
  const [district_list, setDistrictListing] = useState([])
  const [visiblesingle, setSingleVisible] = useState([])
  // const [district_name, setDistrict_name] = useState('')  

  const allowStoragePermission = () => {

    if (permisssion == RESULTS.DENIED) {
      requestMultiple([PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE]).then(
        (statuses) => {

          if (Platform.OS == 'android') {

            if (statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] == RESULTS.BLOCKED) {

              openSettings().catch(() => console.warn('cannot open settings'));
              return;
            }
            setPermission(statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE])
          }

        },
      );

    }
    else {
      openSettings().catch(() => console.log('cannot open settings'));
    }
  }
  const identity_Popup = () => {

    setSingleVisible(true)
    setListing(district_list)
  }

  const readData = async () => {


    const role_id = await AsyncStorage.getItem("role")
    const block_my = await AsyncStorage.getItem('blockid');
    if (block_my !== null) {
      block_id = block_my;
    }
    my_role = await AsyncStorage.getItem("orole")
    if (my_role !== null) {
      o_role = my_role
    }

    if (role_id !== null) {
      setrole(role_id)
    }
    // var  district_i = await AsyncStorage.getItem('districtid')
    // if (district_i !== null) {
    //   setDistrict(district_i)                     
    // }
    // var  district_name = await AsyncStorage.getItem('districtname');
    // if (district_name !== null) {
    //   setDistrict_name(district_name)
    // }


  }

  const deletecnfrm = async (id) => {
    var data = new URLSearchParams();
    data.append('PirId', id);
    data.append('Role', role);

    data.append('MobileNo', MyData.mobile);
    data.append('TokenNo', MyData.token);
    _retrieveData(data.toString(), 'DeletePIReport', id)
  }
  const deleteItemById = async (id) => {

    if (role == '3') {
      alert('You are not authorized to delete')
      return
    }
    // const filteredData = listing.filter(item => item.PirId !== id);
    Alert.alert(
      '',
      'Are You Sure you want to delete',
      [
        { text: 'No', onPress: () => console.log('No button clicked'), style: 'cancel' },
        { text: 'Yes', onPress: () => deletecnfrm(id) },

      ],
      {
        cancelable: true
      }
    );
    // setListing(filteredData)


  }
  const editdata = async (item, showbutton) => {

    navigation.navigate('InspectionReport', { id: item, show: showbutton, district_name: distname })

  }


  const _retrieveData = async (data, front, p_id) => {

    console.warn('data', front + data.toString())

    setloading(true)

    fetch(BASE_URL + front, {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: data.toString(),
      json: true,
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('response', front);
        console.log('response', responseJson)
        console.log('response length', responseJson.ResponseData.length)
        //alert(JSON.stringify(front))
        setloading(false)
        console.warn(data.toString())
        if (responseJson.Status) {
          console.log('response', responseJson)
          if (front == 'GetPIReportByDID') {

            if (o_role != null && o_role == '4') {
              try {
                const filtereddata = responseJson.ResponseData.filter(person => person.BlockId == block_id);
                setListing(filtereddata)
              }
              catch (e) { }
            }
            else {
              setListing(responseJson.ResponseData)
            }
          }

          if (front == 'DeletePIReport') {

            const filteredData = listing.filter(item => item.PirId !== p_id);
            setListing(filteredData)
          }

          if (front == 'GetAllDistrict') {
            setDistrictListing(responseJson.ResponseData)
          }
        }
        else {
          setTimeout(() => {

            if (responseJson.Message == 'Invalid Request') {
              Alert.alert(
                '',
                'Session Expired please verify again',
                [
                  { text: '', onPress: () => navigation.goBack(null), style: 'cancel' },
                  { text: 'Yes', onPress: () => navigation.navigate('PinScreen') },

                ],
                {
                  cancelable: true
                }
              );
            }
            else
              alert(responseJson.Message)
          }, 300);
        }

      })
      .catch(error => {
        //this.setState({ load: false });
        setloading(false)

      });

  }

  const _headerBar = () => {
    return (
      <View style={Styles.headerView}>

        <View style={{ width: 50, height: 40, zIndex: 1, alignContent: 'center', justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={{ width: 35, height: 35, paddingLeft: 10, padding: 5 }}
              source={backarrow}
            />
          </TouchableOpacity>
        </View>

        <Text style={{ color: 'white', fontSize: 20, marginLeft: -50, textAlign: 'center', width: '100%', alignContent: 'center', justifyContent: 'center' }}>Inspection Report List</Text>
      </View>
    )
  };

  const _renderItem = (item, index, navigation_) => {
    return (
      <Item item={item} index={index} navigation={navigation_} actionPer={deleteItemById} editfun={editdata} role={role} />
    )
  }

  const backAction = () => {

    navigation.goBack(null)
    return true;
  };

  const isFocussed = useIsFocused();

  useEffect(() => {

    readData()
    if (role != '') {
      // if(role =='3' || role =='0' || role == '5')
      // {
      var data = new URLSearchParams();
      var year = new Date().getFullYear(); //Current Year

      data.append('Year', year_my);
      //data.append('Did',district_id);
      data.append('Did', item);
      data.append('Role', '3');
      data.append('MobileNo', MyData.mobile);
      data.append('TokenNo', MyData.token);
      _retrieveData(data, 'GetPIReportByDID')

      // }
      // else
      //   {
      //     var data = new URLSearchParams();
      //     data.append('Role',role);

      //     data.append('MobileNo', MyData.mobile);
      //     data.append('TokenNo', MyData.token);
      //     _retrieveData(data ,'GetAllDistrict')
      //   }


      const unsubscribe = navigation.addListener('focus', () => {

        BackHandler.addEventListener("hardwareBackPress", backAction);

        return () =>
          BackHandler.removeEventListener("hardwareBackPress", backAction);
      });

      // Return the function to unsubscribe from the event so it gets removed on unmount
      return unsubscribe;
      allowStoragePermission()
      //allowLocationPermission()
    }
    // dispatch(getDashboardRequest(data.toString()))
  }, [role, isFocussed]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Gradientcolourbluew }} >
      <SinglePickerMaterialDialog
        title={'Pick Value '}
        scrolled
        items={listing.map((row, index) =>
          ({ value: row.Code, label: row.CodeText }))}
        visible={visiblesingle}
        selectedItem={district_id}
        onCancel={() => setSingleVisible(false)}
        onOk={result => {
          if (typeof (result.selectedItem) !== 'undefined' || result.selectedItem != null) {
            setSingleVisible(false)

            //setDistrict(result.selectedItem.value)
            //setDistrict_name(result.selectedItem.label) 
            var data = new URLSearchParams();
            var year = new Date().getFullYear(); //Current Year
            data.append('Year', year);
            data.append('Did', result.selectedItem.value);
            data.append('Role', '3');

            data.append('MobileNo', MyData.mobile);
            data.append('TokenNo', MyData.token);

            _retrieveData(data.toString(), 'GetPIReportByDID')


          } else {
            alert('please select value');
          }

        }}
      />

      <View style={Styles.container}>

        <OrientationLoadingOverlay visible={loading}>
          <View>
            <Image
              source={require("../../../assets/img/loadlogo.gif")}
              style={{ width: 80, height: 80 }}
            />

          </View>
        </OrientationLoadingOverlay>
        {_headerBar()}


        <View style={Styles.inputboxview} >
          <Text style={Styles.inputtextbig}> District </Text>

          <Text style={Styles.inputliketext}
          >{distname}</Text>

        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 10 }}>


          {listing.map((item, index) => {
            debugger;
            return _renderItem(item, index, navigation)
          })
          }
          {/* <FlatList
            style={{
              flex: 1,
              width: '100%'
            }}
            renderItem={(item, index) => _renderItem(item.item, index, navigation)}
            data={listing}
            numColumns={1}
            bounces={false}
            contentContainerStyle={{ marginBottom: 165 }}

          /> */}
        </ScrollView>

      </View>
      {role == '3' &&
        <TouchableOpacity onPress={() => navigation.navigate('InspectionReport')}>
          <Text style={{
            backgroundColor: BlueColor, padding: 5, color: 'white', paddingTop: 12, height: 50, fontSize: 18,
            borderColor: 'white', width: '100%', textAlign: 'center'
          }} >ADD Inspection Report</Text>
        </TouchableOpacity>
      }
      {/* {role =='1' &&
          <TouchableOpacity   onPress={() => navigation.navigate('InspectionReport')}>
             <Text style={{	backgroundColor:BlueColor,padding:5,color:'white',paddingTop:12,height:50,fontSize:18,
		borderColor: 'white',width:'100%',textAlign:'center'}} >ADD Inspection Report</Text>
        </TouchableOpacity>
} */}

    </SafeAreaView>
  )

}
export default PirList;