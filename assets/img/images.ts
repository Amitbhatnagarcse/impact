import { ImageSourcePropType } from 'react-native';
type AssetImages = { [index: string]: ImageSourcePropType };

const pngImages: AssetImages = {
    backnew : require('../img/backnew.png'),
  //deviceTablets: require('@stc/shared/assets/images/tablets.png'),

};

export default pngImages;
