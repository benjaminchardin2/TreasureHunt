import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {HTTP_BACKEND_URL} from "../../../const";

type State = {
    icon: number,
}

class IconChoice extends React.Component<FieldRenderProps<number, any>, State> {
    iconLeft = () => {
      const { value, onChange } = this.props.input;

      let newValue = value - 1;
      if (newValue < 1) {
        newValue = 4;
      }

      onChange(newValue);
    };

    iconRight = () => {
      const { value, onChange } = this.props.input;

      let newValue = value ? value + 1 : 1;
      if (newValue > 4) {
        newValue = 1;
      }

      onChange(newValue);
    };

    render() {
      const { value } = this.props.input;
      return (
        <>
          <div className="icon-choice">
            <div role="button" onClick={this.iconLeft} tabIndex={0} onKeyDown={this.iconLeft}>
              <FontAwesomeIcon className="icon-arrow" icon="arrow-left" />
            </div>
            <img src={`${HTTP_BACKEND_URL}/static/icons/icon_${value}.png`} alt="icon" className="icon" />
            <div role="button" onClick={this.iconRight} tabIndex={0} onKeyDown={this.iconRight}>
              <FontAwesomeIcon className="icon-arrow" icon="arrow-right" />
            </div>
          </div>
        </>
      );
    }
}

export default IconChoice;
