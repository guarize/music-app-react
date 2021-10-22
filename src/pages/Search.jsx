import React from 'react';
import Header from './Header';
import SearchArtist from './SearchArtist';
import '../style/Search.css';

class Search extends React.Component {
  render() {
    return (
      <div data-testid="page-search">
        <Header />
        <SearchArtist />
      </div>
    );
  }
}

export default Search;
