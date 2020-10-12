import React from 'react';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {Field, Form} from 'react-final-form';
import loginApi from "../network/loginApi";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import pirateShip from "../img/pirateShip.png"

type PathParamsType = {};

type Props = {
    history: any,
};

type State = {};

class Register extends React.Component<Props, State> {
    state = {};

    onSubmit = (values) => {
        const login = {username: values.login, password: values.password, email: ''};
        loginApi.login(login)
            .then((response) => response.json())
            .then(json => {
                console.log(JSON.stringify(json.token));
            })
            .catch((error) => {
                console.log('error: ' + error);
            });
    };

    render() {
        return (
            <div className="page">
                <div className="page-content">
                    <div className="login-background">
                        <div className="login-page">
                            <div className="login-image">
                                <a href='https://pngtree.com/so/pirate'><img className="login-picture"
                                                                             src={pirateShip}/></a>
                            </div>
                            <div class="login-form">
                                <Form
                                    onSubmit={this.onSubmit}
                                    render={(formRenderProps) => (
                                        <form onSubmit={formRenderProps.handleSubmit}>
                                            <div className="form-content">
                                                <h1>S'inscrire</h1>
                                                <div className="form-group">
                                                    <label class="form-label" htmlFor="login-input">
                                                        <FontAwesomeIcon icon={"user"}/>
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
                                                    <label class="form-label" htmlFor="password-input">
                                                        <FontAwesomeIcon icon={"key"}/>
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
                                                <button className="button primary" type="submit">C'est parti</button>
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
