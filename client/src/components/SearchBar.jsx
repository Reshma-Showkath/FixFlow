function SearchBar({ search, setSearch, onSearch }) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSearch();
    }
  };

  const handleClear = () => {
    setSearch("");
  };

  return (
    <div className="search-wrapper">

      <input
        type="text"
        placeholder="Search an error, code, or problem..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        onKeyDown={handleKeyDown}
      />

      {search && (
        <button
          className="clear-button"
          onClick={handleClear}
          type="button"
          aria-label="Clear search"
        >
          ×
        </button>
      )}

      <button
        className="search-button"
        onClick={onSearch}
        type="button"
      >
        Search
      </button>

    </div>
  );
}

export default SearchBar;