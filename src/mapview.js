import React, { Component } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, ToastAndroid, ScrollView } from 'react-native'
import MapView from 'react-native-maps';
import NavigationBar from 'react-native-navigation-bar';

export default class Mapview extends Component{
    
     static get defaultProps() {
          return 
          {
          content;
          user;
        };
     }
     render(){
         return(
             <Image source={require('./image/signback.png')}>
             <NavigationBar title={'Map view'}
                    height={44}
                    titleColor={'#fff'}
                    backgroundColor={'#d07b79'}
                    leftButtonIcon={require('./image/back.png')}
                    rightButtonIcon={require('./image/mainbutton.png')}
                    onLeftButtonPress={()=>this.left()}
                    onRightButtonPress={()=>this.right()}
                    />
                     <MapView
                     showsUserLocation={true}
                        initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                        }}
                    />
             </Image>
         );         
     }
     left(){
         this.props.navigator.push({
             name:'Namemap'
         })
    }
    right(){
        this.props.navigator.push({
             name:'Home'
         })
    }
}
