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
   TouchableHighlight
  
} from 'react-native'
import firebase from 'firebase';
import NavigationBar from 'react-native-navigation-bar';
const SleekLoadingIndicator = require('react-native-sleek-loading-indicator');
export default class About extends Component{
    constructor(props) {

        super(props);

        this.state = {
                loading:false,
                dataSource: new ListView.DataSource({

                rowHasChanged: (row1, row2) => row1 !== row2

                })

        };

    }

    componentWillMount() {
        this.setState({loading:true})
       
        this.dataRef = firebase.database().ref('about');
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
                    loading:false,
                    dataSource: this.state.dataSource.cloneWithRows(messages.reverse())

            });
           // loaderHandler.hideLoader();
        }.bind(this));

    }

    renderRow(rowData, sectionID, rowID) {

       // console.log(this.state.dataSource);

    return (

        <TouchableOpacity underlayColor='#dddddd' onPress={()=>this.goto(rowData)}>

            <View>
                <Image source={require('./image/listback.png')} style={{alignSelf:'center',marginBottom:30}}>
                <Text style={{fontSize:20,textAlign:'center',color:'#fff',alignItems:'center',marginTop:5}}>{rowData._key}</Text>
                 </Image>
               

            </View>

        </TouchableOpacity>

        )

    }

    render() {
            if (this.state.loading) {
      return (<Image source={require('./image/signback.png')}>
             <NavigationBar title={'About'}
                    height={44}
                    titleColor={'#fff'}
                    backgroundColor={'#d07b79'}
                    leftButtonIcon={require('./image/back.png')}
                    rightButtonIcon={require('./image/mainbutton.png')}
                    onLeftButtonPress={()=>this.left()}
                    onRightButtonPress={()=>this.right()}
                    />
          <SleekLoadingIndicator loading={this.state.loading} />
          </Image>
          );
   } else {
     //.... Do my stuff
   
        return (

            <View >
            <Image source={require('./image/signback.png')}>
             <NavigationBar title={'About'}
                    height={44}
                    titleColor={'#fff'}
                    backgroundColor={'#d07b79'}
                    leftButtonIcon={require('./image/back.png')}
                    rightButtonIcon={require('./image/mainbutton.png')}
                    onLeftButtonPress={()=>this.left()}
                    onRightButtonPress={()=>this.right()}
                    />
                    
            <ListView 
                style={{marginTop:50,}}
                dataSource={this.state.dataSource}

                renderRow={this.renderRow.bind(this)}
               // renderHeader={()=><Text style={{textAlign:'center',fontSize:50,backgroundColor:'green'}}>About</Text>}
                automaticallyAdjustContentInsets={false} 
               // renderSeparator={(sectionID,rowID)=><View key={rowID} style={{height:1,backgroundColor:'lightgray'}}/>}
                />
               
                </Image>
            </View>

        );
        }
    }
    goto(x){
        //alert(x._val);
        this.props.navigator.push({
            name:'Aboutdetail',
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