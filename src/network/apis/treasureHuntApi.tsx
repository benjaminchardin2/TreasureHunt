import HttpClient from '../httpClient';

const treasureHuntApi = {
  create: (values: object) => new HttpClient('http://127.0.0.1:8000/api/treasureHunt', 'POST').jsonBody(values).execute(),
  get: () => new HttpClient('http://127.0.0.1:8000/api/treasureHunt', 'GET').execute(),
};

export default treasureHuntApi;
