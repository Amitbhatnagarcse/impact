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
            < View style = {{flex: 0.3,height: 50,justifyContent:'space-around',alignItems:'center'}} />

        </View>
      );
}
export default TabFive;