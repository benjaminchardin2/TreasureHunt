import React from 'react';
import ReactInputVerificationCode from 'react-input-verification-code';
import { I18n } from 'react-redux-i18n';
import cluesApi from '../../../network/apis/cluesApi';
import treasure from '../../../img/treasure.png';

type Props = {
    teamId: string,
    updateClue: Function,
}

type State = {
    code: string | undefined,
    error: boolean,
    success: boolean
}

class CodeInput extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      code: '0000',
      error: false,
      success: false,
    };
  }

  updateCode = (value: string) => {
    this.setState({
      code: value,
    });
  };

  submitCode = () => {
    const { teamId, updateClue } = this.props;
    const { code } = this.state;
    if (code) {
      cluesApi
        .tryToGetNextClue(teamId, code)
        .then((response) => response.json())
        .then((nextClue) => {
          if (nextClue) {
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
    const { error, code, success } = this.state;

    return (
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
      </div>
    );
  }
}

export default CodeInput;
