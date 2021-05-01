import React from 'react';
import { withRouter } from 'react-router-dom';
import { Field, Form } from 'react-final-form';
import { I18n } from 'react-redux-i18n';
import { Participant } from './TreasureHuntTypes';
import ParticipantContainer from '../assets/participant/ParticipantContainer';
import IconChoice from '../assets/participant/IconChoice';
import { MESSAGE_PARTICIPANTS } from '../../const';
import participantApi from '../../network/apis/participantApi';

type Props = {
    history: any,
    match: {
        params: {
            id: String,
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

class treasureHuntJoin extends React.Component<Props, State> {
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
    const idInstance = this.props.match.params.id;
    if (idInstance) {
      const ws = new WebSocket(`ws://localhost:8000/ws/treasurehunt/${idInstance}/`);
      this.setState({ ws });
      ws.onmessage = this.onReceive;
    }

    const teamId = localStorage.getItem('teamId');

    if (teamId) {
      participantApi
        .getParticipant(teamId)
        .then((response) => response.json())
        .then((participant) => {
          this.setState({
            teamId: participant.id,
            teamName: participant.teamName,
            hasJoined: true,
          });
        });
    }
  }

    onReceive = (evt: MessageEvent) => {
      const { teamName } = this.state;
      const data = JSON.parse(evt.data);
      if (data && data.message) {
        switch (data.message) {
          case MESSAGE_PARTICIPANTS:
            if (data.content) {
              this.setState({ participants: data.content }, () => {
                if (teamName) {
                  const team = data.content.filter((participant) => participant.teamName === teamName);
                  if (team.length > 0) {
                    localStorage.setItem('teamId', team[0].id);
                    this.setState({ teamId: team[0].id });
                  }
                }
              });
            }
            break;
          default:
            break;
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

export default withRouter(treasureHuntJoin);
