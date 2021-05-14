import React from 'react';
import { withRouter } from 'react-router-dom';

type Props = {
};

type State = {
};

class Play extends React.Component<Props, State> {
  render() {
    return (
      <div className="page">
        <p>Play</p>
      </div>
    );
  }
}

export default withRouter(Play);
