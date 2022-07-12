import React, {FC, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppStack} from '@/navigation/AppStack';
import {store} from '@/redux/store';
import {Provider} from 'react-redux';
import {setupAxiosInterceptors} from '@/utils/axiosInterceptors';
import axios from 'axios';
import {
  ColorSchemeName,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

const App: FC = () => {
  const scheme: ColorSchemeName = useColorScheme();

  useEffect(() => {
    setupAxiosInterceptors(axios);
  });

  return (
    <Provider store={store}>
      <StatusBar
        barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
        translucent={true}
        backgroundColor={'transparent'}
      />
      <SafeAreaProvider>
        <GestureHandlerRootView style={styles.gestureHandlerContainer}>
          <NavigationContainer>
            <AppStack />
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  gestureHandlerContainer: {
    flex: 1,
  },
});

export default App;
