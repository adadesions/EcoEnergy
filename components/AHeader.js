import React from 'react';
import { StyleSheet } from 'react-native'
import { Header, Left, Button, Title, Body, Right, Content, Icon } from 'native-base';

export default class App extends React.Component {
  render() {
      return (
        <Header style={{ backgroundColor: this.props.theme.color }}>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>EcoEnergy M. 6/2</Title>
          </Body>
          <Right />
        </Header>
      );
  }
}
