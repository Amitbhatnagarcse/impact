import React, { Component } from 'react';
import { Text, View, FlatList ,Image ,TouchableWithoutFeedback,StyleSheet} from 'react-native';
import {Gradientcolour, Gradientcolourbluew, Gradientcolouryellow,Gradientcolourlight,BlueColor} from '../../Constants'

import leftarrow from '../../assets/img/edit.png';

export default class DayEndSummaryList extends Component 
 {

  onPresss ( value , mother , date)
  {
    let { func } = this.props;
    func( value ,mother , date);
  }
  onChangeText(key, value) {
    this.setState({
      [key]: value
    });
  }

  Item(item) 
  {
   const date = item.EntryDate.toString().substring(0,10)
   const valu = date.split('-')
   const dateformat = valu[2]+'/' + valu[1] + '/' + valu[0]
    return (
    
      <TouchableWithoutFeedback onPress={() => this.onPresss(''+item.TotalPatientCount,''+item.TotalPragnentWomen,dateformat) }>
      <View style={{ flexDirection: 'row',
      height: 50,
      marginTop: 0,
      margin:5,
      backgroundColor:'white',
      elevation:10,
      shadowColor:Gradientcolourbluew,
      justifyContent:'space-evenly'
      }}>
        < View style = {{flex: 2,height: 50,justifyContent:'space-around'}} >
    <Text style={styles.buttonblack}> {item.TotalPatientCount}</Text>
    </ View>
    < View style = {{flex: 2,height: 50,justifyContent:'space-around'}} >
    <Text style={styles.buttonblack}>{item.TotalPragnentWomen}</Text>
    </ View>
    < View style = {{flex: 1.8,height: 50,justifyContent:'space-around'}} >
    <Text style={styles.buttonblack}>{dateformat}</Text>
    </ View>
    < View style = {{flex: 0.8,height: 50,justifyContent:'space-around',alignItems:'center'}} >
    <Image source={leftarrow} style={{ width: 35,
    height: 35,
    alignItems: 'center'}} ></Image>
    </ View>
    </View>
    
        </TouchableWithoutFeedback>
    )
  }

  render()
   {
    return (
     
      <View style={{flex:1,flexDirection:'column',justifyContent: 'flex-start'}}>
        
      <View style = {
   {
    width: '100%',
    height:50,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop:5,
    backgroundColor: Gradientcolourbluew
   }
  } >

     
  < View style = {{flex: 2,height: 50,justifyContent:'space-around'}} >
    <Text style={styles.button}> Total Patient Registered</Text>
    </ View>
    < View style = {{flex: 2,height: 50,justifyContent:'space-around'}} >
    <Text style={styles.button}>Total Pregnant Women</Text>
    </ View>
    < View style = {{flex: 1.8,height: 50,justifyContent:'space-around'}} >
    <Text style={styles.button}>Report Date</Text>
    </ View>
    < View style = {{flex: 0.8,height: 50,justifyContent:'space-around'}} >
    <Text style={styles.button}>Edit</Text>
    </ View>
   
  </View>


        <FlatList
          style={{ flex: 1 ,flexDirection:'column',marginTop:5}}
          data={this.props.data}
          renderItem={(item, index) => this.Item(item.item)}
          keyExtractor={item => item.id}
        />
     </View>
    );
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
    fontSize:18,
   
  },
  formInput: {    
    borderBottomWidth: 1.5, 
    marginLeft: 20,
    borderColor: '#000',       
  },
  input: {
    borderWidth: 1,
    padding:5,
    width:'30%',
    fontSize:14,
  },
  headerView: {
    backgroundColor: 'white', alignItems: 'center', width: '100%', flexDirection: 'row', height: 60,
    justifyContent: 'flex-start',elevation:5
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
  buttonblack: {

    borderColor: 'white',
    borderRadius: 1,
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    overflow: 'hidden',
    textAlign:'center',
  },

});