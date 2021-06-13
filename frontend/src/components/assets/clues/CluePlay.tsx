import React from 'react';
import { I18n } from 'react-redux-i18n';
import { Clues } from '../../treasureHunt/TreasureHuntTypes';
import FilePreviewModal from '../utils/FilePreviewModal';
import File from '../utils/File';

type Props = {
    clue : Clues | undefined
}

function CluePlay({ clue }: Props) {
  return (
    <div className="play-clue">
      {clue && (
      <div className="clue">
        <div className="classic-text bold">
          {`${I18n.t('treasurehunt.play.YOUR_CLUE')}`}
        </div>
        <div className="clue-infos">
          <span>{I18n.t('treasurehunt.play.MESSAGE')}</span>
          <div className="clue-text secondary-text">{clue.message}</div>
          <div className="file-container">
            {clue.file && (
            <div>
              <span>{I18n.t('treasurehunt.play.FILE')}</span>
              <File fileUrl={clue.file} />
            </div>
            )}
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

export default CluePlay;
