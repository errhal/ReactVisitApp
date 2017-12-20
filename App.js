import React from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { LoginScreen } from './screens/LoginScreen.js'
import { OptionsScreen } from './screens/OptionsScreen.js'
import { DocChooseScreen } from './screens/DocChooseScreen.js'
import { VisitsScreen } from './screens/VisitsScreen.js'
import { SavedVisitScreen } from './screens/SavedVisitScreen.js'
import { SavedVisitsScreen } from './screens/SavedVisitsScreen.js'

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null
    }
    this.getToken();
  }

  static navigationOptions = {
    title: 'Home',
    headerStyle: {backgroundColor: 'steelblue'},
  }

  render() {

    if (this.state.token !== null) {
      return (
        <View>
          <Button title='Browse terms' onPress={() => this.props.navigation.navigate('DocChoose', {token: this.state.token})}/>
          <Button title='Your visits' onPress={() => this.props.navigation.navigate('SavedVisits', {token: this.state.token})}/>
          <Button title='Delete token' onPress={() => this.deleteToken()}/>
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
