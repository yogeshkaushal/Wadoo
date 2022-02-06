import {Dimensions, Alert} from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const capitalizeFirstLetter = text => {
  return text[0].toUpperCase() + text.slice(1);
};

export const showAlert = (message, showCancel, negativeText, positiveText) => {
  return new Promise(function (resolve) {
    Alert.alert(
      'Logout',
      message,
      showCancel
        ? [
            {
              text: negativeText ? negativeText : 'Cancel',
              style: 'cancel',
              onPress: () => resolve(0),
            },
            {
              text: positiveText ? positiveText : 'Ok',
              onPress: () => resolve(1),
            },
          ]
        : [{text: 'Ok', onPress: () => resolve(1)}],
    );
  });
};

export {screenHeight, screenWidth, capitalizeFirstLetter};
