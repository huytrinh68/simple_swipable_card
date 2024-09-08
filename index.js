/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import 'react-native-gesture-handler'
import RDScreen from './test/RDScreen';
import DynamicTabHeight from './lesson/DynamicTabHeight/DynamicTabHeight';
import MultipleTab from './lesson/MultipleTab';
import CustomTabBarExample from './lesson/TabViewExample';
if (__DEV__) {
  require("./ReactotronConfig");
}
AppRegistry.registerComponent(appName, () => CustomTabBarExample);
