import {DetailScreen} from '@/screens/Detail/DetailScreen';
import {ScreenRoutes} from '@/navigation/Routes';
import React from 'react';
import {NativeStackNavigatorProps} from 'react-native-screens/lib/typescript/native-stack/types';

export const getSharedScreens = (Stack: NativeStackNavigatorProps) => {
  return [
    <Stack.Screen
      key={ScreenRoutes.Detail}
      options={{
        headerShown: false,
      }}
      component={DetailScreen}
      name={ScreenRoutes.Detail}
    />,
  ];
};
