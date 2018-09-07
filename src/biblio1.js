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
export default class Biblio1 extends Component{
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
                 job;
             };
     }
      componentDidMount() {      
          var job=this.props.job
        var s
        var data=firebase.database().ref('users/');
        var uid=firebase.auth().currentUser.uid;
                 var aaa=data.on('value',function(snap){
                  s=snap.child(uid+'/sex').val()                
               
                })      
      
        data.on('value', function(snapshot){
             var messages = [];             
                snapshot.forEach(function(aa){                     
                    if(s==aa.child('sex').val() && aa.key!==uid && job==aa.child('job').val()  )  {            
                    messages.push({
                        _key:aa.child('username').val(),
                        _val:aa.val()
                    });}
                })
                this.setState({con:messages._key})
             this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(messages)
            });

        }.bind(this));
    }
    renderRow(rowData, sectionID, rowID) {
       return (
         <TouchableOpacity underlayColor='#dddddd' onPress={()=>this.goto(rowData)}>
            <View>
            <Image source={require('./image/listback.png')} style={{flex:1,flexDirection:'row',alignSelf:'center',marginBottom:30,justifyContent:'space-around',alignItems:'center'}}>
                <Text style={{fontSize:20,textAlign:'center',margin:5}}>{rowData._key}</Text> 
                <Image source={{uri:'https://firebasestorage.googleapis.com/v0/b/socialapp-e5e09.appspot.com/o/chat.png?alt=media&token=8f34adaa-b1e9-4d30-b185-d31324ac76da'}} style={{width:35,height:36, borderRadius: 20,}}/>             
               </Image>

            </View>
        </TouchableOpacity>
        )
    }
    renderList(){
       return (
            <View>
            <Image source={require('./image/listback.png')} style={{flex:1,flexDirection:'row',alignSelf:'center',marginBottom:30,justifyContent:'space-around',alignItems:'center'}}>
                <Text style={{fontSize:20,textAlign:'center',margin:5}}>{rowData._key}</Text> 
                <Image source={{uri:'https://firebasestorage.googleapis.com/v0/b/socialapp-e5e09.appspot.com/o/chat.png?alt=media&token=8f34adaa-b1e9-4d30-b185-d31324ac76da'}} style={{width:35,height:36, borderRadius: 20,}}/>             
               </Image>

            </View>
        )
    }
    render() {
        return (
            <View >
            <Image source={require('./image/signback.png')}>
             <NavigationBar title={this.props.job}
                    height={44}
                    titleColor={'#fff'}
                    backgroundColor={'#d07b79'}
                    leftButtonIcon={require('./image/back.png')}
                    rightButtonIcon={require('./image/mainbutton.png')}
                    onLeftButtonPress={()=>this.left()}
                    onRightButtonPress={()=>this.right()}
                    />
            <ListView 
             style={{marginTop:65,}}
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}
               // renderHeader={()=><Text style={{textAlign:'center',fontSize:50,backgroundColor:'green'}}>News</Text>}
                automaticallyAdjustContentInsets={false} 
               enableEmptySections={true}
            />
            </Image>
            </View>
        );
    }
     goto(x){
       //console.log(x._val)
        this.props.navigator.push({
          name:'Bibliodetail',
            passProps:{
                user:x._key,
                dec:x._val
            }
        })
    }
    left(){
         this.props.navigator.push({
             name:'Biblio'
         })
    }
    right(){
        this.props.navigator.push({
             name:'Home'
         })
    }
}
