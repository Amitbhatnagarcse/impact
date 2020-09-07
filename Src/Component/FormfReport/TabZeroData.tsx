import React from "react"

import { View, Text ,Image ,TouchableOpacity ,SafeAreaView,FlatList} from 'react-native';
import Styles from './style';
import Item from "../PirList/Item";

const TabZeroData = ( {item,navigation} ) => {

    return (
        // Try setting `flexDirection` to `column`.
        <View style={Styles.containertabwhite}>
            <Text style={Styles.tabtitledata}>{item.DistrictName}</Text>
            <View style={Styles.line} />

            <View style={Styles.containertabwhite}>
    <Text style={Styles.tabtitledata}>{item.TotalCenter}</Text>
            <View style={Styles.line} />
    <Text style={Styles.tabtitledata}>{item.CenterEnterFormF}</Text>
            </View>
            <View style={Styles.line} />
    <Text style={Styles.tabtitledata}>{item.FormFCount}</Text>
        </View>
      );
}
export default TabZeroData;