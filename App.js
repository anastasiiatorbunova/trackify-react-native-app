import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';

import NavigationService from './src/route/NavigationService';
import AppRoutingStack from './src/route/AppRoutingStack';

const AppContainer = createAppContainer(AppRoutingStack);

export default class App extends Component {
  render() {
    return (
        <AppContainer
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
        />
    );
  }
}
