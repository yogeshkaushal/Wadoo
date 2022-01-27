import React from 'react';
import {LogBox} from 'react-native';
import {store} from './src/store';
import {Provider} from 'react-redux';
import RouteNavigator from './src/navigation';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import {WEB_CLIENT_ID, IOS_CLIENT_ID} from '@env';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\n're using an old API with gesture components, check out new Gestures system!",
]);

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  webClientId: WEB_CLIENT_ID,
  offlineAccess: true,
  hostedDomain: '',
  loginHint: '',
  forceConsentPrompt: true,
  accountName: '',
  iosClientId: IOS_CLIENT_ID,
});

const App = () => {
  let persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouteNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
