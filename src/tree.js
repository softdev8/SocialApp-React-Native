import React, { Component } from 'react'
import {
   View,
   Text,
   Image,
   TextInput,
   TouchableOpacity,
   ToastAndroid,
   ListView
} from 'react-native'
import firebase from 'firebase';
import NavigationBar from 'react-native-navigation-bar';
export default class Tree extends Component{
    constructor(props) {
        super(props);
        this.state = {
                dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
                })
        };
    }
     componentDidMount() {        
         var dataRef = firebase.database().ref('tree');         
         dataRef.on("value",function(snapshot) { 
          var messages=[];
          snapshot.forEach(function(child){              
                 messages.push({                       
                        _key:child.key,
                        _val:child.val()
                    });
          })
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
                </Image>
                </View>
            </TouchableOpacity>

        )
    }
    render(){
        return(
           <Image source={require('./image/signback.png')} style={{flex:1,flexDirection:'column',justifyContent:'space-around',    alignItems:'center'}}>
             <NavigationBar title={'Tree'}
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
                        automaticallyAdjustContentInsets={false} 
                        enableEmptySections={true}
            />
          </Image>
        );
    }
     goto(x){
        //alert(x._val);
        this.props.navigator.push({
            name:'Treecategory',
                passProps:{
                    subject:x._key,
                    dec:x._val
                }
        })
    }
     left(){
         this.props.navigator.push({
             name:'Home'
         })
    }
    right(){
        this.props.navigator.push({
             name:'Home'
         })
    }
}
