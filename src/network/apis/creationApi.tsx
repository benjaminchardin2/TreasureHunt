import HttpClient from '../httpClient';

const creationApi = {
  create: (values: object) => new HttpClient('http://127.0.0.1:8000/api/treasureHunt', 'POST').jsonBody(values).execute(),

};

export default creationApi;
