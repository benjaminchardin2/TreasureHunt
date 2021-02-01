import React from 'react';
import ReactModal from 'react-modal';
import { I18n } from 'react-redux-i18n';
import fileApi from '../../../network/apis/fileApi';
import FilePreview from './FilePreview';

type Props = {
    fileUrl: string | undefined,
};

type State = {
    contentType: string | undefined,
    showModal: boolean
}

class FilePreviewModal extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      contentType: undefined,
      showModal: false,
    };
  }

  handleOpenModal = () => {
    this.setState({ showModal: true });
  }

  handleCloseModal = () => {
    this.setState({ showModal: false });
  }

  componentDidMount() {
    const { fileUrl } = this.props;
    if (fileUrl) {
      fileApi
        .get(fileUrl)
        .then((response) => {
          this.setState({
            contentType: response.headers.get('Content-Type'),
          });
        });
    }
  }

  render() {
    const { contentType, showModal } = this.state;
    const { fileUrl } = this.props;
    if (contentType && fileUrl) {
      return (
        <>
          <div className="button-group">
            <button className="button primary" onClick={this.handleOpenModal}>
              {I18n.t('preview.BUTTON')}
            </button>
          </div>
          <ReactModal
            isOpen={showModal}
            contentLabel="Minimal Modal Example"
            onRequestClose={this.handleCloseModal}
            className="modal"
          >
            <FilePreview contentType={contentType} fileUrl={fileUrl} />
          </ReactModal>
        </>
      );
    }
    return <></>;
  }
}

export default FilePreviewModal;
