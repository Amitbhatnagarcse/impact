import React ,{Component} from 'react'
import {StyleSheet,Text,View,ImageBackground,Dimensions} from 'react-native'
import {BASE_URL,Gradientcolourbluew,Gradientcolouryellow,BlueColor} from '../../Constants'

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
            <View style={styles.container}>
            <ImageBackground   source={splash} style={styles.image} ></ImageBackground>
          </View>
        )
    }
}
const window = Dimensions.get('window');
const styles = StyleSheet.create({
    container:{
        backgroundColor:Gradientcolourbluew,
        width:window.width,
        height:window.height,
        justifyContent:'center',
        alignItems: 'center',
      
    },
    image: {
        width:window.width-3,
        flex:1,
     
    resizeMode: "contain", // or 'stretch',
    justifyContent: 'center',
      },
    title:{
        fontWeight:'bold',
        fontSize:18
    }
})  