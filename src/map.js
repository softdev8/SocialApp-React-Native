import React, { Component } from 'react'
import {
   View,
   Text,
   Image,
   TextInput,
   TouchableOpacity,
   ToastAndroid
} from 'react-native'
import firebase from 'firebase';
import NavigationBar from 'react-native-navigation-bar';
export default class Map extends Component{
    render(){
        return(
            
            <Image source={require('./image/signback.png')} style={{flex:1,flexDirection:'column',alignItems:'center'}}>
                <NavigationBar title={''}
                 height={44}
                titleColor={'#fff'}
                 backgroundColor={'#d07b79'}
                leftButtonIcon={require('./image/back.png')}
                rightButtonIcon={require('./image/mainbutton.png')}
                 onLeftButtonPress={()=>this.left()}
                onRightButtonPress={()=>this.right()}
                />
               <Text style={{fontSize:45,color:'#fff',marginTop:60}}>People Map</Text>
               <TouchableOpacity onPress={()=>this.namemap()}>
               <Image source={require('./image/button1.png')} style={{marginTop:70}} />
               </TouchableOpacity>
               <TouchableOpacity>
               <Image source={require('./image/button2.png')} style={{marginTop:40}}/>
               </TouchableOpacity>
            </Image>
        );
    }
    namemap(){
        this.props.navigator.push({
             name:'Namemap'
         })
    }
    left(){
         this.props.navigator.push({
             name:'Home'
         })
    }
    right(){
        this.props.navigator.push({
             name:'Home'
         })
    }
}