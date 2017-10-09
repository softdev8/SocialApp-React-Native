import React, { Component } from 'react'
//import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import {
    AppRegistry,
   View,
   Text,
   Image,
   TextInput,
   TouchableOpacity,
   ToastAndroid,
   ScrollView
} from 'react-native';
import firebase from 'firebase';
import RadioButton from 'react-native-radio-button';
import NavigationBar from 'react-native-navigation-bar';
export default class Update extends Component{
    constructor(props){
        super(props)
       // var _envi={flag:'asd'}
        this.state = {
            email: "",
            password: "",
            response:'',
            username:'',
            Country:'',
            PhoneNumber:'',
            Sex:'',
            Job:'',
            City:'',
            state1:false,
            state2:false
        };
       
    }
       async signup(){
           
                if(this.state.email!=='')
                    firebase.auth().currentUser.updateEmail(this.state.email);
                 if(this.state.password!=='')
                    firebase.auth().currentUser.updatePassword(this.state.password)                                             
                 var userId=firebase.auth().currentUser.uid
                 if(this.state.username!=='')
                     firebase.database().ref('users/' + userId).update({
                        username: this.state.username,
                        // mobile: this.state.PhoneNumber,
                        // country: this.state.Country,
                        // sex:this.state.Sex,
                        // city:this.state.City
                        });
                if(this.state.PhoneNumber!=='')
                firebase.database().ref('users/' + userId).update({                        
                        mobile: this.state.PhoneNumber,
                        // country: this.state.Country,
                        // sex:this.state.Sex,
                        // city:this.state.City
                        });
                if(this.state.Country!=='')     
                 firebase.database().ref('users/' + userId).update({  
                        country: this.state.Country,
                        // sex:this.state.Sex,
                        // city:this.state.City
                        });
                if(this.state.Sex!=='')     
                 firebase.database().ref('users/' + userId).update({                         
                        sex:this.state.Sex,
                        // city:this.state.City
                        });
                if(this.state.City!=='')
                 firebase.database().ref('users/' + userId).update({
                        city:this.state.City
                        });
                 ToastAndroid.show('Your profile updated', ToastAndroid.SHORT)  
                 this.setState({email: "",
                            password: "",                           
                            username:'',
                            Country:'',
                            PhoneNumber:'',
                            Sex:'',
                            Job:'',
                            City:'',
                             state1:false,
                             state2:false})   
       }
       
    render(){
               
        return(
             <ScrollView>
            <Image source={require('./image/signback.png')} style={{flex:1,flexDirection:'column',
                                justifyContent:'space-around',    alignItems:'center'}}> 
               <NavigationBar title={'Profile Update'}
                    height={44}
                    titleColor={'#fff'}
                    backgroundColor={'#d07b79'}
                    leftButtonIcon={require('./image/back.png')}
                    rightButtonIcon={require('./image/mainbutton.png')}
                    onLeftButtonPress={()=>this.left()}
                    onRightButtonPress={()=>this.right()}
                    />
                               
                <Image source={require('./image/bar.png')} style={{marginBottom:10,marginTop:60}}>
                    <TextInput placeholder='Username' placeholderTextColor='#867687' style={{fontSize:20,height:50,width:200 ,marginLeft:30,color:'#fff'}} underlineColorAndroid='transparent'
                        onChangeText={(text)=>this.setState({username:text})}   value={this.state.username}      />
                </Image>
                <Image source={require('./image/bar.png')} style={{marginBottom:10,}}>
                    <TextInput placeholder='Email' placeholderTextColor='#867687' style={{fontSize:20,height:50,width:200 ,marginLeft:30,color:'#fff'}} underlineColorAndroid='transparent'
                      onChangeText={(text) => this.setState({email: text})}
                      value={this.state.email}
                         />
                </Image>
                <Image source={require('./image/bar1.png')} style={{marginBottom:10,}}>
                    <TextInput placeholder='Pass' placeholderTextColor='#867687' style={{fontSize:20,height:50,width:200 ,marginLeft:30,color:'#fff'}} underlineColorAndroid='transparent'
                     onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}   secureTextEntry={true}         />
                </Image>
                <Image source={require('./image/bar.png')} style={{marginBottom:10,}}>
                    <TextInput placeholder='Phone Number' placeholderTextColor='#867687' style={{fontSize:20,height:50,width:200 ,marginLeft:30,color:'#fff'}} underlineColorAndroid='transparent'
                       onChangeText={(number)=>this.setState({PhoneNumber:number})}   value={this.state.PhoneNumber}         />
                </Image>
                <Image source={require('./image/bar.png')} style={{marginBottom:10,}}>
                    <TextInput placeholder='Country' placeholderTextColor='#867687' style={{fontSize:20,height:50,width:200 ,marginLeft:30,color:'#fff'}} underlineColorAndroid='transparent'
                        onChangeText={(text)=>this.setState({Country:text})}   value={this.state.Country}        />
                </Image>
                <Image source={require('./image/bar.png')} style={{marginBottom:10,}}>
                    <TextInput placeholder='City' placeholderTextColor='#867687' style={{fontSize:20,height:50,width:200 ,marginLeft:30,color:'#fff'}} underlineColorAndroid='transparent'
                        onChangeText={(text)=>this.setState({City:text})}   value={this.state.City}        />
                </Image>
                <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                <Text style={{color:'#fff'}}>Male:</Text>
              <RadioButton
                animation={'bounceIn'}
                isSelected={this.state.state1}
                onPress={() => this.male()}
                />
                 <Text style={{color:'#fff',marginLeft:30}}>Female:</Text>
                <RadioButton
                animation={'bounceIn'}
                isSelected={this.state.state2}
                onPress={() => this.female()}
                />
               </View>
                <TouchableOpacity style={{width:250,height:50,marginBottom:10}} onPress={()=>this.signup()}>
                                <Image source={require('./image/register.png')} style={{}}/>
                                
                </TouchableOpacity>
                
            </Image>
            </ScrollView>
        );
    }
   left(){
       this.props.navigator.push({
           name:'Profile'
       })
   }
   right(){
       this.props.navigator.push({
           name:'Home'
       })
   }

   
    
}
//module.exports = Signup;