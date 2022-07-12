import React, {FC} from 'react';
import {ScreenRoutes} from '@/navigation/Routes';
import {SearchScreen} from '@/screens/Search/SearchScreen';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {getSharedScreens} from '@/navigation/SharedScreens';

export type SearchStackParamsProps = {
  Search: undefined;
  Detail: {id: string};
};

const Stack = createNativeStackNavigator<SearchStackParamsProps>();

export const SearchStack: FC = () => {
  const SharedScreens = getSharedScreens(Stack);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={ScreenRoutes.Search}>
      <Stack.Screen
        options={{
          headerShown: true,
        }}
        component={SearchScreen}
        name={ScreenRoutes.Search}
      />
      {SharedScreens}
    </Stack.Navigator>
  );
};
