import React from 'react';
import { I18n } from 'react-redux-i18n';

type Props = {
    url: string,
}

type State = {
    success: boolean,
}

class CopyButton extends React.Component<Props, State> {
    private textArea: HTMLTextAreaElement | null;

    constructor(props) {
    super(props);

    this.textArea = null;

    this.state = {
      success: false,
    };
  }

    copyCodeToClipboard = () => {
      if (this.textArea) {
        this.textArea.select();
        document.execCommand('copy');
        this.setState({ success: true });
      }
    };

    render() {
      const { success } = this.state;
      const { url } = this.props;

      return (
        <div className="copy-button">
          <div className="copy-button-text">
            <textarea
              ref={(textAreaRef) => {
                this.textArea = textAreaRef;
              }}
              value={url}
            />
          </div>
          <div className="button-group">
            <button type="button" className="button secondary" onClick={() => this.copyCodeToClipboard()}>
                {I18n.t('actions.COPY')}
            </button>
          </div>
            {
                success
                    ? (
                        <div style={{ color: 'green' }}>
                            {I18n.t('actions.SUCCESS')}
                        </div>
                    ) : null
            }
        </div>
      );
    }
}

export default CopyButton;
