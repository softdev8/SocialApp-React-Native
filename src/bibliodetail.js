import React, { Component } from 'react'
import {
   View,
   Text,
   Image,
   TextInput,
   TouchableOpacity,
   ToastAndroid,
   ScrollView,
   ListView,
   
} from 'react-native'
import firebase from 'firebase';
import NavigationBar from 'react-native-navigation-bar';
export default class Bibliodetail extends Component{
    constructor(props) {
        super(props);
        this.state = {
                dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
                })
        };
    }
    static get defaultProps() {
          return 
            { 
                 user;
                 content
             };
     }
     render(){
         return(
             <Image source={require('./image/signback.png')} style={{flex:1,flexDirection:'column',justifyContent:'space-around',    alignItems:'center'}}>
             <NavigationBar title={'Bibliography detail'}
                    height={44}
                    titleColor={'#fff'}
                    backgroundColor={'#d07b79'}
                    leftButtonIcon={require('./image/back.png')}
                    rightButtonIcon={require('./image/mainbutton.png')}
                    onLeftButtonPress={()=>this.left()}
                    onRightButtonPress={()=>this.right()}
                    />
                    <Image source={require('./image/listback.png')} style={{marginTop:65,}}>
                    <Text style={{textAlign:'center',fontSize:20,marginTop:5}}>{this.props.user}</Text>                    
                    </Image>
                    <Image source={{uri:'https://firebasestorage.googleapis.com/v0/b/socialapp-e5e09.appspot.com/o/Me%20copy.jpg?alt=media&token=0d19f06b-c6db-484a-a868-4ccbe97f75eb'}} style={{width:55,height:55,borderRadius:40}}/>
                    <Image source={require('./image/detail.png')}>
                    <ScrollView>
                    <Text style={{margin:10}}>{this.props.content.text}</Text>
                    </ScrollView>
                    </Image>
             </Image>
         );         
     }
      left(){
         this.props.navigator.push({
             name:'Biblio1',
             passProps:{dec:this.props.content.job}
         })
    }
    right(){
        this.props.navigator.push({
             name:'Home'
         })
    }
}
