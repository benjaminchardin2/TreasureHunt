import AuthClient from '../authClient';

const treasureHuntApi = {
  create: (values: object) => new AuthClient('/treasureHunt/', 'POST').jsonBody(values).execute(),
  get: () => new AuthClient('/treasureHunt/', 'GET').execute(),
};

export default treasureHuntApi;
