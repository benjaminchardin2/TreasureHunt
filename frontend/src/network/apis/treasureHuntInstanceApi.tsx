import HttpClient from '../httpClient';

const treasureHuntInstanceApi = {
  create: (values: object) => new HttpClient('/treasureHuntInstance/', 'POST').jsonBody(values).execute(),
  get: (id: string) => new HttpClient(`/treasureHuntInstance/${id}/`, 'GET').execute(),
  launch: (id: string) => new HttpClient(`/treasureHuntInstance/${id}/launch/`, 'POST').execute(),
};

export default treasureHuntInstanceApi;
