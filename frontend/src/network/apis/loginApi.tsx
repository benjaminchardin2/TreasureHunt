import HttpClient from '../httpClient';
import AuthClient from '../authClient';

const loginApi = {
  register: (credentials: object) => new HttpClient('/register/', 'POST').jsonBody(credentials).execute(),
  login: (credentials: object) => new HttpClient('/login/', 'POST').jsonBody(credentials).execute(),
  user: () => new AuthClient('/users/', 'GET').execute(),
};

export default loginApi;
