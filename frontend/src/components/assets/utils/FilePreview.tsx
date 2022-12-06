import React from 'react';
import { I18n } from 'react-redux-i18n';
import { HTTP_BACKEND_URL } from '../../../const';

type Props = {
    contentType: string | undefined,
    fileUrl: string | undefined
}

function FilePreview({ contentType, fileUrl }: Props) {
  if (fileUrl) {
    switch (contentType) {
      case 'audio/mpeg':
        return (
          <audio
            controls
            src={HTTP_BACKEND_URL + fileUrl}
          >
            {I18n.t('preview.AUDIO')}
          </audio>
        );
      case 'video/mp4':
        return (
          <video controls className="preview">
            <source src={HTTP_BACKEND_URL + fileUrl} type="video/mp4" />
            {I18n.t('preview.VIDEO')}
          </video>
        );
      default:
        return (
          <img src={HTTP_BACKEND_URL + fileUrl} alt="preview" className="preview" />
        );
    }
  }
  return <></>;
}

export default FilePreview;
