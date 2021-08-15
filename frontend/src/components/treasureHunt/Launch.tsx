import React from 'react';
import { withRouter } from 'react-router-dom';
import { I18n } from 'react-redux-i18n';
import { Participant, TreasureHuntInstance } from './TreasureHuntTypes';
import {
  HTTP_BACKEND_URL,
  HOME_PAGE_ROUTE,
  LAUNCH,
  MESSAGE_PARTICIPANTS,
  TREASURE_HUNT_SUPERVISION_ROUTE, BACKEND_URL,
} from '../../const';
import treasureHuntInstanceApi from '../../network/apis/treasureHuntInstanceApi';
import CluesContainer from '../assets/clues/CluesContainer';
import ParticipantContainer from '../assets/participant/ParticipantContainer';
import CopyButton from '../assets/utils/CopyButton';
import { retrieveItemIfNotExpired, setItemWithExpiry } from '../../service/storageService';
import participantApi from '../../network/apis/participantApi';

type Props = {
    history: any,
    location: {
        state: {
            id: string | null
        }
    }
};

type State = {
    treasureHuntInstance: TreasureHuntInstance,
    hide: boolean,
    participants: Participant[] | undefined,
};

class Launch extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      hide: false,
      treasureHuntInstance: undefined,
      participants: [],
    };
  }

  componentDidMount() {
    const { location } = this.props;
    let idInstance = location?.state?.id;
    const { history } = this.props;
    if (idInstance) {
      setItemWithExpiry(idInstance, 'instanceId', 2);
    } else {
      idInstance = retrieveItemIfNotExpired('instanceId');
      if (!idInstance) {
        history.push(HOME_PAGE_ROUTE);
      }
    }
    if (idInstance) {
      participantApi
        .getParticipants(idInstance)
        .then((response) => response.json())
        .then((participants) => {
          this.setState({ participants });
        });
      treasureHuntInstanceApi
        .get(idInstance)
        .then((response) => response.json())
        .then((treasureHuntInstance) => this.setState({ treasureHuntInstance }));
      const ws = new WebSocket(`wss://${BACKEND_URL}/ws/treasurehunt/${idInstance}/`);
      ws.onmessage = this.onReceive;
    }
  }

  onReceive = (evt: MessageEvent) => {
    const { history } = this.props;
    if (evt.data === LAUNCH) {
      history.push(TREASURE_HUNT_SUPERVISION_ROUTE);
    } else {
      const data = JSON.parse(evt.data);
      if (data && data.message) {
        if (data.message === MESSAGE_PARTICIPANTS) {
          if (data.content) {
            this.setState({ participants: data.content });
          }
        }
      }
    }
  };

  launchGame = () => {
    const { treasureHuntInstance } = this.state;
    if (treasureHuntInstance?.id) {
      treasureHuntInstanceApi
        .launch(treasureHuntInstance.id)
        .catch();
    }
  }

  hide = () => {
    this.setState((prevState) => ({ hide: !prevState.hide }));
  };

  render() {
    const { treasureHuntInstance, hide, participants } = this.state;
    return (
      <div className="page">
        <div className="page-content">
          <div className="page-background">
            <div className="launch-container">
              <CluesContainer
                hide={hide}
                clues={treasureHuntInstance?.treasureHunt?.clues}
                onClick={this.hide}
              />
              <div className="participant-container">
                <ParticipantContainer participants={participants} />
                <CopyButton url={`${window.location.host}/treasurehunt/join/${treasureHuntInstance?.id}`} />
                <div className="button-group">
                  <button type="button" className="button primary" onClick={this.launchGame}>
                    {I18n.t('actions.LAUNCH')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Launch);
