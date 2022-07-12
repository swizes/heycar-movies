import React, {FC} from 'react';
import {ScreenRoutes} from '@/navigation/Routes';
import {HomeScreen} from '@/screens/Home/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {getSharedScreens} from '@/navigation/SharedScreens';

export type HomeStackParamsProps = {
  Home: undefined;
  Detail: {id: string};
};

const Stack = createNativeStackNavigator<HomeStackParamsProps>();

export const HomeStack: FC = () => {
  const SharedScreens = getSharedScreens(Stack);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={ScreenRoutes.Home}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Favorite Movies',
        }}
        component={HomeScreen}
        name={ScreenRoutes.Home}
      />
      {SharedScreens}
    </Stack.Navigator>
  );
};
