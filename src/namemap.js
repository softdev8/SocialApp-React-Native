import React, { Component } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, ToastAndroid, ListView } from 'react-native'
import firebase from 'firebase';
import NavigationBar from 'react-native-navigation-bar';
import SearchBar from 'react-native-material-design-searchbar';
export default class Namemap extends Component{
       
        constructor(){
            super()
             this.state = {
                data:[],
                 searchText:'',
             colorFalseSwitchIsOn:true,
                dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
                })

             };
        }   


        componentDidMount() {      
            var s
            var data=firebase.database().ref('users/');
            var uid=firebase.auth().currentUser.uid;
                 var aaa=data.on('value',function(snap){
                  s=snap.child(uid+'/sex').val()
           })      
      
        data.on('value', function(snapshot){
             var messages = [];             
                snapshot.forEach(function(aa){  
                    //alert(aa.child('sex').val()) 
                    if(s==aa.child('sex').val() && aa.key!==uid && aa.child('username').val() )  {            
                    messages.push({
                        _key:aa.child('username').val(),
                        //_val:aa.val()
                    });}
                })
                this.setState({con:messages._key})
             this.setState({
                    data:messages,
                    dataSource: this.state.dataSource.cloneWithRows(messages)
            });

        }.bind(this));
    }
    setSearchText(event){
     let searchText = event.nativeEvent.text;
        this.setState({searchText});
     alert(searchText)
    }
        filterNotes(searchText, notes) {
  let text = searchText.toLowerCase();

  return filter(notes, (n) => {
    let note = n.body.toLowerCase();
    return note.search(text) !== -1;
  });
}
        render(){
            return(
                <Image source={require('./image/signback.png')} style={{flex:1,flexDirection:'column',alignItems:'center'}}>
                    <NavigationBar title={'Search by name'}
                    height={44}
                    titleColor={'#fff'}
                    backgroundColor={'#d07b79'}
                    leftButtonIcon={require('./image/back.png')}
                    rightButtonIcon={require('./image/mainbutton.png')}
                    onLeftButtonPress={()=>this.left()}
                    onRightButtonPress={()=>this.right()}
                    />
                    <Image source={require('./image/search.png')} style={{marginTop:100}}>
                    <TextInput placeholder={'Search...'} style={{marginLeft:50,color:'#fff'}} underlineColorAndroid='transparent'
                    value={this.state.searchText}
                    onChange={this.setSearchText.bind(this)}
                    />
                    </Image>
                    <Image source={require('./image/detail.png')} style={{marginTop:20,}}>
                    <ListView 
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}                      
                        automaticallyAdjustContentInsets={false}                        
                        enableEmptySections={true}
                    />
                    </Image>
                </Image>
            );
        }
        renderRow(rowData, sectionID, rowID) {     

    return (

        <TouchableOpacity underlayColor='#dddddd' onPress={()=>this.goto(rowData)}>
            <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                <Text style={{fontSize:30,textAlign:'center',margin:10}}>{rowData._key}</Text>
                 <Image source={require('./image/3.png')} style={{width:40,height:40,marginRight:10}}/>         

            </View>
        </TouchableOpacity>

        )

    }
        left(){
         this.props.navigator.push({
             name:'Map'
         })
    }
    right(){
        this.props.navigator.push({
             name:'Home'
         })
    }
    goto(x){
        this.props.navigator.push({
            name:'Mapview',
            passProps:{user:x._key,content:x._val}
        })
    }
}
