import React, { Component } from 'react'
import {
   View,
   Text,
   Image,
   TextInput,
   TouchableOpacity,
   ToastAndroid,
   ScrollView
} from 'react-native'
import NavigationBar from 'react-native-navigation-bar';
export default class Aboutdetail extends Component{
    
     static get defaultProps() {
          return 
          { title;
          content;
        };
     }
    render(){
            return(
                <Image source={require('./image/signback.png')} style={{flex:1,justifyContent:'space-around',alignItems:'center',flexDirection:'column'}}>
                <NavigationBar title={'About detail'}
                    height={44}
                    titleColor={'#fff'}
                    backgroundColor={'#d07b79'}
                    leftButtonIcon={require('./image/back.png')}
                    rightButtonIcon={require('./image/mainbutton.png')}
                    onLeftButtonPress={()=>this.left()}
                    onRightButtonPress={()=>this.right()}
                    />
                    <Image source={require('./image/listback.png')} style={{marginTop:50}}>
                    <Text style={{fontSize:20,textAlign:'center',fontWeight:'bold',marginTop:5}}>{this.props.title}</Text>
                    </Image>
                <Image source={require('./image/detail.png')} style={{height:400}}>
                <ScrollView>                
                <Text style={{margin:10}}> {this.props.content}</Text>
                <Image source={require('./image/3.png')} style={{width:270,height:100,alignSelf:'center',marginBottom:30}}/>
                </ScrollView>
                </Image>
                </Image>
            );
    }
    left(){
         this.props.navigator.push({
             name:'About'
         })
    }
    right(){
        this.props.navigator.push({
             name:'Home'
         })
    }
}

