import {DarkTheme, DefaultTheme} from '@react-navigation/native';
import {colorsPalette} from '@/theme/colorsPalette';

export const LightAppTheme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: colorsPalette.primary,
  },
};

export const DarkAppTheme = {
  dark: true,
  colors: {
    ...DarkTheme.colors,
    primary: colorsPalette.primary,
  },
};
