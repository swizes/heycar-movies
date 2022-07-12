import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {useTheme} from '@react-navigation/native';
import SearchBar from './SearchBar';
import {useAppDispatch, useAppSelector} from '@/hooks/reduxHooks';
import spacing from '@/theme/spacing';
import {
  clearSearchResult,
  fetchMoviesBySearch,
  getSearchMoviesCanLoadMore,
  getSearchMoviesError,
  getSearchMoviesLoadingMore,
  getSearchMoviesStatus,
  getSearchResult,
  loadMoreSearchResults,
} from '@/redux/slices/searchMovies';
import {EmptyListMessageView} from '@/components/EmptyListMessageView/EmptyListMessageView';
import {NO_RESULT_ON_SEARCH, SEARCH_MOVIE_MESSAGE} from '@/constants/texts';
import {SearchMoviesItem} from '@/types/Movie';
import {LoadingView} from '@/components/LoadingView/LoadingView';
import {NavigationThemeColors} from '@/types/NavigationThemeColors';
import {AppText} from '@/components/Text/AppText';
import typography from '@/theme/typography';
import metrics from '@/theme/metrics';
import {ErrorView} from '@/components/ErrorView/ErrorView';
import {SearchMovieListItem} from '@/screens/Search/SearchMoviesListItem';

const _renderItem = ({item}: {item: SearchMoviesItem}) => {
  const {imdbID, Poster, Title, Year, Type} = item;

  return (
    <SearchMovieListItem
      imdbID={imdbID}
      Poster={Poster}
      Title={Title}
      Year={Year}
      Type={Type}
    />
  );
};

export const SearchScreen: FC = () => {
  const {colors} = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const textInputRef = useRef<TextInput>(null);

  const dispatch = useAppDispatch();
  const status = useAppSelector(getSearchMoviesStatus);
  const error = useAppSelector(getSearchMoviesError);
  const loadingMore = useAppSelector(getSearchMoviesLoadingMore);
  const canLoadMore = useAppSelector(getSearchMoviesCanLoadMore);
  const data = useAppSelector(getSearchResult);

  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (searchValue.length > 2) {
      dispatch(fetchMoviesBySearch({searchValue}));
    } else {
      dispatch(clearSearchResult());
    }
  }, [dispatch, searchValue]);

  const _fetchMoreData = () => {
    if (canLoadMore && !loadingMore) {
      dispatch(loadMoreSearchResults({searchValue}));
    }
  };

  const _renderEmptyList = useCallback(() => {
    if (status === 'loading') {
      return <LoadingView />;
    } else if (error) {
      return <ErrorView error={NO_RESULT_ON_SEARCH} />;
    } else {
      return (
        <EmptyListMessageView
          message={
            status === 'pending' || searchValue.length < 3
              ? SEARCH_MOVIE_MESSAGE
              : NO_RESULT_ON_SEARCH
          }
        />
      );
    }
  }, [error, status, searchValue]);

  const _renderListFooter = useCallback(() => {
    if (loadingMore && canLoadMore) {
      return (
        <View style={styles.footerContainer}>
          <ActivityIndicator color={colors.primary} size={'large'} />
        </View>
      );
    } else if (data.length > 0 && !canLoadMore) {
      return (
        <View style={styles.footerContainer}>
          <AppText style={styles.footerMessage}>No more movies to show</AppText>
        </View>
      );
    } else {
      return null;
    }
  }, [styles, colors, loadingMore, canLoadMore, data]);

  return (
    <View style={styles.container}>
      <SearchBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        ref={textInputRef}
      />
      <FlatList
        data={data}
        renderItem={_renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={_renderEmptyList}
        initialNumToRender={5}
        contentContainerStyle={styles.listContentContainer}
        onEndReached={_fetchMoreData}
        onEndReachedThreshold={0.1}
        ListFooterComponent={_renderListFooter}
        keyExtractor={item => item.imdbID}
      />
    </View>
  );
};

type Styles = {
  container: ViewStyle;
  activityIndicator: ViewStyle;
  listContentContainer: ViewStyle;
  text: TextStyle;
  footerMessage: TextStyle;
  footerContainer: ViewStyle;
};

const createStyles = (colors: NavigationThemeColors) =>
  StyleSheet.create<Styles>({
    container: {
      flex: 1,
    },
    text: {
      color: colors.text,
    },
    activityIndicator: {
      marginTop: 10,
    },
    listContentContainer: {
      flexGrow: 1,
      paddingBottom: spacing.xl,
      paddingHorizontal: spacing.m,
    },
    footerMessage: {
      ...typography.c1,
    },
    footerContainer: {
      alignItems: 'center',
      marginVertical: 20 * metrics.verticalRem,
    },
  });
