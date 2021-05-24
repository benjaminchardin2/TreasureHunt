import React from 'react';
import { I18n } from 'react-redux-i18n';
import { withRouter } from 'react-router-dom';
import { Clues } from './TreasureHuntTypes';
import { retrieveItemIfNotExpired } from '../../service/storageService';
import cluesApi from '../../network/apis/cluesApi';
import FilePreviewModal from '../assets/utils/FilePreviewModal';
import { HOME_PAGE_ROUTE } from '../../const';

type Props = {
  history: any
};

type State = {
  actualClue: Clues | undefined,
};

class Play extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      actualClue: undefined,
    };
  }

  componentDidMount() {
    const { history } = this.props;
    const teamId = retrieveItemIfNotExpired('teamId');
    if (teamId) {
      cluesApi
        .getLastObtainedClue(teamId)
        .then((response) => response.json())
        .then((attributedClue) => {
          this.setState({ actualClue: attributedClue });
        });
    } else {
      history.push(HOME_PAGE_ROUTE);
    }
  }

  render() {
    const { actualClue } = this.state;

    return (
      <div className="page">
        {actualClue && (
        <div className="clue">
          <div className="classic-text bold">
            {`${I18n.t('treasurehunt.form.CLUES')}`}
          </div>
          <div className="clue-infos">
            <div className="secondary-text">{actualClue.message}</div>
            <FilePreviewModal fileUrl={actualClue.file} />
          </div>
        </div>
        )}
      </div>
    );
  }
}

export default withRouter(Play);
