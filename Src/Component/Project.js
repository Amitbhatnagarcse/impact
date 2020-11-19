import React, { Component } from 'react';

import { AppRegistry, StyleSheet, View, Platform, Picker, ActivityIndicator, Button, Alert} from 'react-native';
import { SinglePickerMaterialDialog } from 'react-native-material-dialog';
const SHORT_LIST = ["List element 1", "List element 2", "List element 3"];
import {BASE_URL} from '../../Constants'

var current_dialogue = '';
const data = [
    { key: 1, label: 'Service1'},
    { key: 2, label: 'Service2' },
    { key: 3, label: 'Service3' },
    { key: 4, label: 'Service4' },
    { key: 5, label: 'Service4' },
 ];
export default class Project extends Component {
 
    
 constructor(props)
 {

   super(props);

   this.state = { 

   load: false,

   PickerValueHolder : '',
   dataSource :[],
   singlePickerVisible : false,

  }
 }

 async cllapiforPregnancy() {
    this.setState({ load: true });
 
   var data = new URLSearchParams();
   data.append('mobile', MyData.mobile);
   data.append('token', MyData.token);
     fetch(BASE_URL+"Stateandidentityprooftype", {
       method: "POST",
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       body: data.toString(),
       json: true,
     })
       .then(response => response.json())
       .then(responseJson => {
         this.setState({ load: false ,dataSource : responseJson.IdentityProofType,singlePickerVisible : true});
         console.warn(JSON.stringify(responseJson.Message));
         //console.warn(JSON.stringify(dataSource));
         //this.setState({logindata : responseJson.ResposeData[0],loginui:false})
       })
       .catch(error => {
         this.setState({ load: false });
       
       });
   }
 componentDidMount() {
   this.cllapiforPregnancy();
    }

    GetPickerSelectedItemValue=()=>{

      Alert.alert(''+this.state.PickerValueHolder);

    }

 render() {

   if (this.state.isLoading) {
     return (
       <View style={{flex: 1, paddingTop: 20}}>
         <ActivityIndicator />
       </View>
     );
   }

   return (

    <View style={styles.MainContainer}>

          <Picker
            selectedValue={this.state.PickerValueHolder}
            style={{height:120}}
            onValueChange={(itemValue, itemIndex) => this.setState({PickerValueHolder: itemValue})} >

            { this.state.dataSource.map((item, key)=>(
            <Picker.Item label={item.CodeText} value={item.Code} key={key} />)
            )}
    
          </Picker>
         
          <SinglePickerMaterialDialog
            title={'Pick one element!'}
            items={this.state.dataSource.map((row, index) =>
             ({ value: row.Code, label: row.CodeText }))  }
            visible={this.state.singlePickerVisible}
            selectedItem={this.state.PickerValueHolder}
            onCancel={() => this.setState({ singlePickerVisible: false })}
            onOk={result => {      
                this.setState({ singlePickerVisible: false });
                this.setState({ PickerValueHolder: result.selectedItem.value });
            }}
            />

          <Button title="Click Here To Get Picker Selected Item Value" onPress={ this.GetPickerSelectedItemValue } />

    </View>
           
   );
 }
}

const styles = StyleSheet.create({

MainContainer :{

justifyContent: 'center',
flex:1,
margin: 10
}

});