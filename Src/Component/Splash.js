import React ,{Component} from 'react'
import {StyleSheet,Text,View,ImageBackground} from 'react-native'
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

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
      
    },
    image: {
        width: '100%',
        height:'100%',
     
    resizeMode: 'stretch', // or 'stretch',
    justifyContent: 'center',
      },
    title:{
        fontWeight:'bold',
        fontSize:18
    }
})  