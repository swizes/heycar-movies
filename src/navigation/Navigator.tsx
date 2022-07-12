import {NavigationContainer} from '@react-navigation/native';
import {DarkAppTheme, LightAppTheme} from '@/theme/navigationTheme';
import {ColorSchemeName} from 'react-native';
import React, {FC} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {BottomTabNavigation} from '@/navigation/BottomTabNavigation';

export const Navigator: FC<{
  scheme: ColorSchemeName;
}> = ({scheme}) => {
  return (
    <NavigationContainer
      onReady={() => {
        RNBootSplash.hide({fade: true});
      }}
      theme={scheme === 'dark' ? DarkAppTheme : LightAppTheme}>
      <BottomTabNavigation />
    </NavigationContainer>
  );
};
