/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import React ,{Component} from 'react'
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import Stack from './Src/app/NewStack';

import Splash from './Src/Component/Splash';
import { Provider } from 'react-redux';
import { store } from './Src/Store'

class Main extends Component{
    constructor(props){
        super(props);
        this.state = {currentScreen: 'Splash'};
        setTimeout(()=>{
            this.setState({currentScreen:'App'})
        },3000)
    }
    render(){
       
        const{currentScreen} =this.state
        let mainScreen = currentScreen==='Splash' ?  <Splash/>: <Stack/>
        return  <Provider store={store}>
       {mainScreen}
      </Provider>
    }
}

AppRegistry.registerComponent(appName, () => Main
);