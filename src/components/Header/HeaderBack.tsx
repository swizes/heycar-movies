import React, {FC, useCallback} from 'react';
import {Pressable, StyleSheet, ViewStyle} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation, useTheme} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AppStackParamsProps} from '@/types/AppStackParams';
import metrics from '@/theme/metrics';

type HeaderBackProps = {
  customAction?: () => void;
};

export const HeaderBack: FC<HeaderBackProps> = ({customAction}) => {
  const {colors} = useTheme();
  const navigation = useNavigation<StackNavigationProp<AppStackParamsProps>>();

  const _onBackPressed = useCallback(() => {
    if (customAction) {
      customAction();
    } else {
      navigation.goBack();
    }
  }, [customAction, navigation]);

  return (
    <Pressable onPress={_onBackPressed} style={styles.iconContainer}>
      <Ionicons
        name={'close'}
        color={colors.text}
        size={30 * metrics.verticalRem}
      />
    </Pressable>
  );
};

type Styles = {
  iconContainer: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
  iconContainer: {
    paddingRight: 15 * metrics.verticalRem,
    paddingVertical: 5 * metrics.verticalRem,
    height: '100%',
    justifyContent: 'center',
  },
});
