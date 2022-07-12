import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

//Get width and height of the device in portrait mode
const portraitWidth = width > height ? height : width;
const portraitHeight = width > height ? width : height;

//Those are values are coming from "designer's" mockup device dimensions a.k.a guideline values
const mockUpWidth = 390;
const mockUpHeight = 844;

//Here the ratio of client device to mockup device is calculated to display view responsively
const horizontalRem = portraitWidth / mockUpWidth;
const verticalRem = portraitHeight / mockUpHeight;

const metrics = {
  PORTRAIT_WIDTH: portraitWidth,
  PORTRAIT_HEIGHT: portraitHeight,
  horizontalRem,
  verticalRem,
  fontRem: verticalRem,
};

export default metrics;
