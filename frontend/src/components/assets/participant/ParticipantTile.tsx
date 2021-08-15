import React from 'react';
import { I18n } from 'react-redux-i18n';
import moment from 'moment';
import { Participant } from '../../treasureHunt/TreasureHuntTypes';

type Props = {
  participant: Participant,
  teamId?: string | undefined,
  startTime?: moment.Moment | undefined,
  rank?: number | undefined,
}

const getParticipantGameDuration = (time: string, startTime: moment.Moment) => {
  const duration = moment.duration(moment(time).diff(startTime));
  return `${I18n.t('treasurehunt.FINISH_TIME')} : ${duration.get('hours')}:${duration.get('minutes')}:${duration.get('seconds')}`;
};

function ParticipantTile({
  participant, teamId, startTime, rank,
}: Props) {
  return (
    <div className="participant">
      {rank && (
      <div>
        {' '}
        {rank}
        {' '}
      </div>
      )}
      <img src={`/static/icons/icon_${participant.icon}.png`} alt="icon" className="icon" />
      <div className="participant-infos">
        <div className="secondary-text">
          {`${I18n.t('treasurehunt.form.PARTICIPANT')} : ${participant.teamName} ${teamId && participant.id === teamId ? ` ${I18n.t('treasurehunt.form.YOU')}` : ''}`}
        </div>
        {startTime && participant.finishTime
          && <div className="finish-time secondary-text">{getParticipantGameDuration(participant.finishTime, startTime)}</div>}
      </div>
    </div>
  );
}

export default ParticipantTile;
