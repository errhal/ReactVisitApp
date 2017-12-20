import React from 'react';
import { Button, Text, FlatList, View } from 'react-native';

export class SavedVisitsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
    };
  }

  static navigationOptions = {
    title: 'Your visits',
    headerStyle: {backgroundColor: 'steelblue'},
  }

  componentDidMount() {
    return fetch('https://zielonks.pythonanywhere.com/api/visits?access_token='
    + this.props['navigation']['state']['params']['token'])
      .then(response => response.json())
      .then(responseJson => {
        let key = 0;
        console.log(responseJson)
        responseJson.map(item => {item['date'] = (new Date(item.date)).toLocaleDateString(); item['key'] = key++;})
        this.setState({
          data: responseJson,
          isLoaded: true,
        });
      })
      .catch(error => {
        console.error(error);
      });;
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
         renderItem={({item}) =>
         <View style={{alignItems: 'center', height: 50, }}>
          <Text>Date:{item.date}</Text>
          <Text>Doctor:{item.doctor}</Text>

         </View>}
       />
    );
  }
}
