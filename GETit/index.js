import App from './src/components/App'
import {AppRegistry} from "react-native";
import {name as appName} from './app'
import PasswordReset from './src/components/PasswordReset'

AppRegistry.registerComponent(appName, () => PasswordReset);