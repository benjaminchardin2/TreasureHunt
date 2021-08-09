import React from 'react';
import { withRouter } from 'react-router-dom';
import ReactModal from 'react-modal';
import { I18n } from 'react-redux-i18n';
import { Clues } from './TreasureHuntTypes';
import { retrieveItemIfNotExpired } from '../../service/storageService';
import cluesApi from '../../network/apis/cluesApi';
import { HOME_PAGE_ROUTE } from '../../const';
import CluePlay from '../assets/clues/CluePlay';
import CodeInput from '../assets/clues/CodeInput';
import Loader from '../assets/utils/Loader';

type Props = {
  history: any
};

type State = {
  actualClue: Clues | undefined,
  showCode: boolean,
};

class Play extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      actualClue: undefined,
      showCode: false,
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

  updateClue = (clue: Clues) => {
    this.setState({ actualClue: clue, showCode: false });
  };

  handleOpenModal = () => {
    this.setState({ showCode: true });
  }

  handleCloseModal = () => {
    this.setState({ showCode: false });
  };

  render() {
    const { actualClue, showCode } = this.state;
    const teamId = retrieveItemIfNotExpired('teamId');

    return (
      <div className="page">
        <div className="page-content">
          <div className="page-background">
            <div className="play-container">
              {actualClue && <CluePlay clue={actualClue} />}
              {!actualClue && <Loader />}
              <ReactModal
                isOpen={showCode}
                contentLabel="Modal code validation"
                className="fullscreen-modal"
              >
                <CodeInput teamId={teamId} updateClue={this.updateClue} closeModal={this.handleCloseModal} />
              </ReactModal>
              <div className="button-group">
                <button
                  type="button"
                  className="button primary"
                  onClick={this.handleOpenModal}
                >
                  {I18n.t('treasurehunt.play.ENTER_CODE')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Play);
