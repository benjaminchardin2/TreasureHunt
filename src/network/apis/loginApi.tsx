import HttpClient from '../httpClient';

const loginApi = {
  register: (credentials: object) => new HttpClient('/register/', 'POST').jsonBody(credentials).execute(),
  login: (credentials: object) => new HttpClient('/login/', 'POST').jsonBody(credentials).execute(),

};

export default loginApi;
