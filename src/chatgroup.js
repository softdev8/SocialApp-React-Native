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
  // Switch
   
} from 'react-native'
import { Switch } from 'react-native-switch';
import firebase from 'firebase'
import NavigationBar from 'react-native-navigation-bar';
const SleekLoadingIndicator = require('react-native-sleek-loading-indicator');
export default class Chatgroup extends Component{
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
        //var uid=firebase.auth().currentUser.uid;
       this.setState({loading:true});
         var dataRef = firebase.database().ref('group');         
         dataRef.on("value",function(snapshot) { 
          var messages=[];
          snapshot.forEach(function(child){
                 messages.push({                       
                        _val:child.val()
                    });
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
                        <TextInput style={{width:290,backgroundColor:'#fff',height:35,alignSelf:'center',marginTop:20}}  underlineColorAndroid='transparent'/>
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
                            <Text style={{fontSize:30,color:'#000'}}>{rowData._val}</Text>
                            <Text>sdfffffffffffffff</Text>
                            </View>
                            </TouchableOpacity>
                            <Image source={require('./image/3.png')} style={{width:50,height:50,borderRadius:30,marginRight:10}}/>         

                        </View>
           

                    )
                
    }
     goto(x){
        this.props.navigator.push({
          name:'Chatdetail',
                passProps:{
                    dec:x._val
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


