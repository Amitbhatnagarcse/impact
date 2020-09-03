import React, { Component } from 'react';
import { CheckBox } from 'react-native-elements'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
 
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import backarrow from '../../assets/img/backnew.png';
import { SinglePickerMaterialDialog , MultiPickerMaterialDialog } from 'react-native-material-dialog';
import ThumbImpressionFormF from './ThumbimpressionFormF';
import down from '../../assets/img/downspinner.png';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { centrename } from '../String';
import {BASE_URL} from '../../Constants'
import AsyncStorage from '@react-native-community/async-storage';

var current_dialogue = '';
var current_list =[];
var doctor_performing_list = [];
var centername = '';
var namet = '';
var aget = '';
var sext = '';
var relationt ='';
var addresst = '';



var refered_by = [
    {label: 'Radiologist', value: 32 },
    {label: 'Gynaecologist', value: 33 },
    {label :'RMP' ,value : 34}
  
  ];
  var yes_no = [{label : 'yes',value : 1} , {label : 'no' , value : 0}];

  var carried_out = [
    {label: 'Ultrasound', value: '1' },
    {label: 'Any other (specify)', value: '2' }
  ];  

  var  mydata ;
  var mydataintent;
class FormFSecond extends Component
{
  _handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

    onChangeText(key, value) {
        this.setState({
          [key]: value
        });
      }
      onChangeTextbind(key, value) {
       
        console.warn(key + " " + value);
        this.checkSwitch(key ,value)
      }
      checkSwitch=(param,valu)=>{
 
        switch(param) {
     
               case 'namet':
               namet = valu;
               break;

              case 'aget':
              aget = valu;
              break;

              case 'sext':
              sext = valu;
              break;

              case 'relationt':
              relationt = valu;
              break;

              case 'addresst':
              addresst = valu;
              break;
        
          }
     
      }
      
      
    state = {
        load : false,
        dataSource :[],
        singlePickerVisible : false,
        multiPickerVisible : false,   
        notdptp:'',  
        notdptpid: '', 
        procedure : '',
        select_proc : '',
        datewomobtained : '',
        reg_no : '',
        carried_out_reason :'',
        procedure_other : false,
        procedure_id : -1,
        procedure_other_reason : '',
        result_procedure_carried_out:'',
        pre_natal_diagnostic : '',
        dateprocedurecarriedout : '',
        convey_on_display : '',
        on_date : '',
        abnormality : -1,
        abnormality_yes : false,
        abnormality_value : '',
        thumb_checked : false,

        namet  : '',
        aget : '',
        relationt : '',
        addresst : '',
        sext : -1,
        dataSource :[],
        height: 0


      };
      submit()
      {
        if(this.state.notdptp == '')
        {
          alert('Please Select Procedure peforming doctor');
          return;
        }
        else if(this.state.notdptpid == '')
        {
          alert('Please Select Procedure peforming name');
          return;
        }
        else if(this.state.procedure_id == -1)
        {
          alert('Please Select Procedure carried out');
          return;
        }
        else if(this.state.procedure_id == 2 && this.state.procedure_other_reason == '')
        {
          alert('Please Select Procedure other then specific fill value');
          return;
        }
        else if(this.state.datewomobtained == '')
        {
          alert('Please Enter Date which pregnant woman was obtained');
          return;
        }
        else if(this.state.dateprocedurecarriedout == '')
        {
          alert('Please Enter Date Procedure carried out');
          return;
        }
        else if(this.state.pre_natal_diagnostic == '')
        {
          alert('Please Enter pre-natal diagnostic procedure conveyed to');
          return;
        }
        else if(this.state.on_date == '')
        {
          alert('Please Enter pre natal diagnostic date');
          return;
        }
        else if(this.state.abnormality == -1)
        {
          alert('Please select abnormality detected diagnostic date');
          return;
        }
        else if(this.state.abnormality == 1 && this.state.abnormality_value == '')
        {
          alert('Please select abnormality reason');
          return;
        }
        else if(this.state.thumb_checked)
        {
          
          if(namet == '') 
          {
            alert('please select thumb impression name ');
            return;
          }
          if(aget == '') 
          {
            alert('please select thumb impression age ');
            return;
          }

          if(addresst == '') 
          {
            alert('please select thumb impression address ');
            return;
          }
          if(sext == -1) 
          {
            alert('please select thumb impression sex ');
            return;
          }
         
        }
        //9 y
        mydata.append('NOTDPTP',this.state.notdptp);
        //9 value y
        mydata.append('P_Proc_AttName',this.state.notdptpid);
        //11 y
        mydata.append('NonInvUltraOrOther',this.state.procedure_id);
        // 11 y
        mydata.append('OtherNonInv',this.state.procedure_other_reason);
        //12 y
        mydata.append('P_Consent_Date',this.state.datewomobtained);
        // 13 y
        mydata.append('P_Proc_Date',this.state.dateprocedurecarriedout);
        // 14 n
        mydata.append('P_A_Result',this.state.result_procedure_carried_out);
        // 15 y
        mydata.append('PResultConveyedTo',this.state.pre_natal_diagnostic);
        // 15 y
        mydata.append('P_Result_Date',this.state.on_date);
        // 16 y 
        if(this.state.abnormality =='1')
        mydata.append('P_Ultra_Norm_AbNorm',true);
        else
        mydata.append('P_Ultra_Norm_AbNorm',false);
        // 16 y
        mydata.append('P_AbNorm_Det',this.state.abnormality_value);


        console.log(mydata);
        this.cllapiforPostdata('SaveFormF');
      }
      identity_Popup()
      {
        current_dialogue = 'name_proc';
        this.setState({ singlePickerVisible: true ,dataSource : current_list.ResponseData})
      }
      async cllapiforPostdata(front) {

        this.setState({ load: true });
     

         fetch(BASE_URL+front, {
           method: "POST",
           headers: {
             'Content-Type': 'application/x-www-form-urlencoded'
           },
           body: mydata.toString(),
           json: true,
         })
           .then(response => response.json())
           .then(responseJson => {
          
            if(responseJson.Status)
            {
              alert(JSON.stringify(responseJson.Message));
              this.props.navigation.navigate('PDFExample' , {id_pdf : responseJson.Message.substring(65) })
            }
            else
            {
                alert(JSON.stringify(responseJson));
            }
            
           })
           .catch(error => {
             this.setState({ load: false });
           
           });
       }
      async cllapiforgetinglist(front,MasterCode) {

        this.setState({ load: true });
       var data = new URLSearchParams();

       data.append('MasterCode',MasterCode);
       data.append('cid','3297');

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
           
            if(responseJson.Status)
            {
              debugger
            this.setState({ load: false  });
             if(front == 'GetDocTypeList')
             { 
              current_list = responseJson;
              this.setState({ singlePickerVisible: true ,dataSource : responseJson.ResponseData});
             }
            }
            else
            {
                alert(responseJson.Message)
                if(front == 'GetDocTypeList')
                {
                  this.setState({procedure : 'no data' ,reg_no: ''})
                }
            }
            
           })
           .catch(error => {
             this.setState({ load: false });
           
           });
       }
        componentDidMount()
        {
         const{ data , name_p ,date_come } = this.props.route.params;
       
         this.setState({'dateprocedurecarriedout': date_come , on_date : date_come , pre_natal_diagnostic: name_p});
          
          mydata = data;
         this.getdataFromSharedPreference();
        }

            async getdataFromSharedPreference()
        {  

            await  AsyncStorage.getItem('centrename', (err, result) => {
                centername = result;

            });
            // await  AsyncStorage.getItem('phone_number', (err, result) => {
            //     phone = result;
            
            //   });
            // await  AsyncStorage.getItem('username', (err, result) => {
            //     username = result;
            //   });    

        }

         getIndex(email) {
           debugger
            var val = refered_by.findIndex(obj => obj.value === email);
            this.cllapiforgetinglist('GetDocTypeList',email)
            this.setState({'select_proc':refered_by[val].label})
       
          }

          getIndex_Search(value)
          {
                return this.state.dataSource.findIndex(obj => obj.value === value)
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
            <Text style={{ color: 'black',  fontSize: 20,marginLeft:-50,  textAlign: 'center', width: '100%',alignContent:'center' ,justifyContent:'center' }}>Non Invansive</Text>
            )
        }
  render() {

   
    return (
    
     <SafeAreaView style={styles.container}>
        {this._headerBar()}
        <ScrollView style={{flex:1}}>
        <MultiPickerMaterialDialog
          title={"Pick one or more options"}
          scrolled
          items={this.state.dataSource.map((row, index) => ({ value: row.Code, label: row.CodeText }))}
          visible={this.state.multiPickerVisible}
          selectedItems={this.state.scrolledMultiPickerSelectedItems}
          onCancel={() => this.setState({ multiPickerVisible: false })}
          onOk={result => {
            console.warn(result.selectedItems)
            this.setState({ multiPickerVisible: false });
            this.setState({
              multiPickerVisible: result.selectedItems
            });
          }}
        />

          <SinglePickerMaterialDialog
    title={'Pick one Value '}
    scrolled
    items={this.state.dataSource.map((row, index) =>
     ( { value: row.Code, label: row.CodeText })) }
    visible={this.state.singlePickerVisible}
    selectedItem={-1}
    onCancel={() => this.setState({ singlePickerVisible: false })}
    onOk={result => {      
      this.setState({ singlePickerVisible: false });
        if(current_dialogue == 'name_proc')                    
        {
          
          var valu  = current_list.ResponseData.findIndex(obj => obj.Code === result.selectedItem.value);
          this.setState({ 'procedure': result.selectedItem.label  , 'notdptpid' : result.selectedItem.value , reg_no : current_list.ResponseData[valu].RegNo  })
          // var position = this.getIndex_Search(result.selectedItem.value)
        }    
    }}
    />

    <Text style={styles.inputtextheader}>Section B : To be filled in for performing non-invasive diagnostic Procedures / Tests Only</Text>

          <View style={styles.inputboxview} >

        <Text style={styles.inputtext}>Name of the doctor performing the procedure/s</Text>       
        <RadioForm style={{width:'50%',marginTop:4}}
        radio_props={refered_by}
        initial={-1}
        formHorizontal={false}
        labelHorizontal={true}
        buttonColor={'#2196f3'}
        animation={true}
        buttonStyle={{margin:4}}
        labelStyle={{fontSize: 12, color: '#000',marginRight:10}}
        onPress={(value) => {
          this.setState({'notdptp' : value})
          current_dialogue = 'name_proc';
          this.getIndex(value)
    }
      
     
    }
  buttonSize={10}
  buttonOuterSize={20}
/>
          </View>
         
          <View style={styles.inputboxview} >
<Text style={styles.inputtext}>  Name of {this.state.select_proc}</Text>
       <TouchableOpacity style={{width:'50%',flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',}} onPress = {() => {if (this.state.procedure != 'no data'){this.identity_Popup()}}  }>
         <Text style={styles.inputliketext}
              > {this.state.procedure}</Text>
              <Image source={down} style={{position: "absolute", bottom: 0, right: 5,height:20,width:20,  justifyContent: 'center',
        marginBottom:3,alignItems: 'center',}}/>
           </TouchableOpacity>
          </View>

          <View style={styles.inputboxview} >
<Text style={styles.inputtext}> Registration Number  </Text>
           <Text style={styles.inputtext}
              >  : {this.state.reg_no}</Text>
           
          </View>
          <View style={styles.inputboxview} >

<Text style={styles.inputtext}>Procedures carried out (Non-Invasive)</Text>       
<RadioForm style={{width:'50%',marginTop:4}}
radio_props={carried_out}
initial={this.state.procedure_id}
formHorizontal={false}
labelHorizontal={true}
buttonColor={'#2196f3'}
animation={true}
buttonStyle={{margin:4}}
labelStyle={{fontSize: 12, color: '#000',marginRight:10}}
onPress={(value) => {
  this.setState({procedure_id : value})
if(value == '1'){
this.setState({procedure_other:false})
}
else{ this.setState({procedure_other:true}) }
//this.getIndex(value)
}


}
buttonSize={10}
buttonOuterSize={20}
/>

    {
this.state.procedure_other ? <TextInput
style={styles.inputinside}
placeholderTextColor="#adb4bc"
returnKeyType="go"
autoCapitalize="none"
value = {this.state.procedure_other_reason}
autoCorrect={false}
onChangeText={value => this.onChangeText("procedure_other_reason", value)}  /> : null
    }
  </View>
  

          <View style={styles.inputboxview} >
        <Text style={styles.inputtext}>Date on which declaration of pregnant woman/person was obtained</Text>
        <DatePicker
        style={{width: '50%',borderColor:'#000',borderWidth:1,height:42,backgroundColor:'white'}}
        date={this.state.datewomobtained}
        mode="date"
        placeholder="select date"
        format="YYYY/MM/DD"
        minDate = {this.state.dateprocedurecarriedout}
        maxDate="2024-06-01"
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
        onDateChange={(date) => {this.setState({datewomobtained: date})}}
      />  
          </View>

          <View style={styles.inputboxview} >
        <Text style={styles.inputtext}>Date on which procedures carried out</Text>
        <DatePicker
        style={{width: '50%',borderColor:'#000',borderWidth:1,height:42,backgroundColor:'white'}}
        date={this.state.dateprocedurecarriedout}
        mode="date"
        placeholder="select date"
        format="YYYY/MM/DD"
        minDate="2018-05-01"
        maxDate="2024-06-01"
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
        onDateChange={(date) => {this.setState({dateprocedurecarriedout: date})}}
      />  
          </View>
        
          <View style={styles.inputboxview} >
        <Text style={styles.inputtext}> Result of the non-invasive procedure carried out(report in brief of the test including ultrasound carried out)</Text>
        <TextInput
                        style={styles.input}
                        placeholderTextColor="#adb4bc"
                        returnKeyType="go"
                        autoCapitalize="none"
                        value = {this.state.result_procedure_carried_out}
                        autoCorrect={false}
                        keyboardType={'default'}
                        onChangeText={value => this.onChangeText("result_procedure_carried_out", value)}  />
          </View>

          <View style={styles.inputboxview} >
        <Text style={styles.inputtext}>  The result of pre-natal diagnostic procedures was conveyed to</Text>
        <TextInput
                        style={styles.input}
                        placeholderTextColor="#adb4bc"
                        returnKeyType="go"
                        autoCapitalize="none"
                        value = {this.state.pre_natal_diagnostic}
                        autoCorrect={false}
                        keyboardType={'default'}
                        onChangeText={value => this.onChangeText("pre_natal_diagnostic", value)}  />
          </View>

          <View style={styles.inputboxview} >
        <Text style={styles.inputtext}>  On</Text>
        <DatePicker
        style={{width: '50%',borderColor:'#000',borderWidth:1,height:42,backgroundColor:'white'}}
        date={this.state.on_date}
        mode="date"
        placeholder="select date"
        format="YYYY/MM/DD"
        minDate="2018-05-01"
        maxDate="2026-06-01"
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
        onDateChange={(date) => {this.setState({on_date: date})}}
      /> 
          </View>
          <View style={styles.inputboxview} >
        <Text style={styles.inputtext}>Any indication for MTP as per the abnormality detected in the diagnostic procedures/tests</Text>
        <RadioForm style={{width:'50%',marginTop:4}}
  radio_props={yes_no}
  initial={this.state.abnormality}
  formHorizontal={false}
  labelHorizontal={true}
  buttonColor={'#2196f3'}
  animation={true}
  buttonStyle={{margin:4}}
  labelStyle={{fontSize: 12, color: '#000',marginRight:10}}
  onPress={(value) => {
     this.setState({ abnormality  : value})
      //this.getIndex(value)
      if(value == '1'){
        this.setState({abnormality_yes:true})
        }
        else{ this.setState({abnormality_yes:false}) }
    }
      
     
    }
  buttonSize={10}
  buttonOuterSize={20}
/>
          </View>
          {
          this.state.abnormality_yes ? <TextInput
          style={styles.inputliketext}
          placeholderTextColor="#adb4bc"
          returnKeyType="go"
          autoCapitalize="none"
          value = {this.state.abnormality_value}
          autoCorrect={false}
          onChangeText={value => this.onChangeText("abnormality_value", value)}  /> : null
              }
                    <Text style={styles.inputtextheader}>Section D : Declaration</Text>
                    <CheckBox
                    containerStyle = {styles.inputboxview} 
                    textStyle = {styles.inputtext}
            title='In Case Of Thumb Impression'
            checked={this.state.thumb_checked}
            onPress={() => this.setState({ thumb_checked : !this.state.thumb_checked })}
           
            
          />
          
      <View  style = {styles.inputboxview}> 
          {
           
          this.state.thumb_checked ? <ThumbImpressionFormF
          funct = {this.onChangeTextbind.bind(this)}
          /> : null
              }

          </View>
         </ScrollView>
         <TouchableOpacity  onPress={() => this.submit()}>
          <Text style={styles.button}>Sumbit</Text>
        </TouchableOpacity>
         </SafeAreaView>   
            )
    }


}

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
    formInput: {    
      borderBottomWidth: 1.5, 
      marginLeft: 10,
      borderColor: '#000',       
    },
    inputboxview :{
       margin :2,
      width:'99%',
      flexDirection:'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      backgroundColor:'#FFEFD5'
    },
    inputinside: {
        backgroundColor:'#fff',
         borderWidth: 1,
         borderColor:'#1133ee',
         padding:0,
         width:80,
         fontSize:14,
         height:30,
         marginRight:0.5,
         flexDirection:'row',
       },
    input: {
     backgroundColor:'#fff',
      borderWidth: 1,
      borderColor:'#1133ee',
      padding:0,
      paddingLeft:10,
      width:'50%',
      fontSize:14,
      height:30,
      marginRight:0.5,
  
    },
    inputliketext: {
      backgroundColor:'#fff',
       borderWidth: 1,
       borderColor:'#1133ee',
       padding:5,
       marginLeft :5,
       marginRight :5,
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
  
    headerView: {
    backgroundColor: '#cc8800', alignItems: 'center', width: '100%', flexDirection: 'row', height: 60,
      justifyContent: 'flex-start',elevation:5,
    },
    inputtextheader: {
      padding:10,
      width:'100%',
      fontSize:12,
      flex:1, 
      backgroundColor : '#e6ac00',
      color : '#000'
    },
    button: {
      backgroundColor: 'brown',
      borderColor: 'white',
      borderWidth: 0,
      borderRadius: 2,
      color: 'white',
      fontSize: 14,
      fontWeight: 'bold',
      overflow: 'hidden',
      padding: 12,
      textAlign:'center',
    }
  });

export default FormFSecond