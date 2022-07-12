import {Navigator} from '@/navigation/Navigator';
import React, {useEffect} from 'react';
import {Alert, LogBox, StatusBar, useColorScheme} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {setupAxiosInterceptors} from '@/utils/axiosInterceptors';
import axios from 'axios';
import {ColorProvider} from '@/context/ThemeColorContext';
import NetInfo from '@react-native-community/netinfo';
import {useAppDispatch, useAppSelector} from '@/hooks/reduxHooks';
import {toggleInternetConnection} from '@/redux/slices/app';

//Some movies do not have any poster, and we are handling that by showing the app's logo instead of empty image view
LogBox.ignoreLogs(['Could not find image']);

const App: React.FC = () => {
  const scheme = useColorScheme();
  const dispatch = useAppDispatch();

  const hasInternetConnection = useAppSelector(
    state => state.app.hasInternetConnection,
  );

  useEffect(() => {
    setupAxiosInterceptors(axios);
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (hasInternetConnection !== !!state.isConnected) {
        dispatch(toggleInternetConnection({bool: !!state.isConnected}));
        if (!state.isConnected) {
          Alert.alert('Internet connection is lost');
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch, hasInternetConnection]);

  return (
    <>
      <StatusBar
        barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
        translucent={true}
        backgroundColor={'transparent'}
      />
      <ColorProvider>
        <GestureHandlerRootView style={{flex: 1}}>
          <SafeAreaProvider>
            <Navigator scheme={scheme} />
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </ColorProvider>
    </>
  );
};

export default App;
