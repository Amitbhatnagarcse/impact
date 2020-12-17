import React ,{Component} from 'react'
import {StyleSheet,Text,View,Image,Dimensions,SafeAreaView} from 'react-native'
import {Gradientcolourbluew,Gradientcolouryellow,BlueColor} from '../../Constants'

import splash from '../../assets/img/splash.jpg'
export default class Splash extends Component{
    constructor(props){
        super(props)
      
        setInterval(()=>{
            this.state = ({timer:this.state+1})
        },3000)
    }
    render(){

        return(
       
            <SafeAreaView style= {styles.container}>
            <Image   
            source={splash} style={styles.image} ></Image>
        </SafeAreaView>
        )
    }
}
const window = Dimensions.get('window');
const styles = StyleSheet.create({

    container: {
        backgroundColor:Gradientcolourbluew,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      
      },
    image: {
        width:window.width,
        flex:1,
        resizeMode: "contain", // or 'stretch',
        justifyContent: 'center',
      }
})  