import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, Image, Alert, StatusBar, Picker } from 'react-native';


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      input: '',
      currency: '',
      amout: null,
      rates: []
    };
  }

  componentDidMount() {
    const url = 'https://api.exchangeratesapi.io/latest';

    fetch(url).then((response) => response.json()).then((responseJson) => {
      this.setState({ rates: Object.keys(responseJson.rates) });
    })
      .catch((error) => {
        Alert.alert(error);
      });
  }

  getRates = () => {

    const rateUrl = 'https://api.exchangeratesapi.io/latest?base=' + this.state.currency + '&symbols=EUR';

    fetch(rateUrl).then((response) => response.json()).then((responseJson) => {
      this.setState({ input: responseJson.rates.EUR })
        .catch((error) => {
          Alert.alert(error);
        });
    });
  }

  render() {
    const items = this.state.rates.map((item, index) => <Picker.Item key={index} label={item} value={item} />);
    result = "0.00"
    if (this.state.amount != null) {
      result = (parseFloat((this.state.input) * (this.state.amount))).toFixed(2);
    }
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Image style={{ width: 182, height: 170 }}
          source={require('./Image/Euro.png')} />
        <Text style={{ fontSize: 18 }}>{result} &euro; </Text>
        <View style={styles.input}>
          <TextInput placeholder="Enter Amount" style={{ fontSize: 17, height: 40 }}
            onChangeText={(amount) => this.setState({ amount })} />

          <Picker title="Base" style={{ width: 140, height: 40 }}
            selectedValue={this.state.currency}
            onValueChange={(value) => this.setState({ currency: value })}>
            {items}
          </Picker>
        </View>
        <Button style={{ fontSize: 18, marginTop: 300 }}
          title="Convert"
          onPress={this.getRates} />
      </View>
    )
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    flexDirection: 'row'
  }
});