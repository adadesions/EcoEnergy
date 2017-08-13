import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Content, Title, Text, Icon } from 'native-base';

import MenuButton from './menu/MenuButton';

export default class AContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      check : 1,
    };
  }

  _electricUsage() {
    this.setState({
      check : this.state.check + 1,
    });
    console.log(this.state.check);
  }

  render() {
    return(
      <Content style={{ backgroundColor: '#000' }}>
        <Image source={require('../imgs/homeBG3.jpeg')} style={ styles.bgImage } resizeMode='cover' >
          <Image source={require('../imgs/gradBG.png')} style={ styles.overlay } />
          <View style={ styles.container }>
            <Text style={ styles.header }>
              SaveEnergy
            </Text>
            <View style={ [styles.mainMenu, styles.row1] }>
              <MenuButton text='Electric Usage' icon='pulse' _onPress={ () => this._electricUsage() }/>
              <MenuButton text='Cost Estimate' icon='calculator' />
            </View>
            <View style={ [styles.mainMenu, styles.row2] }>
              <MenuButton text='About Team' icon='person' />
              <MenuButton text='Coming Soon' icon='bulb' />
            </View>
          </View>
        </Image>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    alignItems: 'center'
  },
  bgImage : {
    width: '100%',
  },
  overlay : {
    position : 'absolute',
    height: '100%',
    width: '100%',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 0.7
  },
  header : {
    fontSize: 52,
    fontWeight: 'bold',
    color: '#fff',
    top: 100,
    padding: 10,
    paddingLeft: 18,
    borderWidth: 5,
    borderColor: '#FFF',
  },
  mainMenu : {
    flex : 1,
    flexDirection : 'row',
    alignItems : 'center',
    marginLeft : 50
  },
  row1 : {
    marginTop : 100,
  },
  row2 : {
    marginTop : -50
  }

});
