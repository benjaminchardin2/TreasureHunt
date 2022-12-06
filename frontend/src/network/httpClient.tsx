import { getError } from './handleError';
import {HTTP_BACKEND_URL, baseApiUrl} from '../const';

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

    mediaUrl: boolean;

    bodyValue: string | null;

    constructor(url: string, method: string = 'GET', mediaUrl: boolean = false) {
      this.url = url;
      this.headersValue = {};
      this.methodvalue = method;
      this.bodyValue = null;
      this.mediaUrl = mediaUrl;
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
      return fetch(this.mediaUrl ? HTTP_BACKEND_URL + this.url : (HTTP_BACKEND_URL + baseApiUrl + this.url), {
        headers: this.headersValue,
        method: this.methodvalue,
        body: this.bodyValue,
        credentials: 'same-origin',
      })
        .then(getError);
    }
}
