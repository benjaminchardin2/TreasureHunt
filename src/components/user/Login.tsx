import React from 'react';
import { withRouter } from 'react-router-dom';
import { I18n } from 'react-redux-i18n';
import { Field, Form } from 'react-final-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loginApi from '../../network/apis/loginApi';
import pirate from '../../img/pirate.png';

type Props = {
    history: any,
};

class Login extends React.Component<Props> {
    onSubmit = (values) => {
      const login = { username: values.login, password: values.password };
      loginApi.login(login)
        .then((response) => response.json())
        .then((json) => {
          localStorage.setItem('token', json.token);
        })
        .catch((error) => {
          console.log(`error: ${error}`);
        });
    };

    render() {
      return (
        <div className="page">
          <div className="page-content">
            <div className="page-background">
              <div className="login-page">
                <div className="login-image">
                  <a href="https://pngtree.com/so/pirate">
                    <img
                      alt="login-picture"
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
                          <h1>{I18n.t('register.REGISTER')}</h1>
                          <div className="form-group">
                            <label className="form-label" htmlFor="login-input">
                              <FontAwesomeIcon icon="user" />
                            </label>
                            <Field
                              id="login-input"
                              name="login"
                              component="input"
                              className="form-field-login"
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
                              className="form-field-login"
                              type="password"
                              placeholder="password"
                              required
                            />
                          </div>
                          <div className="button-group">
                            <button
                              className="button primary"
                              type="submit"
                            >
                              {I18n.t('register.LETS_GO')}
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
