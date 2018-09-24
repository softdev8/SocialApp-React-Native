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
export default class News extends Component{
    constructor(props) {

        super(props);

        this.state = {

                dataSource: new ListView.DataSource({

                rowHasChanged: (row1, row2) => row1 !== row2

                })

        };

    }
   componentWillMount() {

        this.dataRef = firebase.database().ref('news');
        this.dataRef.on('value', function(snapshot){
             var messages = [];
                snapshot.forEach(function(aa){
                     //alert(aa.val());
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

    renderRow(rowData, sectionID, rowID) {
       // console.log(this.state.dataSource);
    return (

        <TouchableOpacity underlayColor='#dddddd' onPress={()=>this.goto(rowData)}>

            <View>
                <Image source={require('./image/listback.png')} style={{flex:1,flexDirection:'row',alignSelf:'center',marginBottom:30,justifyContent:'space-around',alignItems:'center'}}>
                <Text style={{fontSize:30,textAlign:'center',margin:10}}>{rowData._key}</Text>
                 </Image>
            </View>
        </TouchableOpacity>
        )

    }

    render() {

        return (

            <View >
            <Image source={require('./image/signback.png')}>
             <NavigationBar title={'News'}
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
          name:'Newscate',
          passProps:{
              subject:x._key,
              dec:x._val
          }
      }  )
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
