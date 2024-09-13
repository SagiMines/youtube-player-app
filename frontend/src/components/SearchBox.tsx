import React, { useContext } from 'react';
import { GlobalContext } from './UserContext';
import { SearchBoxData } from '../types';
import { handleSearchChange } from '../utils/functions';
import SearchResults from './SearchResults';
import './../styles/SearchBox.css';

/**
 * The SearchBox component.
 *
 * Renders the input search bar and wraps the "SearchResults" component.
 *
 * @component
 * @usedby ./SearchAndResults.tsx
 */
const SearchBox = React.memo(() => {
  /** The relevant context passed from the global context */
  const { searchQuery, setSearchQuery, setSearchResults, searchResults } =
    useContext<SearchBoxData>(GlobalContext);

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search on YouTube..."
        value={searchQuery}
        onChange={e => handleSearchChange(e, setSearchQuery, setSearchResults)}
      />
      {searchResults.length > 0 && <SearchResults />}
    </div>
  );
});

export default SearchBox;
