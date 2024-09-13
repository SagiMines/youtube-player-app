import React, { useContext } from 'react';
import { GlobalContext } from './UserContext';
import { SearchBoxData } from '../types';
import { handleSearchChange } from '../utils/functions';
import SearchResults from './SearchResults';
import './../styles/SearchBox.css';

const SearchBox = React.memo(() => {
  const { searchQuery, setSearchQuery, setSearchResults } =
    useContext<SearchBoxData>(GlobalContext);

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search YouTube"
        value={searchQuery}
        onChange={e => handleSearchChange(e, setSearchQuery, setSearchResults)}
      />
      <SearchResults />
    </div>
  );
});

export default SearchBox;
