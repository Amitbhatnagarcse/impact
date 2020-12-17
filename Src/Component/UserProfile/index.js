import React, { useEffect, useState } from "react"
import { View, Text, TextInput, Image, TouchableOpacity, SafeAreaView, FlatList, BackHandler, Alert, Dimensions } from 'react-native';
import Styles from './style';
import AsyncStorage from '@react-native-community/async-storage';
import pngIcons from '../../../assets/img/images';
import { BASE_URL, Gradientcolourbluew } from '../../../Constants'
import FooterComponent from '../../CommonComponent/Footer'
import OrientationLoadingOverlay from "react-native-orientation-loading-overlay";
import RadioForm from 'react-native-simple-radio-button';
import { da, it } from "date-fns/locale";
import MyData from "../../helper/MyData";


const UserProfile = ({ navigation, route }) => {

  const { item, CenterName } = route.params;

  console.warn(JSON.stringify(item))

  const [role, setrole] = useState('')
  const [userid, setUserid] = useState('')
  const [unitid, setUnitid] = useState('')
  const [loading, setloading] = useState(false);
  const [typevalue, settypevalue] = useState(-1);
  const [CenterMobileNo, setCenterMobileNo] = useState('');

  const [CenterAddress, setCenterAddress] = useState('');
  const [RegistrationNo, setRegistrationNo] = useState('');
  const [Validfrom, setValidfrom] = useState('');

  const [ApplicantName, setApplicantName] = useState('');
  const [ApplicantAddress, setApplicantAddress] = useState('');
  const [ApplicantMobile, setApplicantMobileo] = useState('');

  const [listing, setListing] = useState('');
  const radio_props = [
    { label: 'Suggestion', value: 'S' },
    { label: 'Query', value: 'Q' }
  ];


  const _retrieveData = async (data, front, id) => {


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
        console.warn(JSON.stringify(responseJson.ResponseData))

        setloading(false)
        if (responseJson.Status) {
          if (front == 'OwnerProfile') {
            setApplicantName(responseJson.ResponseData[0].ApplicantName)
            setApplicantMobileo(responseJson.ResponseData[0].ApplicantMobile)
            setApplicantAddress(responseJson.ResponseData[0].ApplicantAddress)
            setCenterMobileNo(responseJson.ResponseData[0].CenterMobileNo)
          }

        }
        else {
          alert(responseJson.Message)
        }
      })
      .catch(error => {
        setloading(false)
      });
  }

  const _retrieveDataCenter = async (data, front) => {
    console.log('center ' + data.toString())
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

        if (responseJson.Status) {

          console.log(JSON.stringify(responseJson))
          setCenterAddress(responseJson.ResponseData.CenterAddress)
          setRegistrationNo(responseJson.ResponseData.RegNo)
          setValidfrom(responseJson.ResponseData.ValidThrough)
        }
        else {
          alert(responseJson.Message)
        }
      })
      .catch(error => {
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
              source={pngIcons.backnew}
            />
          </TouchableOpacity>
        </View>

        <Text style={{ color: 'white', marginTop: 20, fontSize: 20, marginLeft: 50, alignContent: 'center', justifyContent: 'center' }}>Center Profile</Text>
      </View >
    )
  };

  const readData = async () => {

    const role_id = await AsyncStorage.getItem("role")
    const user_id = await AsyncStorage.getItem("userid")
    const unit_id = await AsyncStorage.getItem("unitid")

    if (role_id !== null) {
      setrole(role_id)
      setUserid(user_id)
      setUnitid(unit_id)
    }
  }


  const backAction = () => {

    navigation.goBack(null)
    return true;
  };


  useEffect(() => {

    readData()
    if (role != '') {
      var data = new URLSearchParams();
      data.append('Unitid', item);
      data.append('Role', '5');
      data.append('MobileNo', MyData.mobile);
      data.append('TokenNo', MyData.token);
      _retrieveData(data.toString(), 'OwnerProfile')

      var data = new URLSearchParams();
      data.append('MobileNo', MyData.mobile);
      data.append('TokenNo', MyData.token);
      data.append('Cid', item);
      _retrieveDataCenter(data.toString(), 'GetCenterDetail')

    }


  }, [role]);


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Gradientcolourbluew }} >
      <View style={Styles.container}>



        <View style={{ zIndex: 0, position: 'absolute', width: '100%' }}>

          {_headerBar()}
          <OrientationLoadingOverlay visible={loading}>
            <View>
              <Image
                source={require("../../../assets/img/loadlogo.gif")}
                style={{ width: 80, height: 80 }}
              />
            </View>
          </OrientationLoadingOverlay>
        </View>

        <View style={{
          zIndex: 1,
          marginLeft: 20, padding: 20, marginRight: 20, marginTop: 150, elevation: 3
          , borderRadius: 10, backgroundColor: '#fff'
        }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: .5 }}>
              <Text style={{ color: '#000', opacity: .3 }}>Applicant Name</Text>
              <Text>{ApplicantName}</Text>
            </View>
            <View style={{ flex: .5 }}>
              <Text style={{ color: '#000', opacity: .4 }}>Applicant Mobile</Text>
              <Text>{ApplicantMobile}</Text>
            </View>
          </View>


          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: '#000', opacity: .3 }}>Address</Text>
              <Text>{ApplicantAddress}</Text>
            </View>

          </View>


        </View>


        <View style={{ marginLeft: 20, padding: 20, marginRight: 20, marginTop: 20, borderRadius: 10, backgroundColor: '#fff' }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: .5 }}>
              <Text style={{ color: '#000', opacity: .3 }}>Center Name</Text>
              <Text>{CenterName}</Text>
            </View>
            <View style={{ flex: .5 }}>
              <Text style={{ color: '#000', opacity: .4 }}>Center Mobile</Text>
              <Text>{CenterMobileNo}</Text>
            </View>
          </View>



          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <View style={{ flex: .5 }}>
              <Text style={{ color: '#000', opacity: .3 }}>Registration No</Text>
              <Text>{RegistrationNo}</Text>
            </View>
            <View style={{ flex: .5 }}>
              <Text style={{ color: '#000', opacity: .3 }}>Validity</Text>
              <Text>{Validfrom}</Text>
            </View>
          </View>


          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: '#000', opacity: .3 }}>Center Address</Text>
              <Text>{CenterAddress}</Text>
            </View>

          </View>

        </View>



      </View>
      <FooterComponent />
    </SafeAreaView >
  );
};

export default UserProfile;