import React from 'react';
import '../style/NotFound.css';

class NotFound extends React.Component {
  render() {
    return (
      <div className="not-div" data-testid="page-not-found">
        <img className="not-img" src="/undraw_page_not_found_su7k.svg" alt="not found" />
      </div>
    );
  }
}

export default NotFound;
