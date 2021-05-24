import HttpClient from '../httpClient';

const cluesApi = {
  getLastObtainedClue: (teamId: string) => new HttpClient(`/participant/${teamId}/clues/last/`, 'GET').execute(),
};

export default cluesApi;
