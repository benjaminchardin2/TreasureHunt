import React from 'react';
import { I18n } from 'react-redux-i18n';
import { Participant } from '../../treasureHunt/TreasureHuntTypes';

type Props = {
  participant: Participant,
  teamName?: string | undefined,
}

function ParticipantTile({ participant, teamName }: Props) {
    return (
          <div className="participant">
            <img src={`/staticFiles/icons/icon_${participant.icon}.png`} alt="icon" className="icon" />
            <div className="participant-infos">
              <div className="secondary-text">
                {`${I18n.t('treasurehunt.form.PARTICIPANT')} : ${participant.teamName} ${participant.teamName === teamName ? ` ${I18n.t('treasurehunt.form.YOU')}` : ''}`}
              </div>
            </div>
          </div>
    );
}

export default ParticipantTile;
