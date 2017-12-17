import React from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { ProfileScreen } from './screens/ProfileScreen.js'
import { LoginScreen } from './screens/LoginScreen.js'

class MyHomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: ""}
  }

  static navigationOptions = {
    title: 'Home',
    headerStyle: {backgroundColor: 'steelblue'},
  }

  render() {
    this.getToken();

    if (this.state.message === '') {
      return (
        <Text>{this.state.message}</Text>
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
      if (token !== null) {
        this.setState({
        });
      } else {
        this.setState({
          message: "You are not authorized. Please log in."
        });
      }
    } catch(error) {
      console.log(error);
    }
  }

}

const ModalStack = StackNavigator({
  Home: {
    screen: MyHomeScreen,
  },
  Login: {
    path: 'login',
    screen: LoginScreen,
  },
});

export default ModalStack;

const styles = StyleSheet.create({
});
