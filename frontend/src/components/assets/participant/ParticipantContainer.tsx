import React from 'react';
import { I18n } from 'react-redux-i18n';
import { Participant } from '../../treasureHunt/TreasureHuntTypes';
import ParticipantTile from './ParticipantTile';

type Props = {
    participants: Participant[] | undefined,
    teamId?: string | undefined,
}

function ParticipantContainer({ participants, teamId }: Props) {
  if (participants) {
    return (
      <div className="participants-list">
        {participants.length === 0 && <div>{I18n.t('treasurehunt.form.NO_PARTICIPANT')}</div>}
        {participants.map((participant: Participant) => (
          <ParticipantTile participant={participant} teamId={teamId} />
        ))}
      </div>
    );
  }
  return (<></>);
}

export default ParticipantContainer;
