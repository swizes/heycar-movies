import React, {FC} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeStack} from '@/navigation/HomeStack';
import {SearchStack} from '@/navigation/SearchStack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BottomTabRoutes} from '@/navigation/Routes';
import {colorsPalette} from '@/theme/colorsPalette';

type BottomNavigationParamsProps = {
  SearchTab: undefined;
  HomeTab: undefined;
};

const Tab = createBottomTabNavigator<BottomNavigationParamsProps>();

const getTabBarIconName = (routeName: string) => {
  switch (routeName) {
    case BottomTabRoutes.HomeTab:
      return 'home';
    case BottomTabRoutes.SearchTab:
      return 'search';
    default:
      return 'close';
  }
};

export const BottomTabNavigation: FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({color, size}) => {
          return (
            <Ionicons
              name={getTabBarIconName(route.name)}
              size={size}
              color={color}
            />
          );
        },
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colorsPalette.primary,
      })}
      initialRouteName={BottomTabRoutes.HomeTab}>
      <Tab.Screen
        name={BottomTabRoutes.HomeTab}
        options={{
          tabBarLabel: 'Home',
          tabBarTestID: BottomTabRoutes.HomeTab,
        }}
        component={HomeStack}
      />
      <Tab.Screen
        name={BottomTabRoutes.SearchTab}
        options={{
          tabBarLabel: 'Search',
          tabBarTestID: BottomTabRoutes.SearchTab,
        }}
        component={SearchStack}
      />
    </Tab.Navigator>
  );
};
