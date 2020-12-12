import React from 'react';
import { withRouter } from 'react-router-dom';
import { I18n } from 'react-redux-i18n';
import { Field, Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loginApi from '../network/apis/loginApi';
import creationApi from "../network/apis/creationApi";

type Props = {
    history: any,
};

type State = {
    initialValues: {
        clues: any
    }
};

class TreasureHuntCreation extends React.Component<Props, State> {
    state = {
      initialValues: {
        clues: [{}],
      },
    };

    onSubmit = (values) => {
      creationApi.create(values)
        .then((response) => response.json())
        .then((json) => {
        })
        .catch((error) => {
          console.log(`error: ${error}`);
        });
    };

    render() {
      return (
        <div className="page">
          <div className="page-content">
            <div className="login-background">
              <div className="treasure-hunt-creation-page">
                <div className="treasure-hunt-creation-form">
                  <Form
                    initialValues={this.state.initialValues}
                    onSubmit={this.onSubmit}
                    mutators={{
                      ...arrayMutators,
                    }}
                    render={(formRenderProps) => (
                      <form onSubmit={formRenderProps.handleSubmit}>
                        <div className="form-content">
                          <h1>{I18n.t('treasurehunt.TITLE')}</h1>
                          <div className="form-group treasure-hunt-creation-info">
                            <label className="form-label" htmlFor="login-input">
                              <FontAwesomeIcon icon="user" />
                            </label>
                            <Field
                              id="login-input"
                              name="name"
                              component="input"
                              className="form-field-login"
                              type="text"
                              placeholder={I18n.t('treasurehunt.form.TITLE')}
                              required
                            />
                          </div>
                          <div className="clues-form-group">
                            <FieldArray name="clues">
                              {({ fields }) => fields.map((clues, index) => (
                                <div key={clues}>
                                  <div className="clues-input">
                                    <div className="clues-description">
                                      <div className="clues-field">
                                        <label className="clues-label">
                                          {`${I18n.t('treasurehunt.form.CLUES')} #${index + 1}`}
                                        </label>
                                        <Field
                                          name={`${clues}.message`}
                                          component="textarea"
                                          placeholder={I18n.t('treasurehunt.form.CLUES_MESSAGE_PLACEHOLDER')}
                                        />
                                      </div>
                                      <div className="clues-label">
                                        <Field
                                          name={`${clues}.file`}
                                          component="input"
                                          type="file"
                                        />
                                        <span
                                          onClick={() => fields.remove(index)}
                                          style={{ cursor: 'pointer' }}
                                        >
                                          X
                                        </span>
                                      </div>

                                    </div>
                                    <div className="clues-file">
                                      <embed />
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </FieldArray>
                            <button
                              type="button"
                              onClick={() => formRenderProps.form.mutators.push('clues', undefined)}
                            >
                              {I18n.t('treasurehunt.form.CLUES_ADD')}
                            </button>
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

export default withRouter(TreasureHuntCreation);
