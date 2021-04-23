import React from 'react';
import { I18n } from 'react-redux-i18n';
import { Participant } from '../../treasureHunt/TreasureHuntTypes';

type Props = {
    participants: Participant[] | undefined,
}

function ParticipantContainer({ participants }: Props) {
  if (participants) {
    return (
      <div className="participants-list">
        {participants.length === 0 && <div>{I18n.t('treasurehunt.form.NO_PARTICIPANT')}</div>}
        {participants.map((participant: Participant, index: number) => (
          <div className="participant">
            <div className="classic-text bold">
              {`${I18n.t('treasurehunt.form.PARTICIPANT')} N°${index + 1}:`}
            </div>
            <div className="participant-infos">
              <div className="secondary-text">{participant.teamName}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (<></>);
}

export default ParticipantContainer;
