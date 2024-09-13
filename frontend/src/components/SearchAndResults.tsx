import SearchBox from './SearchBox';

/**
 * The SearchAndResults component.
 *
 * Wraps the "SearchBox" component.
 *
 * @component
 * @usedby ./App.tsx
 */
const SearchAndResults = () => {
  return (
    <div className="search-and-results">
      <SearchBox />
    </div>
  );
};

export default SearchAndResults;
