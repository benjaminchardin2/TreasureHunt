import React from 'react';
import { withRouter } from 'react-router-dom';
import { I18n } from 'react-redux-i18n';
import { Field, Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import treasureHuntApi from '../../network/apis/treasureHuntApi';
import { Clues } from './TreasureHuntTypes';
import FileInput from '../fileInput/FileInput';
import { HOME_PAGE_ROUTE } from '../../const';

type Props = {
    history: any,
};

type State = {
    initialValues: {
        clues: Clues[]
    }
};

class Creation extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      initialValues: {
        clues: [
          {
          },
        ],
      },
    };
  }

  validate = (values) => {
    const errors: any = {};

    const finalCount = values.clues.reduce((count, el) => (el.final ? count + 1 : count), 0);

    if (finalCount !== 1) {
      errors.final = I18n.t('treasurehunt.form.errors.FINAL');
      return errors;
    }
    return undefined;
  }

    onSubmit = (values) => {
    if (!this.validate(values)) {
      const { history } = this.props;
      treasureHuntApi.create(values)
        .then((response) => response.json())
        .then(() => {
          history.push(HOME_PAGE_ROUTE);
        })
        .catch((error) => {
          console.log(`error: ${error}`);
        });
    } else {
      return this.validate(values)
    }
    };

    render() {
      const { initialValues } = this.state;
      return (
        <div className="page">
          <div className="page-content">
            <div className="page-background">
              <div className="treasure-hunt-creation">
                <div className="treasure-hunt-creation-page">
                  <div className="treasure-hunt-creation-form">
                    <Form
                      initialValues={initialValues}
                      onSubmit={this.onSubmit}
                      mutators={{
                        ...arrayMutators,
                      }}
                      render={(formRenderProps) => (
                        <form onSubmit={formRenderProps.handleSubmit}>
                          <div className="form-content">
                            <div className="header-text bold">{I18n.t('treasurehunt.TITLE')}</div>
                            <div className="form-group treasure-hunt-creation-info">
                              <label className="form-label" htmlFor="login-input">
                                <FontAwesomeIcon icon="user" />
                              </label>
                              <Field
                                id="login-input"
                                name="name"
                                component="input"
                                className="form-field"
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
                                          <label className="clues-label secondary-text">
                                            {`${I18n.t('treasurehunt.form.CLUES')} #${index + 1}`}
                                          </label>
                                          <Field
                                            name={`${clues}.message`}
                                            component="textarea"
                                            placeholder={I18n.t('treasurehunt.form.CLUES_MESSAGE_PLACEHOLDER')}
                                          />
                                        </div>
                                        <div>
                                          <label className="clues-label secondary-text">
                                            {I18n.t('treasurehunt.form.FINAL_CLUE')}
                                          </label>
                                          <Field
                                            name={`${clues}.final`}
                                            component="input"
                                            type="checkbox"
                                            placeholder={I18n.t('treasurehunt.form.CLUES_MESSAGE_PLACEHOLDER')}
                                          />
                                        </div>
                                        <div className="clues-label">
                                          <Field
                                            name={`${clues}.file`}
                                            component={FileInput}
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
                              {formRenderProps.hasSubmitErrors && <div className="form-error">{I18n.t('treasurehunt.form.errors.FINAL')}</div>}
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
        </div>
      );
    }
}

export default withRouter(Creation);
