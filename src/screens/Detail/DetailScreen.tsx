import {Animated, ImageStyle, StyleSheet, View, ViewStyle} from 'react-native';
import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import {
  EdgeInsets,
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {useAppSelector} from '@/hooks/reduxHooks';
import {useRoute, useTheme} from '@react-navigation/native';
import {DetailScreenRouteProp} from '@/types/AppStackParams';

import {NavigationThemeColors} from '@/types/NavigationThemeColors';
import {LoadingView} from '@/components/LoadingView/LoadingView';
import {ErrorView} from '@/components/ErrorView/ErrorView';
import metrics from '@/theme/metrics';
import {getDefaultHeaderHeight} from '@react-navigation/elements';
import {MOVIE_NOT_FOUND} from '@/constants/errorTexts';
import spacing from '@/theme/spacing';
import {FocusAwareStatusBar} from '@/components/FocusAwareStatusBar/FocusAwareStatusBar';
import {MovieDetailInformation} from '@/screens/Detail/MovieDetailInformation';
import {MovieDetailHighlightedInformation} from '@/screens/Detail/HighlightedInformation/MovieDetailHighlightedInformation';
import {DetailScreenHeader} from '@/screens/Detail/DetailScreenHeader';
import {Movie} from '@/types/Movie';
import MoviesService from '@/services/MoviesService';
import {getErrorMessage} from '@/utils/errorUtils';
import {isMovieFavorite} from '@/redux/slices/favoriteMovies';

export const BACKDROP_EXPANDED_HEIGHT = 200 * metrics.verticalRem;

type GetMovieByIdResponse = Movie & {
  Response?: boolean;
  Error?: string;
};

export const DetailScreen: FC = () => {
  const route = useRoute<DetailScreenRouteProp>();

  const frame = useSafeAreaFrame();
  const insets: EdgeInsets = useSafeAreaInsets();
  const headerHeight = getDefaultHeaderHeight(frame, false, insets.top);

  const {colors} = useTheme();
  const styles = useMemo(
    () => createStyles(insets, colors, headerHeight),
    [insets, colors, headerHeight],
  );

  const [state, setState] = useState<{
    loading: boolean;
    movie: undefined | Movie;
    error: undefined | string;
  }>({
    loading: true,
    movie: undefined,
    error: '',
  });

  const {movie, loading, error} = state;

  const isFavorite = useAppSelector(reduxState =>
    isMovieFavorite(reduxState, movie?.imdbID),
  );

  useEffect(() => {
    const {id} = route.params;
    if (id) {
      MoviesService.getMovieById(id)
        .then(res => {
          const data: GetMovieByIdResponse = res.data;

          if (!data.Response) {
            setState({
              loading: false,
              error: data.Error,
              movie: undefined,
            });
          } else {
            setState({
              loading: false,
              movie: res.data,
              error: undefined,
            });
          }
        })
        .catch(err => {
          setState({
            loading: false,
            movie: undefined,
            error: getErrorMessage(err),
          });
        });
    }
  }, [route]);

  const scrollY = useRef(new Animated.Value(0)).current;

  if (loading) {
    return <LoadingView />;
  }

  if (error || !movie) {
    return <ErrorView showBackButton={true} error={error || MOVIE_NOT_FOUND} />;
  }

  return (
    <View testID={'detail_screen'} style={styles.container}>
      <FocusAwareStatusBar barStyle={'light-content'} />
      <DetailScreenHeader
        headerHeight={headerHeight}
        isFavorite={isFavorite}
        scrollY={scrollY}
        movie={movie}
      />
      <Animated.ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {y: scrollY},
              },
            },
          ],
          {useNativeDriver: true},
        )}
        style={styles.scrollView}>
        <View style={[styles.container, {backgroundColor: colors.background}]}>
          <MovieDetailHighlightedInformation movie={movie} />
          <MovieDetailInformation movie={movie} />
        </View>
      </Animated.ScrollView>
    </View>
  );
};

type Styles = {
  container: ViewStyle;
  scrollView: ViewStyle;
  scrollViewContainer: ViewStyle;
  posterContainer: ViewStyle;
  poster: ImageStyle;
  titleRatingContainer: ViewStyle;
};

const createStyles = (
  insets: EdgeInsets,
  colors: NavigationThemeColors,
  headerHeight: number,
) =>
  StyleSheet.create<Styles>({
    container: {
      flex: 1,
    },
    scrollView: {
      zIndex: 3,
      marginTop: headerHeight,
    },
    scrollViewContainer: {
      flexGrow: 1,
      paddingTop: BACKDROP_EXPANDED_HEIGHT,
      paddingBottom: 100 * metrics.verticalRem,
    },
    posterContainer: {
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
  });
