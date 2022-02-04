import {Dimensions} from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const capitalizeFirstLetter = text => {
  return text[0].toUpperCase() + text.slice(1);
};

export {screenHeight, screenWidth, capitalizeFirstLetter};
