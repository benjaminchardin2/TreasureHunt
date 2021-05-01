import HttpClient from '../httpClient';

const participantApi = {
  getParticipant: (teamId: string) => new HttpClient(`/participant/${teamId}`, 'GET').execute(),
};

export default participantApi;
