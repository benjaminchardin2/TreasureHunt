import React from 'react';
import fileApi from '../../../network/apis/fileApi';
import FilePreview from './FilePreview';

type Props = {
    fileUrl: string | undefined,
};

type State = {
    contentType: string | undefined,
}

class File extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      contentType: undefined,
    };
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
    const { contentType } = this.state;
    const { fileUrl } = this.props;
    if (contentType && fileUrl) {
      return (
        <>
          <FilePreview contentType={contentType} fileUrl={fileUrl} />
        </>
      );
    }
    return <></>;
  }
}

export default File;
