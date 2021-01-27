import React from 'react';
import fileApi from '../../../network/apis/fileApi';

type Props = {
    fileUrl: string | undefined,
};

type State = {
    contentType: string | undefined
}

class FilePreview extends React.Component<Props, State> {
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
    return (<></>
    );
  }
}

export default FilePreview;
