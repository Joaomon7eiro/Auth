import React, { Component } from 'react'
import { Text } from 'react-native'
import { Button, Card, CardSection, Input, Spinner } from './common'
import firebase from '@firebase/app';
require('firebase/auth');


class LoginForm extends Component{
  state = {
    email : '',
    password: '',
    error: '',
    loading: false
  };

  onButtonPress(){
    const { email, password } = this.state;

    this.setState({error: '', loading: true})
      
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(this.onLogInSuccess.bind(this))
    .catch(() => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(this.onLogInSuccess.bind(this))
      .catch(this.onLogInFail.bind(this)); 
    });
  }

  onLogInFail(){
    this.setState({
      error: 'Authentication Failed.',
      loading: false
    })
  }

  onLogInSuccess(){
    this.setState({ 
      email: '',
      password: '',
      loading: false,
      error: ''
    });
  }

  renderButton(){
    if (this.state.loading){
      return <Spinner size="small"/>
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Log in
      </Button>
    )
  }

  render(){
    return(
      <Card>
        <CardSection>
          <Input 
            placeholder="user@gmail.com"
            label="Email"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />  
        </CardSection>

        <CardSection>
          <Input 
            secureTextEntry
            placeholder="password"
            label="Password"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />  
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle:{
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
}

export default LoginForm;