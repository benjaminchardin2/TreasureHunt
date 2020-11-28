import HttpClient from './httpClient';

export default class authClient extends HttpClient {
  constructor(apiExtensionUrl: string, method: string = 'GET') {
    super(apiExtensionUrl, method);
    this.headers(new Headers({ Authorization: `Token ${localStorage.getItem('token')}`, 'Content-Type': 'application/json' }));
  }
}
