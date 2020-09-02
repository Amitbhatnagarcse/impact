/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  AsyncStorage,
} from 'react-native';
import {BASE_URL} from '../../Constants'


import OrientationLoadingOverlay from "react-native-orientation-loading-overlay";
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker';    
import backarrow from '../../assets/img/backnew.png';
import down from '../../assets/img/downspinner.png';
import { SinglePickerMaterialDialog , MultiPickerMaterialDialog } from 'react-native-material-dialog';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {getBusinessRequest,getPregnancyRequest} from '../actions'
import { centrename , districtid , blockid , centreid , blockname ,districtname}  from '../String'
var current_dialogue = '';
var current_list ='';
var district_list = '';
var center_id = '';
var center_name  = '';
var center_reg_date = ''
var center_reg_no = ''
var doctor_list = [{Code: 'Radiologist', CodeText : '' ,Address : '' },];

import { CheckBox } from 'react-native-elements'

var relation = {
  "relation_array": [
    { "Code": 1, "CodeText": "Husband's" },
    { "Code": 2, "CodeText": "Wife's" },
    { "Code": 3, "CodeText": "Father's" },
    { "Code": 4, "CodeText": "Mother's" },
  ]
};
var total_non_invansive = '';
var all_value_non_invansive = '';

var invan_props = [
  {label: 'Non-Invasive ', value: 1 },
  {label: 'Invasive ', value: 2 }
];

var radio_props = [
  {label: 'Rural', value: 1 },
  {label: 'Urban', value: 2 }
];

var refered_by = [
  {label: 'Doctor', value: 1 },
  {label: 'Genetic Counselling Centre', value: 2 },
  {label :'Self Referral by Gynaecologist/Radiologist/RMP conducting the diagnostic procedures' ,value : 3}

];
class FormF extends Component {
 
  
  state = {
    load : false,
    date: '',
    patient_reg_no: '',
    pcts_id: '',
    id_proof:'',
    id_proof_id:'',
    id_proof_value : '',
    patient_name:'',
    dataSource :[],
    singlePickerVisible : false,
    multiPickerVisible : false,
    age:0,
    number_child_boy:-1,
    number_child_boy_age:'',
    number_child_girl:-1,
    number_child_girl_age:'',
    relation:'select relation ',
    relation_id : '0',
    relation_name:'',
    othercountry : false , 
    PickerValueHolder :  {"label": "Rajasthan", "value": 27},
    state:'',
    state_id : '0',
    district:'',
    district_id:'',
    fullAdress:'',
    rural:-1,
    mobileno:'',
    telephonr_prefix:'',
    telephone_no:'',
    email :'',
    refered_by:'',
    refered_by_doctor : true,
    refered_by_other : true,
    dr_name : '',
    dr_id : '',
    dr_address : '',
    refered_by_name : '',
    refered_by_address : '',
    lmpnotknown : false,
    lmp:'',
    weeksofpregnancy:'',
    invans : -1,
    centername :'',
    centerreg_no : '',
    centerregdate : '',
    maxDate : '2024-06-01'

  };

  getIndex(email) {
    
    var val  = doctor_list.ResponseData.findIndex(obj => obj.CodeText === email);
    this.setState({'dr_address': doctor_list.ResponseData[val].Address})

  }

  _retrieveData = async (username) => {
  
    try {
      const value = await AsyncStorage.getItem(username);
      center_id = value;
      center_name= await AsyncStorage.getItem('centrename');
       center_reg_no = await AsyncStorage.getItem('centreregno');
       center_reg_date = await AsyncStorage.getItem('centreregdate');
        this.setState({'centername' : center_name ,'centerreg_no' :center_reg_no , 'centerregdate' : center_reg_date })
     
    } catch (error) {
     
    }
  };
  
  
    identity_Popup()
  {
    current_dialogue = 'id_proof';
    this.setState({ singlePickerVisible: true ,dataSource : current_list.IdentityProofType})
  }
  family_Popup()
  {
    current_dialogue = 'relation_name';
    this.setState({ singlePickerVisible: true ,dataSource : relation.relation_array})
  }
  state_Popup()
  {
    current_dialogue = 'state';
    this.setState({ singlePickerVisible: true ,dataSource : current_list.StateList})
  }
  doctorlist()
  {
    current_dialogue = 'doctor_list';
    this.setState({singlePickerVisible : true , dataSource : doctor_list.ResponseData})
  }
 district_Popup()
  {
    current_dialogue = 'district';
    this.setState({ singlePickerVisible: true ,dataSource : district_list.ResponseData})
  }
  onChangeText(key, value) {
    this.setState({
      [key]: value
    });
  }
  toggleDrawer() {
    this.props.navigation.goBack()
  }
  _headerBar = () => {
    return (
      <View style={styles.headerView}>
      
          <View style={{ width: 50, height: 40,   zIndex: 1,alignContent:'center' ,justifyContent:'center'}}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image
              style={{ width: 35, height: 35,paddingLeft:10,padding:5}}
              source={backarrow}
            />
            </TouchableOpacity>
          </View>

        {this.getNormalHeader()}
      </View>)
  }
  getNormalHeader(){
    return(
      <Text style={{ color: 'black',  fontSize: 20,marginLeft:-50,  textAlign: 'center', width: '100%',alignContent:'center' ,justifyContent:'center' }}>Form F</Text>
    )
  }
   conditionMessage(message)
  {
    alert('Please Enter ' + message);
  }

   async cllapiforgetinglist(front) {
    this.setState({ load: true });
   var data = new URLSearchParams();
     fetch(BASE_URL+front, {
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
         if(front == 'Stateandidentityprooftype')
         {
          current_list = responseJson;
         }
        else if (front == 'GetIndication')
         {

         
          setTimeout(
            function() {
              this.setState( {multiPickerVisible : true,dataSource : responseJson.ResponseData })
            }
            .bind(this),
            500
          );
            
         }
        
         //this.setState({ load: false ,dataSource : responseJson.IdentityProofType});
        
       })
       .catch(error => {
       alert(error);
         this.setState({ load: false });
       
       });
   }
   async cllapiforgetingDistrictlist(id) {
   // this.setState({ load: true });
   var data = new URLSearchParams();
   data.append('stateid',id)
     fetch(BASE_URL+"GetDistrict", {
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
        district_list = responseJson;
        
         //this.setState({ load: false ,dataSource : responseJson.IdentityProofType});
         console.warn(JSON.stringify(responseJson.ResponseData));
        
       })
       .catch(error => {
         this.setState({ load: false });
       
       });
   }
 
   async getdoctype(id) {
   this.setState({ load: true , refered_by : id ,refered_by_doctor : false,refered_by_other : true});
   var data = new URLSearchParams();
   data.append('cid','37');
   //data.append('MasterCode',id);
     fetch(BASE_URL+"GetDoctor", {
       method: "POST",
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       body: data.toString(),
       json: true,
     })
       .then(response => response.json())
       .then(responseJson => {
        doctor_list = responseJson;
         this.setState({ load: false });

         //this.setState({ load: false ,dataSource : responseJson.IdentityProofType});

         console.warn(JSON.stringify(responseJson.ResponseData));
        
       })
       .catch(error => {
         this.setState({ load: false });
       
       });
   }

  componentDidMount(){
   // alert('call api did mount');
    this.cllapiforgetinglist('Stateandidentityprooftype');
  this._retrieveData(centreid);
  var date = new Date().getDate(); //Current Date
  var month = new Date().getMonth() + 1; //Current Month
  var year = new Date().getFullYear(); //Current Year
 
  this.setState({
    maxDate:
      year + '-' + month + '-' + date ,
  })
  }

  onSubmit()
  {
  
    var data = new URLSearchParams();
    //patient id two why
    //data.append(PatientID , this.state.patient_reg_no);
    // y  
    // check if not true then state id and district id in this
   
   //patient reg date get async  
    if(this.state.date == '')
    {
       this.conditionMessage(' Registration Date');
      return;
    }
     if(this.state.patient_reg_no.trim() == '')
    {
      this.conditionMessage('Patient Registration Number');
      return;
    }
     if(this.state.id_proof.trim() != '')
    {
      if(this.state.id_proof_value.trim() == '')
      {
        this.conditionMessage('Identity Proof Value ');
        return;
      }
    }
     if(this.state.patient_name.trim() == '')
    {
      this.conditionMessage('Patient Name');
      return;
    }    
     if(this.state.age == 0)
    {
      this.conditionMessage('Age');
      return;
    }
     if(this.state.number_child_boy == '-1')
    {
      this.conditionMessage('Total Child Boy');
      return;
    }
     if(this.state.number_child_boy !='0'  && this.state.number_child_boy_age.trim() == '')
    {
      this.conditionMessage('Total Child Boy Age');
      return;
    }
     if(this.state.number_child_girl == '-1')
    {
      this.conditionMessage('Total Child Girl');
      return;
    }
     if(this.state.number_child_girl !='0' && this.state.number_child_girl_age.trim() == '')
    {
      this.conditionMessage('Total Child Girl Age');
      return;
    }
     if(this.state.relation_id == '-1' || this.state.relation_id =='0')
    {
      this.conditionMessage('Relation');
      return;
    }
     if(this.state.relation_name.trim() == '')
    {
      this.conditionMessage('Relation Name');
      return;
    }
     if(!this.state.othercountry)
    {
      if(this.state.state_id ==0 || this.state.state_id == -1)
      {
        this.conditionMessage('State');
        return;
      }
        if(this.state.district_id ==0 || this.state.district_id == -1)
      {
        this.conditionMessage('District');
        return;
      }
    }
     if(this.state.fullAdress.trim() == '')
    {
      this.conditionMessage('Address');
      return;
    }
     if(this.state.mobileno.trim() != '')
    {
      if(this.state.mobileno.length !=10){
      this.conditionMessage('Mobile Number Length');
      return; }
      if(this.state.mobileno.trim() == '6666666666' || this.state.mobileno.trim() == '7777777777' || this.state.mobileno.trim() == '8888888888' ||this.state.mobileno.trim() == '9999999999')
      {
        this.conditionMessage('Mobile Number Not Valid');
        return
      }
      if(Number(this.state.mobileno.substr(0,1)) < 6)
      {
        this.conditionMessage('Valid Mobile Number');
        return
      }
      
    }  
     if(this.state.email.trim() != '')
    {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(this.state.email) === false) {
        this.conditionMessage('Email is not valid')
        return ;
      }
     
    }
     if(this.state.refered_by == '')
    {
      this.conditionMessage('Refered BY');
      return;
    }
     if(this.state.refered_by == '1' && this.state.dr_id == '')
    {
      this.conditionMessage('doctor');
      return;
    }
     if(this.state.refered_by == '2' && this.state.refered_by_name == '')
    {
      this.conditionMessage('Genetic Center Name');
      return;
    }
     if(this.state.refered_by == '2' && this.state.refered_by_address == '')
    {
      this.conditionMessage('Genetic Center Address');
      return;
    }
     if(this.state.lmp == '' && this.state.weeksofpregnancy == '')
    {
      this.conditionMessage('lmp Date or Weeks of pregnancy');
      return;
    }
     if(this.state.invans == -1)
    {
      alert('please select invasive non invasive');
      return;
    } 
     if(this.state.invans == 1 && total_non_invansive == '')
    {
      this.conditionMessage('Please select non invansive procedure carried out');
      return;
    }

    if(!this.state.othercountry)
    {
      data.append('StCode',this.state.state_id);     
      data.append('DistCode',this.state.district_id);  
    }  

   
    data.append('CID' ,center_id)
    data.append('PRegDate', this.state.date); 
    data.append('PatientRegNo',this.state.patient_reg_no);
    data.append('PCTSID',this.state.pcts_id); 
    data.append('IdentityType',this.state.id_proof_id); 
    data.append('IdentityValue',this.state.id_proof_value); 
    data.append('PFirstName',this.state.patient_name); 
    data.append('PAge',this.state.age); 
    data.append('PMaleChild',this.state.number_child_boy); 
    data.append('MaleAge',this.state.number_child_boy_age); 
    data.append('PFemaleChild',this.state.number_child_girl); 
    data.append('FemaleAge',this.state.number_child_girl_age); 
    data.append('HusbWFMFlag',this.state.relation_id); 
    data.append('HusbandName',this.state.relation_name); 
    data.append('RuralUrban',this.state.rural);   
    data.append('IsOtherCountry',this.state.othercountry);  
    data.append('PAddress',this.state.fullAdress);    
    data.append('PMobileNo',this.state.mobileno);     
    data.append('PSTDCode',this.state.telephonr_prefix);     
    data.append('PPhoneNo',this.state.telephone_no);     
    data.append('PEmail',this.state.email);    
    
    data.append('PReferredBy',this.state.refered_by);     
    if(this.state.refered_by == '1')
    {
      data.append('ReferredByDoctorID',this.state.dr_id); 
    }
     
    else if(this.state.refered_by == '2')
    {
      data.append('GenRefName',this.state.refered_by_name);     
      data.append('GenRefAddress',this.state.refered_by_address);  
    }

  
    data.append('LMPKnownOrNot',this.state.lmpnotknown);     
    data.append('LMPDate',this.state.lmp);
    data.append('PPregWeeks',this.state.weeksofpregnancy);  
    data.append('NonInvasiveListCount',total_non_invansive); 
    data.append('NonInvasiveList',all_value_non_invansive); 
    
    //this.props.navigation.navigate('FormFSecond' , {data : data})
     if(this.state.invans == 1)
     {
      data.append('P_Inv_NonInv',false);
      this.props.navigation.navigate('FormFSecond' , {data : data ,name_p :this.state.patient_name,date_come : this.state.date})
     }
  
    else
    {
      data.append('P_Inv_NonInv',true);
      this.props.navigation.navigate('FormFInvansive' , {data : data ,name_p :this.state.patient_name,date_come : this.state.date , age_p : this.state.age})
    }
   
    
  }
 
  render() {
     return (
     
      <SafeAreaView style={styles.container}>
         {this._headerBar()}
         <OrientationLoadingOverlay visible={this.state.load}>
          <View>
            <Image
              source={require("../../assets/img/loadlogo.gif")}
              style={{ width: 80, height: 80 }}
            />
           
          </View>
        </OrientationLoadingOverlay>
         <ScrollView style={{flex:1}}>
         <MultiPickerMaterialDialog
          title={"Pick one or more elements!"}
          scrolled
          items={this.state.dataSource.map((row, index) => ({ value: row.Code, label: row.CodeText }))}
          visible={this.state.multiPickerVisible}
          selectedItems={this.state.scrolledMultiPickerSelectedItems}
          onCancel={() => this.setState({ multiPickerVisible: false })}
          onOk={result => {
            if(result.selectedItems.length > 0)
            {
              total_non_invansive = result.selectedItems.length;
              var value = '';
              for(let i =0 ; i <total_non_invansive; i++)
              {
                  value = value + result.selectedItems[i].value + ',';
              }
              all_value_non_invansive =  value.substring(0,value.length-1) ;
             
              this.setState({ multiPickerVisible: false });
             
            }
            else
            alert('Select One Of Non-Invensive Procedure')
           
          }}
        />

        

          <SinglePickerMaterialDialog
    title={'Pick Value '}
    scrolled
    items={this.state.dataSource.map((row, index) =>
     ( { value: row.Code, label: row.CodeText })) }
    visible={this.state.singlePickerVisible}
    selectedItem={this.state.PickerValueHolder}
    onCancel={() => this.setState({ singlePickerVisible: false })}
    onOk={result => {  
     // console.warn(""+result.selectedItem );   
      if (typeof(result.selectedItem) !== 'undefined' || result.selectedItem != null) {
          
      this.setState({ singlePickerVisible: false });
     console.warn(result.selectedItem);
        if(current_dialogue == 'id_proof')                    
        {
          this.setState({ 'id_proof': result.selectedItem.label ,'id_proof_id':result.selectedItem.value});
          
        }   
       else if(current_dialogue == 'relation_name')
        {
          this.setState({ 'relation': result.selectedItem.label + ' name'  , 'relation_id' : result.selectedItem.value});
        }
       else if(current_dialogue == 'state')
        {
          this.setState({ 'state': result.selectedItem.label , 'state_id'  :result.selectedItem.value });
          this.cllapiforgetingDistrictlist(result.selectedItem.value);
        }
        else if (current_dialogue == 'district')
        {
          this.setState({ 'district': result.selectedItem.label , 'district_id' : result.selectedItem.value});
        }
        else if (current_dialogue == 'doctor_list')
        {
          this.setState({ 'dr_name' : result.selectedItem.label , 'dr_id' : result.selectedItem.value });
          this.getIndex(result.selectedItem.label);
        }
      
      } else {
              alert('please select value');
      }
  

  
    }}
    />
       
    <Text style={styles.inputtextheader}>Section A : To be filled in for all Diagnostic Procedures / Tests</Text>
 
    <View style={{flex:1,height:'100%',margin:1}}>  
  

    <View style={styles.inputboxview} >
        <Text style={styles.inputtextunder}>center Name  :   {this.state.centername}</Text>
       
          </View>


          <View style={styles.inputboxview} >
  <Text style={styles.inputtext}>center Reg No. : {this.state.centerreg_no}</Text>
  <Text style={styles.inputtext}> Date : {this.state.centerregdate}</Text>
          </View>







        <View style={styles.inputboxview} >
        <Text style={styles.inputtext}>Patient Registration Date</Text>
        <DatePicker
        style={{width: '50%',borderColor:'#000',borderWidth:1,height:35,backgroundColor:'white'}}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="YYYY/MM/DD"
        minDate="2018-05-01"
        maxDate={this.state.maxDate}
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
        onDateChange={(date) => {this.setState({date: date})}}
      />  
          </View>

        <View style={styles.inputboxview} >
        <Text style={styles.inputtext}>Patient Registration No.</Text>
        <TextInput
                        style={styles.input}
                        placeholderTextColor="#adb4bc"
                        returnKeyType="next"
                        autoCapitalize="none"
                        value = {this.state.total_sono}
                        autoCorrect={false}
                        keyboardType="default"
                        onChangeText={value => this.onChangeText("patient_reg_no", value)}  />
          </View>
     
        <View style={styles.inputboxview} >
        <Text style={styles.inputtext}>PCTS ID</Text>
        <TextInput
                        style={styles.input}
                        placeholderTextColor="#adb4bc"
                        returnKeyType="next"
                        maxLength={20}
                        autoCapitalize="none"
                        value = {this.state.pcts_id}
                        autoCorrect={false}
                        keyboardType="numeric"
                        onChangeText={value => this.onChangeText("pcts_id", value)}  />
          </View>
     
        <View style={styles.inputboxview} >
        <Text style={styles.inputtext}>Identity Proof</Text>
       <TouchableOpacity style={{width:'50%',flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',}} onPress = {() => this.identity_Popup()}>
         <Text style={styles.inputliketext}
              >{this.state.id_proof}</Text>
              <Image source={down} style={{position: "absolute", bottom: 0, right: 5,height:20,width:20,  justifyContent: 'center',
        marginBottom:3,alignItems: 'center',}}/>
           </TouchableOpacity>
          </View>

          <View style={styles.inputboxview} >
        <Text style={styles.inputtext}>Identity Proof Number</Text>
        <TextInput
                        style={styles.input}
                        placeholderTextColor="#adb4bc"
                        returnKeyType="next"
                        autoCapitalize="none"
                        value = {this.state.id_proof_value}
                        autoCorrect={false}
                        onChangeText={value => this.onChangeText("id_proof_value", value)}  />
          </View>
     
        <View style={styles.inputboxview} >
        <Text style={styles.inputtext}>* Patient Name</Text>
        <TextInput
                        style={styles.input}
                        placeholderTextColor="#adb4bc"
                        returnKeyType="next"
                        maxLength={200}
                        autoCapitalize="none"
                        value = {this.state.patient_name}
                        autoCorrect={false}
                        onChangeText={value => this.onChangeText("patient_name", value)}  />
          </View>

          <View style={styles.inputboxview} >
        <Text style={styles.inputtext}>Age</Text>
        <TextInput
                        style={styles.input}
                        placeholderTextColor="#adb4bc"
                        returnKeyType="next"
                        keyboardType = "numeric"
                        maxLength={2}
                        autoCapitalize="none"
                        value = {this.state.age}
                        autoCorrect={false}
                        onChangeText={value => this.onChangeText("age", value)}  />
          </View>
     
          <View style={styles.inputboxview} >
        <Text style={styles.inputtext}>Number of children male</Text>
        <TextInput
                        style={styles.input}
                        placeholderTextColor="#adb4bc"
                        maxLength = {1}
                        keyboardType= "numeric"
                        returnKeyType='next'
                        autoCapitalize="none"
                        value = {this.state.number_child_boy}
                        autoCorrect={false}
                        onChangeText={value => this.onChangeText("number_child_boy", value)}  />
          </View>
          <View style={styles.inputboxview} >
        <Text style={styles.inputtext}>Number of children male age</Text>
        <TextInput
                        style={styles.input}
                        placeholderTextColor="#adb4bc"
                        placeholder = {'2,3,4 (years)'}
                        returnKeyType="next"
                        autoCapitalize="none"
                        value = {this.state.number_child_boy_age}
                        autoCorrect={false}
                        onChangeText={value => this.onChangeText("number_child_boy_age", value)}  />
          </View>
          <View style={styles.inputboxview} >
        <Text style={styles.inputtext}>Number of children female</Text>
        <TextInput
                        style={styles.input}
                        placeholderTextColor="#adb4bc"
                        maxLength = {1}
                        keyboardType= "numeric"
                        returnKeyType="next"
                        autoCapitalize="none"
                        value = {this.state.number_child_girl}
                        autoCorrect={false}
                        onChangeText={value => this.onChangeText("number_child_girl", value)}  />
          </View>

          <View style={styles.inputboxview} >
        <Text style={styles.inputtext}>Number of children female age</Text>
        <TextInput
                        style={styles.input}
                        placeholderTextColor="#adb4bc"
                        placeholder = {'2,3,4 (years)'}
                        returnKeyType="next"
                        autoCapitalize="none"
                        value = {this.state.number_child_girl_age}
                        autoCorrect={false}
                        onChangeText={value => this.onChangeText("number_child_girl_age", value)}  />
          </View>

          <View style={styles.inputboxview} >
          <TouchableOpacity style={{width:'50%',flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',}} onPress={() => this.family_Popup()}>
        <Text style={styles.inputtextunder}>{this.state.relation}</Text>
        <Image source={down} style={{position: "absolute", bottom: 0, right: 5,height:20,width:20,  justifyContent: 'center',
        marginBottom:3,alignItems: 'center',}}/>
        </TouchableOpacity>
        <TextInput
                        style={styles.input}
                        placeholderTextColor="#adb4bc"
                        returnKeyType="next"
                        autoCapitalize="none"
                        value = {this.state.relation_name}
                        autoCorrect={false}
                        onChangeText={value => this.onChangeText("relation_name", value)}  />
          </View>
          <CheckBox
          containerStyle = {styles.inputboxview} 
          textStyle = {styles.inputtext}
  title='Not from India Other Country'
  checked={this.state.othercountry}
  onPress={() => this.setState({othercountry: !this.state.othercountry})}
/>
          { this.state.othercountry ?
         null
        :  <View style = {styles.inputboxviewcolumn}>
        
        <View style={styles.inputboxview} >
        <Text style={styles.inputtext}>Select State</Text>
        <TouchableOpacity style={{width:'50%',flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',}} onPress = {() => this.state_Popup()}>
        <Text style={styles.inputliketext}
              >{this.state.state}</Text>
                          <Image source={down} style={{position: "absolute", bottom: 0, right: 5,height:20,width:20,  justifyContent: 'center',
        marginBottom:3,alignItems: 'center',}}/>
          </TouchableOpacity>
          </View>

        <View style={styles.inputboxview} >
      <Text style={styles.inputtext}>Select District</Text>
     <TouchableOpacity style={{width:'50%',flexDirection:'row',
  justifyContent: 'center',
  alignItems: 'center',}} onPress = {() => this.district_Popup()}>
       <Text style={styles.inputliketext}
            >{this.state.district}</Text>
                        <Image source={down} style={{position: "absolute", bottom: 0, right: 5,height:20,width:20,  justifyContent: 'center',
      marginBottom:3,alignItems: 'center',}}/>
         </TouchableOpacity>
        </View>
        </View>   }

        <View style={styles.inputboxview} >
        <Text style={styles.inputtext}>Full Address</Text>
        <TextInput
                        style={styles.input}
                        placeholderTextColor="#adb4bc"
                        returnKeyType="next"
                        maxLength = {200}
                        autoCapitalize="none"
                        value = {this.state.fullAdress}
                        autoCorrect={false}
                        keyboardType={'default'}
                        onChangeText={value => this.onChangeText("fullAdress", value)}  />
          </View>
          <View style={styles.inputboxview} >
        <Text style={styles.inputtext}>Urban / Rural *</Text>
         
        <RadioForm style={{width:'50%',marginTop:4}}
  radio_props={radio_props}
  initial={this.state.rural}
  formHorizontal={true}
  labelHorizontal={true}
  buttonColor={'#2196f3'}
  animation={true}
  buttonStyle={{margin:4}}
  labelStyle={{fontSize: 12, color: '#000',marginRight:10}}
  onPress={(value) => {this.setState({'rural':value})}}
  buttonSize={10}
  buttonOuterSize={20}
/>
          </View>

          <View style={styles.inputboxview} >
        <Text style={styles.inputtext}>Mobile No.</Text>
        <TextInput
                        style={styles.input}
                        placeholderTextColor="#adb4bc"
                        returnKeyType="next"
                        autoCapitalize="none"
                        maxLength = {10}
                        value = {this.state.mobileno}
                        autoCorrect={false}
                        keyboardType="numeric"
                        onChangeText={value => this.onChangeText("mobileno", value)}  />
          </View>

          <View style={styles.inputboxview} >
        <Text style={styles.inputtext}>Telephone No.</Text>
        <View style = {styles.input}>
        <TextInput
                        style={{width:'30%', borderRightWidth: 1,
                        borderColor:'#1133ee',}}
                        placeholderTextColor="#adb4bc"
                        returnKeyType="next"
                        maxLength = {5}
                        autoCapitalize="none"
                        value = {this.state.telephonr_prefix}
                        autoCorrect={false}
                        keyboardType="numeric"
                        onChangeText={value => this.onChangeText("telephonr_prefix", value)}  />
        <TextInput
                        style={{width:'70%'}}
                        placeholderTextColor="#adb4bc"
                        returnKeyType="next"
                        autoCapitalize="none"
                        maxLength = {8}
                        value = {this.state.telephone_no}
                        autoCorrect={false}
                        keyboardType="numeric"
                        onChangeText={value => this.onChangeText("telephone_no", value)}  />
                        </View>
          </View>
     
          <View style={styles.inputboxview} >
        <Text style={styles.inputtext}>Email</Text>
        <TextInput
                        style={styles.input}
                        placeholderTextColor="#adb4bc"
                        returnKeyType="next"
                        autoCapitalize="none"
                        value = {this.state.email}
                        autoCorrect={false}
                        keyboardType="email-address"
                        onChangeText={value => this.onChangeText("email", value)}  />
          </View>

          <View style={{alignItems: "center",marginRight:2,marginLeft:2}}>
    <View style={{flexDirection: "row", borderWidth: 1,alignContent:'center',alignItems:'center',
   
    backgroundColor:'#FFEFD5'}}>
        <Text style={styles.inputtext}>Refered By *</Text>
         
        <RadioForm style={{width:'60%',marginTop:4}}
  radio_props={refered_by}
  initial={-1}
  formHorizontal={false}
  labelHorizontal={true}
  buttonColor={'#2196f3'}
  animation={true}
  buttonStyle={{margin:4}}
  labelStyle={{fontSize: 12, color: '#000',marginRight:10}}
  onPress={(value) => { 

    if(value == 1)
    this.getdoctype(value)
    else if(value == 2)
    this.setState({refered_by_other: false ,refered_by_doctor : true,refered_by : value})
    else if(value == 3)
    this.setState({refered_by_other: true , refered_by_doctor : true ,refered_by :value})
  }}
  buttonSize={10}
  buttonOuterSize={20}
/>
          </View>
          </View>

          {this.state.refered_by_doctor ?
         null
        :  <View style = {styles.inputboxviewcolumn}>
        
        <View style={styles.inputboxview} >
        <Text style={styles.inputtext}>Doctor Name	</Text>
        <TouchableOpacity style={{width:'50%',flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',}} onPress = {() => this.doctorlist()}>
        <Text style={styles.inputliketext}
              >{this.state.dr_name}</Text>
        <Image source={down} style={{position: "absolute", bottom: 0, right: 5,height:20,width:20,  justifyContent: 'center',
        marginBottom:3,alignItems: 'center',}}/>
          </TouchableOpacity>
          </View>
          <View style={styles.inputboxview} >
        <Text style={styles.inputtext}>Doctor Address</Text>
      
        <Text style={styles.inputliketext}
              >{this.state.dr_address}</Text>
      
       
          </View>

          </View>
  }

{this.state.refered_by_other ?
         null
        :  <View style = {styles.inputboxviewcolumn}>
            <View style={styles.inputboxview} >
        <Text style={styles.inputtext}>Genetic Center Name</Text>
        <TextInput
                        style={styles.input}
                        placeholderTextColor="#adb4bc"
                        returnKeyType="next"
                        autoCapitalize="none"
                        value = {this.state.refered_by_name}
                        autoCorrect={false}
                        onChangeText={value => this.onChangeText("refered_by_name", value)}  />
          </View>
          <View style={styles.inputboxview} >
        <Text style={styles.inputtext}>Address  of Genetic Center</Text>
        <TextInput
                        style={styles.input}
                        placeholderTextColor="#adb4bc"
                        returnKeyType="next"
                        autoCapitalize="none"
                        value = {this.state.refered_by_address}
                        autoCorrect={false}
                        onChangeText={value => this.onChangeText("refered_by_address", value)}  />
          </View>
          </View>
}

          <CheckBox
          containerStyle = {styles.inputboxview} 
          textStyle = {styles.inputtext}
  title='Last Menstrual Period Not Know '
  checked={this.state.lmpnotknown}
  onPress={() => this.setState({lmpnotknown: !this.state.lmpnotknown})}
/>
          {this.state.lmpnotknown ?
         null
        : 
         
          <View style={styles.inputboxview} >
        <Text style={styles.inputtext}>Last Menstrual Period</Text>
        <DatePicker
        style={{width: '50%',borderColor:'#000',borderWidth:1,height:35,backgroundColor:'white'}}
        date={this.state.lmp}
        mode="date"
        placeholder="select date"
        format="YYYY/MM/DD"
        minDate="2018-05-01"
        maxDate="2030-06-01"
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
        onDateChange={(date) => { 
          
          var date1 = new Date(date);
          var datev = new Date().getDate();
          var month = new Date().getMonth() + 1;
          var year = new Date().getFullYear();
          var datecureent = (year +'/'+ month +'/'+ datev); 
          var date2 = new Date(datecureent);  
          // To calculate the time difference of two dates 
          var Difference_In_Time = date2.getTime() - date1.getTime();           
              var total_weak = 0 ;
           if(259200001 >  Number(Difference_In_Time)) 
           {
             total_weak = 0;
           }
           else if(  518400001 > Number(Difference_In_Time) )
           {
            total_weak = 1;
           }
           else 
           {
            total_weak = Math.floor( Difference_In_Time / (1000 * 3600 * 24) / 7 ); 
           }
          // {
          //   Difference_In_Time = Difference_In_Time - 259200000
          //   var total_weak = Math.floor( Difference_In_Time / (1000 * 3600 * 24) / 7 ); 
          //   console.log(total_weak)
          // }
      
          
         if(total_weak > 45)
         alert('date not greater then 45 weeks')
         else 
         this.setState({lmp : date ,weeksofpregnancy  : JSON.stringify(Math.abs(total_weak)) })}
         }
      />  
          </View>
  }
          <View style={styles.inputboxview} >
        <Text style={styles.inputtext}>Weeks of Pregnancy *</Text>
        <TextInput
                        style={styles.input}
                        placeholderTextColor="#adb4bc"
                        returnKeyType="next"
                        autoCapitalize="none"
                        keyboardType = "numeric"
                        value = {this.state.weeksofpregnancy}
                        autoCorrect={false}
                        onChangeText={value => this.onChangeText("weeksofpregnancy", value)}  />
          </View>

          <View style={styles.inputboxview} >
         
        <RadioForm style={{width:'100%',marginTop:4,marginLeft:10}}
            radio_props={invan_props}
            initial={this.state.invans}
            formHorizontal={true}
            labelHorizontal={true}
            buttonColor={'#2196f3'}
            animation={true}
            buttonStyle={{margin:4}}
            labelStyle={{fontSize: 12, color: '#000',marginRight:10}}
            onPress={(value) => {
              this.setState({'invans':value});
               if (value == '1')
               {    this.cllapiforgetinglist('GetIndication') }
           
            }}
            buttonSize={10}
            buttonOuterSize={20}
          />
          </View>
       
        
       

         </View>
         </ScrollView>
         <TouchableOpacity  onPress={() => this.onSubmit()}>
          <Text style={styles.button}>Next</Text>
        </TouchableOpacity>
         </SafeAreaView>
      
    );
     }
};



const mapStateToProps = (state) => {  
  
  return {
    loading: state.loading,
    businesArray: state.businesPoints,
    pregnancyArray : state.pregnancyList,
  }
};

const mapDispatchToProps = {
  getBusinessRequest,
  getPregnancyRequest,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  labelInput: {
    color: '#673AB7',
  },
  itemText: {
    fontSize:14,
   
  },
  inputboxviewcolumn :{
    margin : 0, 
    padding :0,
    width:'99%',
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
   
    backgroundColor:'#FFEFD5'
  },
  formInput: {    
    borderBottomWidth: 1.5, 
    marginLeft: 10,
    borderColor: '#000',       
  },
  inputboxview :{
    margin : 2, 
    padding :1,
    width:'99%',
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor:'#FFEFD5'
  },  
  input: {
   backgroundColor:'#fff',
    borderWidth: 1,
    paddingStart:5,
    borderColor:'#1133ee',
    padding:0,
    width:'50%',
    fontSize:14,
    height:30,
    marginRight:0.5,
    flexDirection:'row',
  },
  inputliketext: {
    backgroundColor:'#fff',
     borderWidth: 1,
     borderColor:'#1133ee',
     padding:5,
     flex:1,
     fontSize:12,
     marginRight:0.5,
   },
  inputtext: {
    padding:5,
    width:'50%',
    fontSize:13,
    flex:1, 
  },
  inputtextunder: {
    padding:5,
    fontSize:13,
    flex:1, 
  },
  topsortcontainer:{
    height:38,marginTop:2
  },
  inputtextheader: {
    padding:10,
    width:'100%',
    fontSize:12,
    flex:1, 
    backgroundColor : '#e6ac00',
    color : '#000'
  },

  headerView: {
  backgroundColor: '#cc8800', alignItems: 'center', width: '100%', flexDirection: 'row', height: 60,
    justifyContent: 'flex-start',elevation:5,
  },
  button: {
    backgroundColor: 'blue',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    color: 'white',
   marginLeft:0,
   marginRight:0,
    fontSize: 14,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 12,
    textAlign:'center',
  }
});


export default connect(mapStateToProps,mapDispatchToProps)(FormF);
