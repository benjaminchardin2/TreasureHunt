import React from 'react';

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
            <button type="button"  className="button primary" onClick={() => this.copyCodeToClipboard()}>
              Copy
            </button>
            {
              success
                ? (
                  <div style={{ color: 'green' }}>
                    Success!
                  </div>
                ) : null
              }
          </div>
        </div>
      );
    }
}

export default CopyButton;
