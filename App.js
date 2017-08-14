import React from 'react';
import { StyleSheet } from 'react-native'
import Expo, { AppLoading } from 'expo';
import { Container, Root } from 'native-base';

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
        <Root>
          <Container style={ styles.container }>
            <AContent />
          </Container>
        </Root>
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
