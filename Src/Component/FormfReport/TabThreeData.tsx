import React from "react"

import { View, Text ,Image ,TouchableOpacity ,SafeAreaView,FlatList} from 'react-native';
import Styles from './style';

const TabThreeData
 = ( {item , navigation} ) => {

    return (
        // Try setting `flexDirection` to `column`.
        <View style={Styles.containertabwhite}>
          
    <Text style={Styles.tabtitledata}>{item.CenterName}</Text>
            <View style={Styles.line} />
    <Text style={Styles.tabtitledata}>{item.FormFCount}</Text>
        </View>
      );
}
export default TabThreeData