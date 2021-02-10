import React from 'react';
import { I18n } from 'react-redux-i18n';
import { Clues } from '../../treasureHunt/TreasureHuntTypes';
import FilePreviewModal from '../utils/FilePreviewModal';

type Props = {
    clues: Clues[] | undefined,
    hide: boolean,
    onClick: Function
}

function CluesContainer({ clues, hide, onClick }: Props) {
  if (clues) {
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
        {clues.map((clue: Clues, index: number) => (
          <div className={`clue ${hide ? 'hide' : ''}`}>
            <div className="classic-text bold">
              {`${I18n.t('treasurehunt.form.CLUES')} N°${index + 1}:`}
            </div>
            <div className="clue-infos">
              <div className="secondary-text">{clue.message}</div>
              <div className="secondary-text">{`${I18n.t('clues.CODE')} ${clue.code}`}</div>
              <FilePreviewModal fileUrl={clue.file} />
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (<></>);
}

export default CluesContainer;
