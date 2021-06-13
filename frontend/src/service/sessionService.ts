import { retrieveItemIfNotExpired } from './storageService';
import participantApi from '../network/apis/participantApi';

export const isTeamActive = (idInstance: string) => {
  const teamId: string = retrieveItemIfNotExpired('teamId');
  if (teamId) {
    participantApi
      .getParticipant(teamId, idInstance)
      .then((response) => response.json())
      .then((participant) => !!participant);
  }
  return false;
};
