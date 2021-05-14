import React from 'react';
import { withRouter } from 'react-router-dom';
import { Field, Form } from 'react-final-form';
import { I18n } from 'react-redux-i18n';
import moment from 'moment';
import { Participant } from './TreasureHuntTypes';
import ParticipantContainer from '../assets/participant/ParticipantContainer';
import IconChoice from '../assets/participant/IconChoice';
import {
  LAUNCH, MESSAGE_PARTICIPANTS, TREASURE_HUNT_PLAY, TREASURE_HUNT_PLAY_ROUTE, TREASURE_HUNT_SUPERVISION_ROUTE,
} from '../../const';
import participantApi from '../../network/apis/participantApi';
import { retrieveItemIfNotExpired, setItemWithExpiry } from '../../service/storageService';

type Props = {
    history: any,
    match: {
        params: {
            id: string,
        }
    },
};

type State = {
    participants: Participant[] | undefined,
    ws: WebSocket | undefined,
    hasJoined: boolean,
    teamId: string | undefined,
    teamName: string | undefined,
};

class Join extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      participants: [],
      ws: undefined,
      hasJoined: false,
      teamId: undefined,
      teamName: undefined,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const idInstance = params.id;
    if (idInstance) {
      const ws = new WebSocket(`ws://localhost:8000/ws/treasurehunt/${idInstance}/`);
      this.setState({ ws });
      ws.onmessage = this.onReceive;
      participantApi
        .getParticipants(idInstance)
        .then((response) => response.json())
        .then((participants) => {
          this.setState({ participants });
        });
    }

    const teamId = retrieveItemIfNotExpired('teamId');

    if (teamId) {
      participantApi
        .getParticipant(teamId, idInstance)
        .then((response) => response.json())
        .then((participant) => {
          if (participant.id) {
            this.setState({
              teamId: participant.id,
              teamName: participant.teamName,
              hasJoined: true,
            });
          }
        });
    }
  }

    onReceive = (evt: MessageEvent) => {
      const { history, match } = this.props;
      const { params } = match;
      const idInstance = params.id;
      const { teamName } = this.state;
      if (evt.data === LAUNCH) {
        history.push(`${TREASURE_HUNT_PLAY}/${idInstance}`);
      } else {
        const data = JSON.parse(evt.data);
        if (data && data.message) {
          if (data.message === MESSAGE_PARTICIPANTS) {
            if (data.content) {
              this.setState({ participants: data.content }, () => {
                if (teamName) {
                  const team = data.content.filter((participant) => participant.teamName === teamName);
                  if (team.length > 0) {
                    setItemWithExpiry(team[0].id, 'teamId', 2);
                    this.setState({ teamId: team[0].id });
                  }
                }
              });
            }
          }
        }
      }
    };

    onSubmit = (values: any) => {
      values.id = this.props.match.params.id;
      if (this.state.ws) {
        this.state.ws.send(JSON.stringify(values));
        this.setState({
          hasJoined: true,
          teamName: values.teamName,
        });
      }
    };

    render() {
      const { participants, hasJoined, teamId } = this.state;
      return (
        <div className="page">
          <div className="page-content">
            <div className="page-background">
              <div className="launch-container">
                <div className="participant-container">
                  <ParticipantContainer participants={participants} teamId={teamId} />
                  <div className="form">
                    <Form
                      onSubmit={this.onSubmit}
                      render={(formRenderProps) => (
                        <form onSubmit={formRenderProps.handleSubmit}>
                          <div className="form-content">
                            <div className="form-group">
                              <Field
                                id="name-input"
                                name="teamName"
                                component="input"
                                className="form-field"
                                type="text"
                                placeholder={I18n.t('join.TEAM_NAME')}
                                required
                              />
                            </div>
                            <Field
                              id="icon-input"
                              name="icon"
                              component={IconChoice}
                              className="form-field"
                              initialValue={1}
                            />
                            <div className="button-group">
                              <button
                                className="button primary classic-text"
                                type="submit"
                                disabled={formRenderProps.invalid || hasJoined}
                              >
                                {I18n.t('join.JOIN')}
                              </button>
                            </div>
                          </div>
                        </form>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
}

export default withRouter(Join);
