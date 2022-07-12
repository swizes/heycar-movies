export type Movie = {
  Title: string;
  Type: string;
  Poster: string;
  Year: string;
  imdbID: string;
  Plot: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string[];
  Director: string;
  Writer: string;
  Actors: string;
  Language: string;
  Country: string;
  Awards: string;
  imdbRating: string;
  Ratings: RatingItem[];
};

export type SearchMoviesItem = {
  Title: string;
  Type: string;
  Poster: string;
  Year: string;
  imdbID: string;
};

export type RatingItem = {
  Source: string;
  Value: string;
};
