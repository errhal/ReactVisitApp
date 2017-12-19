import React from 'react';
import { StyleSheet, Text, View, Button, WebView, FlatList} from 'react-native';
import { StackNavigator } from 'react-navigation';

export class SavedVisitScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isSaved: false,
    };
  }

  static navigationOptions = {
    title: 'Visit',
    headerStyle: {backgroundColor: 'steelblue'},
  }

  componentDidMount() {
    return fetch('https://www.google.com/')
      .then((response) => {
        this.setState({
          isLoaded: true,
          isSaved: true,
        });
      });
  }

  render() {

    if(!this.state.isLoaded) {
      return (
        <Text>Loading...</Text>
      );
    }

    if(!this.state.isSaved) {
      return (
        <Text>Unable to save for this visit</Text>
      );
    }
    return (
      <Text>Succesfully saved for visit</Text>
    );
  }
}
