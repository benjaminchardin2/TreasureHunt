import React from 'react';
import { I18n } from 'react-redux-i18n';
import {Clues, Participant} from '../../treasureHunt/TreasureHuntTypes';
import FilePreviewModal from '../utils/FilePreviewModal';

type Props = {
    participants: Participant[] | undefined,
    hide: boolean,
    onClick: Function
}

function ParticipantContainer({ participants, hide, onClick }: Props) {
    if (participants) {
        return (
            <div className={`clues-container ${hide ? 'hide' : ''}`}>
                <div className="button-group">
                    <button
                        className="button primary"
                        type="button"
                        onClick={() => { onClick(); }}
                    >
                        {hide ? I18n.t('button.SHOW') : I18n.t('button.HIDE')}
                    </button>
                </div>
                {participants.map((participant: Participant, index: number) => (
                    <div className={`clue ${hide ? 'hide' : ''}`}>
                        <div className="classic-text bold">
                            {`${I18n.t('treasurehunt.form.CLUES')} N°${index + 1}:`}
                        </div>
                        <div className="clue-infos">
                            <div className="secondary-text">${participant.teamName}</div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
    return (<></>);
}

export default ParticipantContainer;
