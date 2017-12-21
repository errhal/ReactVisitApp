import React from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage, TextInput } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { LoginScreen } from './screens/LoginScreen.js'
import { OptionsScreen } from './screens/OptionsScreen.js'
import { DocChooseScreen } from './screens/DocChooseScreen.js'
import { VisitsScreen } from './screens/VisitsScreen.js'
import { SavedVisitScreen } from './screens/SavedVisitScreen.js'
import { SavedVisitsScreen } from './screens/SavedVisitsScreen.js'
var CryptoJS = require("crypto-js");

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      logged: false,
      pin: '',
      pinMessage: '',
    }
    this.getToken();
  }

  static navigationOptions = {
    title: 'Home',
    headerStyle: {backgroundColor: 'steelblue'},
  }

  render() {

    if (this.state.token !== null && this.state.logged === true) {
      return (
        <View>
          <Button title='Browse terms' onPress={() => this.props.navigation.navigate('DocChoose', {token: this.state.token})}/>
          <Button title='Your visits' onPress={() => this.props.navigation.navigate('SavedVisits', {token: this.state.token})}/>
          <Button title='Delete token' onPress={() => this.deleteToken()}/>
        </View>
      );
    } else if (this.state.token !== null && this.state.logged === false ) {
      return (
        <View>
          <TextInput placeholder="pin" onChangeText={(pin) => this.setState({pin: pin})}/>
          <Button title="OK" onPress={() => this.checkPin()}/>
          <Button title='Delete token' onPress={() => this.deleteToken()}/>
          <Text>{this.state.pinMessage}</Text>
        </View>
      );
    }
    return (
      <View>
        <Text>You are not authorized. Please log in.</Text>
        <Button
          onPress={() => this.props.navigation.navigate('Login', {context: this})}
          title="Login"
        />
      </View>
    );
  }

  async getToken () {
    try {
      const token = await AsyncStorage.getItem('@DocAppStore:token')
      if (token !== null) {
        this.setState({
          token: token
        });
      }
    } catch(error) {
      console.error(error);
    }
  }

  async deleteToken() {
    try {
      await AsyncStorage.removeItem('@DocAppStore:token');
      this.setState({
        token: null
      });
    } catch(error) {
      console.error(error);
    }
  }

  checkPin() {
    var bytes = CryptoJS.AES.decrypt(this.state.token, this.state.pin);
    var decrypted = bytes.toString(CryptoJS.enc.Utf8);

    if(decrypted.substr(0, 6) != 'TOKEN_') {
      this.setState({
        pinMessage: 'Wrong pin!',
      });
      return;
    }

    this.setState({
      logged: true,
      token: decrypted.substr(6),
    });
  }

}

const ModalStack = StackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Login: {
    path: 'login',
    screen: LoginScreen,
  },
  Options: {
    path: 'options',
    screen: OptionsScreen,
  },
  DocChoose: {
    path: 'doctor',
    screen: DocChooseScreen,
  },
  Visits: {
    path: 'visits',
    screen: VisitsScreen,
  },
  SavedVisit: {
    path: 'saved',
    screen: SavedVisitScreen,
  },
  SavedVisits: {
    path: 'savedVisits',
    screen: SavedVisitsScreen,
  }
});

export default ModalStack;

const styles = StyleSheet.create({
});
