import HttpClient from '../httpClient';

const participantApi = {
  getParticipant: (teamId: string, instanceId: string) => new HttpClient(`/treasureHuntInstance/${instanceId}/participant/${teamId}/`, 'GET').execute(),
  getParticipants: (instanceId: string) => new HttpClient(`/treasureHuntInstance/${instanceId}/participant/`, 'GET').execute(),
  getFinishingOrder: (instanceId: string) => new HttpClient(`/treasureHuntInstance/${instanceId}/participants/finish`, 'GET').execute(),
};

export default participantApi;
