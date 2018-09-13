import React, { Component } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, ToastAndroid, ScrollView } from 'react-native'
import NavigationBar from 'react-native-navigation-bar';
import Video from 'react-native-video'
export default class Videodetail extends Component{
    constructor() {
    super();

    this.state = {
      video: { width: 400, height: 400, duration: 30 },
      thumbnailUrl: '',
      videoUrl: '',
    };
}
static get defaultProps() {
   return {
      category;
      content;
      };
}
     
render(){
            return(
                
                <Image source={require('./image/signback.png')} style={{flex:1,flexDirection:'column',justifyContent:'space-around',    alignItems:'center'}}>
                <NavigationBar title={'Video detail'}
                    height={44}
                    titleColor={'#fff'}
                    backgroundColor={'#d07b79'}
                    leftButtonIcon={require('./image/back.png')}
                    rightButtonIcon={require('./image/mainbutton.png')}
                    onLeftButtonPress={()=>this.left()}
                    onRightButtonPress={()=>this.right()}
                    />
                    
                   <Video ref={videoPlayer => this.videoPlayer = videoPlayer}
                        // onEnd={this.onVideoEnd.bind(this)}
                        // onLoad={this.onVideoLoad.bind(this)}
                        // onProgress={this.onProgress.bind(this)}
                        source={{uri:this.props.content.url}}
                         rate={1.0}                   // 0 is paused, 1 is normal.
                        volume={1.0}                 // 0 is muted, 1 is normal.
                        muted={false}                // Mutes the audio entirely.
                        paused={false}                        
                        resizeMode="contain"
                        style={{width:300,height:200,marginTop:30,}}
                        />
                        
                    <Image source={require('./image/listback.png')} style={{}}>
                  <Text style={{fontSize:20,textAlign:'center',marginTop:5}}>{this.props.category}</Text>
                    </Image>
                  <Image source={require('./image/detail.png')} style={{height:200}}>
                  <Text >{this.props.content.dec}</Text>
                  </Image>
                           </Image>
                
            );
    }
    left(){
         this.props.navigator.push({
             name:'Video',
             passProps:{dec:this.props.content.job}
         })
    }
    right(){
        this.props.navigator.push({
             name:'Home'
         })
    }
   top(){
      this.props.navigator.push({
             name:'Chat'
         })
   }
}
