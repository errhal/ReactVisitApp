import React from 'react';
import { StyleSheet, Text, View, Button, WebView, AsyncStorage} from 'react-native';
import { StackNavigator } from 'react-navigation';

export class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
    headerStyle: {backgroundColor: 'steelblue'},
  }

  async checkIfAuthorized(e) {
    if (e.url.match(/http:\/\/localhost:8000\/#/g)) {
      let params = e.url.split("&");
      if (params.length != 5) {
        console.error("Something went wrong");
        return;
      }
      let accessToken = null;
      for(var param in params) {
        if(params[param].match(/access_token=/g)) {
          accessToken = params[param].split("=")[1];
        }
      }
      if (accessToken != null) {

        await AsyncStorage.setItem('@DocAppStore:token', accessToken);
        this.props.navigation.state.params.context.setState({
          token: accessToken,
        });
        this.props.navigation.state.params.context.render();
        this.props.navigation.goBack();
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
