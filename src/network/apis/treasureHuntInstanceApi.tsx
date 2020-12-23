import HttpClient from '../httpClient';

const treasureHuntInstanceApi = {
  create: (values: object) => new HttpClient('http://127.0.0.1:8000/api/treasureHuntInstance', 'POST').jsonBody(values).execute(),
};

export default treasureHuntInstanceApi;
