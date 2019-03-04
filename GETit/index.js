import App from './src/components/App'
import {AppRegistry} from "react-native";
import {name as appName} from './app';
import RequestHistory from './src/components/RequestHistory'

AppRegistry.registerComponent(appName, () => RequestHistory);