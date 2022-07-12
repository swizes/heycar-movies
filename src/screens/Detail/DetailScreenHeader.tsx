import React, {FC, useCallback, useMemo} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Animated,
  ImageBackground,
  ImageStyle,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation, useTheme} from '@react-navigation/native';
import spacing from '@/theme/spacing';
import {StackNavigationProp} from '@react-navigation/stack';
import {BACKDROP_EXPANDED_HEIGHT} from '@/screens/Detail/DetailScreen';
import {NavigationThemeColors} from '@/types/NavigationThemeColors';
import {colorsPalette} from '@/theme/colorsPalette';
import metrics from '@/theme/metrics';
import {AppStackParamsProps} from '@/types/AppStackParams';
import radius from '@/theme/radius';
import {toggleFavorite} from '@/redux/slices/favoriteMovies';
import {useAppDispatch} from '@/hooks/reduxHooks';
import {Movie} from '@/types/Movie';
import {images} from '@/assets/images';

const AnimatedImageBackground =
  Animated.createAnimatedComponent(ImageBackground);

const AnimatedBlurView = Animated.createAnimatedComponent(View);

type MovieDetailHeaderProps = {
  headerHeight: number;
  scrollY: Animated.Value;
  isFavorite: boolean;
  movie: Movie;
};

export const DetailScreenHeader: FC<MovieDetailHeaderProps> = ({
  headerHeight,
  scrollY,
  isFavorite,
  movie,
}) => {
  const {Poster, Title, imdbRating} = movie;

  const navigation = useNavigation<StackNavigationProp<AppStackParamsProps>>();
  const insets: EdgeInsets = useSafeAreaInsets();
  const {colors} = useTheme();
  const styles = useMemo(
    () => createStyles(insets, colors, headerHeight),
    [insets, colors, headerHeight],
  );

  const _onBackPressed = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const dispatch = useAppDispatch();

  const _onToggleFavorite = useCallback(() => {
    dispatch(toggleFavorite({movie}));
  }, [movie, dispatch]);

  const backdropScale = scrollY.interpolate({
    inputRange: [-200, 0],
    outputRange: [5, 1],
    extrapolateLeft: 'extend',
    extrapolateRight: 'clamp',
  });
  const backdropTransformStyle = {transform: [{scale: backdropScale}]};

  const backdropOpacity = scrollY.interpolate({
    inputRange: [-50, 0, 50, 100],
    outputRange: [0, 0, 0, 1],
  });
  const backdropOpacityStyle = {opacity: backdropOpacity};

  const titleOpacity = scrollY.interpolate({
    inputRange: [headerHeight, BACKDROP_EXPANDED_HEIGHT],
    outputRange: [0, 1],
  });

  const titleTranslateY = scrollY.interpolate({
    inputRange: [headerHeight, BACKDROP_EXPANDED_HEIGHT],
    outputRange: [30, 0],
    extrapolate: 'clamp',
  });

  const titleTransform = [
    {
      translateY: titleTranslateY,
    },
  ];

  return (
    <>
      <AnimatedImageBackground
        source={{
          uri: Poster,
        }}
        defaultSource={images.logo}
        style={[styles.backdrop, backdropTransformStyle]}>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: 2,
          }}>
          <AnimatedBlurView
            style={{
              ...StyleSheet.absoluteFillObject,
              zIndex: 2,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              ...backdropOpacityStyle,
            }}
          />
        </View>
      </AnimatedImageBackground>
      <View style={styles.headerRow}>
        <Pressable onPress={_onBackPressed} style={styles.backIconContainer}>
          <Ionicons
            name="arrow-back"
            color={colorsPalette.white}
            size={30 * metrics.verticalRem}
          />
        </Pressable>
        <Animated.View
          style={[
            styles.titleContainer,
            {
              opacity: titleOpacity,
              transform: titleTransform,
            },
          ]}>
          <Text style={styles.title} numberOfLines={1}>
            {Title}
          </Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>{imdbRating}</Text>
            <Ionicons
              name={'star'}
              color={colorsPalette.ratingYellow}
              size={12 * metrics.verticalRem}
            />
          </View>
        </Animated.View>
        <Pressable
          testID={'favorite_button'}
          onPress={_onToggleFavorite}
          style={styles.starContainer}>
          <Ionicons
            name="star"
            color={
              isFavorite ? colorsPalette.ratingYellow : colorsPalette.white
            }
            size={26 * metrics.verticalRem}
          />
        </Pressable>
      </View>
    </>
  );
};

type Styles = {
  backdrop: ImageStyle;
  headerRow: ViewStyle;
  backIconContainer: ViewStyle;
  titleContainer: ViewStyle;
  title: TextStyle;
  ratingContainer: ViewStyle;
  rating: TextStyle;
  starContainer: ViewStyle;
};

const createStyles = (
  insets: EdgeInsets,
  colors: NavigationThemeColors,
  headerHeight: number,
) =>
  StyleSheet.create<Styles>({
    backdrop: {
      position: 'absolute',
      left: 0,
      right: 0,
      height: BACKDROP_EXPANDED_HEIGHT + headerHeight,
      width: metrics.PORTRAIT_WIDTH,
    },
    headerRow: {
      position: 'absolute',
      top: insets.top + (Platform.OS === 'android' ? 10 : 0),
      flexDirection: 'row',
      alignItems: 'center',
    },
    backIconContainer: {
      zIndex: 999,
      marginLeft: 20 * metrics.verticalRem,
      height: 30 * metrics.verticalRem,
      width: 30 * metrics.verticalRem,
      borderRadius: radius.m,
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleContainer: {
      zIndex: 999,
      marginHorizontal: spacing.l,
      flex: 1,
      alignItems: 'center',
    },
    title: {
      color: colorsPalette.white,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rating: {
      marginRight: spacing.xs,
      color: colorsPalette.white,
    },
    starContainer: {
      zIndex: 999,
      marginRight: 20 * metrics.verticalRem,
      height: 30 * metrics.verticalRem,
      width: 30 * metrics.verticalRem,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
