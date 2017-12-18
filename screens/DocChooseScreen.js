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
    return fetch('https://www.google.com/')
      .then((response) => {
        let data = [{key: 'Alex'}, {key: 'Tom'}]
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
         renderItem={({item}) => <Button title={item.key} onPress={() => true}/>}
       />
    );
  }
}
