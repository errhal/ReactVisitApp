import React from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { LoginScreen } from './screens/LoginScreen.js'
import { OptionsScreen } from './screens/OptionsScreen.js'
import { DocChooseScreen } from './screens/DocChooseScreen.js'

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
    }
  }

  static navigationOptions = {
    title: 'Home',
    headerStyle: {backgroundColor: 'steelblue'},
  }

  render() {
    this.getToken();

    if (this.state.message === '') {
      return (
        <View>
          <Button title='Browse terms' onPress={() => this.props.navigation.navigate('DocChoose')}/>
          <Button title='Your visits' onPress={() => true}/>
        </View>
      );
    }
    return (
      <View>
        <Text>{this.state.message}</Text>
        <Button
          onPress={() => this.props.navigation.navigate('Login')}
          title="Login"
        />
      </View>
    );
  }

  async getToken () {
    try {
      const token = await AsyncStorage.getItem('@DocAppStore:token')
      if (token === null) {
        this.setState({
          message: "You are not authorized. Please log in."
        });
      }
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
});

export default ModalStack;

const styles = StyleSheet.create({
});
