import React from 'react';
import { withRouter } from 'react-router-dom';
import { I18n } from 'react-redux-i18n';
import homebackground from '../../img/homebackground.png';
import {TREASURE_HUNT_CREATION_ROUTE, TREASURE_HUNT_SELECTION_ROUTE} from '../../const';

type Props = {
    history: any,
};

type State = {};

class Home extends React.Component<Props, State> {
    state = {};

    render() {
      return (
        <div className="page">
          <div className="login-background">
            <div className="page-content">
              <div className="home">
                <div className="home-create">
                  <img
                    alt="create"
                    className="home-picture"
                    src={homebackground}
                  />
                  <div className="button-group">
                    <button
                      className="button primary"
                      type="button"
                      onClick={() => { this.props.history.push(TREASURE_HUNT_CREATION_ROUTE); }}
                    >
                      {I18n.t('home.CREATE')}
                    </button>
                    <button
                      className="button secondary"
                      type="button"
                      onClick={() => { this.props.history.push(TREASURE_HUNT_SELECTION_ROUTE); }}
                    >
                      {I18n.t('home.LAUNCH')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
}

export default withRouter(Home);
