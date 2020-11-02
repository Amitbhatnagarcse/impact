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
import file_upload from '../../../assets/img/file_download.png';
import RNFetchBlob from 'rn-fetch-blob'
import OrientationLoadingOverlay from "react-native-orientation-loading-overlay";
import { BASE_URL, BlueColor, Gradientcolourbluew, Gradientcolouryellow, Yellowcolour  } from '../../../Constants';
import RadioForm from 'react-native-simple-radio-button';

var current_number = 0;

export default function Item( { item  , index ,navigation ,role, actiondel} )
{

  const [loading , setloading] = useState(false)


  const radio_props = [
    {label: 'Suggestion', value: 'S' },
    {label: 'Query', value: 'Q' }
  ];

  
  
    return (
      <View style = {{margin:5 ,borderRadius: 5, shadowColor: '#cc8800', borderColor:'#e1e1e1' ,elevation : 5,backgroundColor: 'rgba(52, 52, 52, 0.4)'}}>
       <OrientationLoadingOverlay visible={loading}>
          <View>
            <Image
              source={require("../../../assets/img/loadlogo.gif")}
              style={{ width: 80, height: 80 }}
            />
           
          </View>
        </OrientationLoadingOverlay>

          <TouchableOpacity style={Styles.inputboxviewplain} >
            <View style = {Styles.inputboxview}>
        <Text 
        onPress={() => navigation.navigate('UserProfile', {item : item.CID , CenterName : item.CenterName})}
        style={Styles.inputtext}  > { item.CenterName} </Text>
          <Text 
        onPress={() => navigation.navigate('UserProfile', {item : item.CID , CenterName : item.CenterName})}
        style={Styles.inputblue}  > {item.Flag == 2 ? 'F' : 'NF' } </Text>
          </View>
          </TouchableOpacity> 

       </View>
      )
}