import {FlatList, StyleSheet, View, ViewStyle} from 'react-native';
import React, {FC, useEffect, useMemo} from 'react';
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppDispatch, useAppSelector} from '@/hooks/reduxHooks';
import {ErrorView} from '@/components/ErrorView/ErrorView';
import {Movie} from '@/types/Movie';
import spacing from '@/theme/spacing';
import {EmptyListMessageView} from '@/components/EmptyListMessageView/EmptyListMessageView';
import {NO_FAVORITES} from '@/constants/texts';
import {LoadingView} from '@/components/LoadingView/LoadingView';
import {
  fetchFavoriteMovies,
  selectFavoriteMovies,
  selectFavoriteMoviesError,
  selectFavoriteMoviesStatus,
} from '@/redux/slices/favoriteMovies';
import {FavoriteMoviesListItem} from '@/screens/Home/FavoriteMoviesListItem';

const _renderItem = ({item}: {item: Movie}) => {
  const {imdbID, Poster, Title, Year, Type, Plot, imdbRating} = item;

  return (
    <FavoriteMoviesListItem
      imdbID={imdbID}
      Poster={Poster}
      Title={Title}
      imdbRating={imdbRating}
      Year={Year}
      Type={Type}
      Plot={Plot}
    />
  );
};

export const HomeScreen: FC = () => {
  const insets: EdgeInsets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(insets), [insets]);

  const dispatch = useAppDispatch();
  const favoriteMovies = useAppSelector(selectFavoriteMovies);
  const status = useAppSelector(selectFavoriteMoviesStatus);
  const error = useAppSelector(selectFavoriteMoviesError);

  useEffect(() => {
    if (status === 'pending') {
      dispatch(fetchFavoriteMovies());
    }
  }, [dispatch, status]);

  if (status === 'pending' || status === 'loading') {
    return <LoadingView />;
  }

  if (error) {
    return <ErrorView error={error} />;
  }

  const _renderEmptyList = () => {
    return <EmptyListMessageView message={NO_FAVORITES} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteMovies}
        contentContainerStyle={styles.listContentContainer}
        renderItem={_renderItem}
        showsVerticalScrollIndicator={false}
        bounces={false}
        initialNumToRender={4}
        ListEmptyComponent={_renderEmptyList}
        keyExtractor={(item: Movie) => `home_screen_${item.imdbID}`}
      />
    </View>
  );
};

type Styles = {
  container: ViewStyle;
  listContentContainer: ViewStyle;
};

const createStyles = (insets: EdgeInsets) =>
  StyleSheet.create<Styles>({
    container: {
      flex: 1,
    },

    listContentContainer: {
      flexGrow: 1,
      paddingBottom: insets.bottom + spacing.xl,
      paddingHorizontal: spacing.m,
    },
  });
