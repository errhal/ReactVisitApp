import React from 'react';
import { StyleSheet, Text, View, Button, WebView, FlatList, SectionList, Header } from 'react-native';
import { StackNavigator } from 'react-navigation';

export class VisitsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
    };
  }

  static navigationOptions = {
    title: 'Choose visit',
    headerStyle: {backgroundColor: 'steelblue'},
  }

  componentDidMount() {
    return fetch('https://zielonks.pythonanywhere.com/api/doctors/'
    + this.props['navigation']['state']['params']['doctor']['id']
    + '/available_hours?access_token='
    + this.props['navigation']['state']['params']['token'])
      .then(response => response.json())
      .then(responseJson => {
        // responseJson.map(item => item['title'] = item['key'])
        let uniqKey = 0;
        let dates = [];
        for (var key in responseJson) {
          if (responseJson.hasOwnProperty(key)) {
            let hours = [];
            for (var d in responseJson[key]) {
              hours.push({key: uniqKey++, hour: responseJson[key][d].split('T')[1].substring(0, 5), date: responseJson[key][d]})
            }
            dates.push({title: key.split(' ')[0], data: hours});
          }
        }
        this.setState({
          data: dates,
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
      <SectionList
        renderItem={({item}) => <Button title={item.hour} onPress={() => this.props.navigation.navigate('SavedVisit', {date: item, doctor: this.props['navigation']['state']['params']['doctor']['id'], token: this.props['navigation']['state']['params']['token']})}/>}
        renderSectionHeader={({section}) => <View style={{alignItems: 'center',}}><Text>{section.title}</Text></View>}
        sections={this.state.data}
      />
    );
  }
}
