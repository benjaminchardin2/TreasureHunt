import HttpClient from '../httpClient';

const cluesApi = {
  getLastObtainedClue: (teamId: string) => new HttpClient(`/participant/${teamId}/clues/last/`, 'GET').execute(),
  tryToGetNextClue: (teamId: string, code: string) => new HttpClient(`/participant/${teamId}/clues/next/`, 'POST').jsonBody(code).execute(),
};

export default cluesApi;
