import React from 'react';
import {withRouter} from 'react-router-dom';
import {Participant} from './TreasureHuntTypes';
import ParticipantContainer from "../assets/participant/ParticipantContainer";
import {Field, Form} from "react-final-form";
import {I18n} from 'react-redux-i18n';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import IconChoice from "../assets/participant/IconChoice";

type Props = {
    history: any,
    match: {
        params: {
            id: String,
        }
    },
};

type State = {
    participants: Participant[] | undefined
    ws: WebSocket | undefined
};

class treasureHuntJoin extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            participants: undefined,
            ws: undefined,
        };
    }

    componentDidMount() {
        const idInstance = this.props.match.params.id;
        if (idInstance) {
            const ws = new WebSocket(`ws://localhost:8000/ws/treasurehunt/${idInstance}/`);
            this.setState({ws});
            ws.onopen = (evt: Event) => {
                console.log('connected');
            };
            ws.onmessage = (evt: MessageEvent) => {
                this.setState({participants: JSON.parse(evt.data)})
            }
        }
    }

    onSubmit = (values: any) => {
        values.id = this.props.match.params.id;
        if (this.state.ws) {
            this.state.ws.send(JSON.stringify(values))
        }
    };

    render() {
        const {participants} = this.state;
        return (
            <div className="page">
                <div className="page-content">
                    <div className="page-background">
                        <div className="launch-container">
                            <div className='participant-container'>
                                <ParticipantContainer participants={participants}/>
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
                                                            disabled={formRenderProps.invalid}
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
