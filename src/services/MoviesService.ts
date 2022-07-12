import axios from 'axios';
import {API_KEY, BASE_API_URL} from '@/config';

const MOVIES_API_BASE_URL = `${BASE_API_URL}`;

class MoviesService {
  async getMovieById(id: string) {
    return axios.get(MOVIES_API_BASE_URL, {
      params: {
        i: id,
        apiKey: API_KEY,
      },
    });
  }

  async getMovies() {
    return axios.get(MOVIES_API_BASE_URL);
  }

  async searchMovies(searchValue: string, page: number) {
    return axios.get(MOVIES_API_BASE_URL, {
      params: {
        s: searchValue,
        page,
        apiKey: API_KEY,
      },
    });
  }
}

export default new MoviesService();
