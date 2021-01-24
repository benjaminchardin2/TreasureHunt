import React from 'react';
import { withRouter } from 'react-router-dom';
import { TreasureHunt } from './TreasureHuntTypes';
import { HOME_PAGE_ROUTE } from '../../const';

type Props = {
    history: any,
    location: {
        state: {
            id: string | null
        }
    }
};

type State = {
    treasureHunts: TreasureHunt[]
};

class TreasureHuntLaunch extends React.Component<Props, State> {
    state = {
      treasureHunts: [],
    };

    componentDidMount() {
      const { location } = this.props;
      let idInstance = location?.state?.id;
      const { history } = this.props;

      if (idInstance) {
        localStorage.setItem('idInstance', idInstance);
      } else {
        idInstance = localStorage.getItem('idInstance');
      }
      if (!idInstance) {
        history.push(HOME_PAGE_ROUTE);
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
