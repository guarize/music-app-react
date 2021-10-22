import React from 'react';
import '../style/Loading.css';

class Loading extends React.Component {
  render() {
    return (
      <div>
        <p style={ { textAlign: 'center' } }>
          <div className="lds-facebook">
            <div />
            <div />
            <div />
          </div>
        </p>
      </div>
    );
  }
}

export default Loading;
