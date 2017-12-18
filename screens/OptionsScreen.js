import React from 'react';
import { StyleSheet, Text, View, Button, WebView} from 'react-native';

export class OptionsScreen extends React.Component {
  static navigationOptions = {
    title: 'Options',
    headerStyle: {backgroundColor: 'steelblue'},
  }

  render() {
    return (
      <Text>It works</Text>
    )
  }
}
