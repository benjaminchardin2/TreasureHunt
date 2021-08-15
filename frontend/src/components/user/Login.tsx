import React from 'react';
import { withRouter } from 'react-router-dom';
import { I18n } from 'react-redux-i18n';
import { Field, Form } from 'react-final-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loginApi from '../../network/apis/loginApi';
import pirate from '../../img/pirate.png';
import { HOME_PAGE_ROUTE, REGISTER_PAGE_ROUTE } from '../../const';

type Props = {
    history: any,
};

class Login extends React.Component<Props> {
  componentDidMount() {
    const { history } = this.props;
    loginApi.user()
      .then((response) => response.json())
      .then(() => {
        history.push(HOME_PAGE_ROUTE);
      })
      .catch((error) => {
        console.log(`error: ${error}`);
      });
  }

    onSubmit = (values) => {
      const { history } = this.props;
      const login = { username: values.login, password: values.password };
      loginApi.login(login)
        .then((response) => response.json())
        .then((json) => {
          localStorage.setItem('token', json.token);
          history.push(HOME_PAGE_ROUTE);
        })
        .catch((error) => {
          console.log(`error: ${error}`);
        });
    };

    render() {
      const { history } = this.props;
      return (
        <div className="page">
          <div className="page-content">
            <div className="page-background">
              <div className="login-page">
                <div className="login-image">
                  <a href="https://pngtree.com/so/pirate">
                    <img
                      alt="pirate"
                      className="login-picture"
                      src={pirate}
                    />
                  </a>
                </div>
                <div className="login-form">
                  <Form
                    onSubmit={this.onSubmit}
                    render={(formRenderProps) => (
                      <form onSubmit={formRenderProps.handleSubmit}>
                        <div className="form-content">
                          <div className="header-text">{I18n.t('register.LOGIN')}</div>
                          <div className="form-group">
                            <label className="form-label" htmlFor="login-input">
                              <FontAwesomeIcon icon="user" />
                            </label>
                            <Field
                              id="login-input"
                              name="login"
                              component="input"
                              className="form-field"
                              type="text"
                              placeholder="login"
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label" htmlFor="password-input">
                              <FontAwesomeIcon icon="key" />
                            </label>
                            <Field
                              id="password-input"
                              name="password"
                              component="input"
                              className="form-field"
                              type="password"
                              placeholder="password"
                              required
                            />
                          </div>
                          <div className="button-group">
                            <button
                              className="button primary classic-text"
                              type="submit"
                            >
                              {I18n.t('register.LETS_GO')}
                            </button>
                            <button
                              className="button secondary classic-text"
                              type="button"
                              onClick={() => history.push(REGISTER_PAGE_ROUTE)}
                            >
                              {I18n.t('register.GO_TO_REGISTER')}
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
      );
    }
}

export default withRouter(Login);
