import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

// Default guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

export const scale = (size: number): number =>
  (shortDimension / guidelineBaseWidth) * size;
export const verticalScale = (size: number): number =>
  (longDimension / guidelineBaseHeight) * size;
export const moderateScale = (size: number, factor: number = 0.5): number =>
  size + (scale(size) - size) * factor;
export const moderateVerticalScale = (
  size: number,
  factor: number = 0.5
): number => size + (verticalScale(size) - size) * factor;
export const percentageScale = (size: number): number =>
  (guidelineBaseWidth / shortDimension) * size;
export const percentageVerticalScale = (size: number): number =>
  (guidelineBaseHeight / longDimension) * size;
export const scaleRounded = (size: number): number =>
  Math.ceil((shortDimension / guidelineBaseWidth) * size);
export const verticalScaleRounded = (size: number): number =>
  Math.ceil((longDimension / guidelineBaseHeight) * size);

export const s = scale;
export const vs = verticalScale;
export const ms = moderateScale;
export const mvs = moderateVerticalScale;
