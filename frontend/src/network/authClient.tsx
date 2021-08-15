import HttpClient from './httpClient';

export default class AuthClient extends HttpClient {
  constructor(apiExtensionUrl: string, method: string = 'GET') {
    super(apiExtensionUrl, method);
    this.headers({ Authorization: `Token ${localStorage.getItem('token')}`, 'Content-Type': 'application/json' });
  }
}
