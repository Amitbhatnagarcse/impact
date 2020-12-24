import React from "react"

import { View, Text, Image, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import Styles from './style';

const TabZero = ({ navigation }) => {

    return (
        // Try setting `flexDirection` to `column`.
        <View style={Styles.containertabcolumn}>
            <View style={Styles.containertabwithout}>
                <Text style={Styles.tabtitle}>District Name</Text>
                <View style={Styles.line} />
                <Text style={Styles.tabtitlecenter}> Centre </Text>
                <View style={Styles.line} />
                <Text style={Styles.tabtitle}>FormF </Text>
            </View>
            <View style={Styles.containertabwithout}>
                <Text style={Styles.tabtitle}></Text>
                <Text style={[Styles.tabtitlehlaf, { borderTopWidth: 1, borderEndWidth: 1, borderLeftWidth: 1, borderRightWidth: 1 }]}> Total </Text>
                <Text style={[Styles.tabtitlehlaf, { borderTopWidth: 1, borderEndWidth: 1, borderRightWidth: 1 }]}>Entry</Text>
                <Text style={Styles.tabtitle}></Text>
            </View>
        </View>

    );
}
export default TabZero;