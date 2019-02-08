import React, { Component } from 'react';
import { View } from 'react-native';
import { Header } from './components/common'
import LoginForm from './components/LoginForm'
import firebase from '@firebase/app'

class App extends Component{
  
  componentWillMount(){
    firebase.initializeApp({
      apiKey: "AIzaSyB2BZ6qXQogzHuQLnToPtlZBqJjWe2AjOg",
      authDomain: "auth-b81ba.firebaseapp.com",
      databaseURL: "https://auth-b81ba.firebaseio.com",
      projectId: "auth-b81ba",
      storageBucket: "auth-b81ba.appspot.com",
      messagingSenderId: "341049403833"
    })
  }

  render(){
    return(
      <View>
        <Header headerText="Authentication" />
        <LoginForm />
      </View>
    );
  }
}

export default App;