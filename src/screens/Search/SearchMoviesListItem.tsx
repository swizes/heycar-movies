import React, {FC, useCallback, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AppStackParamsProps} from '@/types/AppStackParams';
import {ScreenRoutes} from '@/navigation/Routes';
import {
  ImageStyle,
  Pressable,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {AppText} from '@/components/Text/AppText';
import typography from '@/theme/typography';
import spacing from '@/theme/spacing';
import metrics from '@/theme/metrics';
import {AppImage} from '@/components/Image/AppImage';
import {SearchMoviesItem} from '@/types/Movie';
import {colorsPalette} from '@/theme/colorsPalette';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {toggleMovieBlacklist} from '@/utils/localStorage';

export const SearchMovieListItem: FC<SearchMoviesItem> = React.memo(
  ({Title, imdbID, Year, Type, Poster}) => {
    const navigation =
      useNavigation<StackNavigationProp<AppStackParamsProps>>();

    const navigateToDetailScreen = useCallback(() => {
      navigation.push(ScreenRoutes.Detail, {id: imdbID});
    }, [navigation, imdbID]);

    const [hidden, setHidden] = useState(false);

    const _onToggleHidden = () => {
      setHidden(!hidden);
      toggleMovieBlacklist(imdbID);
    };

    return (
      <Pressable
        onPress={navigateToDetailScreen}
        key={imdbID}
        testID={`movie_list_item_${imdbID}`}
        style={styles.container}>
        <AppImage source={{uri: Poster}} style={styles.image} />
        <View style={styles.infoContainer}>
          <AppText style={styles.title} numberOfLines={2}>
            {Title}
          </AppText>
          <AppText numberOfLines={1} style={styles.text}>
            Year: {Year}
          </AppText>
          <AppText numberOfLines={1} style={styles.text}>
            Type: {Type}
          </AppText>
        </View>
        <Pressable style={styles.hidden} onPress={_onToggleHidden}>
          <Ionicons
            name={hidden ? 'eye' : 'eye-off'}
            size={20 * metrics.verticalRem}
            color={colorsPalette.danger}
          />
        </Pressable>
      </Pressable>
    );
  },
);

type Styles = {
  container: ViewStyle;
  image: ImageStyle;
  infoContainer: ViewStyle;
  imageError: ViewStyle;
  title: TextStyle;
  text: TextStyle;
  hidden: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
  container: {
    flexDirection: 'row',
    height: 170 * metrics.verticalRem,
    paddingVertical: 10 * metrics.verticalRem,
  },
  image: {
    width: 100 * metrics.verticalRem,
    height: 150 * metrics.verticalRem,
    resizeMode: 'cover',
  },
  imageError: {
    width: 100 * metrics.verticalRem,
    height: 150 * metrics.verticalRem,
    backgroundColor: colorsPalette.placeholder,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10 * metrics.verticalRem,
    paddingBottom: spacing.s,
  },
  title: {
    ...typography.s1,
  },
  text: {
    ...typography.c1,
  },
  hidden: {
    paddingHorizontal: spacing.m,
  },
});
