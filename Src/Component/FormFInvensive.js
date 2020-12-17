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
  BackHandler

} from 'react-native';
import DatePicker from 'react-native-datepicker';
import AsyncStorage from '@react-native-community/async-storage';

import backarrow from '../../assets/img/backnew.png';
import { SinglePickerMaterialDialog , MultiPickerMaterialDialog } from 'react-native-material-dialog';

import down from '../../assets/img/downspinner.png';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import MultiSelect from 'react-native-multiple-select';
import ThumbImpressionFormF from './ThumbimpressionFormF';
import {BASE_URL, BlueColor, Gradientcolour, Gradientcolourbluew, Gradientcolourlight, Gradientcolouryellow} from '../../Constants'
import MyData from '../helper/MyData';
import { te } from 'date-fns/locale';

var current_dialogue = '';
var current_list ='';
var namet = '';
var aget = '';
var sext = '';
var relationt ='';
var addresst = '';
var age = 0;
var maxDateCurrent='';
var minDate ='';




var refered_by = [
    {label: 'Radiologist', value: 32 },
    {label: 'Gynaecologist', value: 33 },
    {label :'RMP' ,value : 34}  
  
  ];
 
  var yes_no = [{label : 'no',value : 0} , {label : 'yes' , value : 1}];

  

  var parentsgeneticdisease = [
    {label: 'no', value: '0' },
    {label: 'yes', value: '1' }
  ];
  invansive_procedure_carry_out =[{
    id: '1,',
    name: 'i. Amniocentesis'
  }, {
    id: '2,',
    name: 'ii. Chorionic Villi Aspiration'
  }, {
    id: '3,',
    name: 'iii. Foetal Biopsy'
  }, {
    id: '4,',
    name: 'iv. Cordocentesis'
  },
  {
    id : '5',
    name : 'v. Other'
  }
  ];

  const additional_test = [{
    id: '1,',
    name: 'i. Chromosomal Studies'
  }, {
    id: '2,',
    name: 'ii. Biochemical Studies'
  }, {
    id: '3,',
    name: 'iii. Molecular Studies'
  }, {
    id: '4,',
    name: 'iv. Preimplantation Genetic Diagnosis'
  }
];

  const items = [{
    id: '1,',
    name: 'Clinical'
  }, {
    id: '2,',
    name: 'Bio-Chemical'
  }, {
    id: '3,',
    name: 'Cytogenetic'
  }, {
    id: '4,',
    name: 'Other'
  }
];
const prvchildarray = [{
  id: '1,',
  name: 'i. Chromosomal Disorders'
}, {
  id: '2,',
  name: 'ii. Metabolic Disorders'
}, {
  id: '3,',
  name: 'iii. Congenital Anomaly'
}, {
  id: '4,',
  name: 'iv. Single Gene Disorder'
},
{
  id: '5,',
  name: 'v. Mental Retardation'
}, {
  id: '6,',
  name: 'vi. Haemoglobinopathy'
}, {
  id: '7,',
  name: 'vii. Sex Linked Disorders'
}, {
  id: '8,',
  name: 'viii. Other'
}

];


var  mydata ;
var mydataintent ;
var cidi  = '';
class FormFInvensive extends Component
{

  submit()
  {
  
    if(this.state.notdptp == '')
    {
      alert('Please Select Procedure peforming doctor');
      return;
    }
    else if(this.state.notdptpid == '0')
    {
      alert('Please Select Procedure peforming name');
      return;
    }
    else if(this.state.history == -1)
    { 
      alert('Please Select History of Genetic Disease Family ');
      return;
    }
   if(this.state.history ==1 && this.state.hisdesvalue == '')
   {
      alert('Please Enter history Genetic Disease Name in family');
      return
   }
    else if(this.state.selectedItems.length <= 0)
    {
      alert('Please Select basis of diagnosis');
      return;
    }
    else if(this.state.other_daignosis && this.state.other_diag_value == '')
    {
      alert('Please Enter Other Diagnosis Value');
      return;
    }
    else if(this.state.prvchildselected.length <= 0)
    {
      alert('Please Select previous children with');
      return;
    }
    else if(this.state.prv_child_other && this.state.prv_child_value == '')
    {
      alert('Please Enter Other Previous Child diagnosis Value');
      return;
    }
    if(this.state.parents_sibling_id == '-1')
    {
      alert('Please Select Mother / Father / Sibling  genetic disease');
        return;
    }
    if(this.state.parents_sibling_id == '1' && this.state.parents_sibling_value == '')
    {
      alert('Please Entre Parents Sibling Specify it ');
      return; 
    }
    if(this.state.invansive_procedure_carry_out_values.length <= 0 )
    {
      alert('Please Select Invasive procedures carried out reason');
      return;
    }
    if(this.state.comp_inv_id == '-1')
    {
      alert('Please select complication of invansive procedure');
      return;
    }
    if(this.state.pre_natal_diagnostic_result == '')
    {
      alert('please enter pre-natal diagnostic procedures was conveyed to');
      return;
    }
    if(this.state.abnormality == '-1')
    {
      alert('Please Select abnormality detected in the diagnostic procedures/tests');
      return;
    }
    if(this.state.abnormality_detected && this.state.abnormality_detected_value == '')
    {
      alert('Please Enter abnormality detected reason please specify');
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
    
    mydata = '';
    mydata = mydataintent;
  
 
// (17) NOTDPTP : integer, length(1-2)                          Y                      
// (17)  P_Proc_AttName : integer, length(1-6)                  Y 
     mydata.append('NOTDPTP',this.state.notdptp);
     mydata.append('P_Proc_AttName',this.state.notdptpid);
//     (18) HOGMDIF : integer, length(1), value(0-1)              Y   
// PDiseaseHistDet : length <= 100                            Y  
    mydata.append('HOGMDIF',this.state.history);
    mydata.append('PDiseaseHistDet',this.state.hisdesvalue);
    // (18) BODL :                                                N
    // POtherDiagnoseB : length <= 100   
    mydata.append('BODL',this.state.selectedItems);
    mydata.append('POtherDiagnoseB',this.state.other_diag_value);
//     (19-A) LFPCW :                                             N
// P_A_ChildDiseaseName : length <= 100                       Y                       
// (19-C) MFSHGD : integer, length(1), value(0-1)             Y                      
// P_C_GeneDis_Det : length <= 100                            N                       
// P_D_OtherName : length <= 100                              N 
    mydata.append('LFPCW',this.state.prvchildselected);
    mydata.append('P_A_ChildDiseaseName',this.state.prv_child_value);
    mydata.append('MFSHGD',this.state.parents_sibling_id);
    mydata.append('P_C_GeneDis_Det',this.state.parents_sibling_value);
    mydata.append('P_D_OtherName',this.state.other_specify_value);
    //(20) P_Consent_Date : validate date format, >=PRegDate      Y
    mydata.append('P_Consent_Date',this.state.datewomobtained);
    // (21) LOIPCO :                                              Y
    // P_OtherInvasive : length <= 200                            N
    mydata.append('LOIPCO',this.state.invansive_procedure_carry_out_values);
    mydata.append('P_OtherInvasive',this.state.inv_process_other_value);

    // (22) ACOIP : integer, length(1), value(0-1)                Y                       
    // P_Compl_Det : length <= 100                                N
    mydata.append('ACOIP',this.state.comp_inv_id);
    mydata.append('P_Compl_Det',this.state.comp_value);
    
    //(23) LOATR :                                             N  
    mydata.append('LOATR',this.state.additional_test_value);
    //(24) P_A_Result : length <= 200  N
    mydata.append('P_A_Result',this.state.pre_natal_diagnostic);
    //(25) P_Proc_Date : validate date format, >=PRegDate         Y
    mydata.append('P_Proc_Date',this.state.date_of_procedure);
   
    //(26) PResultConveyedTo : length <= 200                          Y  
    mydata.append('PResultConveyedTo',this.state.pre_natal_diagnostic_result);
    //(26) P_Result_Date : validate date format, >=PRegDate           Y
    mydata.append('P_Result_Date',this.state.on_date);
    mydata.append('MobileNo', MyData.mobile);
    mydata.append('TokenNo', MyData.token);
    // (27) P_Ultra_Norm_AbNorm :                                      Y
    // (27) P_AbNorm_Det : length <= 200                               Y  
    if(this.state.abnormality =='1')
        mydata.append('P_Ultra_Norm_AbNorm',true);
        else
        mydata.append('P_Ultra_Norm_AbNorm',false);
  
        mydata.append('P_AbNorm_Det',this.state.abnormality_detected_value); 
      

    this.cllapiforPostdata('SaveFormF');
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
          this.props.navigation.navigate('PDFExample' , {id_pdf : responseJson.Message.substring(65) , back_id : 'Dashboard'})
         
        }
        else
        {
          setTimeout(()=>
          {

            if(responseJson.Message.toString.includes ='Invalid request')
            {
              Alert.alert(
                '',
               'Session Expired please verify again',
                [
                  {text: '', onPress: () => navigation.goBack(null), style: 'cancel'},
                  {text: 'Yes', onPress: () =>navigation.navigate('PinScreen')},
                
                ],
                { 
                  cancelable: true 
                }
              );
            }
            else 
            alert(responseJson.Message)
          },300); 
        }
        
       })
       .catch(error => {
         this.setState({ load: false });
       
       });
   }
  onSelectedItemsChange = selectedItems => {
    
    if(JSON.stringify(selectedItems).includes('4'))
    this.setState({other_daignosis: true })
    else
    this.setState({other_daignosis: false })

    this.setState({ selectedItems });
    console.warn(JSON.stringify(selectedItems));
  };

  onSelectedItemsprevchild= prvchildselected => {
    
    if( JSON.stringify(prvchildselected).includes('8'))
    this.setState({prv_child_other: true })
    else
    this.setState({prv_child_other: false })

    this.setState({ prvchildselected });
  };

  invansive_procedure_carry_out_values_fun= invansive_procedure_carry_out_values => {
    
    if( JSON.stringify(invansive_procedure_carry_out_values).includes('5'))
    this.setState({inv_process_other: true })
    else
    this.setState({inv_process_other: false })

    this.setState({ invansive_procedure_carry_out_values });
  };


  onSelectedItemsAdditionalTest= additional_test_value => {

    this.setState({ additional_test_value });
  };
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

    onChangeText(key, value) {
        this.setState({
          [key]: value
        });
      }
      
    state = {
        load : false,
        dataSource :[],
        singlePickerVisible : false,
        multiPickerVisible : false, 
        other_diag_value : '',
        other_daignosis : false,
        notdptp:'',  
        notdptpid: '0', 
        hisdesvalue :'',
        historydisboolean : false,
        history : -1,       
        procedure : '',
        select_proc : '',
        datewomobtained : '',
        reg_no: '',
        invansive_procedure_carry_out_values :[],
        inv_process_other : false,
        inv_process_other_value : '',
        // upper part invansive procedure carried out 
        result_procedure_carried_out:'',
        comp_inv_id : -1,
        comp_bool :false,
        comp_value : '',

        pre_natal_diagnostic_result:'',
        pre_natal_diagnostic : '',

        convey_on_display : '',
        date_of_procedure : '',
        on_date : '',
        selectedItems : [],
        prvchildselected : [],
        abnormality : -1,
        prv_child_other : false,
        prv_child_value : '',
        parents_sibling : false,
        parents_sibling_id : -1,
        parents_sibling_value : '',
        other_specify_value : '',
        additional_test_value : [],
        abnormality_detected : '',
        abnormality_detected_value :'',
        thumb_checked : false
        
       
      };
      identity_Popup()
      {
        if(this.state.select_proc == '')
        {
          alert('Please select name of the procedure of performing the procedure')
          return
        }
        current_dialogue = 'name_proc';
        this.setState({ singlePickerVisible: true ,dataSource : current_list.ResponseData})
      }
      async cllapiforgetinglist(front,MasterCode) {

        this.setState({ load: true });
       var data = new URLSearchParams();

       data.append('MasterCode',MasterCode);
       data.append('cid',cidi);
       data.append('MobileNo', MyData.mobile);
       data.append('TokenNo', MyData.token);
    
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
            this.setState({ load: false  });
             if(front == 'GetDocTypeList')
             {
              current_list = responseJson;
                   this.setState({ singlePickerVisible: true ,dataSource : responseJson.ResponseData});
             }
             console.warn(JSON.stringify(responseJson.Message));
            }
            else
            {
                alert(responseJson.Message)
                if(front == 'GetDocTypeList')
                {
                  this.setState({procedure : 'no data', reg_no :''})
                }
            }
            
           })
           .catch(error => {
             this.setState({ load: false });
           
           });
       }
       componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
      }
    
      handleBackButtonClick() {
        alert('please use back arrow this back press is disabled for security reason')
        return true;
      }
        componentDidMount()
        {
          const{ data , name_p ,date_come , age_p ,cid} = this.props.route.params;
          
          minDate = date_come;
          cidi = cid;
          BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

          age = age_p;
         this.setState({'date_of_procedure': date_come , datewomobtained : date_come , on_date : date_come , pre_natal_diagnostic_result: name_p});
        
          mydataintent = data;
          var date = new Date().getDate(); //Current Date
          var month = new Date().getMonth() + 1; //Current Month
          var year = new Date().getFullYear(); //Current Year
          maxDateCurrent = year + '/' + month + '/' + date 
          
          this.getdataFromSharedPreference();
        }

            async getdataFromSharedPreference()
        {

        

            await  AsyncStorage.getItem('centrename', (err, result) => {
                //email = result;

            });
            // await  AsyncStorage.getItem('phone_number', (err, result) => {
            //     phone = result;
            
            //   });
            // await  AsyncStorage.getItem('username', (err, result) => {
            //     username = result;
            //   });    

        }

         getIndex(email) {
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
            <Text style={{ color: 'white',  fontSize: 20,marginLeft:-50,  textAlign: 'center', width: '100%',alignContent:'center' ,justifyContent:'center' }}>Invansive</Text>
            )
        }
  render() {

    const { selectedItems,prvchildselected ,invansive_procedure_carry_out_values, additional_test_value} = this.state;

    return (
    
     <SafeAreaView style={styles.containersafe}>
        {this._headerBar()}
        <ScrollView 
        style={styles.container}
         //ref={ref => {this.scrollView = ref}}
         //onContentSizeChange={(width,height) => this.scrollView.scrollToEnd({animated: true})}
         >
       
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
      if (typeof(result.selectedItem) !== 'undefined' || result.selectedItem != null) {
        this.setState({ singlePickerVisible: false });
        console.warn(result);
        if(current_dialogue == 'name_proc')                    
        {
          var valu  = current_list.ResponseData.findIndex(obj => obj.Code === result.selectedItem.value);

          this.setState({ 'procedure': result.selectedItem.label ,'notdptpid' : result.selectedItem.value, reg_no : current_list.ResponseData[valu].RegNo })
        } 
      }
      else
      alert('Please Select value')
     
        
      
  }
      }
     
    />
     <Text style={styles.inputtextheader}>Section C : To be filled for performing invasive Procedures / Tests Only</Text>

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
        <Text style={styles.inputtext}>History of Genetic / Medical Disease in Family</Text>
        <RadioForm style={{width:'50%',marginTop:4}}
  radio_props={yes_no}
  initial={this.state.history}
  formHorizontal={false}
  labelHorizontal={true}
  buttonColor={'#2196f3'}
  animation={true}
  buttonStyle={{margin:4}}
  labelStyle={{fontSize: 12, color: '#000',marginRight:10}}
  onPress={(value) => {
    if(value == 1)
    {this.setState({historydisboolean : true})}
    else
    {this.setState({historydisboolean : false})}
    
     this.setState({ history  : value})
    }   
    }
  buttonSize={10}
  buttonOuterSize={20}
/>
          </View>
          {
          this.state.historydisboolean ? <TextInput
          style={styles.inputinside}
          placeholderTextColor="#adb4bc"
          returnKeyType="go"
          autoCapitalize="none"
          placeholder = 'please specify genetic medical disease'
          value = {this.state.hisdesvalue}
          autoCorrect={false}
          onChangeText={value => this.onChangeText("hisdesvalue", value)}  /> : null
              }

          <View style = {styles.inputboxview}>
          <View style={{ flex: 1 ,padding : 5 ,width : '100%' }}>
          <MultiSelect 
          hideTags
          items={items}
          uniqueKey="id"
          ref={(component) => { this.multiSelect = component }}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={selectedItems}
          selectText="Basis of diagnosis"
          searchInputPlaceholderText="Basics of diagnosis"
          onChangeInput={ (text)=> console.log(text)}
          tagRemoveIconColor="#e6ac00"
          tagBorderColor="#e6ac00"
          tagTextColor="#e6ac00"       
          fontSize  = {13}
          selectedItemTextColor={Gradientcolourbluew}
          selectedItemIconColor={Gradientcolourbluew}
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: '#e6ac00' }}
          submitButtonColor={Gradientcolourbluew}
          submitButtonText="select"
          hideSubmitButton = {false}
        />
         {
this.state.other_daignosis ?
         <TextInput
                        style={styles.inputfull}
                        placeholder = 'please specify other'
                        placeholderTextColor="#adb4bc"
                        returnKeyType="go"
                        autoCapitalize="none"
                        value = {this.state.other_diag_value}
                        autoCorrect={false}
                        keyboardType={'default'}
                        onChangeText={value => this.onChangeText("other_diag_value", value)}  /> : null    
         }
      </View>

          </View>
          <Text style={styles.inputtextheader}>Indication for pre-natal diagnosis</Text>

          <View style = {styles.inputboxview}>
          <View style={{ flex: 1 ,padding : 5 ,width : '100%' }}>
          <MultiSelect 
          hideTags
          items={prvchildarray}
          uniqueKey="id"
          ref={(component) => { this.multiSelect = component }}
          onSelectedItemsChange={this.onSelectedItemsprevchild}
          selectedItems={prvchildselected}
          selectText="previous child/children"
          searchInputPlaceholderText="previous child / children"
          onChangeInput={ (text)=> console.warn(text)}
          tagRemoveIconColor="#e6ac00"
          tagBorderColor="#e6ac00"
          tagTextColor="#e6ac00"       
          fontSize  = {13}
          selectedItemTextColor={Gradientcolourbluew}
          selectedItemIconColor={Gradientcolourbluew}
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: '#e6ac00' }}
          submitButtonColor={Gradientcolourbluew}
          submitButtonText="select"
          hideSubmitButton = {false}
        />
         {
this.state.prv_child_other ?
         <TextInput
                        style={styles.inputfull}
                        placeholder = 'please specify other'
                        placeholderTextColor="#adb4bc"
                        returnKeyType="go"
                        autoCapitalize="none"
                        value = {this.state.prv_child_value}
                        autoCorrect={false}
                        keyboardType={'default'}
                        onChangeText={value => this.onChangeText("prv_child_value", value)}  /> : null    
         }
      </View>
      </View>

          <Text style={{marginStart : 5}} >Advanced maternal age(above 35)    :    {Number(age) > 35 ? 'Yes' : 'No'} </Text>
          <View style = {styles.inputboxviewcolumn}>

          <View style={styles.inputboxviewwithoutborder} >

                <Text style={styles.inputtext}>Mother / Father / Sibling has genetic disease</Text>       
                <RadioForm style={{width:'40%',marginTop:4}}
                radio_props={parentsgeneticdisease}
                initial={this.state.parents_sibling_id}
                formHorizontal={false}
                labelHorizontal={true}
                buttonColor={'#2196f3'}
                animation={true}
                buttonStyle={{margin:4}}
                labelStyle={{fontSize: 12, color: '#000',marginRight:10}}
                onPress={(value) => {
                  this.setState({parents_sibling_id : value})
                if(value == '1'){
                this.setState({parents_sibling:true})
                }
                else{ this.setState({parents_sibling:false}) }
                //this.getIndex(value)
                }
                }
                buttonSize={10}
                buttonOuterSize={20}
                />
   
          </View>
            {
          this.state.parents_sibling ? <TextInput
          style={styles.inputinside}
          placeholderTextColor="#adb4bc"
          returnKeyType="go"
          autoCapitalize="none"
          placeholder = 'please specify'
          value = {this.state.parents_sibling_value}
          autoCorrect={false}
          onChangeText={value => this.onChangeText("parents_sibling_value", value)}  /> : null
              }
        
        </View>
        
          <View style={styles.inputboxview} >
        <Text style={styles.inputtext}>Other (specify)</Text>
        <TextInput
                        style={styles.input}
                        placeholderTextColor="#adb4bc"
                        returnKeyType="go"
                        autoCapitalize="none"
                        value = {this.state.other_specify_value}
                        autoCorrect={false}
                        keyboardType={'default'}
                        onChangeText={value => this.onChangeText("other_specify_value", value)}  />
          </View>

          <View style={styles.inputboxview} >
        <Text style={styles.inputtext}> Date on which consent of pregnant woman/person was obtained in Form G prescribed in PC&PNDT Act, 1994</Text>
        <DatePicker
        style={{width: '50%',borderColor:'#000',borderWidth:1,height:42,backgroundColor:'white'}}
        date={this.state.datewomobtained}
        mode="date"
        placeholder="select date"
        format="YYYY/MM/DD"
        minDate={minDate}
        maxDate={maxDateCurrent}
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

          <View style = {styles.inputboxview}>
          <View style={{ flex: 1 ,padding : 5 ,width : '100%' }}>
          <MultiSelect 
          hideTags
          items={invansive_procedure_carry_out}
          uniqueKey="id"
          ref={(component) => { this.multiSelect = component }}
          onSelectedItemsChange={this.invansive_procedure_carry_out_values_fun}
          selectedItems={invansive_procedure_carry_out_values}
          selectText="Invasive procedures carried out"
          searchInputPlaceholderText="Invasive procedures carried out"
          onChangeInput={ (text)=> console.warn(text)}
          tagRemoveIconColor="#e6ac00"
          tagBorderColor="#e6ac00"
          tagTextColor="#e6ac00"       
          fontSize  = {13}
          selectedItemTextColor={Gradientcolourbluew}
          selectedItemIconColor={Gradientcolourbluew}
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: '#e6ac00' }}
          submitButtonColor={Gradientcolourbluew}
          submitButtonText="select"
          hideSubmitButton = {false}
        />
         {
this.state.inv_process_other ?
         <TextInput
                        style={styles.inputfull}
                        placeholder = 'please specify other'
                        placeholderTextColor="#adb4bc"
                        returnKeyType="go"
                        autoCapitalize="none"
                        value = {this.state.inv_process_other_value}
                        autoCorrect={false}
                        keyboardType={'default'}
                        onChangeText={value => this.onChangeText("inv_process_other_value", value)}  /> : null    
         }
      </View>
      </View>
         
      <View style = {styles.inputboxviewcolumn}>

<View style={styles.inputboxviewwithoutborder} >

      <Text style={styles.inputtext}>Any complication of invansive procedure</Text>       
      <RadioForm style={{width:'40%',marginTop:4}}
      radio_props={parentsgeneticdisease}
      initial={this.state.comp_inv_id}
      formHorizontal={false}
      labelHorizontal={true}
      buttonColor={'#2196f3'}
      animation={true}
      buttonStyle={{margin:4}}
      labelStyle={{fontSize: 12, color: '#000',marginRight:10}}
      onPress={(value) => {
        this.setState({comp_inv_id : value})
      if(value == '1'){
      this.setState({comp_bool:true})
      }
      else{ this.setState({comp_bool:false}) }
      //this.getIndex(value)
      }
      }
      buttonSize={10}
      buttonOuterSize={20}
      />

</View>
  {
this.state.comp_bool ? <TextInput
style={styles.inputinside}
placeholderTextColor="#adb4bc"
returnKeyType="go"
autoCapitalize="none"
placeholder = 'please specify'
value = {this.state.comp_value}
autoCorrect={false}
onChangeText={value => this.onChangeText("comp_value", value)}  /> : null
    }

</View>

          <View style = {styles.inputboxview}>
          <View style={{ flex: 1 ,padding : 5 ,width : '100%' }}>
          <MultiSelect 
          hideTags
          items={additional_test}
          uniqueKey="id"
          ref={(component) => { this.multiSelect = component }}
          onSelectedItemsChange={this.onSelectedItemsAdditionalTest}
          selectedItems={additional_test_value}
          selectText="Additional tests recommended"
          searchInputPlaceholderText="prv"
          onChangeInput={ (text)=> console.log(text)}
          tagRemoveIconColor="#e6ac00"
          tagBorderColor="#e6ac00"
          tagTextColor="#e6ac00"       
          fontSize  = {13}
          selectedItemTextColor={Gradientcolourbluew}
          selectedItemIconColor={Gradientcolourbluew}
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: '#e6ac00' }}
          submitButtonColor={Gradientcolourbluew}
          submitButtonText="select"
          hideSubmitButton = {false}
        />
        </View>
        </View>

          <View style={styles.inputboxview} >
        <Text style={styles.inputtext}> Result of the Procedures/Tests carried out(report in brief of the invasive tests/procedures carried out)</Text>
        <TextInput
                        style={styles.input}
                        placeholderTextColor="#adb4bc"
                        returnKeyType="go"
                        autoCapitalize="none"
                        maxLength={200}
                        value = {this.state.pre_natal_diagnostic}
                        autoCorrect={false}
                        keyboardType={'default'}
                        onChangeText={value => this.onChangeText("pre_natal_diagnostic", value)}  />
          </View>

          <View style={styles.inputboxview} >
        <Text style={styles.inputtext}>Date on which procedure carried out</Text>
        <DatePicker
        style={{width: '50%',borderColor:'#000',borderWidth:1,height:42,backgroundColor:'white'}}
        date={this.state.date_of_procedure}
        mode="date"
        placeholder="select date"
        format="YYYY/MM/DD"
        minDate={minDate}
        maxDate={maxDateCurrent}
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
        onDateChange={(date) => {this.setState({date_of_procedure: date})}}
      /> 
          </View>
          <View style = {styles.inputboxviewcolumn}>
          <View style={styles.inputboxviewwithoutborder} >
        <Text style={styles.inputtext}>The result of pre-natal diagnostic procedures was conveyed to</Text>
        <TextInput
                        style={styles.input}
                        placeholderTextColor="#adb4bc"
                        returnKeyType="go"
                        autoCapitalize="none"
                        value = {this.state.pre_natal_diagnostic_result}
                        autoCorrect={false}
                        keyboardType={'default'}
                        onChangeText={value => this.onChangeText("pre_natal_diagnostic_result", value)}  />
          </View>

          <View style={styles.inputboxviewwithoutborder} >
        <Text style={styles.inputtext}>On</Text>
        <DatePicker
        style={{width: '50%',borderColor:'#000',borderWidth:1,height:42,backgroundColor:'white'}}
        date={this.state.on_date}
        mode="date"
        placeholder="select date"
        format="YYYY/MM/DD"
        minDate={minDate}
        maxDate={maxDateCurrent}
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
          </View>
          
          <View style = {styles.inputboxviewcolumn}>

      <View style={styles.inputboxviewwithoutborder} >

      <Text style={styles.inputtext}>Any Indication for MTP as per the abnormanilty detected in the diagnostic procedures/tests</Text>       
      <RadioForm style={{width:'40%',marginTop:4}}
      radio_props={parentsgeneticdisease}
      initial={-1}
      formHorizontal={false}
      labelHorizontal={true}
      buttonColor={'#2196f3'}
      animation={true}
      buttonStyle={{margin:4}}
      labelStyle={{fontSize: 12, color: '#000',marginRight:10}}
      onPress={(value) => {
        this.setState({'abnormality' : value})
      if(value == '1'){
      this.setState({abnormality_detected:true})
      }
      else{this.setState({abnormality_detected:false}) }
      //this.getIndex(value)
      }
      }
      buttonSize={10}
      buttonOuterSize={20}
      />

</View>
  {
this.state.abnormality_detected ? <TextInput
style={styles.inputinside}
placeholderTextColor="#adb4bc"
returnKeyType="go"
autoCapitalize="none"
placeholder = 'please specify'
value = {this.state.abnormality_detected_value}
autoCorrect={false}
onChangeText={value => this.onChangeText("abnormality_detected_value", value)}  /> : null
    }

</View>
          <Text style={styles.inputtextheader}>Section D : Declaration</Text>
          <CheckBox
          containerStyle = {styles.inputboxview} 
          textStyle = {styles.inputtextunder}
  title='In Case Of Thumb Impression'
  checked={this.state.thumb_checked}
  onPress={() => this.setState({thumb_checked: !this.state.thumb_checked})}
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
      backgroundColor:Gradientcolourlight
    },
    containersafe: {
      flex: 1,
     backgroundColor:Gradientcolourbluew
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
      margin : 2, 
      padding :1,
      width:'99%',
      flexDirection:'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      backgroundColor:'white'
    },
    inputboxviewwithoutborder :{
     
      width:'99%',
      flexDirection:'row',
      justifyContent: 'center',
      alignItems: 'center',
     
      backgroundColor:'white'
    },
    inputboxviewcolumn :{
      margin : 2, 
      padding :1,
      width:'99%',
      flexDirection:'column',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      backgroundColor:'white'
    },
 
    inputinside: {
      marginStart :5,
      marginEnd:5,
        backgroundColor:'#fff',
         borderWidth: 1,
         borderColor:'#1133ee',
        
         width:'100%',
         fontSize:14,
         height:40,
         paddingStart : 5,
         marginRight:0.5,
         flexDirection:'row',
       },
    input: {
     backgroundColor:'#fff',
      borderWidth: 1,
      borderColor:'#1133ee',
      padding:0,
      width:'50%',
      paddingStart:5,
      fontSize:14,
      height:30,
      marginRight:0.5,
      flexDirection:'row',
    },
    inputfull: {
      backgroundColor:'#fff',
       borderWidth: 1,
       borderColor:'#1133ee',
       padding:0,
       paddingStart: 5,
       width:'100%',
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
      color:'#000'
    },
    inputtextheader: {
      padding:10,
      width:'100%',
      fontSize:12,
      flex:1, 
      backgroundColor : BlueColor,
      color : '#fff'
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
    backgroundColor: Gradientcolourbluew, alignItems: 'center', width: '100%', flexDirection: 'row', height: 60,
      justifyContent: 'flex-start',elevation:5,
    },
    button: {
      backgroundColor: BlueColor,
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 12,
      color: 'white',
    
      fontSize: 14,
      fontWeight: 'bold',
      overflow: 'hidden',
      padding: 12,
      textAlign:'center',
    }
  });

export default FormFInvensive