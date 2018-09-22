import React, { Component } from 'react';
import { I18nManager,  AppRegistry,  StyleSheet,  Text,  View,  TextInput,  Image,  TouchableOpacity,  TouchableHightlight,  Navigator,  Switch
} from 'react-native';
import firebase from 'firebase';
import NavigationBar from 'react-native-navigation-bar';

export default class Home extends Component {
    constructor(){
    super()
    }
    render(){
        return(
            
            <Image source={require('./image/signback.png')}>
             <NavigationBar title={'Home'}
                    height={44}
                    titleColor={'#fff'}
                    backgroundColor={'#d07b79'}
                   // leftButtonIcon={require('./image/back.png')}
                    leftButtonTitle={'Logout'}
                    leftButtonTitleColor={'#fff'}
                    //rightButtonIcon={require('./image/mainbutton.png')}
                    rightButtonTitle={'Profile'}
                    rightButtonTitleColor={'#fff'}
                    onLeftButtonPress={()=>this.left()}
                    onRightButtonPress={()=>this.right()}
                    />
            <View style={{flex:1,flexDirection:'column',justifyContent:'space-around',    alignItems:'center',marginTop:50}}>
           
                <TouchableOpacity style={{width:270,height:50,}} onPress={()=>this._toabout()}>
                    <Image source={require('./image/about.png')} style={{}} />                                
                </TouchableOpacity>
                <TouchableOpacity style={{width:270,height:50,}} onPress={()=>this._tobiblio()}>
                    <Image source={require('./image/biblio.png')} style={{}}/>                                
                </TouchableOpacity>
                <TouchableOpacity style={{width:270,height:50,}} onPress={()=>this._tonews()}>
                    <Image source={require('./image/news.png')} style={{}}/>                                
                </TouchableOpacity>
                <TouchableOpacity style={{width:270,height:50,}} onPress={()=>this._totree()}>
                    <Image source={require('./image/tree.png')} style={{}}/>                                
                </TouchableOpacity>
                <TouchableOpacity style={{width:270,height:50,}} onPress={()=>this._tochat()}>
                    <Image source={require('./image/chat.png')} style={{}}/>                                
                </TouchableOpacity>
                <TouchableOpacity style={{width:270,height:50,}} onPress={()=>this._tomap()}>
                    <Image source={require('./image/map.png')} style={{}}/>                                
                </TouchableOpacity>
                <TouchableOpacity style={{width:270,height:50,}} onPress={()=>this._tovideo()}>
                    <Image source={require('./image/video.png')} style={{}}/>                                
                </TouchableOpacity>
                 <TouchableOpacity style={{width:270,height:50,}} onPress={()=>this._contact()}>
                    <Image source={require('./image/contact.png')} style={{}}/>                                
                </TouchableOpacity>
                 <TouchableOpacity style={{width:270,height:50,}} onPress={()=>this._tofile()}>
                    <Image source={require('./image/file.png')} style={{}}/>                                
                </TouchableOpacity>
                
            </View>
            </Image>
        );
    }
    _toabout(){
        this.props.navigator.push({
          name:'About',
      })
    }
    _tobiblio(){
        this.props.navigator.push({
          name:'Biblio',
      })
    }
    _tochat(){
        this.props.navigator.push({
          name:'Chat',
      })
    }
    _tomap(){
        this.props.navigator.push({
          name:'Map',
      })
    }
    _tonews(){
        this.props.navigator.push({
          name:'News',
      })
    }
    _totree(){
        this.props.navigator.push({
          name:'Tree',
      })
    }
    _tovideo(){
        this.props.navigator.push({
          name:'Video',
      })
    }
    _tofile(){
        this.props.navigator.push({
          name:'File',
      })
    }
    _contact(){
        this.props.navigator.push({
          name:'Contactus',
      })
    }
     left(){
         firebase.auth().signOut().then(()=>{
              this.props.navigator.push({
             name:'Login'
         })
      })  
    }
    right(){
        this.props.navigator.push({
             name:'Profile'
         })
    }
    home(){
        this.props.navigator.push({
             name:'Home'
         })
    }
}

