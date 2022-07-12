import {ActivityIndicator, StyleSheet, View, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import {useTheme} from '@react-navigation/native';

export const LoadingView: FC = () => {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.primary} />
    </View>
  );
};

type Styles = {
  container: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
