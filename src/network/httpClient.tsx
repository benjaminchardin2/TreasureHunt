import { getError } from './handleError';
import { baseApiUrl } from '../const';

const stringify = (body) => {
  if (typeof body === 'string') {
    return body;
  }
  return JSON.stringify(body);
};

export default class HttpClient {
    url: string;

    headersValue: HeadersInit;

    methodvalue: string;

    bodyValue: string | null;

    constructor(url: string, method: string = 'GET') {
      this.url = url;
      this.headersValue = {};
      this.methodvalue = method;
      this.bodyValue = null;
    }

    headers(headers: HeadersInit) {
      Object.assign(this.headersValue, headers);
      return this;
    }

    body(body: string) {
      this.bodyValue = body;
      return this;
    }

    jsonBody(objectBody: Object) {
      this.headers({ 'Content-Type': 'application/json' });
      this.body(stringify(objectBody));
      return this;
    }

    execute() {
      return fetch(baseApiUrl + this.url, {
        headers: this.headersValue,
        method: this.methodvalue,
        body: this.bodyValue,
        credentials: 'same-origin',
      })
        .then(getError);
    }
}
