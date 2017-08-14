import React from 'react';
import { StyleSheet, Image, View, ScrollView } from 'react-native';
import { Text, Icon, Form, Input, Label, Button, Toast, Fab, Picker, Item } from 'native-base';

const devices = [
  { name : "Coffee maker",	sPower : "900-1200 watts", cPower : 1050 },
  { name : "Microwave",	sPower : "750-1100 watts", cPower : 925 },
  { name : "Toaster",	sPower : "800-1400 watts", cPower : 1100 },
  { name : "Dishwasher",	sPower : "1200-2400 watts", cPower : 1800 },
  { name : "Washer",	sPower : "350-500 watts", cPower : 425 },
  { name : "Iron",	sPower : "100-1800 watts", cPower : 950 },
  { name : "Ceiling fan",	sPower : "65-175 watts", cPower : 120 },
  { name : "Hair dryer",	sPower : "1200-1875 watts", cPower : 1538 },
  { name : "Laptop",	sPower : "50 watts", cPower : 50 },
  { name : "Computer monitor",	sPower : "150 watts", cPower : 150 },
  { name : "Computer tower",	sPower : "120 watts", cPower : 120 },
  { name : 'Television 19"-36"',	sPower : "65-133 watts", cPower : 99 },
  { name : 'Television 53"-61"',	sPower : "170 watts", cPower : 170 },
];

export default class EstimatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected : [],
      timeOrder : [],
      amount : 2,
      header : "Cost Estimation",
      activeFab : false
    }
  }

  onValueChange(pickerId: int, value: string) {
    let temp = this.state.selected;
    temp[pickerId] = value;
    this.setState({
      selected : temp,
    });
  }

  _renderPickerItem() {
    return devices.map( (device,index) => {
      let displayText = device.name + '  ' + device.sPower;
      return (
        <Item key={ index }  label={ displayText } value={ index } />
      );
    });
  }

  _renderPicker( amount ) {
    let loop = [];
    for(let i = 0; i < amount; i++)
      loop.push(i);

    return loop.map( (l, index) =>  {
      return (
        <Form key={index}>
          <Picker
            iosHeader="Select one"
            mode="dropdown"
            selectedValue={this.state.selected[index]}
            onValueChange={ (value) => this.onValueChange(index, value) }
            style={ styles.picker }
          >
            { this._renderPickerItem() }
          </Picker>
          <Item style={styles.hours} regular>
            <Icon active name='time' />
            <Input
              keyboardType='numeric'
              placeholder='Hours'
              onChangeText={ (text) => this._timeChange(index, text) }
            />
          </Item>
        </Form>
      )
    });
  }

  _timeChange(index:int, text:string) {
    let temp = this.state.timeOrder;
    temp[index] = text;
    this.setState({
      timeOrder : temp,
    });
  }

  _onCalculate() {
    let info = [];
    let amount = this.state.amount;
    let time = this.state.timeOrder;
    let sum = 0;
    let result = 0;
    for(let i = 0; i < amount; i++){
      info[i] = parseFloat( ( devices[i].cPower*time[i] )/1000 );
      sum = sum + info[i];
    }
    let counter = 0;
    const units = [ 3.2484, 4.2218, 4.4217];

    for(let i = 0; i < info.length; i++){
      counter = counter + info[i]*30;
      console.log(`counter : ${counter} , info[${i}] : ${info[i]}`);
      if( counter >= 0 && counter <= 150 ){
        result = result + (info[i] * units[0]);
        console.log('case 1');
      }
      else if( counter > 150 && counter <= 400 ){
        result = result + (info[i] * units[1]);
        console.log('case 2');
      }
      else if( counter > 400 ){
        result = result + (info[i] * units[2]);
        console.log('case 3');
      }
    }

    console.log(`result : ${result}`);

    this.setState({
      header : result.toPrecision(6) + ' THB/Month'
    });

  }

  _onAddMore() {
    this.setState({
      amount : this.state.amount + 1
    });
  }

  _onRemoveOne() {
    this.setState({
      amount : this.state.amount - 1
    });
  }

  render() {
    return (
      <Image source={require('../../public/images/estimateBG.jpg')} style={ styles.bgImage } resizeMode='cover' >
        <Image source={require('../../public/images/gradEstimate.jpg')} style={ styles.overlay } resizeMode='cover'/>
        <View style={ styles.container }>
          <Text style={ styles.header }>
            { this.state.header }
          </Text>
          <View style={ styles.form }>
            {this._renderPicker( this.state.amount )}

          <View style={ styles.buttonsPack }>
            <Button
              success
              rounded
              large
              style={ styles.button }
              onPress={ () => this._onAddMore() }
              >
              <Text style={{ fontSize : 30, fontWeight : 'bold' }}>+</Text>
            </Button>

            <Button
              danger
              rounded
              large
              style={ styles.button }
              onPress={ () => this._onRemoveOne() }
              >
              <Text style={{ fontSize : 30, fontWeight : 'bold' }}>-</Text>
            </Button>

          </View>
          <Button
            info
            block
            style={ styles.button }
            onPress={ () => this._onCalculate() }
            >
            <Text>Calculate</Text>
          </Button>

          </View>
        </View>
        <Fab
          style={ styles.fab }
          containerStyle={{ }}
          active={this.state.activeFab}
          direction='up'
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
           onPress={ () => this.props._onPress('usage') }
          >
           <Icon name="pulse" />
         </Button>

         <Button
           style={{ backgroundColor: '#ff69b4' }}
           onPress={ () => this.props._onPress('team') }
          >
           <Icon name="people" />
         </Button>
        </Fab>
      </Image>
    );
  };
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    alignItems: 'center',
  },
  bgImage : {
    width: '100%',
    height : 'auto',
  },
  overlay : {
    position : 'absolute',
    height: '100%',
    width: '100%',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 0.8
  },
  header : {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#fff',
    top: 70,
    padding: 10,
    paddingLeft: 18,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  form : {
    marginTop : 100,
    borderColor : '#FFF',
    borderRadius : 20,
    borderWidth : 4,
    width : '100%',
    height : 'auto',
    overflow : 'scroll',
    backgroundColor : 'rgba(255,255,255,0.5)',
    padding : 10,
    paddingTop : 20
  },
  picker : {
    color : '#0e7c41',
    backgroundColor : '#FFF',
  },
  button : {
    marginTop : 20
  },
  hours : {
    marginBottom : 20
  },
  buttonsPack : {
    flex : 2,
    flexDirection : 'row',
    justifyContent : 'center'
  },
  fab : {
    backgroundColor: '#5067FF',
  }
});
