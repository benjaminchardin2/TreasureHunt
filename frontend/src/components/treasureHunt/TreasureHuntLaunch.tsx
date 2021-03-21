import React from 'react';
import { withRouter } from 'react-router-dom';
import {Participant, TreasureHuntInstance} from './TreasureHuntTypes';
import { HOME_PAGE_ROUTE } from '../../const';
import treasureHuntInstanceApi from '../../network/apis/treasureHuntInstanceApi';
import CluesContainer from '../assets/clues/CluesContainer';
import ParticipantContainer from "../assets/participant/ParticipantContainer";

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
    hide: boolean
    participants: Participant[] | undefined
};

class TreasureHuntLaunch extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      hide: false,
      treasureHuntInstance: undefined,
      participants: undefined
    };
  }

  componentDidMount() {
    const { location } = this.props;
    let idInstance = location?.state?.id;
    const { history } = this.props;

    if (idInstance) {
      localStorage.setItem('idInstance', idInstance);
    } else {
      idInstance = localStorage.getItem('idInstance');
      if (!idInstance) {
        history.push(HOME_PAGE_ROUTE);
      }
    }
    if (idInstance) {
      treasureHuntInstanceApi
        .get(idInstance)
        .then((response) => response.json())
        .then((treasureHuntInstance) => this.setState({ treasureHuntInstance }));
        const ws = new WebSocket(`ws://localhost:8000/ws/treasurehunt/${idInstance}/`);
        ws.onopen = (evt: any) => {
            console.log(evt);
            this.setState({participants: JSON.parse(evt.data)})
        }
    }
  }

  hide = () => {
    this.setState((prevState) => ({ hide: !prevState.hide }));
  }

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
              <ParticipantContainer participants={participants} hide={false} onClick={() => {}}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(TreasureHuntLaunch);
