import React, {FC, useMemo} from 'react';
import {Movie} from '@/types/Movie';
import {
  Animated,
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import typography from '@/theme/typography';
import spacing from '@/theme/spacing';
import {NavigationThemeColors} from '@/types/NavigationThemeColors';
import metrics from '@/theme/metrics';
import {useTheme} from '@react-navigation/native';
import {RatingBar} from '@/screens/Detail/HighlightedInformation/RatingBar';
import {AppImage} from '@/components/Image/AppImage';

export const MovieDetailHighlightedInformation: FC<{movie: Movie}> = ({
  movie,
}) => {
  const {Poster, imdbID, Title, imdbRating} = movie;
  const {colors} = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View
      shouldRasterizeIOS={true}
      renderToHardwareTextureAndroid={true}
      style={styles.container}>
      <AppImage source={{uri: Poster}} style={styles.poster} />
      <Animated.View style={styles.titleRatingContainer}>
        <View style={styles.titleContainer}>
          <Text testID={imdbID} numberOfLines={2} style={styles.title}>
            {Title}
          </Text>
        </View>
        <View style={styles.ratingContainer}>
          <RatingBar rating={parseInt(imdbRating)} />
        </View>
      </Animated.View>
    </View>
  );
};

type Styles = {
  container: ViewStyle;
  poster: ImageStyle;
  titleRatingContainer: ViewStyle;
  titleContainer: ViewStyle;
  title: TextStyle;
  ratingContainer: ViewStyle;
};

const createStyles = (colors: NavigationThemeColors) =>
  StyleSheet.create<Styles>({
    container: {
      flex: 1,
      paddingLeft: spacing.l,
      paddingRight: spacing.s,
      flexDirection: 'row',
      marginTop: -100 * metrics.verticalRem,
    },
    poster: {
      width: 125 * metrics.verticalRem,
      height: 200 * metrics.verticalRem,
      borderColor: colors.card,
      borderWidth: 1,
    },
    titleRatingContainer: {
      flex: 1,
      height: 200 * metrics.verticalRem,
      paddingLeft: spacing.m,
    },
    titleContainer: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    title: {
      color: 'white',
      ...typography.h2,
      marginBottom: spacing.s,
    },
    ratingContainer: {
      flex: 1,
      justifyContent: 'flex-end',
    },
  });
