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
    return fetch('https://zielonks.pythonanywhere.com/api/visits/?access_token='
    + this.props['navigation']['state']['params']['token'], {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date: this.props['navigation']['state']['params']['date']['date'],
        doctor: this.props['navigation']['state']['params']['doctor']
      }),
    })
      .then((response) => {
        console.log(response);
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
