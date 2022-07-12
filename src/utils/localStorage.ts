import {MMKV} from 'react-native-mmkv';
import {Movie} from '@/types/Movie';

export const FAVORITE_MOVIES_STORAGE_KEY = '@favorite_movies';
export const BLACKLIST_STORAGE_KEY = '@blacklist';
export const localStorage = new MMKV();

export const toggleFavoriteMoviesOnLocalStorage = (movie: Movie) => {
  const favoriteMovies = getFavoriteMoviesFromLocalStorage();

  if (favoriteMovies[movie.imdbID]) {
    delete favoriteMovies[movie.imdbID];
  } else {
    favoriteMovies[movie.imdbID] = movie;
  }
  localStorage.set(FAVORITE_MOVIES_STORAGE_KEY, JSON.stringify(favoriteMovies));
  return favoriteMovies;
};

export const getFavoriteMoviesFromLocalStorage = () => {
  const jsonFavoriteMovies = localStorage.getString(
    FAVORITE_MOVIES_STORAGE_KEY,
  );
  if (jsonFavoriteMovies) {
    return JSON.parse(jsonFavoriteMovies);
  } else {
    return {};
  }
};

export const toggleMovieBlacklist = (id: string) => {
  const blacklistedMovies = getBlacklistedMovies();

  if (blacklistedMovies[id]) {
    delete blacklistedMovies[id];
  } else {
    blacklistedMovies[id] = true;
  }
  localStorage.set(BLACKLIST_STORAGE_KEY, JSON.stringify(blacklistedMovies));
};

export const getBlacklistedMovies = () => {
  const blacklistedMovies = localStorage.getString(BLACKLIST_STORAGE_KEY);
  if (blacklistedMovies) {
    return JSON.parse(blacklistedMovies);
  } else {
    return {};
  }
};
