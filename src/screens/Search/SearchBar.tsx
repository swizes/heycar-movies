import React, {useMemo} from 'react';
import {StyleSheet, TextInput, View, ViewStyle} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import spacing from '@/theme/spacing';
import {useTheme} from '@react-navigation/native';

import radius from '@/theme/radius';
import typography from '@/theme/typography';
import {NavigationThemeColors} from '@/types/NavigationThemeColors';
import metrics from '@/theme/metrics';
import {colorsPalette} from '@/theme/colorsPalette';

type SearchBarProps = {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};
const SearchBar = React.forwardRef(
  (
    {searchValue, setSearchValue}: SearchBarProps,
    ref: React.Ref<TextInput>,
  ) => {
    const {colors} = useTheme();
    const styles = useMemo(() => createStyles(colors), [colors]);

    return (
      <View style={styles.container}>
        <View style={styles.searchBarContainer}>
          <Ionicons
            name={'search'}
            size={20 * metrics.verticalRem}
            color={colors.text}
          />
          <TextInput
            testID={'search_bar'}
            accessibilityLabel={'search_bar'}
            ref={ref}
            style={styles.input}
            value={searchValue}
            onChangeText={setSearchValue}
            placeholderTextColor={colorsPalette.placeholder}
            placeholder={'Search movie...'}
          />
        </View>
      </View>
    );
  },
);

export default React.memo(SearchBar);

type Styles = {
  container: ViewStyle;
  searchBarContainer: ViewStyle;
  input: ViewStyle;
  filterIconContainer: ViewStyle;
};

const createStyles = (colors: NavigationThemeColors) =>
  StyleSheet.create<Styles>({
    container: {
      marginTop: spacing.m,
      paddingHorizontal: spacing.m,
      paddingVertical: spacing.s,
      borderRadius: radius.s,
      flexDirection: 'row',
      alignItems: 'center',
    },
    searchBarContainer: {
      flex: 1,
      paddingHorizontal: spacing.m,
      paddingVertical: spacing.s,
      marginRight: spacing.s,
      borderRadius: radius.s,
      backgroundColor: colors.card,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    input: {
      ...typography.p1,
      flex: 1,
      marginHorizontal: spacing.s,
      color: colors.text,
      padding: 0,
    },
    filterIconContainer: {
      paddingLeft: spacing.s,
      paddingRight: spacing.s,
    },
  });
