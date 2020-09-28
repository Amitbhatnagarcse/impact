import React from "react"

import { View, Text ,Image ,TouchableOpacity ,SafeAreaView,FlatList} from 'react-native';
import Styles from './style';
import leftarrow from '../../../assets/img/file_download.png';

const TabFiveData = ( {item,navigation} ) => {

    
    return (
        // Try setting `flexDirection` to `column`.
        <View style={Styles.containertabwhite}>
            <Text style={Styles.tabtitledata}>{item.PatientId} </Text>
            <View style={Styles.line} />
    <Text style={Styles.tabtitledata}>{item.PatientName}</Text>
    < View style = {{flex: 0.3,height: 50,justifyContent:'space-around',alignItems:'center'}} >

    <TouchableOpacity  onPress={() =>  navigation.navigate('PDFExample' , {id_pdf : item.PatientId ,back_id : 'FormfReport' })
   }>
    <Image source={leftarrow} style={{ width: 35,
    height: 35,
    alignItems: 'center'}} ></Image>
    </TouchableOpacity>
    </ View>
        </View>
      );
}
export default TabFiveData;