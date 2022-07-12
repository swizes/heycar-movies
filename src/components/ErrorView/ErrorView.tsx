import {Pressable, StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import React, {FC, useCallback, useMemo} from 'react';
import {AppText} from '@/components/Text/AppText';
import typography from '@/theme/typography';
import spacing from '@/theme/spacing';
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation, useTheme} from '@react-navigation/native';
import {NavigationThemeColors} from '@/types/NavigationThemeColors';
import metrics from '@/theme/metrics';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const ErrorView: FC<{error: string; showBackButton?: boolean}> = ({
  error,
  showBackButton,
}) => {
  const insets = useSafeAreaInsets();

  const {colors} = useTheme();
  const styles = useMemo(() => createStyles(colors, insets), [colors, insets]);

  const navigation = useNavigation();

  const _onBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.container}>
      {showBackButton && (
        <View style={styles.header}>
          <Pressable onPress={_onBackPress} style={styles.backIconContainer}>
            <Ionicons
              name="arrow-back"
              color={colors.text}
              size={30 * metrics.verticalRem}
            />
          </Pressable>
        </View>
      )}
      <AppText style={styles.text}>{error}</AppText>
    </View>
  );
};

type Styles = {
  container: ViewStyle;
  header: ViewStyle;
  backIconContainer: ViewStyle;
  text: TextStyle;
};

const createStyles = (colors: NavigationThemeColors, insets: EdgeInsets) =>
  StyleSheet.create<Styles>({
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
    header: {
      paddingTop: insets.top,
      ...StyleSheet.absoluteFillObject,
      position: 'absolute',
    },
    backIconContainer: {
      paddingLeft: 15 * metrics.verticalRem,
      paddingTop: 10 * metrics.verticalRem,
    },
  });
