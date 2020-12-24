import { ro } from 'date-fns/locale';
import React, { useEffect, useReducer, useState } from 'react'

import {
  View,
  Text,
  Image,
  TouchableOpacity, 
  TextInput,
  Modal
 
} from "react-native";  
import Styles from './style';


export default function Item( { item  , index ,navigation ,role, actiondel} )
{
  
  
    return (
      <View style = {{margin:5 ,borderRadius: 5, shadowColor: '#cc8800', borderColor:'#e1e1e1' ,elevation : 5,backgroundColor: 'rgba(52, 52, 52, 0.4)'}}>

          <TouchableOpacity style={Styles.inputboxviewplain} >
            <View style = {Styles.inputboxview}>
        <Text 
        onPress={() => navigation.navigate('PirList', {item : item.DID , distname : item.DNameEnglish, year_my : role})}
        style={Styles.inputtext}  > { item.DNameEnglish} </Text>
          <Text 
        onPress={() => navigation.navigate('PirList', {item : item.DID , distname : item.DNameEnglish,year_my : role })}
        style={Styles.inputblue}  > {item.PiCount} </Text>
          </View>
          </TouchableOpacity> 

       </View>
      )
}