import React from 'react';
import { withRouter } from 'react-router-dom';
import { Field, Form } from 'react-final-form';
import { I18n } from 'react-redux-i18n';
import { Participant } from './TreasureHuntTypes';
import ParticipantContainer from '../assets/participant/ParticipantContainer';
import IconChoice from '../assets/participant/IconChoice';
import {
  MESSAGE_PARTICIPANTS,
} from '../../const';
import participantApi from '../../network/apis/participantApi';
import { retrieveItemIfNotExpired } from '../../service/storageService';

type Props = {
    match: {
        params: {
            id: string,
        }
    },
};

type State = {
    finishingOrder: Participant[] | undefined,
    hasJoined: boolean,
    teamId: string | undefined,
};

class WinningOrder extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      finishingOrder: [],
      hasJoined: false,
      teamId: undefined,
    };
  }

  componentDidMount() {
    const idInstance = retrieveItemIfNotExpired('instanceId');
    if (idInstance) {
      const ws = new WebSocket(`ws://localhost:8000/ws/treasurehunt/${idInstance}/finish`);
      ws.onmessage = this.onReceive;
      participantApi
        .getFinishingOrder(idInstance)
        .then((response) => response.json())
        .then((finishingOrder) => {
          this.setState({ finishingOrder });
        });
    }
  }

    onReceive = (evt: MessageEvent) => {
      const data = JSON.parse(evt.data);
      if (data && data.message) {
        if (data.message === MESSAGE_PARTICIPANTS) {
          if (data.content) {
            this.setState({ finishingOrder: data.content }, () => {
            });
          }
        }
      }
    };

    render() {
      return (
        <div className="page" />
      );
    }
}

export default withRouter(WinningOrder);
