/**
 * @format
 */

import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

// For development
// import ForDev from './lib/ForDev';
// AppRegistry.registerComponent(appName, () => ForDev);

import MarkdownEditor from './lib/MarkdownEditor';
export default class App extends Component {
  render() {
    return <MarkdownEditor />;
  }
}
AppRegistry.registerComponent(appName, () => App);
