import React, { Component } from 'react'
import {
   View,
   Text,
   Image,
   TextInput,
   TouchableOpacity,
   ToastAndroid
} from 'react-native'
import firebase from 'firebase'
export default class Forget extends Component{
    constructor(){
        super()
        this.state={
            email:''
        }
    }
    async sendemail(){
        firebase.auth().sendPasswordResetEmail(this.state.email).then((data) => {
                            //alert(firebaseApp.auth().currentUser.uid)
                               
                                ToastAndroid.show('Check your Email!', ToastAndroid.SHORT)
                                 this.props.navigator.push({
                                    name:"Login"
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
                        
                    });   
    }

    render(){
        return(
        <Image source={require('./image/signback.png')} style={{flex:1,flexDirection:'column',
                                justifyContent:'flex-end',    alignItems:'center'}}>
                <Image source={require('./image/logo2.png')} style={{marginBottom:150,}}/>
                <Image source={require('./image/bar.png')} style={{marginBottom:50,}}>
                    <TextInput placeholder='Email' placeholderTextColor='#867687' style={{fontSize:20,height:50,width:200 ,marginLeft:40,color:'#fff'}} underlineColorAndroid='transparent'
                        onChangeText={(text) => this.setState({email: text})} value={this.state.email}         />
                </Image>
                <TouchableOpacity style={{width:250,height:50,marginBottom:80}} onPress={()=>this.sendemail()}>
                                <Image source={require('./image/forget.png')} style={{}}/>
                                
                </TouchableOpacity>
        </Image>
        );
    }
}
