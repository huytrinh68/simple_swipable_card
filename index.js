/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import 'react-native-gesture-handler'
import RDScreen from './test/RDScreen';
if (__DEV__) {
    require("./ReactotronConfig");
  }
AppRegistry.registerComponent(appName, () => RDScreen);
