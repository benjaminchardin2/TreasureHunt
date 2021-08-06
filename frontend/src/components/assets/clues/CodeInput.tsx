import React from 'react';
import ReactInputVerificationCode from 'react-input-verification-code';
import ReactModal from 'react-modal';
import { withRouter } from 'react-router-dom';
import { I18n } from 'react-redux-i18n';
import cluesApi from '../../../network/apis/cluesApi';
import treasure from '../../../img/treasure.png';
import {HOME_PAGE_ROUTE, TREASURE_HUNT_FINISH_ROUTE} from '../../../const';
import cup from '../../../img/cup.png';

type Props = {
    teamId: string,
    updateClue: Function,
  closeModal: (event: any) => void,
    history: any,
}

type State = {
    code: string | undefined,
    error: boolean,
    success: boolean,
    finished: boolean,
}

class CodeInput extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      code: '0000',
      error: false,
      success: false,
      finished: false,
    };
  }

  updateCode = (value: string) => {
    this.setState({
      code: value,
    });
  };

  submitCode = () => {
    const { teamId, updateClue, history } = this.props;
    const { code } = this.state;
    if (code) {
      cluesApi
        .tryToGetNextClue(teamId, code)
        .then((response) => response.json())
        .then((nextClue) => {
          if (nextClue) {
            if (!nextClue.final) {
              updateClue(undefined);
              this.setState({
                code: '0000',
                success: true,
              });
              setTimeout(() => {
                updateClue(nextClue);
                this.setState({
                  success: false,
                });
              }, 1000);
            } else if (nextClue.final) {
              this.setState({
                finished: true,
              });
              setTimeout(() => {
                history.push(TREASURE_HUNT_FINISH_ROUTE);
              }, 3000);
            }
          } else {
            this.setState({ error: true }, this.clearError);
          }
        })
        .catch(() => {
          this.setState({
            error: true,
          }, this.clearError);
        });
    } else {
      this.setState({ error: true }, this.clearError);
    }
  };

  clearError = () => {
    setTimeout(() => {
      this.setState({
        error: false,
      });
    }, 1000);
  };

  render() {
    const {
      error, code, success, finished,
    } = this.state;

    const {
      closeModal,
    } = this.props;

    return (
      <div className="page">
        <div className="page-content">
          <div className="page-background">
            <div className="play-container">
              <div className="button-group">
                <button
                  className="button primary"
                  onClick={closeModal}
                >
                  {I18n.t('treasurehunt.play.SHOW_CLUE')}
                </button>
              </div>
              <div className="input-code">
                <div className="login-image">
                  <a href="https://fr.pngtree.com/so/trésor">
                    <img
                      alt="pirate"
                      className={`login-picture ${error ? 'error' : ''}`}
                      src={treasure}
                    />
                  </a>
                </div>
                <div className={`${error ? 'error' : ''} ${success ? 'success' : ''}`}>
                  <ReactInputVerificationCode
                    onChange={this.updateCode}
                    value={code}
                  />
                </div>
                <div className="button-group">
                  <button
                    className="button primary"
                    onClick={this.submitCode}
                  >
                    {I18n.t('register.LETS_GO')}
                  </button>
                </div>
                {finished && (
                  <ReactModal
                    isOpen
                    contentLabel="Modal finished"
                    className="modal fireworks"
                  >
                    <div className="pyro">
                      <div className="before" />
                      <div className="after" />
                    </div>
                    <img src={cup} alt="you won" className="preview" />
                  </ReactModal>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CodeInput);
