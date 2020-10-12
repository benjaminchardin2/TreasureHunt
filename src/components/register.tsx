import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Field, Form } from 'react-final-form';
import loginApi from "../network/loginApi";

type PathParamsType = {
};

type Props = {
    history: any,
};

type State = {
};

class Register extends React.Component<Props, State> {
    state = {
    };

    onSubmit = (values) => {
        const login = { username: values.login, password:  values.password , email: ''};
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
                    <Form
                        onSubmit={this.onSubmit}
                        render={(formRenderProps) => (
                            <form onSubmit={formRenderProps.handleSubmit}>
                                <div className="form-content">
                                    <div className="form-group">
                                        <label htmlFor="name-input" className="form-label">Nom d'équipe</label>
                                        <Field
                                            id="login-input"
                                            name="login"
                                            component="input"
                                            className="form-field"
                                            type="text"
                                            required
                                        />
                                        <label htmlFor="name-input" className="form-label">Mdp (pas un vrai je les vois en clair après)</label>
                                        <Field
                                            id="password-input"
                                            name="password"
                                            component="input"
                                            className="form-field"
                                            type="text"
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
        );
    }
}
export default withRouter(Register);
