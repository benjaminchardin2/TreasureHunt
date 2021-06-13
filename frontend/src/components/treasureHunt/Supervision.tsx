import React from 'react';
import { withRouter } from 'react-router-dom';

type Props = {
};

type State = {
};

class Supervision extends React.Component<Props, State> {
  render() {
    return (
      <div className="page">
        <p>Supervision</p>
      </div>
    );
  }
}

export default withRouter(Supervision);
