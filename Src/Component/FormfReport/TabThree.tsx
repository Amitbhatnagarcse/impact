import React from "react"

import { View, Text ,Image ,TouchableOpacity ,SafeAreaView,FlatList} from 'react-native';
import Styles from './style';

const TabThree
 = ( {navigation} ) => {

    return (
        // Try setting `flexDirection` to `column`.
        <View style={Styles.containertab}>
          
            <Text style={Styles.tabtitle}>Center Name</Text>
            <View style={Styles.line} />
            <Text style={Styles.tabtitlehlaf}>FormF Entered</Text>
        </View>
      );
}
export default TabThree
;