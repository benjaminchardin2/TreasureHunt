import React from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { Participant } from './TreasureHuntTypes';
import {
  BACKEND_URL,
  MESSAGE_PARTICIPANTS,
} from '../../const';
import participantApi from '../../network/apis/participantApi';
import { retrieveItemIfNotExpired } from '../../service/storageService';
import treasureHuntInstanceApi from '../../network/apis/treasureHuntInstanceApi';
import ParticipantTile from '../assets/participant/ParticipantTile';

type Props = {
};

type State = {
    finishingOrder: Participant[] | undefined,
    startTime: moment.Moment | undefined,
};

class WinningOrder extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      finishingOrder: [],
      startTime: undefined,
    };
  }

  componentDidMount() {
    const idInstance = retrieveItemIfNotExpired('instanceId');
    if (idInstance) {
      const ws = new WebSocket(`ws://${BACKEND_URL}/ws/treasurehunt/${idInstance}/finish`);
      ws.onmessage = this.onReceive;
      participantApi
        .getFinishingOrder(idInstance)
        .then((response) => response.json())
        .then((finishingOrder) => {
          this.setState({ finishingOrder });
        });
      treasureHuntInstanceApi
        .getStartTime(idInstance)
        .then((response) => response.text())
        .then((startTime) => {
          const startTimeMoment = moment(startTime);
          this.setState({
            startTime: startTimeMoment,
          });
        });
    }
  }

    onReceive = (evt: MessageEvent) => {
      const data = JSON.parse(evt.data);
      if (data && data.message) {
        if (data.message === MESSAGE_PARTICIPANTS) {
          if (data.content) {
            this.setState({ finishingOrder: data.content });
          }
        }
      }
    };

    render() {
      const { startTime, finishingOrder } = this.state;
      const teamId = retrieveItemIfNotExpired('teamId');

      return (
        <div className="page">
          <div className="page-content">
            <div className="page-background">
              <div className="launch-container">
                <div className="participant-container">
                  <div className="participants-list">
                    {
                startTime && finishingOrder && finishingOrder.length > 0
                && finishingOrder.map(
                  (team, index) => (
                    <div key={team.id}>
                      <ParticipantTile
                        participant={team}
                        teamId={teamId}
                        startTime={startTime}
                        rank={index + 1}
                      />
                    </div>
                  ),
                )
              }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
}

export default withRouter(WinningOrder);
