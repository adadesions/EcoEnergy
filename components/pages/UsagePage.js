import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Text, Icon, Form, Item, Input, Label, Button, Toast, Fab } from 'native-base';

import MenuButton from '../menu/MenuButton';

export default class UsagePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerText : 'Electric Usage',
      prvMonth : 0,
      curMonth : 0,
      units : 0,
      activeFab : false
    };
  }

  _textChange( inputId, text ) {
    switch( inputId ) {
      case 0 :
        this.setState({
          prvMonth : text
        });
        break;
      case 1 :
        this.setState({
          curMonth : text
        });
        break;
      case 2 :
        this.setState({
          units : text,
        });
        break;
      default :
        console.log("Error : InputId is wrong.");
    }
  }

  _onPressButton() {
    let prv = parseInt(this.state.prvMonth);
    let cur = parseInt(this.state.curMonth);
    let units = parseInt(this.state.units);
    if( cur < prv ){      
      Toast.show({
              text: 'Current MUST greater than Previous Month',
              position: 'bottom',
              buttonText: 'OK',
              type: 'danger',
              duration : 2000
            })
      return;
    }
    if( units <= 0 ) {
      Toast.show({
              text: 'Units MUST more than 0',
              position: 'bottom',
              buttonText: 'OK',
              type: 'danger',
              duration : 2000
            })
      return;
    }
    let cost = (cur - prv) * units;
    this.setState({
      headerText : cost.toPrecision(6) + ' THB'
    });

  }

  render() {
    return (
      <Image source={require('../../public/images/usageBG.jpeg')} style={ styles.bgImage } resizeMode='cover' >
        <Image source={require('../../public/images/gradUsage.jpg')} style={ styles.overlay } />
        <View style={ styles.container }>
          <Text style={ styles.header }>
            { this.state.headerText }
          </Text>
          <View style={ styles.form }>
            <Form>
              <Item style={ styles.item } fixedLabel>
                <Label style={styles.label} >Previous Month</Label>
                <Input keyboardType='numeric' onChangeText={ (text) => this._textChange(0, text) } />
              </Item>
              <Item style={ styles.item } fixedLabel >
                <Label style={styles.label} >Current Month</Label>
                <Input keyboardType='numeric' onChangeText={ (text) => this._textChange(1, text) } />
              </Item>
              <Item style={ styles.item } fixedLabel last>
                <Label style={styles.label} >Units</Label>
                <Input keyboardType='numeric' onChangeText={ (text) => this._textChange(2, text) } />
              </Item>
            </Form>
            <Button
              block
              info
              style={ styles.button }
              onPress={ () => this._onPressButton() }
              >
              <Text>Calculate</Text>
            </Button>
          </View>
        </View>
        <Fab
          style={ styles.fab }
          containerStyle={{ }}
          active={this.state.activeFab}
          direction='left'
          position='bottomRight'
          onPress={() => this.setState({ activeFab: !this.state.activeFab })}
        >
         <Icon name="menu" />

         <Button
           style={{ backgroundColor: '#5f009c' }}
           onPress={ () => this.props._onPress('home') }
          >
           <Icon name="home" />
         </Button>

         <Button
           style={{ backgroundColor: '#0066ff' }}
           onPress={ () => this.props._onPress('estimate') }
          >
           <Icon name="calculator" />
         </Button>

         <Button
           style={{ backgroundColor: '#ff69b4' }}
           onPress={ () => this.props._onPress('team') }
          >
           <Icon name="person" />
         </Button>

        </Fab>
      </Image>
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
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    top: 100,
    padding: 10,
    paddingLeft: 18,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  form : {
    marginTop : 150,
    borderColor : '#FFF',
    borderRadius : 30,
    borderWidth : 4,
    width : '90%',
    height : 330,
    backgroundColor : '#FFF',
    padding : 10,
    paddingTop : 20
  },
  label : {
    color : '#00afb8',
    fontSize : 20,
    fontWeight : 'bold'
  },
  item : {
    marginBottom : 20,
  },
  button : {
    marginTop : 20
  },
  fab : {
    backgroundColor: '#5067FF',
  }

});
