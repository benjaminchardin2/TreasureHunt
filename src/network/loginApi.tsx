import HttpClient from "./httpClient";


const loginApi = {
    login: (credentials: object) => new HttpClient('http://127.0.0.1:8000/api/register/', 'POST').jsonBody(credentials).execute(),
}

export default loginApi;