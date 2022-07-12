import type {PayloadAction} from '@reduxjs/toolkit';
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import MoviesService from '@/services/MoviesService';
import {SearchMoviesItem} from '@/types/Movie';
import {GET_ALL_MOVIES_IS_NOT_ARRAY} from '@/constants/errorTexts';
import {getErrorMessage} from '@/utils/errorUtils';
import {RootState} from '@/redux/store';
import {getBlacklistedMovies} from '@/utils/localStorage';

const searchMoviesAdapter = createEntityAdapter<SearchMoviesItem>({
  selectId: movie => movie.imdbID,
});

type SearchResponse = {
  Search: SearchMoviesItem[];
  totalResults: number;
  Response: boolean;
};

export const loadMoreSearchResults = createAsyncThunk<
  {
    movies: SearchMoviesItem[];
    totalResults: number;
  },
  {
    searchValue: string;
  },
  {state: RootState}
>(
  'searchMovies/loadMoreSearchResults',
  async ({searchValue}, {rejectWithValue, getState}) => {
    try {
      const rootState: RootState = getState();
      const response: {data: SearchResponse} = await MoviesService.searchMovies(
        searchValue,
        rootState.searchMovies.page,
      );
      const unfilteredMovies = response?.data?.Search;

      const totalResults = response?.data?.totalResults;

      if (!Array.isArray(unfilteredMovies)) {
        return rejectWithValue(GET_ALL_MOVIES_IS_NOT_ARRAY);
      }
      const blacklistedMovies = getBlacklistedMovies();
      const movies = unfilteredMovies.filter(
        item => !blacklistedMovies[item.imdbID],
      );

      return {movies, totalResults};
    } catch (error) {
      return rejectWithValue(getErrorMessage(error) as string);
    }
  },
);

export const fetchMoviesBySearch = createAsyncThunk<
  {
    movies: SearchMoviesItem[];
    totalResults: number;
  },
  {
    searchValue: string;
  },
  {state: RootState}
>(
  'searchMovies/fetchMoviesBySearch',
  async ({searchValue}, {rejectWithValue}) => {
    try {
      const response: {data: SearchResponse} = await MoviesService.searchMovies(
        searchValue,
        1,
      );
      const unfilteredMovies = response?.data?.Search;

      const totalResults = response?.data?.totalResults;

      if (!Array.isArray(unfilteredMovies)) {
        return rejectWithValue(GET_ALL_MOVIES_IS_NOT_ARRAY);
      }
      const blacklistedMovies = getBlacklistedMovies();
      const movies = unfilteredMovies.filter(
        item => !blacklistedMovies[item.imdbID],
      );

      return {movies, totalResults};
    } catch (error) {
      return rejectWithValue(getErrorMessage(error) as string);
    }
  },
);

export const searchMoviesSlice = createSlice({
  name: 'searchMovies',
  initialState: searchMoviesAdapter.getInitialState({
    error: null as string | null,
    status: 'pending' as string,
    loadingMore: false as boolean,
    canLoadMore: false as boolean,
    page: 1 as number,
  }),
  reducers: {
    clearSearchResult: state => {
      searchMoviesAdapter.setAll(state, []);
      state.page = 1;
      state.loadingMore = false;
      state.canLoadMore = false;
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMoviesBySearch.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        fetchMoviesBySearch.fulfilled,
        (
          state,
          action: PayloadAction<{
            movies: SearchMoviesItem[];
            totalResults: number;
          }>,
        ) => {
          const {movies, totalResults} = action.payload;

          searchMoviesAdapter.setAll(state, movies);

          state.status = 'succeeded';
          state.page = state.page + 1;
          state.canLoadMore =
            searchMoviesAdapter.getSelectors().selectTotal(state) <
            totalResults;
          state.error = null;
        },
      )
      .addCase(fetchMoviesBySearch.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
        searchMoviesAdapter.setAll(state, []);
      })
      .addCase(loadMoreSearchResults.pending, state => {
        state.loadingMore = true;
      })
      .addCase(
        loadMoreSearchResults.fulfilled,
        (
          state,
          action: PayloadAction<{
            movies: SearchMoviesItem[];
            totalResults: number;
          }>,
        ) => {
          const {movies, totalResults} = action.payload;

          searchMoviesAdapter.upsertMany(state, movies);

          state.canLoadMore =
            searchMoviesAdapter.getSelectors().selectTotal(state) <
            totalResults;

          state.loadingMore = false;
          state.error = null;
          state.page = state.page + 1;
        },
      )
      .addCase(loadMoreSearchResults.rejected, state => {
        state.loadingMore = false;
        state.canLoadMore = false;
      });
  },
});

const searchMoviesSelectors = searchMoviesAdapter.getSelectors<RootState>(
  state => state.searchMovies,
);

export const getSearchMoviesStatus = (state: RootState) =>
  state.searchMovies.status;

export const getSearchMoviesError = (state: RootState) =>
  state.searchMovies.error;

export const getSearchMoviesCanLoadMore = (state: RootState) =>
  state.searchMovies.canLoadMore;

export const getSearchMoviesLoadingMore = (state: RootState) =>
  state.searchMovies.loadingMore;

export const getSearchResult = searchMoviesSelectors.selectAll;

export const {clearSearchResult} = searchMoviesSlice.actions;

export default searchMoviesSlice.reducer;
