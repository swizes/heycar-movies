import React, {FC} from 'react';
import {Pressable, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {AppText} from '@/components/Text/AppText';
import metrics from '@/theme/metrics';
import {colorsPalette} from '@/theme/colorsPalette';
import typography from '@/theme/typography';

type HeaderRightResetButtonProps = {
  onPress: () => void;
  text: string;
};

const defaultProps = {
  onPress: () => {},
  text: 'Reset',
};

export const HeaderRightResetButton: FC<
  HeaderRightResetButtonProps & typeof defaultProps
> = ({onPress, text}) => {
  return (
    <Pressable onPress={onPress} style={styles.iconContainer}>
      <AppText style={styles.text}>{text}</AppText>
    </Pressable>
  );
};

type Styles = {
  iconContainer: ViewStyle;
  text: TextStyle;
};

const styles = StyleSheet.create<Styles>({
  iconContainer: {
    paddingRight: 15 * metrics.verticalRem,
    paddingVertical: 5 * metrics.verticalRem,
    height: '100%',
    justifyContent: 'center',
  },
  text: {
    color: colorsPalette.danger,
    ...typography.p1,
  },
});
