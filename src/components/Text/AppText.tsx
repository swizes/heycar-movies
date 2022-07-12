import React, {FC, useMemo} from 'react';
import {StyleSheet, Text, TextProps, TextStyle} from 'react-native';
import {useTheme} from '@react-navigation/native';
import typography from '@/theme/typography';
import {NavigationThemeColors} from '@/types/NavigationThemeColors';

export const AppText: FC<TextProps> = props => {
  const {colors} = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <Text {...props} style={[styles.text, props.style]}>
      {props.children}
    </Text>
  );
};

type Styles = {
  text: TextStyle;
};

const createStyles = (colors: NavigationThemeColors) =>
  StyleSheet.create<Styles>({
    text: {
      color: colors.text,
      ...typography.p1,
    },
  });
