import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {FetchStatus} from '@/types/FetchStatus';
import {FetchError} from '@/types/FetchError';
import {
  getFavoriteMoviesFromLocalStorage,
  toggleFavoriteMoviesOnLocalStorage,
} from '@/utils/localStorage';
import {Movie} from '@/types/Movie';
import {UNKNOWN_ERROR} from '@/constants/errorTexts';
import {RootState} from '@/redux/store';

const favoriteMoviesAdapter = createEntityAdapter<Movie>({
  selectId: movie => movie.imdbID,
  sortComparer: (a, b) => a.Title.localeCompare(b.Title),
});

export const fetchFavoriteMovies = createAsyncThunk(
  'favoriteMovies/fetchFavoriteMovies',
  async (_, {rejectWithValue}) => {
    try {
      const favoriteMovies: Movie[] = await getFavoriteMoviesFromLocalStorage();
      return {favoriteMovies};
    } catch (error) {
      return rejectWithValue(UNKNOWN_ERROR);
    }
  },
);

const favoriteMoviesSlice = createSlice({
  name: 'favoriteMovies',
  initialState: favoriteMoviesAdapter.getInitialState({
    status: 'pending' as FetchStatus,
    error: null as FetchError,
  }),
  reducers: {
    toggleFavorite: (state, action: PayloadAction<{movie: Movie}>) => {
      const movie = action.payload.movie;
      let favoriteMovies = toggleFavoriteMoviesOnLocalStorage(movie);
      favoriteMoviesAdapter.setAll(state, favoriteMovies);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFavoriteMovies.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        fetchFavoriteMovies.fulfilled,
        (
          state,
          action: PayloadAction<{
            favoriteMovies: Movie[];
          }>,
        ) => {
          const {favoriteMovies} = action.payload;
          state.status = 'succeeded';
          state.error = null;
          favoriteMoviesAdapter.setAll(state, favoriteMovies);
        },
      )
      .addCase(fetchFavoriteMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

const favoriteMoviesSelectors = favoriteMoviesAdapter.getSelectors<RootState>(
  state => state.favoriteMovies,
);

export const selectFavoriteMovies = favoriteMoviesSelectors.selectAll;

export const selectFavoriteMoviesStatus = (state: RootState) =>
  state.favoriteMovies.status;
export const selectFavoriteMoviesError = (state: RootState) =>
  state.favoriteMovies.error;

export const isMovieFavorite = (state: RootState, id: string | undefined) => {
  return id ? !!favoriteMoviesSelectors.selectById(state, id) : false;
};

export const {toggleFavorite} = favoriteMoviesSlice.actions;

export default favoriteMoviesSlice.reducer;
