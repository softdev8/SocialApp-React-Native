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
export default class Chat extends Component{
  render(){
    return(
      <Image source={require('./image/signback.png')} style={{flex:1,flexDirection:'column',justifyContent:'space-around'}}>
        <NavigationBar title={'Chat'}
          height={44}
          titleColor={'#fff'}
          backgroundColor={'#d07b79'}
          leftButtonIcon={require('./image/back.png')}
          rightButtonIcon={require('./image/mainbutton.png')}
          onLeftButtonPress={()=>this.left()}
          onRightButtonPress={()=>this.right()}
       />
       <Text style={{textAlign:'center',textAlignVertical:'center',fontSize:35,color:'#fff',alignSelf:'center'}}>My Social App</Text>
     </Image>
   );
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
