import App from './src/components/App'
import {AppRegistry} from "react-native";
import {name as appName} from './app';

console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);