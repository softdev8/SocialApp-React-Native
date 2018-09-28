
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
   TouchableHighlight,
   Platform,
   StyleSheet
} from 'react-native'
import firebase from 'firebase';
import NavigationBar from 'react-native-navigation-bar';
const SleekLoadingIndicator = require('react-native-sleek-loading-indicator');
import ImagePicker from 'react-native-image-picker'
import RNFetchBlob from 'react-native-fetch-blob'
const storage = firebase.storage()
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob
const uploadImage = (uri, mime = 'application/octet-stream') => {
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
    const uid=firebase.auth().currentUser.uid
    const sessionId = new Date().getTime()
    let uploadBlob = null
    const imageRef = storage.ref('images/'+uid).child(`${sessionId}`)

    fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        resolve(url)
      })
      .catch((error) => {
        reject(error)
    })
  })
}
export default class Imageupload extends Component{
  
  constructor(props) {
    super(props);
    this.state = { };
  }     

   render() {
     return (
       <View style={{flex:9,flexDirection:'column',
         justifyContent:'space-around',    alignItems:'center'}}>
         <Image source={require('./image/signback.png')} >
         <NavigationBar title={'About'}
           height={44}
           titleColor={'#fff'}
           backgroundColor={'#d07b79'}
           leftButtonIcon={require('./image/back.png')}
           rightButtonIcon={require('./image/mainbutton.png')}
           onLeftButtonPress={()=>this.left()}
           onRightButtonPress={()=>this.right()}
         />
         <View style={{marginTop:80}}>
           <TouchableOpacity onPress={()=>this.imageup()}>   
             <Image source={require('./image/imageup.png')} style={{alignSelf:'center'}}/>
           </TouchableOpacity>
         </View>
         <Text style={{fontSize:15,color:'#fff',alignSelf:'center',marginTop:30}}>Upload or Take your image</Text>
         <Image source={require('./image/skip.png')} style={{alignSelf:'center',marginTop:70}}/>           
         </Image>
       </View>
    );
  }
  imageup(){
    this.setState({ uploadURL: '' })
    ImagePicker.showImagePicker({}, response  => {      
      uploadImage(response.uri)
        .then((url) => {
          uid=firebase.auth().currentUser.uid
          firebase.database().ref('users/'+uid).update({
            url:url
          });
          alert('Image upload success!')
          this.props.navigator.push({
            name:'Profile'
        })     
      })
      .catch(error => console.log(error))
    })
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  image: {
    height: 200,
    resizeMode: 'contain',
  },
  upload: {
    textAlign: 'center',
    color: '#333333',
    padding: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: 'gray'
  },
})
