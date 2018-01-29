import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import config from './config.json';

export default class App extends React.Component {

  config = {};

  constructor(props) {
    super(props);
    this.state = {currentTemp: null};

    this.config = config;

    this.fetchData();
  }

  render() {
    

    return (
      <View style={styles.container}>
        <Text>{Math.round(this.state.currentTemp)}</Text>
        
      </View>
    );
  }


  fetchData() {
    var urlBase = 'https://api.darksky.net/forecast/'
    var location = '/40.769,-73.957';
    var fullUrl = urlBase + config.apiKey + location;
    return fetch(fullUrl)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson.currently.apparentTemperature);
      //this.state.currentTemp = responseJson.currently.apparentTemperature;

      this.setState(previousState => {
        return { currentTemp: responseJson.currently.apparentTemperature };
      });
    })
    .catch((error) => {
      console.error(error);
      return "Error";
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
