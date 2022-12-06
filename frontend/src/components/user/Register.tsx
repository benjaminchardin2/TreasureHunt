import React from 'react';
import { withRouter } from 'react-router-dom';
import { I18n } from 'react-redux-i18n';
import { Field, Form } from 'react-final-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loginApi from '../../network/apis/loginApi';
import pirateShip from '../../img/pirateShip.png';
import {HOME_PAGE_ROUTE, LOGIN_PAGE_ROUTE, REGISTER_PAGE_ROUTE} from '../../const';

type Props = {
  history: any,
};

class Register extends React.Component<Props> {
  onSubmit = (values) => {
    const { history } = this.props;
    const login = { username: values.login, password: values.password, email: '' };
    loginApi.register(login)
      .then((response) => response.json())
      .then((json) => {
        localStorage.setItem('token', json.token);
        history.push(HOME_PAGE_ROUTE)
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
                    alt="pirate-ship"
                    className="login-picture"
                    src={pirateShip}
                  />
                </a>
              </div>
              <div className="login-form">
                <Form
                  onSubmit={this.onSubmit}
                  render={(formRenderProps) => (
                    <form onSubmit={formRenderProps.handleSubmit}>
                      <div className="form-content">
                        <div className="header-text">{I18n.t('register.REGISTER')}</div>
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
                        <div className="form-group">
                          <label className="form-label" htmlFor="confirm-password-input">
                            <FontAwesomeIcon icon="key" />
                          </label>
                          <Field
                            id="confirm-password-input"
                            name="confirmPassword"
                            component="input"
                            className="form-field"
                            type="password"
                            placeholder="password confirmation"
                            required
                          />
                        </div>
                        {
                          formRenderProps.values.confirmPassword
                          && formRenderProps.values.password
                          && (formRenderProps.values.confirmPassword !== formRenderProps.values.password)
                            ? (
                              <span
                                className="form-error caption-text"
                              >
                                {I18n.t('register.PASSWORD_NOT_MATCHING')}
                              </span>
                            )
                            : <></>
                        }
                        <div className="button-group">
                          <button
                            className="button primary classic-text"
                            type="submit"
                            disabled={formRenderProps.values.confirmPassword
                            && formRenderProps.values.password
                            && (formRenderProps.values.confirmPassword !== formRenderProps.values.password)}
                          >
                            {I18n.t('register.LETS_GO')}
                          </button>
                          <button
                            className="button secondary classic-text"
                            type="button"
                            onClick={() => history.push(LOGIN_PAGE_ROUTE)}
                          >
                            {I18n.t('register.GO_TO_LOGIN')}
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

export default withRouter(Register);
