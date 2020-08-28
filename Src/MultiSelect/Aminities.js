import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';

export default Aminities = ({ text ,onPressAminities }) => {
    const [isAccessTypeSelected, setAccessType] = useState(false);
    //const isAccessTypeSelected=true
    // // Similar to componentDidMount and componentDidUpdate:
    // useEffect(() => {
    //     // Update the document title using the browser API
    //     // document.title = `You clicked ${count} times`;
    // });
    const increase = (type) => {

        setAccessType(!isAccessTypeSelected);
        onPressAminities(type,text)
        console.log(isAccessTypeSelected);

    }
    return (
        <>
            {isAccessTypeSelected && (
                <>
                    <TouchableOpacity
                        onPress={() => increase("unselected")}
                    >
                        <View style={{
                            backgroundColor: '#479847', padding: 8, justifyContent: 'space-between',
                            marginRight: 7, marginBottom: 8,
                            borderRadius: 19, flexDirection: 'row', alignItems: 'center'
                        }}>
                            <View
                                style={{ width: 24, height: 24, borderRadius: 24 / 2, backgroundColor: '#326933', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <Image

                                    source={
                                        require('../../../assets/images/verified.png')
                                    }
                                    style={{ width: 9, height: 9 }}
                                />
                            </View>
                            <Text style={{ justifyContent: 'flex-start', marginLeft: 5, color: '#fff' }}>{text}</Text></View>
                    </TouchableOpacity>
                </>

            )
            }
            <>
                {!isAccessTypeSelected && (
                    <TouchableOpacity
                        onPress={() => increase("selected")}
                    >
                        <View style={{
                            backgroundColor: '#dce1dc', padding: 12, marginRight: 11, justifyContent: 'space-between',
                            marginBottom: 8,
                            borderRadius: 19,
                        }}><Text style={{ justifyContent: 'flex-start', marginLeft: 5 }}>{text}</Text></View>
                    </TouchableOpacity>
                )}
            </>
        </>
    );
}