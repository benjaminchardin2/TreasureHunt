import React from 'react';
import { withRouter } from 'react-router-dom';
import { I18n } from 'react-redux-i18n';
import { Clues, TreasureHunt } from './treasureHuntTypes';
import treasureHuntApi from '../../network/apis/treasureHuntApi';

type Props = {
    history: any,
};

type State = {
    treasureHunts: TreasureHunt[]
};

class TreasureHuntSelection extends React.Component<Props, State> {
    state = {
      treasureHunts: [],
    };

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

    render() {
      return (
        <div className="page">
          <div className="page-content">
            <div className="login-background">
              <div className="treasure-hunt-selection-page">
                <div className="treasure-hunt-selection-group">
                  {
                    this.state.treasureHunts.map((treasureHunt: TreasureHunt) => (
                      <div className="treasure-hunt-selection-box">
                        <h2 className="treasure-hunt-selection-box-text">{treasureHunt.name}</h2>
                        <div className="button-group">
                          <button className="button primary">{I18n.t('treasurehunt.LAUNCH')}</button>
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
