import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import {AppText} from '@/components/Text/AppText';
import typography from '@/theme/typography';
import spacing from '@/theme/spacing';

export const EmptyListMessageView: FC<{
  message: string;
}> = ({message}) => {
  return (
    <View style={styles.container}>
      <AppText style={styles.text}>{message}</AppText>
    </View>
  );
};

type Styles = {
  container: ViewStyle;
  text: TextStyle;
};

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...typography.s1,
    paddingHorizontal: spacing.l,
    textAlign: 'center',
  },
});
