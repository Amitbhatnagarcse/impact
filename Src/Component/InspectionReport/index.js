
import React, { useEffect, useRef, useState } from "react"
import { Text ,SafeAreaView,View ,TextInput,StyleSheet,TouchableOpacity,Image,Modal,Platform,Alert} from 'react-native';
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
import {BASE_URL} from '../../../Constants'

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
   


  var block_id =''
  var _unit =''

    const allowStoragePermission =  () => {
    
    if (permisssion == RESULTS.DENIED) {
        requestMultiple([PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,PERMISSIONS.ANDROID.CAMERA]).then(
            (statuses) => {
              
                if (Platform.OS == 'android') {

                  if(statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] == RESULTS.BLOCKED)
                  {
                    
                    openSettings().catch(() => console.warn('cannot open settings'));
                    return;
                  }
                  setPermission( statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE])  
                }

            },
        );

    }
    else {
      openSettings().catch(() => console.log('cannot open settings'));
    }
    }

    const readData = async () => {
      try {
        const role_id = await AsyncStorage.getItem("role")
        if (role_id !== null) {
        setrole(role_id)
        }
        block_id = await AsyncStorage.getItem('blockid')
        _unit = await AsyncStorage.getItem('unitid')
        setUnitId(_unit)
      } catch (e) {
      }
    }
    const identity_Popup = () => {  
    setCurrentDialog('district')
      setSingleVisible(true)
      setListing(district_list)
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
        var imagebase64 ='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'

       // imagedata = imagedata.replace(/+/g, "##");
        var localpdf = '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czw8L1Byb2NTZXQgWy9QREYgL1RleHQgL0ltYWdlQiAvSW1hZ2VDIC9JbWFnZUldL0ZvbnQ8PC9GMSAxIDAgUi9GMiAyIDAgUj4+Pj4vQ29udGVudHMgNiAwIFIvUGFyZW50IDQgMCBSPj4KZW5kb2JqCjEgMCBvYmoKPDwvVHlwZS9Gb250L1N1YnR5cGUvVHlwZTEvQmFzZUZvbnQvSGVsdmV0aWNhL0VuY29kaW5nL1dpbkFuc2lFbmNvZGluZz4+CmVuZG9iagoyIDAgb2JqCjw8L1R5cGUvRm9udC9TdWJ0eXBlL1R5cGUxL0Jhc2VGb250L0hlbHZldGljYS1Cb2xkL0VuY29kaW5nL1dpbkFuc2lFbmNvZGluZz4+CmVuZG9iago0IDAgb2JqCjw8L1R5cGUvUGFnZXMvQ291bnQgMi9LaWRzWzUgMCBSIDcgMCBSXS9JVFhUKDUuMC41KT4+CmVuZG9iago4IDAgb2JqCjw8L1R5cGUvQ2F0YWxvZy9QYWdlcyA0IDAgUj4+CmVuZG9iago5IDAgb2JqCjw8L1Byb2R1Y2VyKGlUZXh0U2hhcnAgNS4wLjUgXChjXCkgMVQzWFQgQlZCQSkvQ3JlYXRpb25EYXRlKEQ6MjAyMDA1MjcxNzEwNDcrMDUnMzAnKS9Nb2REYXRlKEQ6MjAyMDA1MjcxNzEwNDcrMDUnMzAnKT4+CmVuZG9iagp4cmVmCjAgMTAKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDA0NjE1IDAwMDAwIG4gCjAwMDAwMDQ3MDMgMDAwMDAgbiAKMDAwMDAwMDAxNSAwMDAwMCBuIAowMDAwMDA0Nzk2IDAwMDAwIG4gCjAwMDAwMDI5NzUgMDAwMDAgbiAKMDAwMDAwMzE0MSAwMDAwMCBuIAowMDAwMDA0NDQ5IDAwMDAwIG4gCjAwMDAwMDQ4NjUgMDAwMDAgbiAKMDAwMDAwNDkxMCAwMDAwMCBuIAp0cmFpbGVyCjw8L1NpemUgMTAvUm9vdCA4IDAgUi9JbmZvIDkgMCBSL0lEIFs8ZTBlMjdmYjBjN2IxNjM3NGQ0OGQ1Y2VhMGM4ZmVlNTg+PGU2MjZhMjk2MDhmOTg1ZWNjMzBlYmEyYmU2YTZjNDY0Pl0+PgpzdGFydHhyZWYKNTA0NQolJUVPRgo=';

       // data.append('DocFile',imagebase64);
        data.append('DocFile',imagedata);
        data.append('FileExtension',file_extension);
      }
    
  
      _retrieveData(data.toString() ,'SavePIReport')
    }
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
      var data = new URLSearchParams();
      //data.append('Role',role);
      data.append('Role','2');
     _retrieveData(data.toString() ,'GetAllDistrict')
     var date = new Date().getDate(); //Current Date
     var month = new Date().getMonth() + 1; //Current Month
     var year = new Date().getFullYear(); //Current Year
     setMaxDate(year + '/' + month + '/' + date )
    
     //allowLocationPermission()
    }
    // dispatch(getDashboardRequest(data.toString()))
  }, [role]);


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
            setDistrictListing(responseJson.ResponseData)
             if(front =='GetCentersByDID')
            setCenterListing(responseJson.ResponseData)
              if(front == 'GetCenterDetail')
              {
                setCenterAdddrress(responseJson.ResponseData.CenterAddress)
                setRegNo(responseJson.ResponseData.RegNo +  " "+ responseJson.ResponseData.ValidThrough)
              }
              if(front == 'SavePIReport')
                  {
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
            alert(responseJson.Message)
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

          <Text style={{ color: 'black',  fontSize: 20,marginLeft:-50,  textAlign: 'center', width: '100%',alignContent:'center' ,justifyContent:'center' }}>Inspection Report</Text>
        
         
      </View>
      
      
      )
   };
    return (
      <SafeAreaView style={Styles.container} >
          
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
         title={'Pick Value '}
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
        <Text style={Styles.inputtext}>Center Reg No. Valid Thru Date</Text>
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
             <Text style={{	backgroundColor:'#cc8800',padding:5,color:'white',
		borderColor: 'white',width:'100%',textAlign:'center'}} >{submit}</Text>
        </TouchableOpacity>
       </SafeAreaView>
  );
}

export default InspectionReport;