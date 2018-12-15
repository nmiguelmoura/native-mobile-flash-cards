import Reactotron, {asyncStorage} from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';

Reactotron
.configure({host: "192.168.1.92"}) // controls connection & communication settings
.useReactNative() // add all built-in react native plugins
.use(asyncStorage())
.use(reactotronRedux())
.connect(); // let's connect!

export default Reactotron;
