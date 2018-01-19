import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';

import { Header, Button, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = {
    loggedIn: null
  }

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCHw-PicsiygpAMmIUwlZqd_XxNG8LGzsU',
      authDomain: 'auth-3bd68.firebaseapp.com',
      databaseURL: 'https://auth-3bd68.firebaseio.com',
      projectId: 'auth-3bd68',
      storageBucket: 'auth-3bd68.appspot.com',
      messagingSenderId: '378191049988'
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
         this.setState(() => ({ loggedIn: true }));
      } else {
        this.setState(() => ({ loggedIn: false }));
      }
    });
  }

  renderContent = () => {
    switch (this.state.loggedIn) {
      case true:
      return (
        <CardSection>
          <Button onPress={() => firebase.auth().signOut()}>
            Log Out
          </Button>
        </CardSection>
      );
      case false:
        return <LoginForm />;
      default:
        return <CardSection><Spinner size="large" /></CardSection>;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;

