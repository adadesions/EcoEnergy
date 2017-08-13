import React from 'react';
import { StyleSheet ,View, TouchableHighlight } from 'react-native';
import { Button, Text, Icon } from 'native-base';

export default class MenuButton extends React.Component {

  clickButton (e) {
    console.log("ADA");
  }

  render () {
    return (
      <View style={ styles.container }>
        <TouchableHighlight onPress={this.props._onPress} underlayColor='rgba(150,150,150,0)'>
          <View style={ styles.mainButton}>
            <Icon style={ styles.icon } name={ this.props.icon } />
          </View>
        </TouchableHighlight>
        <Text style={ styles.text }> { this.props.text } </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    flexDirection : 'column',
    justifyContent : 'center',
  },
  mainButton : {
    alignItems : 'center',
    paddingTop : 30,
    borderWidth : 3,
    borderColor : '#FFF',
    borderRadius : 200,
    width : 120,
    height : 120,
    backgroundColor : '#FFF',
  },
  icon : {
    color : '#5f009c',
    fontSize : 50
  },
  text : {
    color : '#FFF',
    fontSize : 18,
    marginTop : 10,
  }
});
