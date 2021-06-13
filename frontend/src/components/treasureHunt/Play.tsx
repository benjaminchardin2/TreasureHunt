import React from 'react';
import { I18n } from 'react-redux-i18n';
import { withRouter } from 'react-router-dom';
import { Clues } from './TreasureHuntTypes';
import { retrieveItemIfNotExpired } from '../../service/storageService';
import cluesApi from '../../network/apis/cluesApi';
import File from '../assets/utils/File';
import { HOME_PAGE_ROUTE } from '../../const';
import CluePlay from '../assets/clues/CluePlay';
import CodeInput from '../assets/clues/CodeInput';
import Loader from "../assets/utils/Loader";

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

  updateClue = (clue: Clues) => {
    this.setState({ actualClue: clue });
  }

  render() {
    const { actualClue } = this.state;
    const teamId = retrieveItemIfNotExpired('teamId');

    return (
      <div className="page">
        <div className="page-content">
          <div className="page-background">
            <div className="play-container">
              {actualClue && <CluePlay clue={actualClue} />}
              {!actualClue && <Loader />}
              <CodeInput teamId={teamId} updateClue={this.updateClue} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Play);
