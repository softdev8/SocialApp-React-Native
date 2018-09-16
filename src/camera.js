import React, { Component } from 'react';
import {
   Text,
   View,
   StyleSheet
} from 'react-native';
import Camera from 'react-native-camera'

// Camra option
export default Camera = (props) => {
   constructor(props){
      super(props);
      console.log("Camera Open Checking...");
   }
   return (
      <View style = {styles.container}>
         <Camera
            ref = {(cam) => {
               this.camera = cam; 
            }}
            style = {styles.preview}
            aspect = {Camera.constants.Aspect.fill}>
            <Text
               style = {styles.capture}
               onPress = {props.takePicture}>
               CAPTURE
            </Text>
         </Camera>
         <Text style = {styles.text}>
            {props.imagePath}
         </Text>
      </View>
   );
}

const styles = StyleSheet.create ({
   container: {
      flex: 1
   },
   preview: {
      height: 400,
      justifyContent: 'flex-end',
      alignItems: 'center',
   },
   capture: {
      flex: 0,
      backgroundColor: '#fff',
      borderRadius: 5,
      color: '#000',
      padding: 10,
      margin: 40
   },
   text: {
      fontWeight: 'bold',
   }
});
