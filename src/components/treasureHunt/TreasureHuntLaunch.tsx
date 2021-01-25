import React from 'react';
import { withRouter } from 'react-router-dom';
import { TreasureHuntInstance } from './TreasureHuntTypes';
import { HOME_PAGE_ROUTE } from '../../const';
import treasureHuntInstanceApi from '../../network/apis/treasureHuntInstanceApi';

type Props = {
    history: any,
    location: {
        state: {
            id: string | null
        }
    }
};

type State = {
    treasureHuntInstance: TreasureHuntInstance
};

class TreasureHuntLaunch extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      treasureHuntInstance: undefined,
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
    }
  }

  render() {
    return (
      <div className="page">
        <div className="page-content">
          <div className="login-background" />
        </div>
      </div>
    );
  }
}

export default withRouter(TreasureHuntLaunch);
