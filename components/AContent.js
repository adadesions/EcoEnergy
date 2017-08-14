import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Content, Title, Text, Icon } from 'native-base';

import HomePage from './pages/HomePage';
import UsagePage from './pages/UsagePage';
import EstimatePage from './pages/EstimatePage';

export default class AContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageName : 'home',
    };
    this._changePage = this._changePage.bind(this);
  }

  _changePage( name ) {
    this.setState({
      pageName : name,
    });
  }

  _renderPage() {
    switch(this.state.pageName) {
      case 'home' :
        return (<HomePage _onPress={ this._changePage} />)
        break;
      case 'usage':
        return (<UsagePage _onPress={ this._changePage}/>)
        break;
      case 'estimate':
        return (<EstimatePage _onPress={ this._changePage}/>)
        break;
      default :
        return (<HomePage />)
    }
  }

  render() {
    return(
      <Content style={{ backgroundColor: '#000' }}>
        { this._renderPage() }
      </Content>
    );
  }
}
