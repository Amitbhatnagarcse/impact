import React, { useEffect, useReducer, useState } from 'react'

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from "react-native";  
import Styles from './style';

export default function Item(  { item  , index ,navigation ,actionPer ,editfun} )
{
  
    return (
      <View style = {{margin:5 ,borderRadius: 5, borderColor:'#e1e1e1' ,elevation : 5,backgroundColor: 'rgba(52, 52, 52, 0.4)'}}>
      
  
         <View style={Styles.inputboxview} >
        <Text style={Styles.inputtext}>Center Name</Text>
        <Text style={Styles.input}  >{item.CenterName} </Text>
          </View> 

          <View style={Styles.inputboxview} >
        <Text style={Styles.inputtext}>PIR No.</Text>
        <Text style={Styles.input}  >{item.PIRNo} </Text>
          </View> 

          <View style={Styles.inputboxview} >
        <Text style={Styles.inputtext}>PIR Date</Text>
        <Text style={Styles.input}  >{item.PIRDate} </Text>
          </View> 

          <View style={Styles.inputboxview} >
        <Text style={Styles.inputtext}>PIR Time</Text>
        <Text style={Styles.input}  >{item.PIRTime} </Text>
          </View> 

          <View style={Styles.inputboxview} >
        <Text style={Styles.inputtext}>PIR Appropirate Authority</Text>
        <Text style={Styles.input}  >{item.PIRAppAuth} </Text>
          </View> 

          <View style={Styles.inputboxview} >
          <TouchableOpacity style={Styles.buttonsubmit} onPress={() => editfun(item)  }>
        <Text style={{	backgroundColor:'#cc8800',padding:5,color:'white',
		borderColor: 'white',width:'100%',textAlign:'center'}} >Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.buttonsubmit} onPress={() => actionPer(item.PirId)}>
        <Text style={{	backgroundColor:'red',padding:5,color:'white',
		borderColor: 'white',width:'100%',textAlign:'center'}}>Delete</Text>
        </TouchableOpacity>
          </View> 

       </View>
      )
}