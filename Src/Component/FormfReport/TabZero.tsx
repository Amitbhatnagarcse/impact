import React from "react"

import { View, Text ,Image ,TouchableOpacity ,SafeAreaView,FlatList} from 'react-native';
import Styles from './style';

const TabZero = ( {navigation} ) => {

    return (
        // Try setting `flexDirection` to `column`.
        <View style={Styles.containertab}>
            <Text style={Styles.tabtitle}>District Name</Text>
            <View style={Styles.line} />
            <Text style={Styles.tabtitle}>Total Center Count</Text>
            <View style={Styles.line} />
            <Text style={Styles.tabtitle}>FormF Count</Text>
        </View>
      );
}
export default TabZero;