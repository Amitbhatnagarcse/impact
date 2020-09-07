import React from "react"

import { View, Text ,Image ,TouchableOpacity ,SafeAreaView,FlatList} from 'react-native';
import Styles from './style';

const TabFiveData = ( {item,navigation} ) => {

    return (
        // Try setting `flexDirection` to `column`.
        <View style={Styles.containertabwhite}>
            <Text style={Styles.tabtitledata}>{item.PatientName} </Text>
            <View style={Styles.line} />
    <Text style={Styles.tabtitledata}>{item.PatientId}</Text>
          
        </View>
      );
}
export default TabFiveData;