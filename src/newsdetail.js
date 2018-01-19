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
export default class Newsdetail extends Component{
    
     static get defaultProps() {
          return 
          {sub;
          cont;
        };
     }
    render(){
            return(
                
                <Image source={require('./image/signback.png')} style={{flex:1,flexDirection:'column',justifyContent:'space-around',    alignItems:'center'}}>
                <NavigationBar title={'News detail'}
                    height={44}
                    titleColor={'#fff'}
                    backgroundColor={'#d07b79'}
                    leftButtonIcon={require('./image/back.png')}
                    rightButtonIcon={require('./image/mainbutton.png')}
                    onLeftButtonPress={()=>this.left()}
                    onRightButtonPress={()=>this.right()}
                    />
                    <Image source={require('./image/listback.png')} style={{marginTop:65,}}>
                    <Text style={{fontSize:20,textAlign:'center',fontWeight:'bold'}}>{this.props.sub}</Text>
                    </Image>
                    <Image source={require('./image/3.png')} style={{width:270,height:100,alignSelf:'center',marginBottom:30,marginTop:30}}/>
                    <Image source={require('./image/detail.png')}>
                    <ScrollView>
                    <Text style={{margin:10}}> {this.props.cont}</Text> 
                    </ScrollView>     
                    </Image>       
                    </Image>       
                
            );
    }
    left(){
         this.props.navigator.push({
             name:'News',
             passProps:{dec:this.props.content.job}
         })
    }
    right(){
        this.props.navigator.push({
             name:'Home'
         })
    }
}
