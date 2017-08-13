import React from 'react';
import { StyleSheet } from 'react-native'
import Expo, { AppLoading } from 'expo';
import { Container, Header, Left, Button, Title, Body, Right, Content, Icon } from 'native-base';

// My Components
import AHeader from './components/AHeader.js'
import AFooter from './components/AFooter.js'
import AContent from './components/AContent.js'

export default class App extends React.Component {
  state = { fontsAreLoaded: false };

  async componentWillMount() {
    await Expo.Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      });
      this.setState({fontsAreLoaded: true});
  }

  render() {
    if(this.state.fontsAreLoaded){
      return (
        <Container style={ styles.container }>
          <AContent />
        </Container>
      );
    }
    else {
      return <AppLoading />;
    }

  }
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    justifyContent: 'center',    
  }
});

Expo.registerRootComponent(App);
