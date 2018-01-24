import React, { Component } from 'react'
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
import NavigationBar from 'react-native-navigation-bar';
const sessionId = new Date().getTime()
export default class Signup extends Component{    
   // static username;
    constructor(props){        
        super(props)
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
            state2:false,
            _url:''
        };       
    } 
       componentWillMount() {
        var uid=firebase.auth().currentUser.uid
           var name,mobile,email,City,_url;
        var data=firebase.database().ref('users/'+uid);
        data.on('value',function(snapshot){
            name=snapshot.child('username').val();
             mobile=snapshot.child('mobile').val();
             email=firebase.auth().currentUser.email;
            City=snapshot.child('city').val();
            _url=snapshot.child('url').val();
     
           this.setState({
               username:name,
               _url:_url,
               PhoneNumber:mobile,
               City:City,
               email:email
           })
          
        }.bind(this));
               
    }
    render(){
         
        return(            
             <ScrollView>             
            <Image source={require('./image/signback.png')} style={{flex:4,flexDirection:'column',
                                justifyContent:'space-around',    alignItems:'center'}}> 
                    <NavigationBar title={'Profile'}
                    height={44}
                    titleColor={'#fff'}
                    backgroundColor={'#d07b79'}
                    leftButtonIcon={require('./image/back.png')}
                    rightButtonIcon={require('./image/mainbutton.png')}
                    onLeftButtonPress={()=>this.left()}
                    onRightButtonPress={()=>this.right()}
                    />
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={()=>this.avatar()}>
                         <Image source={this.state._url ? {uri:this.state._url  } : require('./image/default.png')} style={{marginTop:55,width:140,height:90,marginRight:50,marginLeft:60}}/>      
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.update()}>
                         <Image source={require('./image/edit.png')} style={{marginTop:60,}}/>
                    </TouchableOpacity>         
               </View>
                <Image source={require('./image/listback.png')} style={{marginBottom:10,}}>
                    <Text style={{fontSize:20,color:'#fff',textAlign:'center',paddingTop:5}}>{this.state.username}</Text>
                </Image>
                <Image source={require('./image/listback.png')} style={{marginBottom:10,}}>
                    <Text style={{fontSize:20,color:'#fff',textAlign:'center',paddingTop:5}}>{this.state.email}</Text>
                </Image>
                <Image source={require('./image/listback.png')} style={{marginBottom:10,}}>
                    <Text style={{fontSize:20,color:'#fff',textAlign:'center',paddingTop:5}}>{this.state.PhoneNumber}</Text>
                </Image>
                <Image source={require('./image/listback.png')} style={{marginBottom:10,}}>
                    <Text style={{fontSize:20,color:'#fff',textAlign:'center',paddingTop:5}}>{this.state.City}</Text>
                </Image>
                <Image source={require('./image/listback.png')} style={{marginBottom:10,}}>
                    <Text style={{fontSize:20,color:'#fff',textAlign:'center',paddingTop:5}}>Chat Now</Text>
                </Image>
                <Image source={require('./image/listback.png')} style={{marginBottom:10,}}>
                        <Text style={{fontSize:20,color:'#fff',textAlign:'center',paddingTop:5}}>My location</Text>
                </Image>
                
                
            </Image>
            </ScrollView>
        );
    }
   avatar(){
       
       this.props.navigator.push({
           name:'Imageupload'
       })
   }
   update(){
       this.props.navigator.push({
           name:'Update'
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
   Top(){
       this.props.navigator.push({
           name:'Chat'
       })
   }
}
//module.exports = Signup;
