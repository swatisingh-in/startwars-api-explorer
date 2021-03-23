import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AutocompleteSearch = (props) => {
  const {
    suggestions,
    searchString,
    setSearchString,
  } = props;
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleSearchStringChange = (event) => {
    const filteredResults = suggestions.filter(
      (suggestion) => suggestion.toLowerCase().includes(event.target.value.toLowerCase()),
    );

    setSearchString(event.target.value);
    setFilteredSuggestions(filteredResults);
    setShowSuggestions(true);
  };

  const handleSelectedItem = (selectedSuggestion) => {
    setSearchString(selectedSuggestion);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <>
      <input
        type="text"
        onChange={handleSearchStringChange}
        value={searchString}
      />
      {
        showSuggestions && filteredSuggestions.length && (
          <ul>
            {
              filteredSuggestions.map((suggestion) => (
                <li
                  role="button"
                  key={suggestion}
                  onClick={() => handleSelectedItem(suggestion)}
                >
                  {suggestion}
                </li>
              ))
            }
          </ul>
        )
      }
    </>
  );
};

AutocompleteSearch.propTypes = {
  suggestions: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  searchString: PropTypes.string.isRequired,
  setSearchString: PropTypes.func.isRequired,
};

export default AutocompleteSearch;
