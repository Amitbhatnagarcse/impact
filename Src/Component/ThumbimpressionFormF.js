import React, { Component } from 'react';
import { Text, View ,TextInput,TouchableWithoutFeedback,StyleSheet} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

var sex_array = [
  {label: 'Male', value: 1 },
  {label: 'Female', value: 2 },
  {label :'Other' ,value : 3}

];

export default class ThumbImpressionFormF extends Component 
 {

  state = {
    namet  : '',
    aget : '',
    relationt : '',
    addresst : '',
    sext : -1,
    height: 0

  };

  
  onChangeText(key, value) {
    let { funct } = this.props;
    funct(key , value);
    // if (key = 'addresst')
    // {
    //   this.setState({height : this.state.addresst.length})

    this.setState({
      [key]: value
    });
  }


  render()
   {
    let { funct } = this.props;
    
    return (
     
      <View style={{flex:1,flexDirection:'column',justifyContent: 'flex-start'}}>
          <View style={styles.inputboxview} >
        <Text style={styles.inputtext}>Identified by (Name) </Text>
        <TextInput
                        style={styles.input}
                        placeholderTextColor="#adb4bc"
                        returnKeyType="go"
                        autoCapitalize="none"
                        maxLength = {30}
                        value = {this.state.namet}
                        autoCorrect={false}
                        keyboardType={'default'}
                        onChangeText={value => this.onChangeText("namet", value)}  />
          </View>
          <View style={styles.inputboxview} >
        <Text style={styles.inputtext}>Age (years) </Text>
        <TextInput
                        style={styles.input}
                        placeholderTextColor="#adb4bc"
                        returnKeyType="go"
                        maxLength = {2}
                        autoCapitalize="none"
                        value = {this.state.aget}
                        autoCorrect={false}
                        keyboardType={'numeric'}
                        onChangeText={value => this.onChangeText("aget", value)}  />
          </View>
          <View style={styles.inputboxview} >

<Text style={styles.inputtext}>Sex</Text>       
<RadioForm style={{width:'50%',marginTop:4}}
radio_props={sex_array}
initial={this.state.sext}
formHorizontal={false}
labelHorizontal={true}
buttonColor={'#2196f3'}
animation={true}
buttonStyle={{margin:4}}
labelStyle={{fontSize: 12, color: '#000',marginRight:10}}
onPress={(value) => {
  funct('namet' ,value);
this.setState ({sext : value});
}


}
buttonSize={10}
buttonOuterSize={20}
/>
  </View>
          <View style={styles.inputboxview} >
        <Text style={styles.inputtext}>Relation (if any) </Text>
        <TextInput
                        style={styles.input}
                        placeholderTextColor="#adb4bc"
                        returnKeyType="go"
                        autoCapitalize="none"
                        value = {this.state.relationt}
                        autoCorrect={false}
                        maxLength = {20}
                        keyboardType={'default'}
                        onChangeText={value => this.onChangeText("relationt", value)}  />
          </View>
          <View style={styles.inputboxview} >
        <Text style={styles.inputtext}>Address & Contact No.</Text>
        <TextInput
        style={[styles.input, {height: Math.max(35, this.state.height)}]}
        multiline={true}
                        placeholderTextColor="#adb4bc"
                        returnKeyType="go"
                        maxLength = {200}
                        autoCapitalize="none"
                        value = {this.state.addresst}
                        autoCorrect={false}
                        keyboardType={'default'}
                        onChangeText={value => this.onChangeText("addresst", value)}  />
          </View>
      
   


     </View>
    );
  }

 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {

    borderColor: 'white',
    borderRadius: 1,
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    overflow: 'hidden',
    textAlign:'center',
  },
  inputboxview :{
    margin :2,
   width:'99%',
   flexDirection:'row',
   justifyContent: 'center',
   alignItems: 'center',
   borderWidth: 1,
   backgroundColor:'white'
 },
 input: {
  backgroundColor:'#fff',
   borderWidth: 1,
   borderColor:'#1133ee',
   padding:0,
   width:'50%',
   fontSize:14,
   height:30,
   marginRight:0.5,
   flexDirection:'row',
 },
 inputtext: {
   padding:5,
   width:'50%',
   fontSize:13,
   flex:1, 
 },
});

8553