import React from 'react';
import { I18n } from 'react-redux-i18n';
import { Clues } from '../../treasureHunt/TreasureHuntTypes';
import FilePreview from '../utils/FilePreview';

type Props = {
    clues: Clues[] | undefined
}

function CluesContainer({ clues }: Props) {
  if (clues) {
    return (
      <div className="clues-container">
        {clues.map((clue: Clues, index: number) => (
          <div className="clue">
            <div className="classic-text bold">
              {`${I18n.t('treasurehunt.form.CLUES')} N°${index + 1}:`}
            </div>
            <div className="clue-infos">
              <div className="secondary-text">{clue.message}</div>
              <div className="secondary-text">{`${I18n.t('clues.CODE')} ${clue.code}`}</div>
              <FilePreview fileUrl={clue.file} />
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (<></>);
}

export default CluesContainer;
