import { ImageSourcePropType } from 'react-native';
type AssetImages = { [index: string]: ImageSourcePropType };

const pngImages: AssetImages = {
    backnew : require('../img/backnew.png'),
     down : require ('../img/downspinner.png'),

};

export default pngImages;
