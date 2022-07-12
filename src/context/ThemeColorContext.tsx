import {DarkThemeColors, LightThemeColors} from '@/theme/themeColors';
import React, {FC} from 'react';
import {useColorScheme, ViewProps} from 'react-native';

export const ThemeColorContext = React.createContext(LightThemeColors);

export const ColorProvider: FC<ViewProps> = props => {
  const colorScheme = useColorScheme();

  const [isDark, setIsDark] = React.useState(colorScheme === 'dark');

  React.useEffect(() => {
    setIsDark(colorScheme === 'dark');
  }, [colorScheme]);

  const defaultColors = isDark ? DarkThemeColors : LightThemeColors;

  return (
    <ThemeColorContext.Provider value={defaultColors}>
      {props.children}
    </ThemeColorContext.Provider>
  );
};

export const useThemeColors = () => React.useContext(ThemeColorContext);
