import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';

export default RadioButton = ({ text, selectedConncetor, onSelectedValue }) => {

    return (
        <>
            {selectedConncetor == text &&

                <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', marginBottom: 20 }}>

                    <View style={{

                        width: 22,
                        height: 22,
                        borderRadius: 22 / 2,
                        borderWidth: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>

                        <View
                            style={{ width: 12, height: 12, borderRadius: 12 / 2, backgroundColor: '#326933' }}
                        >

                        </View>

                    </View>
                    <Text style={{ marginLeft: 5 }}>{text}</Text>
                </View>
            }

            {selectedConncetor != text &&
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => onSelectedValue(text)}
                >
                    <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', marginBottom: 20 }}>

                        <View style={{

                            width: 22,
                            height: 22,
                            borderRadius: 22 / 2,
                            borderWidth: 1,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>



                        </View>


                        <Text style={{ marginLeft: 5 }}>{text}</Text>
                    </View>
                </TouchableOpacity>
            }


        </>

    );
}