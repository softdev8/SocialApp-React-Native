import React, { Component } from 'react'
import {
   View,
   Text,
   Image,
   TextInput,
   TouchableOpacity,
   ToastAndroid,
   ScrollView,
   ListView   
} from 'react-native'
import { Switch } from 'react-native-switch';
import firebase from 'firebase'
import NavigationBar from 'react-native-navigation-bar';
const SleekLoadingIndicator = require('react-native-sleek-loading-indicator');
export default class Chatall extends Component{
  constructor(props){
    super(props)   
      this.state = {
        loading:false,
        dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };        
  }
  componentWillMount() {
    var uid=firebase.auth().currentUser.uid;
    this.setState({loading:true});
    var dataRef = firebase.database().ref('users');         
    dataRef.on("value",function(snapshot) { 
      var messages=[];
      var _sex=snapshot.child(uid+'/sex').val()
      snapshot.forEach(function(child){
        if(child.child('sex').val()==_sex && uid!==child.key){
          messages.push({                       
            _val:child.val(),
            _key:child.key
          });
        }
      })
      this.setState({
        loading:false,
        dataSource: this.state.dataSource.cloneWithRows(messages)
      });             
    }.bind(this));           
  }
  
   render(){
     if (!this.state.loading) { 
       return(
         <Image source={require('./image/signback.png')}>
         <NavigationBar title={'Chat'}
         height={44}
         titleColor={'#fff'}
         backgroundColor={'#d07b79'}
         leftButtonIcon={require('./image/back.png')}
         rightButtonIcon={require('./image/mainbutton.png')}
         onLeftButtonPress={()=>this.left()}
         onRightButtonPress={()=>this.right()}
       />
       <View >
         <View style={{marginTop:55,flex:0,flexDirection:'row',justifyContent:'space-around'}}>
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
       <ListView 
         style={{marginTop:10,width:300,height:300,backgroundColor:'#fff',alignSelf:'center'}}
         dataSource={this.state.dataSource}
         renderRow={this.renderRow.bind(this)}
         //renderHeader={()=><Text style={{textAlign:'center',fontSize:50,backgroundColor:'green'}}>Groups</Text>}
         automaticallyAdjustContentInsets={false} 
         renderSeparator={(sectionID,rowID)=><View key={rowID} style={{height:1,backgroundColor:'lightgray'}}/>}
         enableEmptySections={true}
       />
     </View>
     </Image>
   ); }else{return(<SleekLoadingIndicator loading={this.state.loading} />)}
  }
  renderRow(rowData, sectionID, rowID) {
    return (       
      <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
        <TouchableOpacity underlayColor='#dddddd' onPress={()=>this.goto(rowData)}>
           <View style={{marginRight:10}}>
             <Text style={{fontSize:20,color:'#000',alignSelf:'flex-end'}}>{rowData._val.username}</Text>
             <Text>sdfffffffffffffff</Text>
           </View>
         </TouchableOpacity>
         <Image source={{uri:rowData._val.url}} style={{width:40,height:40,borderRadius:20,marginRight:10}}/>         
      </View>         
   )                
  }
  goto(x){
  // alert(x._key)
    this.props.navigator.push({
      name:'Chateach',
      passProps:{
        id:x._key
      }
    })
  }
  
  left(){
    this.props.navigator.push({
      name:'Chat'
    })
  }
  
  right(){
    this.props.navigator.push({
      name:'Home'
    })
  }
}
