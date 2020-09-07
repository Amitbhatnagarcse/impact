import React from "react"

import { View, Text ,Image ,TouchableOpacity ,SafeAreaView,FlatList} from 'react-native';
import Styles from './style';

const TabFive = ( {navigation} ) => {

    return (
        // Try setting `flexDirection` to `column`.
        <View style={Styles.containertab}>
            <Text style={Styles.tabtitle}>FormF ID </Text>
            <View style={Styles.line} />
            <Text style={Styles.tabtitle}>Name</Text>
          
        </View>
      );
}
export default TabFive;