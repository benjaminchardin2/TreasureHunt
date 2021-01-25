import React from 'react';
import { withRouter } from 'react-router-dom';
import { I18n } from 'react-redux-i18n';
import { Clues, TreasureHunt } from './TreasureHuntTypes';
import treasureHuntApi from '../../network/apis/treasureHuntApi';
import treasureHuntInstanceApi from '../../network/apis/treasureHuntInstanceApi';
import { HOME_PAGE_ROUTE, TREASURE_HUNT_LAUNCH_ROUTE } from '../../const';

type Props = {
    history: any,
};

type State = {
    treasureHunts: TreasureHunt[]
};

class TreasureHuntSelection extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      treasureHunts: [],
    };
  }

  componentDidMount() {
    treasureHuntApi
      .get()
      .then((response) => response.json())
      .then((treasureHunts) => {
        this.setState({
          treasureHunts,
        });
      });
  }

    handleInstanceCreation = (id: string) => {
      const { history } = this.props;
      treasureHuntInstanceApi
        .create({ id })
        .then((response) => response.json())
        .then((idInstance) => {
          history.push(TREASURE_HUNT_LAUNCH_ROUTE, idInstance);
        })
        .catch((error) => {
          console.log(`error: ${error}`);
        });
    }

    render() {
      const { treasureHunts } = this.state;
      return (
        <div className="page">
          <div className="page-content">
            <div className="login-background">
              <div className="treasure-hunt-selection-page">
                <div className="treasure-hunt-selection-group">
                  {
                    treasureHunts.map((treasureHunt: TreasureHunt) => (
                      <div className="treasure-hunt-selection-box">
                        <h2 className="treasure-hunt-selection-box-text">{treasureHunt.name}</h2>
                        <div className="button-group">
                          <button className="button primary" onClick={() => this.handleInstanceCreation(treasureHunt.id)}>{I18n.t('treasurehunt.LAUNCH')}</button>
                        </div>
                      </div>
                    ))
                }
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
}

export default withRouter(TreasureHuntSelection);
