import HttpClient from '../httpClient';

const fileApi = {
  get: (url: string) => new HttpClient(url, 'GET', true).execute(),
};

export default fileApi;
