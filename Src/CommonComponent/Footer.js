import React from 'react'

import {
  Image,
} from "react-native";

import footer_img from '../../assets/img/footer.jpg';

export default function Footer() {
  return (
    <Image style={{
      width: '100%',
      height: 50,
      resizeMode: 'stretch', // or 'stretch',
      justifyContent: 'center',
    }}
      source={footer_img}
    />
  )
}