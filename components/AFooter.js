import React from 'react';
import { StyleSheet } from 'react-native'
import { Left, Button, Title, Icon, Footer, FooterTab,Text } from 'native-base';

export default class AFooter extends React.Component {
  render() {
    return (
      <Footer>
        <FooterTab style={ styles.footerTab }   >
          <Button>
              <Icon name='calculator'  style={ styles.button }/>
          </Button>
          <Button>
              <Icon name='bulb'  style={ styles.button }/>
          </Button>
          <Button>
              <Icon name='person'  style={ styles.button }/>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

const styles = StyleSheet.create({
  footerTab : {
    backgroundColor: '#DD55CC',
  },
  button : {
    color: '#FFF',
    fontSize: 32,
  }
});
