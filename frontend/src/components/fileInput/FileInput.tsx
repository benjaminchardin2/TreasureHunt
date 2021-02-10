import React from 'react';
import { FieldRenderProps } from 'react-final-form';

class FileInput extends React.Component<FieldRenderProps<HTMLElement, any>> {
    toBase64 = (file) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

    handleFiles = (e) => {
     const filesCopy = Array.from(e.target.files);
      if (!filesCopy.length) {
        return;
      }
      Promise.all(filesCopy.map(async (file: any) => {
        const base64 = await this.toBase64(file);
        return base64;
      }))
        .then((callbackFiles: Array<any>) => {
          this.props.input.onChange(callbackFiles[0]);
        });
    };

    render() {
      return (
        <input
          id="file-input"
          name="fileInput"
          type="file"
          className="input-file-input"
          onChange={this.handleFiles}
        />
      );
    }
}

export default FileInput;
