import React from 'react';
import { StyleSheet, Text, View, Button, WebView} from 'react-native';
import { StackNavigator } from 'react-navigation';

export class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
  }

  render() {
    return (
      <WebView
        source={{uri: 'https://www.google.com'}}
        onNavigationStateChange={(e) => console.log(e)}
      />
    );
  }
}
