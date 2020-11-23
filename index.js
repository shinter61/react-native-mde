/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

// For development
// import ForDev from './lib/ForDev';
// AppRegistry.registerComponent(appName, () => ForDev);

import MarkdownEditor from './lib/MarkdownEditor';
AppRegistry.registerComponent(appName, () => MarkdownEditor);
