/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    I18nManager,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableHightlight,
  Navigator,
  Switch,
  ToastAndroid
} from 'react-native';
import firebase from 'firebase';

export default class Login extends Component {
    constructor(){
        super()
        
         this.state={isRTL:I18nManager.isRTL}
    I18nManager.forceRTL(this.state.isRTL)
        this.state = {
            email: "",
            password: "",            
        };
    }

    async login(){      
        firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
                        .then((data) => {
                            //alert(firebaseApp.auth().currentUser.uid)
                               
                                ToastAndroid.show('Login successed', ToastAndroid.SHORT)
                                 this.props.navigator.push({
                                    name:"Home"
                                 })
                        })
                        .catch((error) => {
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            if (this.props.onLoginError) {
                                this.props.onLoginError(error.code, error.message)
                            }
                            alert(errorMessage);
                        });
                    this.setState({
                        email: '',
                        password: ''
                    });    
    }
  render() {
                return (  
                                       
                
                <Image source={require('./image/3.png')} >    
                        <View style={{flex:1,flexDirection:'column',
                                justifyContent:'flex-end',    alignItems:'center'}}>
                                
                            <Image source={require('./image/mark.png')} style={{marginBottom:180,}}/>
                            
                            <Image source={require('./image/bar.png')} style={{marginBottom:20,}}>
                                <TextInput style={{height:50,width:180 ,marginLeft:40,color:'#fff',}} underlineColorAndroid='transparent'
                                onChangeText={(text) => this.setState({email: text})}
                                value={this.state.email}/>
                            </Image>
                            <Image source={require('./image/bar1.png')} style={{marginBottom:20,}}>
                                <TextInput style={{height:50,width:180 ,marginLeft:40,color:'#fff'}}    secureTextEntry={true} underlineColorAndroid='transparent' 
                                onChangeText={(text) => this.setState({password: text})}
                                value={this.state.password}/>
                            </Image>
                            <TouchableOpacity style={{width:250,height:50,marginBottom:10}} onPress={()=>this.login()}>
                                <Image source={require('./image/button.png')} style={{}}/>
                                
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection:'row',     justifyContent:'space-between',
                            alignItems:'flex-end',marginBottom:60,marginLeft:70   }}>
                            <TouchableOpacity onPress={()=>this.Moveto()}>
                                <Text style={{color:'#fff'}}>Sign in</Text>
                            
                            </TouchableOpacity>
                            <TouchableOpacity  onPress={()=>this.forget()}>
                                <Text style={{color:'#fff',marginRight:70}}>Forget Password</Text>
                            </TouchableOpacity>
                        </View >
                        
                    
                </Image>
                );
  }
  Moveto(){     
      this.props.navigator.push({
          name:'Sign',
      }  )
        
         
     
  }
  forget(){
      this.props.navigator.push({
          name:'Forget'
      })
  }
 
}
var styles = StyleSheet.create({
 
    // For the container View
    parent: {
        padding: 10,
        
    },
 
    // For the Text label
    germanLabel: {
        marginTop: 0,
        fontWeight: 'bold'
    },
 
    // For the Text meaning
    germanWord: {
        marginTop: 15,
        fontSize: 30,
        fontStyle: 'italic'
    }
});


// AppRegistry.registerComponent('MY_sample', () => MY_sample);
