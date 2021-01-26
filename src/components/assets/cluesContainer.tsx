import React from 'react';
import { I18n } from 'react-redux-i18n';
import { Clues } from '../treasureHunt/TreasureHuntTypes';

type Props = {
    clues: Clues[] | undefined
}

function CluesContainer({ clues } : Props) {
  return (
    <div className="clues-container">
      {clues?.map((clue, index) => (
        <div className="clue">
          <h4>
              {`${I18n.t('treasurehunt.form.CLUES')} N°${index + 1}:`}
          </h4>
          <div>{clue.message}</div>
          <div>{clue.code}</div>
        </div>
      ))}
    </div>
  );
}

export default CluesContainer;
