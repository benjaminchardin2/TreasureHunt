import HttpClient from '../httpClient';

const participantApi = {
  getParticipant: (teamId: string, instanceId: string) => new HttpClient(`/treasureHuntInstance/${instanceId}/participant/${teamId}/`, 'GET').execute(),
  getParticipants: (instanceId: string) => new HttpClient(`/treasureHuntInstance/${instanceId}/participant/`, 'GET').execute(),
};

export default participantApi;
