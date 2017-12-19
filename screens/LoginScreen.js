import React from 'react';
import { StyleSheet, Text, View, Button, WebView, AsyncStorage} from 'react-native';
import { StackNavigator } from 'react-navigation';

export class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
    headerStyle: {backgroundColor: 'steelblue'},
  }

  async checkIfAuthorized(e) {
    if (e.url.match(/http:\/\/localhost:8000\/#token_type=Bearer/g)) {
      let params = e.url.split("&");
      if (params.length != 5) {
        console.error("Something went wrong");
        return;
      }
      if (params[2] == 'state=1234567890' && params[3] == 'scope=write+read') {
        let accessToken = params[1].split("=")[1];
        await AsyncStorage.setItem('@DocAppStore:token', accessToken);
        this.props.navigation.back();
      } else {
        console.error("Something went wrong")
      }
    }
  }

  render() {
    return (
      <WebView
        source={{uri: 'https://zielonks.pythonanywhere.com/o/authorize?grant_type=implicit&client_id=JTgZ6X0SipUHnEy79brxjpbtsB734L6qLlPucqOX&redirect_uri=http://localhost:8000&response_type=token&state=1234567890'}}
        onNavigationStateChange={(e) => this.checkIfAuthorized(e)}
      />
    );
  }
}
