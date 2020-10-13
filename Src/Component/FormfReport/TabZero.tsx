import React from "react"

import { View, Text ,Image ,TouchableOpacity ,SafeAreaView,FlatList} from 'react-native';
import Styles from './style';

const TabZero = ( {navigation} ) => {

    return (
        // Try setting `flexDirection` to `column`.
        <View style={Styles.containertabcolumn}>
        <View style={Styles.containertab}>
            <Text style={Styles.tabtitle}>District Name</Text>
            <View style={Styles.line} />
            <Text style={Styles.tabtitle}> Center </Text>
            <View style={Styles.line} />
            <Text style={Styles.tabtitle}>FormF </Text>
        </View>
          <View style={Styles.containertab}>
          <Text style={Styles.tabtitle}></Text>
          <View style={Styles.line} />
          <Text style={Styles.tabtitlehlaf}> Total </Text>
          <View style={Styles.line} />
          <Text style={Styles.tabtitlehlaf}>Entry</Text>
          <View style={Styles.line} />
          <Text style={Styles.tabtitle}></Text>
      </View>
      </View>
        
      );
}
export default TabZero;