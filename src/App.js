import React, { Component } from 'react';
import { View } from 'react-native';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';
import firebase from '@firebase/app';
require('firebase/auth');

class App extends Component{
  state = {
    loggedIn: null
  }

  componentWillMount(){
    firebase.initializeApp({
      apiKey: "AIzaSyB2BZ6qXQogzHuQLnToPtlZBqJjWe2AjOg",
      authDomain: "auth-b81ba.firebaseapp.com",
      databaseURL: "https://auth-b81ba.firebaseio.com",
      projectId: "auth-b81ba",
      storageBucket: "auth-b81ba.appspot.com",
      messagingSenderId: "341049403833"
    });

    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.setState({loggedIn: true})
      } else {
        this.setState({loggedIn: false})
      }
    });

  }

  renderContent(){
    switch(this.state.loggedIn){
      case true: 
        return (
          <View style={{flexDirection: 'row'}}>
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>
          </View>
        )
        
      case false:
        return <LoginForm />;
      default:
        return <Spinner size='large'/>
    }
  }

  render(){
    return(
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;