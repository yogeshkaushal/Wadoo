import axios from 'axios';
import {GOOGLE_BOOKS_API_KEY, OMDB_API_KEY} from '@env';
import {url} from '../utils/Constants';

const getBooksByName = async (text, maxItems) => {
  const result = await axios.get(
    url.GOOGLE_API_BASE_URL +
      '/books/v1/volumes?q=' +
      text +
      '&key=' +
      GOOGLE_BOOKS_API_KEY +
      `&maxResults=${maxItems}`,
  );

  return result;
};

const getMovies = async (text, page) => {
  const result = await axios.get(
    `${url.OMDB_API_BASE_URL + OMDB_API_KEY}&s=*${text}*&page=${page}`,
  );

  return result;
};

export {getBooksByName, getMovies};
