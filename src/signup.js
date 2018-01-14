
import React,{Component} from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ListView,
  ToastAndroid,
  Image,
  TextInput
} from 'react-native'
import Selection from 'react-native-selection'
import firebase from 'firebase'
import RadioButton from 'react-native-radio-button'

const firebaseConfig={
  apiKey: "AIzaSyAoOsZTGG7N415oYhnqFpk2Da2E_-1TYVw",
    authDomain: "socialapp-e5e09.firebaseapp.com",
    databaseURL: "https://socialapp-e5e09.firebaseio.com",
    storageBucket: "socialapp-e5e09.appspot.com",
     messagingSenderId: "306902668184"
}
const firebaseApp=firebase.initializeApp(firebaseConfig);

export default class Signup extends Component{

   constructor(props){
        
        super(props)
       // var _envi={flag:'asd'}
        this.state = {
            message:[],
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
            
                 firebaseApp.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
                        .then((data) => {
                            
                                var userId=firebaseApp.auth().currentUser.uid
                                if(this.state.username!==''&&this.state.Country!=='',this.state.Sex!=='',this.state.Job!==''){
                                 firebase.database().ref('users/' + userId).set({
                                username: this.state.username,
                                mobile: this.state.PhoneNumber,
                                country: this.state.Country,
                                sex:this.state.Sex,
                                city:this.state.City,
                                job:this.state.Job
                            });
                                ToastAndroid.show('Created your account', ToastAndroid.SHORT)
                                 this.props.navigator.push({
                                    name:"Login"
                                 })
                                }else{alert('Insert everyfield!!')}
                            
                        })
                        .catch((error) => {
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            if (this.props.onLoginError) {
                                this.props.onLoginError(error.code, error.message)
                            }
                            alert(errorMessage);
                        });
                    
                     
           
       }
        componentWillMount() {            
        firebaseApp.database().ref('group')      
        .on('value', function(snapshot){             
             var messages = [];
                snapshot.forEach(function(aa){
                   console.log(aa.val())
                    messages.push({
                        name:aa.val()
                    });
                     
                })
             this.setState({
                    message:messages
            });

        }.bind(this));
    }
       
    render(){
        
        return(
             <ScrollView>
            <Image source={require('./image/signback.png')} style={{flex:1,flexDirection:'column',
                                justifyContent:'space-around',    alignItems:'center'}}> 
               
                <Text style={{fontSize:50,color:'#fff'}}>Register</Text>                
                <Image source={require('./image/bar.png')} style={{marginBottom:10,}}>
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
                
                  <Image source={require('./image/bar.png')} style={{marginBottom:10,alignItems:'center'}}>
                     <Selection 
                        title="Select your job" 
                        options={this.state.message} 
                        onSelection={(e)=>this.setState({Job:e.name})}
                        style={{
                        body: null,
                        option: null,
                        color:'#fff',
                        fontSize:100,
                        alignItems:'center',
                        
                        }}
                        iconSize={20}
                        iconColor="#fff"
                        titleColor='red'
                    />

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
    male(){
        this.setState({state1:true,Sex:'male',state2:false});

    }
    female(){
        this.setState({state2:true,Sex:'female',state1:false});
        
    }
    
returnDataOnSelection(e){
    alert('ok');
  }
}
//module.exports = Signup;
