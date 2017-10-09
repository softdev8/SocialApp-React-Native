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
} from 'react-native';
import firebase from 'firebase';
import NavigationBar from 'react-native-navigation-bar';
export default class Filecategory extends Component{
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
                 category
             };
     }
     componentWillMount() {
        // alert(this.props.content)
        this.dataRef = firebase.database().ref('file/'+this.props.category);
        this.dataRef.on('value', function(snapshot){
             var messages = [];
                snapshot.forEach(function(aa){
                     //alert(aa.val())
                    messages.push({
                        _key:aa.key,
                        _val:aa.val()
                    });
                })

             this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(messages)
            });

        }.bind(this));
    }
    render(){
        
        return(
                <View >
            <Image source={require('./image/signback.png')}>
             <NavigationBar title={this.props.category}
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
            </View>
            );
}
renderRow(rowData, sectionID, rowID) {

       // console.log(this.state.dataSource);

    return (

        <TouchableOpacity underlayColor='#dddddd' onPress={()=>this.goto(rowData)}>
             <View>
            <Image source={require('./image/listback.png')} style={{flex:1,flexDirection:'row',alignSelf:'center',marginBottom:30,justifyContent:'space-around',alignItems:'center'}}>
                <Text style={{fontSize:20,textAlign:'center',margin:5}}>{rowData._key}</Text> 
                <Image source={{uri:rowData._val.imgurl}} style={{width:35,height:36, borderRadius: 20,}}/>             
               </Image>

            </View>
        </TouchableOpacity>

        )

    }
    goto(x){
        //alert(x._val);
        this.props.navigator.push({
          name:'Videodetail',
                passProps:{
                    subject:x._key,
                    dec:x._val
                }
        })
    }
    left(){
         this.props.navigator.push({
             name:'File'
         })
    }
    right(){
        this.props.navigator.push({
             name:'Home'
         })
    }
}
