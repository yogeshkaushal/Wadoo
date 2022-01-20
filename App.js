import React from 'react';
import {LogBox} from 'react-native';
import {store} from './src/store';
import {Provider} from 'react-redux';
import RouteNavigator from './src';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\n're using an old API with gesture components, check out new Gestures system!",
]);

const App = () => {
  return (
    <Provider store={store}>
      <RouteNavigator />
    </Provider>
  );
};

export default App;
