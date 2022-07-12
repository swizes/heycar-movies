import {RouteProp} from '@react-navigation/native';
import {ScreenRoutes} from '@/navigation/Routes';

export type AppStackParamsProps = {
  Home: undefined;
  Search: undefined;
  Detail: {
    id: string;
  };
};

export type DetailScreenRouteProp = RouteProp<
  AppStackParamsProps,
  ScreenRoutes.Detail
>;
