import HttpClient from '../httpClient';

const treasureHuntApi = {
  create: (values: object) => new HttpClient('/treasureHunt', 'POST').jsonBody(values).execute(),
  get: () => new HttpClient('/treasureHunt', 'GET').execute(),
};

export default treasureHuntApi;
