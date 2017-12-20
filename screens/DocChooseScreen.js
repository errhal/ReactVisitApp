import React from 'react';
import { StyleSheet, Text, View, Button, WebView, FlatList} from 'react-native';
import { StackNavigator } from 'react-navigation';

export class DocChooseScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
    };
  }

  static navigationOptions = {
    title: 'Choose doctor',
    headerStyle: {backgroundColor: 'steelblue'},
  }

  componentDidMount() {
    return fetch('https://zielonks.pythonanywhere.com/api/doctors?access_token='
    + this.props['navigation']['state']['params']['token'])
      .then((response) => response.json())
      .then((responseJson) => {
        responseJson.map(item => item['key'] = item['first_name'] + " " + item['last_name'])
        let data = responseJson
        this.setState({
          data: data,
          isLoaded: true,
        });
      });
  }

  render() {

    if(!this.state.isLoaded) {
      return (
        <Text>Loading...</Text>
      );
    }

    return (
      <FlatList
         data={this.state.data}
         renderItem={({item}) => <Button title={item.key} onPress={() => this.props.navigation.navigate('Visits', {doctor: item, token: this.props['navigation']['state']['params']['token']})}/>}
       />
    );
  }
}
