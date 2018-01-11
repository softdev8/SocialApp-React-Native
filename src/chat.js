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
   constructor(props){
      super(props)
      this.state = {
      }
   }
    render(){
        return(
            <Image source={require('./image/signback.png')}>
            <NavigationBar title={'Chat'}
                    height={44}
                    titleColor={'#fff'}
                    backgroundColor={'#d07b79'}
                    leftButtonIcon={require('./image/back.png')}
                    rightButtonIcon={require('./image/mainbutton.png')}
                    onLeftButtonPress={()=>this.left()}
                    onRightButtonPress={()=>this.right()}
                    />
            <View style={{flex:1,flexDirection:'column',justifyContent:'flex-start',alignItems:'center'}}>
                
                <TouchableOpacity onPress={()=>this.group()} style={{marginTop:80}}>
                <Image source={require('./image/listback.png')} style={{alignSelf:'center',marginBottom:30}}>
                <Text style={{fontFamily:'Open Sans',color:'#fff',fontSize:20,alignSelf:'center',marginTop:5}}>Group</Text>
                </Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.people()}>
                <Image source={require('./image/listback.png')} style={{alignSelf:'center',marginBottom:30}}>
                <Text style={{fontFamily:'Open Sans',fontSize:20,color:'#fff',alignSelf:'center',marginTop:5}}>All chat</Text>
                </Image>
                </TouchableOpacity>
            </View>
            </Image>
        );
    }
    group(){
       // alert('group')
        this.props.navigator.push({
          name:'Chatgroup',
      })
    }
    people(){
       // alert('people')
        this.props.navigator.push({
          name:'Chatall',
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

