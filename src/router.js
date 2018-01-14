import React, { Component } from 'react'

import {
    I18nManager,
   StyleSheet,
   Text,
   Navigator,
   TouchableOpacity
} from 'react-native'


import Signup from './signup'
import Login from './login'
import Forget from './forget'
import Home from './home'
import About from './about'
import Biblio from './biblio'
import News from './news'
import Tree from './tree'
import Chat from './chat'
import Map from './map'
import Video from './video'
import Aboutdetail from './aboutdetail'
import Newscate from './newscate'
import Newsdetail from './newsdetail'
import Chatgroup from './chatgroup'
import Chatdetail from './chatdetail'
import Namemap from './namemap'
import Mapview from './mapview'
import Biblio1 from './biblio1'
import Bibliodetail from './bibliodetail'
import Treecategory from './treecategory'
import Treecategorysub from './treecategorysub'
import Videocategory from './videocategory'
import Videodetail from './videodetail'
import File from './file'
import Filecategory from './filecategory'
import Profile from './profile'
import Imageupload from './imageupload'
import Update from './update'
import Chatall from './chatall'
import Chateach from './chateach'
import Contactus from './contactus'
export default class Router extends Component {
   
   constructor(props){
    super(props)    
  }
   
   render() {
      return (
         <Navigator
            initialRoute={{name:'Login'}}
            renderScene = { this.renderScene }
         />
      );
   }
   renderScene(route, navigator) {
       if(route.name == 'Chateach') {
            return (
                <Chateach navigator = {navigator} 
                     id={route.passProps.id}
                />
            
            )
      }
       if(route.name == 'Update') {
            return (
                <Update navigator = {navigator} 
                     
                />
            )
      }
        if(route.name == 'Imageupload') {
            return (
                <Imageupload navigator = {navigator} 
                     
                />
            
            )
      }
       if(route.name == 'Profile') {
            return (
                <Profile navigator = {navigator} 
                     
                />
            
            )
      }
       if(route.name == 'Filecategory') {

            return (
                <Filecategory navigator = {navigator} 
                     category={route.passProps.subject} content={route.passProps.dec}
                />
            
            )
      }
        if(route.name == 'Videodetail') {

            return (
                <Videodetail navigator = {navigator} 
                     category={route.passProps.subject} content={route.passProps.dec}
                />
            
            )
      }
        if(route.name == 'Videocategory') {

            return (
                <Videocategory navigator = {navigator} 
                     category={route.passProps.subject} content={route.passProps.dec}
                />
            
            )
      }
       if(route.name == 'Treecategorysub') {

            return (
                <Treecategorysub navigator = {navigator} 
                     category={route.passProps.subject} content={route.passProps.dec}
                />
            
            )
      }
       if(route.name == 'Treecategory') {

            return (
                <Treecategory navigator = {navigator} 
                     category={route.passProps.subject} content={route.passProps.dec}
                />
            
            )
      }
       if(route.name == 'Bibliodetail') {

            return (
                <Bibliodetail navigator = {navigator} 
                     user={route.passProps.user} content={route.passProps.dec}
                />
            
            )
      }
       if(route.name == 'Biblio1') {

            return (
                <Biblio1 navigator = {navigator} 
                     job={route.passProps.dec}
                />
            
            )
      }
        if(route.name == 'Mapview') {

            return (
                <Mapview navigator = {navigator} 
                    content={route.passProps.content} user={route.passProps.user}
                />
            
            )
      }
       if(route.name == 'Namemap') {
         return (
            <Namemap navigator = {navigator}/>
         )
      }
       if(route.name == 'Chatdetail') {

            return (
                <Chatdetail navigator = {navigator} 
                    content={route.passProps.dec}
                />
            
            )
      }
      if(route.name == 'File') {

            return (
                <File navigator = {navigator} 
                   
                />
            
            )
      }
       if(route.name == 'Newsdetail') {
           //console.log('----------------->'+route.passProps.subject)
            return (
                <Newsdetail navigator = {navigator} cont={route.passProps.dec}
                    sub={route.passProps.subject}
                />
            
            )
      }
        if(route.name == 'Newscate') {

            return (
                <Newscate navigator = {navigator} 
                    content={route.passProps.subject}
                />
            
            )
      }
       if(route.name == 'Aboutdetail') {

          
         return (
            <Aboutdetail navigator = {navigator} title={route.passProps.subject}
                content={route.passProps.dec}
            />
            
         )
      }
       if(route.name == 'Home') {
         return (
            <Home navigator = {navigator}/>
         )
      }
      if(route.name == 'Sign') {
         return (
            <Signup navigator = {navigator}/>
         )
      }
      if(route.name == 'Login') {
         return (
            <Login
               navigator = {navigator}
               />
         )
      }
      if(route.name == 'Forget'){
          return(
              <Forget navigator={navigator}/>
          )
      }
      if(route.name == 'About'){
          return(
              <About navigator={navigator}/>
          )
      }
      if(route.name == 'Biblio'){
          return(
              <Biblio navigator={navigator}/>
          )
      }
      if(route.name == 'News'){
          return(
              <News navigator={navigator}/>
          )
      }
      if(route.name == 'Tree'){
          return(
              <Tree navigator={navigator}/>
          )
      }
      if(route.name == 'Chat'){
          return(
              <Chat navigator={navigator}/>
          )
      }
      if(route.name == 'Map'){
          return(
              <Map navigator={navigator}/>
          )
      }
      if(route.name == 'Video'){
          return(
              <Video navigator={navigator}/>
          )
      }
      if(route.name == 'Chatgroup'){
          return(
              <Chatgroup navigator={navigator}
             />
          )
      }
      if(route.name == 'Chatall'){
          return(
              <Chatall navigator={navigator}/>
          )
      }
      if(route.name == 'Contactus'){
          return(
              <Contactus navigator={navigator}/>
          )
      }
   }
}
