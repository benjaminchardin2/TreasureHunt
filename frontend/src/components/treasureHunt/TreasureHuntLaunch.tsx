import React from 'react';
import { withRouter } from 'react-router-dom';
import { I18n } from 'react-redux-i18n';
import { Participant, TreasureHuntInstance } from './TreasureHuntTypes';
import { HOME_PAGE_ROUTE, MESSAGE_PARTICIPANTS } from '../../const';
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

class TreasureHuntLaunch extends React.Component<Props, State> {
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
      const ws = new WebSocket(`ws://localhost:8000/ws/treasurehunt/${idInstance}/`);
      ws.onmessage = (evt: MessageEvent) => {
        const data = JSON.parse(evt.data);
        if (data && data.message) {
          switch (data.message) {
            case MESSAGE_PARTICIPANTS:
              if (data.content) {
                this.setState({ participants: data.content });
              }
              break;
            default:
              break;
          }
        }
      };
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
                  <button type="button" className="button primary" onClick={() => {}}>
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

export default withRouter(TreasureHuntLaunch);
