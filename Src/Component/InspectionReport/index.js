
import React, { useEffect, useRef, useState } from "react"
import { Text ,SafeAreaView,View ,TextInput,StyleSheet,TouchableOpacity,Image,Modal,Platform,Alert,BackHandler} from 'react-native';
import Styles from './style';
import { SinglePickerMaterialDialog , MultiPickerMaterialDialog } from 'react-native-material-dialog';
import AsyncStorage from '@react-native-community/async-storage';

import DatePicker from 'react-native-datepicker';
import OrientationLoadingOverlay from "react-native-orientation-loading-overlay";
import backarrow from '../../../assets/img/backnew.png'
import down from '../../../assets/img/downspinner.png';
import file_upload from '../../../assets/img/file_upload.png';
import { requestMultiple, checkMultiple, PERMISSIONS, checkNotifications, RESULTS, requestNotifications, openSettings } from 'react-native-permissions';
import ImagePicker from 'react-native-image-picker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import {BASE_URL, BlueColor} from '../../../Constants'

var pid_id = ''

const InspectionReport = ({navigation ,route}) => {

  const [pir_no, setPir] = useState("")  
  const [district_id, setDistrict] = useState("")  
  const [district_name, setDistrict_name] = useState("")  
  const [center_name, setCenter_name] = useState("")  
  const [center_id, setCenter_id] = useState("")  
  const [center_address ,setCenterAdddrress] = useState("")
  const [center_reg_no , setRegNo] = useState("")
  const [date , setDate] = useState("")
  const [time , setTime] = useState("select time")
  const [authority , setAuthority] = useState("")
  const [attachmnet , setAttachmnetName] = useState("select file")
  const [loading , setloading] = useState(false)
  const [listing ,setListing] = useState([])
  const [district_list  ,setDistrictListing] = useState([])
  const [center_listing ,setCenterListing] = useState([])
  const [role ,setrole] = useState([])
  const [unitid ,setUnitId] = useState([''])

  const [visiblesingle ,setSingleVisible] = useState([])
  const [current_dialogue ,setCurrentDialog] = useState("")
  const [permisssion, setPermission] = useState(RESULTS.DENIED)
  const [imageSelector, setImageSelector] = useState(false)
  const [imagedata, setImage] = useState('')
  const [maxdate,setMaxDate] = useState('')
  const [show,setShow] = useState(false)
  const [file_extension,setFileExtension] = useState('')
  const [submit,setSubmit] = useState('Submit')
   
  const [locationPermissionStatus, setLocationPermissionStatus] = useState(RESULTS.DENIED)



  var block_id =''
  var _unit =''

     
  const allowLocationPermission = () => {
    if (locationPermissionStatus == RESULTS.DENIED) {
        requestMultiple([PERMISSIONS.IOS.LOCATION_WHEN_IN_USE, PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]).then(
            (statuses) => {
                if (Platform.OS == 'android') {
                    setLocationPermissionStatus(statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION])
                }
                if (Platform.OS == 'ios') {
                    setLocationPermissionStatus(statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE])
                }
            },
        );
    }
    else {
        openSettings().catch(() => console.warn('cannot open settings'));
    }
}

    const readData = async () => {
   
        const role_id = await AsyncStorage.getItem("role")
        if (role_id !== null) {
        setrole(role_id)
        }
        block_id = await AsyncStorage.getItem('blockid')
        _unit = await AsyncStorage.getItem('unitid')
        setUnitId(_unit)
       
       if(role_id == '3')
       {
        var districtidv = await AsyncStorage.getItem('districtid')
        if (districtidv !== null) {
          debugger
          setDistrict(districtidv)
        }
        var districtnamev = await AsyncStorage.getItem('districtname')
        if (districtnamev !== null) {
          setDistrict_name(districtnamev)
          }
       }
       
     
    }
    const identity_Popup = () => {  
      if(role == '1')
      {
        setCurrentDialog('district')
        setSingleVisible(true)
        setListing(district_list)
      }
     
    }
    const identity_Popup_center = () => {  
      setCurrentDialog('center')
      setSingleVisible(true)
      setListing(center_listing)
      //this.setState({ singlePickerVisible: true ,dataSource : current_list.IdentityProofType})
    }
    const imagepicker = async () => {  
    setImageSelector(true)
    }

    const selectFile = async () => {
      // Pick a single file
        try {
          const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.pdf],
          });
          setImageSelector(false)
          setAttachmnetName(res.name)
       
        
        if( Number(res.size) > 1048576)
        {
          alert('File Size is Greater The 1 MB')
          return
        }
        //  const dirs = RNFetchBlob.fs.dirs;
      
          var data_r = await RNFS.readFile( res.fileCopyUri , 'base64').then(resp => { return resp });
        setImage(data_r)
        setFileExtension('.pdf')
      
      //     var path = dirs.DCIMDir + `/${res.name}.pdf`;      
      //     RNFetchBlob.fs.writeFile(path,data_r, 'base64')
      //     .then((res) => {console.warn("File : ", res)});
      // if (Platform.OS === 'android') {
      //   RNFetchBlob.android.actionViewIntent(path, 'application/pdf');
      // } else {
      //   RNFetchBlob.ios.previewDocument(path);
      // }
        } catch (err) {
          if (DocumentPicker.isCancel(err)) {
            // User cancelled the picker, exit any dialogs or menus and move on
          } else {
            throw err;
          }
        }
    }

    const launchCamera = () => {
      let options = {
        storageOptions: {
          skipBackup: true,
          path: 'images',
          quality: 0.4,
        },
      };

      if (imageSelector == true)
        setImageSelector(false)

      ImagePicker.launchCamera(options, (response) => {


        if (response.didCancel) {
          handleBackButtonClick();
        } else if (response.error) {

          handleBackButtonClick();
        } else if (response.customButton) {


          handleBackButtonClick();
        } else {
          //let source = { uri: 'data:image/jpeg;base64,' + response.data };
          
          setFileExtension('.jpeg')
          setImage(response.data)
          //console.log(JSON.stringify(response));
          // this.setState({
          //   imagebasesix: JSON.stringify(source),
          //   action_file_name: response.fileName
          // })
          // this.setState({
          //   filePath: response,
          //   fileData: response.data,
          //   fileUri: response.uri,
          //   iconUri: require('../../assets/img/image.png'),
          //   fileName: response.fileName
          // });
        }
      });
    }


    const launchImageLibrary = () => {
      let options = {
        storageOptions: {
          skipBackup: true,
          path: 'images',
          quality: 0.4,
        },
      };

      ImagePicker.launchImageLibrary(options, (response) => {

        if (imageSelector == true)
        setImageSelector(false)

        if (response.didCancel) {

        } else if (response.error) {
x
        } else if (response.customButton) {


        } else {

          //let source1 = { uri: 'data:image/jpeg;base64,' + response.data };
          if( Number(response.fileSize) > 1048576)
          {
            alert('File Size is Greater The 1 MB')
            return
          }
          setFileExtension('.jpeg')
          setAttachmnetName(response.fileName)
          setImage(response.data)
          //console.warn(JSON.stringify(response));
          // this.setState({
          //   imagebasesix: JSON.stringify(source1),
          //   action_file_name: response.fileName
          // })x

          // this.setState({
          //   filePath: response,
          //   fileData: response.data,
          //   fileUri: response.uri,
          //   iconUri: require('../../assets/img/image.png'),
          //   fileName: response.fileName
          // });
        }
      });
    }

    const changetime = async (timeString) =>{
    
      var H = +timeString.substr(0, 2);
      var h = H % 12 || 12;
      var ampm = (H < 12 || H === 24) ? " AM" : " PM";
      timeString = h + timeString.substr(2, 3) + ampm;
      setTime(timeString)
    }
    const onSubmit = async () => {

      if(role == '3' && submit =='Update')
      {
        alert('You are not authorized to update')
        return
      }
    
      var data = new URLSearchParams();
      data.append('PIRNo',pir_no);
      data.append('PIRDate',date);
      data.append('PIRTime',time);
      data.append('Role',role);
      data.append('PIRAppAuth',authority);

      if(submit =='Update')
      {
       data.append('PirID',pid_id)
      }
      else
      {
        data.append('UploadBy',''+unitid);
        data.append('CID',center_id);
        data.append('Did',district_id);
      }
    
      if(imagedata != '')
      {
        data.append('DocFile',imagedata);
        data.append('FileExtension',file_extension);
      }
    
   debugger
      _retrieveData(data.toString() ,'SavePIReport')
    }
    const backAction = () => {

      navigation.goBack(null)
      return true;
    };

   
    useEffect(() => {
   
    readData()
    if(role != '')
    {
      try{
        setSubmit('Update')
        const{ id } = route.params; 
        pid_id = ''+id.PirId
        setPir(''+id.PIRNo)
        //setDate(id.PIRDate)
        var datee = String(id.PIRDate).split('/');
        setDate(datee[2] + '/' + datee[1] + '/' + datee[0] )
        setTime(id.PIRTime)
        setAuthority(id.PIRAppAuth)
        setCenter_id(id.Cid)
        setCenter_name(id.CenterName)
        var data = new URLSearchParams();
        data.append('Cid',id.Cid);
        _retrieveData(data.toString() ,'GetCenterDetail')
       
      }
      catch(e)
      {
        setSubmit('Submit')
      }   
      if(role == '1' || role =='0')
      {
        
      var data = new URLSearchParams();
      data.append('Role',role);
      _retrieveData(data.toString() ,'GetAllDistrict')
      }
      if(role =='3')
      {
        var data = new URLSearchParams();
        data.append('Did',district_id);
        _retrieveData(data.toString() ,'GetCentersByDID')
      }

      var date = new Date().getDate(); //Current Date
      var month = new Date().getMonth() + 1; //Current Month
      var year = new Date().getFullYear(); //Current Year
      setMaxDate(year + '/' + month + '/' + date )
      
      allowLocationPermission()
     }
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
     //dispatch(getDashboardRequest(data.toString()))
  }, [role,district_id]);


  const _retrieveData = async (data ,front) => {
    setloading(true)
      fetch(BASE_URL+front, {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data,
        json: true,
      })
        .then(response => response.json())
        .then(responseJson => {
          setloading(false)
          if(responseJson.Status)
          {
            if(front == 'GetAllDistrict')
            {
              setDistrictListing(responseJson.ResponseData)
            }
             if(front =='GetCentersByDID')
             {
              setCenterListing(responseJson.ResponseData)
             }
              if(front == 'GetCenterDetail')
              {
                setCenterAdddrress(responseJson.ResponseData.CenterAddress)
                setRegNo(responseJson.ResponseData.RegNo +  " "+ responseJson.ResponseData.ValidThrough)
              }
              if(front == 'SavePIReport')
                  {
                    debugger
                    Alert.alert(  
                      'IMPACT',  
                    responseJson.Message,  
                      [  
                          {text: 'OK', onPress: () => navigation.goBack()},  
                      ]  
                  );  
                    //alert(responseJson.Message)  
                  }
            }
         
          else{
            if(front == 'SavePIReport')
            {
              alert(responseJson.Message)
            }
          }
        })
        .catch(error => {
          alert(''+error)
          //this.setState({ load: false });
          setloading(false)
        
        });
    
   }

   const _headerBar = () => {
    return (
      <View style={Styles.headerView}>
      
          <View style={{ width: 50, height: 40,   zIndex: 1,alignContent:'center' ,justifyContent:'center'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
               <Image
              style={{ width: 35, height: 35,paddingLeft:10,padding:5}}
              source={backarrow}
            />
            </TouchableOpacity>
          </View>

          <Text style={{ color: 'white',  fontSize: 20,marginLeft:-50,  textAlign: 'center', width: '100%',alignContent:'center' ,justifyContent:'center' }}>Inspection Report</Text>

      </View>
      
      
      )
   };
    return (
      <SafeAreaView style={Styles.containersafe} >
          
        <View style={Styles.container}>
        {_headerBar()}

        {imageSelector == true && (
        <View>
          <Modal style={Styles.dialogue}
            isVisible={imageSelector}
            transparent={true}
            animationType={"fade"}
            onRequestClose={() => setImageSelector(false)}
          >
            <View style={Styles.dialogue}>
              <View style={Styles.dialogueContainer}>
                <Text style={Styles.dialogCamera} onPress={launchCamera}>Camera</Text>
                <Image style={{ width: 280, height: 1, backgroundColor: '#e1e1e1'}} />
                <Text style={Styles.dialogCamera} onPress={launchImageLibrary}>Gallery</Text>
                <Image style={{ width: 280, height: 1, backgroundColor: '#e1e1e1'}} />
                <Text style={Styles.dialogCamera} onPress={selectFile}>File</Text>
                <Image style={{ width: 280, height: 1, backgroundColor: '#e1e1e1'}} />
                <Text style={Styles.dialogueCancel}
                  onPress={() => setImageSelector(false)}
                >Close</Text>
              </View>
            </View>
          </Modal>
        </View>
      )}

        <SinglePickerMaterialDialog
         title={'Select Value '}
         scrolled
         items={listing.map((row, index) =>
           ( { value: row.Code, label: row.CodeText })) }
          visible={visiblesingle}
          selectedItem=  {district_id}
          onCancel={() => setSingleVisible(false)}
          onOk={result => {   
      if (typeof(result.selectedItem) !== 'undefined' || result.selectedItem != null) {
      setSingleVisible(false)
        if(current_dialogue == 'district')                    
        {
          setDistrict(result.selectedItem.value)
          setDistrict_name(result.selectedItem.label) 
          var data = new URLSearchParams();
          data.append('Did',result.selectedItem.value);
          _retrieveData(data.toString() ,'GetCentersByDID')

        }  
       else
        {
          setCenter_name(result.selectedItem.label)
          setCenter_id(result.selectedItem.value)
          var data = new URLSearchParams();
          data.append('Cid',result.selectedItem.value);
          _retrieveData(data.toString() ,'GetCenterDetail')
        }
      
      } else {
              alert('please select value');
      }

    }}
    />
     
        <View style={Styles.inputboxview} >
        <Text style={Styles.inputtext}> District </Text>
       <TouchableOpacity style={{width:'50%',flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',}} onPress = {() => identity_Popup()}>
         <Text style={Styles.inputliketext}
              >{district_name}</Text>
              <Image source={down} style={{position: "absolute", bottom: 0, right: 5,height:20,width:20,  justifyContent: 'center',
        marginBottom:3,alignItems: 'center',}}/>
           </TouchableOpacity>
          </View>

          <View style={Styles.inputboxview} >
        <Text style={Styles.inputtext}> Center Name </Text>
       <TouchableOpacity style={{width:'50%',flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',}} onPress = {() => identity_Popup_center()}>
         <Text style={Styles.inputliketext}
              >{center_name}</Text>
              <Image source={down} style={{position: "absolute", bottom: 0, right: 5,height:20,width:20,  justifyContent: 'center',
        marginBottom:3,alignItems: 'center',}}/>
           </TouchableOpacity>
          </View>
 

          <View style={Styles.inputboxview} >
        <Text style={Styles.inputtext}>Center Address</Text>
        <Text style={Styles.input}  >{center_address} </Text>
          </View>

          <View style={Styles.inputboxview} >
        <Text style={Styles.inputtext}>Center Reg No. Validity Date</Text>
        <Text style={Styles.input}  > { center_reg_no } </Text>
          </View>

          <View style={Styles.inputboxview} >
        <Text style={Styles.inputtext}>PIR No.</Text>
        <TextInput
                        style={Styles.inputfixheight}
                        placeholderTextColor="#adb4bc"
                        returnKeyType="next"
                        autoCapitalize="none"
                        value = {pir_no}
                        autoCorrect={false}
                        keyboardType="default"
                        onChangeText={value => setPir(value)}  />
          </View>

          <View style={Styles.inputboxview} >
        <Text style={Styles.inputtext}>Appropriate Authority</Text>
        <TextInput
                        style={Styles.inputfixheight}
                        placeholderTextColor="#adb4bc"
                        returnKeyType="next"
                        autoCapitalize="none"
                        value = {authority}
                        autoCorrect={false}
                        keyboardType="default"
                        onChangeText={value => setAuthority(value)}  />
          </View>

          <View style={Styles.inputboxview} >
        <Text style={Styles.inputtext}>Date</Text>
        <DatePicker
        style={{width: '50%',borderColor:'#000',borderWidth:1,height:40,backgroundColor:'white'}}
        date={date}
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
            borderColor:'#fff'
          },
          dateInput: {
            marginLeft: 34
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {setDate(date)}}
      />  
          </View>
          <View style={Styles.inputboxview} >
        <Text style={Styles.inputtext}>Time</Text>
        { !show &&(
        <TouchableOpacity style={{width:'50%',flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',}} onPress = {() => setShow(true)}>
         <Text style={Styles.inputlikefile}
              >{time}</Text>
              <Image source={down} style={{position: "absolute", bottom: 0, right: 5,height:20,width:20,  justifyContent: 'center',
        marginBottom:3,alignItems: 'center',}}/>
           </TouchableOpacity>
        )}
           {show && (
        <RNDateTimePicker
        style={{flex: 1}}
         mode="time" 
         is24Hour={false}
        value={new Date()} 
        onChange={ (event, value) => {  
          setShow(false)
          changetime((''+value).substring(16,21))
          //setTime((''+value).substring(16,21))
        }
        }
         
          
        />
      )}
          
       
        </View>
          <View style={Styles.inputboxview} >
        <Text style={Styles.inputtext}> Attachmnet </Text>
       <TouchableOpacity style={{width:'50%',flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',}} onPress = {() => imagepicker()}>
         <Text style={Styles.inputlikefile}
              >{attachmnet}</Text>
              <Image source={file_upload} style={{position: "absolute", bottom: 0, right: 5,height:20,width:20,  justifyContent: 'center',
        marginBottom:3,alignItems: 'center',}}/>
           </TouchableOpacity>
          </View>
          <Image style={{width: 150, height: 150}} source={imagedata}/>
          </View>

        <TouchableOpacity style={{width:'100%',alignItems:'center',alignSelf:'center'}}   onPress={() => onSubmit()}>
             <Text style={{	height:40 ,backgroundColor:BlueColor,padding:5,color:'white',marginBottom:10,paddingTop:10,
		borderColor: 'white',width:'100%',textAlign:'center'}} >{submit}</Text>
        </TouchableOpacity>
       </SafeAreaView>
  );
}

export default InspectionReport;