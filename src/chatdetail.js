import React, { Component } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, ToastAndroid, ScrollView, ListView, Platform } from 'react-native'
import firebase from 'firebase';
import NavigationBar from 'react-native-navigation-bar'; 
import ImagePicker from 'react-native-image-picker'
import RNFetchBlob1 from 'react-native-fetch-blob'
const storage = firebase.storage()
const Blob = RNFetchBlob1.polyfill.Blob
const fs = RNFetchBlob1.fs
window.XMLHttpRequest = RNFetchBlob1.polyfill.XMLHttpRequest
window.Blob = Blob
const uploadImage = (uri, mime = 'application/octet-stream') => {
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
    const uid=firebase.auth().currentUser.uid
    const sessionId = new Date().getTime()
    let uploadBlob = null
    const imageRef = storage.ref('avatar1/'+uid).child(`${sessionId}`)

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

export default class Chatdetail extends Component{
    constructor(props) {
        super(props);
        this.state = {
                loading:false,
                dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
                }),
                me:'',
                message:'',
                name:'',
                date:new Date()
                
        };
    }
     static get defaultProps() {
          return 
          {
          content;
        };
     }
     componentWillMount() {
         var _sex;
          var user;
         var content=this.props.content;
         var uid=firebase.auth().currentUser.uid;
         this.setState({me:uid})     
        this.dataRef = firebase.database().ref('users/');
        this.dataRef.on('value',function(child){
            _sex=child.child(uid+'/sex').val();
            })
        var data=firebase.database().ref('message')
        data.on('value', function(snapshot){
             var messages = [];
                snapshot.forEach(function(aa){
                     if((_sex==aa.child('sex').val() && content==aa.child('job').val()) || uid==aa.child('uid').val()){
                    messages.push({
                        _key:aa.key,
                        _val:aa.val()
                    });
                     }
                })
             this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(messages.reverse())
            });

        }.bind(this));
    }
     render(){
        
        return(
                <View style={{flexDirection:'column',justifyContent:'space-between'}} >
                    <Image source={require('./image/signback.png')}>
                        <NavigationBar title={"Chat"}
                                height={44}
                                titleColor={'#fff'}
                                backgroundColor={'#d07b79'}
                                leftButtonIcon={require('./image/back.png')}
                                rightButtonIcon={require('./image/mainbutton.png')}
                                onLeftButtonPress={()=>this.left()}
                                onRightButtonPress={()=>this.right()}
                        />
                        <Text style={{alignSelf:'center',color:'#fff',fontSize:30,marginTop:55}}>{this.props.content}</Text>
                        <View >
                        <View style={{marginTop:10,flex:0,flexDirection:'row',justifyContent:'space-around'}}>
                            <TouchableOpacity>
                            <Image source={require('./image/chatgroupbutt.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                             <Image source={require('./image/allchatbutt.png')}/>
                             </TouchableOpacity>
                             <TouchableOpacity>
                              <Image source={require('./image/searchbutt.png')}/>
                              </TouchableOpacity>
                        </View>
                        </View>
                        <View style={{flex:6}}>
                        <ScrollView style={{marginTop:15}}>
                            <ListView 
                           // style={{marginTop:65,}}
                                dataSource={this.state.dataSource}
                                renderRow={this.renderRow.bind(this)}
                            // renderHeader={()=><Text style={{textAlign:'center',fontSize:50,backgroundColor:'green'}}>News</Text>}
                                automaticallyAdjustContentInsets={false} 
                            enableEmptySections={true}
                            />
                        </ScrollView>
                        </View>
                        <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',alignSelf:'center',marginTop:30}}>
                            <TouchableOpacity onPress={()=>this.sendmessage()}>
                                <Image source={require('./image/sendbutt.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.avatar()}>
                            <Image source={require('./image/capture.png')} style={{width:40,height:40,marginLeft:40}}/>
                            </TouchableOpacity>
                                <TextInput style={{height:40,width:220 ,color:'#000',backgroundColor:'#fff',borderRadius:5}} underlineColorAndroid='transparent'
                                onChangeText={(text) => this.setState({message: text})} value={this.state.message}/>
                        </View>
                        
                    </Image>
            </View>
            );
}
renderRow(rowData, sectionID, rowID) {

      if(rowData._val.uid!==this.state.me){

    return (
          <View style={{ flexDirection:'row', alignItems:'flex-end', margin:5 }}>         
          <View style={{ width:150, borderRadius:10, backgroundColor:'#f4f4f4', padding:2,paddingRight:5}}>
          <Text style={{fontSize:13,color:'#000',fontWeight:'600',alignSelf:'flex-end'}}>{rowData._val.name}</Text>
          <Text style={{ fontSize:10, color:'#555', fontWeight:'100',alignSelf:'flex-end' }}>{rowData._val.message}</Text>
          <Image source={{uri:rowData._val.url}} style={{width:150,height:70,borderRadius:10}}/>
          </View>
          
          </View> 
        )
      }else{
          
          return(
          <View style={{ flexDirection:'row', alignSelf:'flex-end', alignItems:'flex-end', margin:5 }}>
            <View style={{ width:160, borderRadius:10, backgroundColor:'#00b499', padding:2,paddingRight:5 }}>
            <Text style={{fontSize:13,color:'#fff',fontWeight:'600',alignSelf:'flex-end'}}>{rowData._val.name}</Text>
              <Text style={{ fontSize:10, color:'#fff', fontWeight:'100',alignSelf:'flex-end' }}>{rowData._val.message}</Text>
               <Image source={{uri:rowData._val.url}} style={{width:150,height:70,borderRadius:10}}/>
            </View>
           
                    </View>
          )
      }
    }
    sendmessage(){
        var user;
        var sex;      
        var job
        var uid=firebase.auth().currentUser.uid;
        var data1=firebase.database().ref('users/'+uid);
        data1.on('value',function(child){
            user=child.child('username').val();
            sex=child.child('sex').val();
            job=child.child('job').val()            
        })
        var data=firebase.database().ref('message');
        data
        data.push({
            message:this.state.message,
            date:new Date().toString(),
            name:user,
            sex:sex,
            job:job,
            uid:uid,            
        })
        this.setState({message:''})
    }
      avatar(){
                
            ImagePicker.showImagePicker({}, response  => { 
                    
                uploadImage(response.uri)
                .then((url) => {                           
                        var user;
                        var sex;       
                        var uid=firebase.auth().currentUser.uid;
                        var data1=firebase.database().ref('users/'+uid);
                        data1.on('value',function(child){
                            user=child.child('username').val();
                            sex=child.child('sex').val();                     
                        })
                        var data=firebase.database().ref('message');
                    
                        data.push({
                            url:url,
                            date:new Date().toString(),
                            name:user,
                            sex:sex,           
                            uid:uid,
                            job:this.props.content,
                            
                        })
                })
                .catch(error => console.log(error))
                
        })

    }
    left(){
       this.props.navigator.push({
           name:'Chatgroup'
       })
   }
   right(){
       this.props.navigator.push({
           name:'Home'
       })
   }
}
