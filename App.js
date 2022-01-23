import React from 'react';
import { LogBox } from 'react-native';
import { store } from './src/store';
import { Provider } from 'react-redux';
import RouteNavigator from './src';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\n're using an old API with gesture components, check out new Gestures system!",
]);

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  webClientId: '582761720891-p4lit86r21lr5s2kvvdsf3p9iprn3e5e.apps.googleusercontent.com',
  offlineAccess: true,
  hostedDomain: '',
  loginHint: '',
  forceConsentPrompt: true,
  accountName: '',
  iosClientId: '582761720891-ib0ofj26hv7nk1dlo4tl06n7eeogmt4v.apps.googleusercontent.com'
});

const App = () => {
  return (
    <Provider store={store}>
      <RouteNavigator />
    </Provider>
  );
};

export default App;
