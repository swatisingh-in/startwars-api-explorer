import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Input from './styles/Input';
import ListItem from './styles/ListItem';
import List from './styles/List';

const Search = (props) => {
  const {
    suggestions,
    searchString,
    setSearchString,
    searchFieldPlaceholder,
  } = props;
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleSearchStringChange = (event) => {
    const searchInput = event.target.value;

    const filteredResults = suggestions.filter(
      (suggestion) => suggestion.toLowerCase().includes(searchInput.toLowerCase()),
    );

    setSearchString(searchInput);
    setFilteredSuggestions(filteredResults);
    if (searchInput) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelectedItem = (selectedSuggestion) => {
    setSearchString(selectedSuggestion);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div>
      <Input
        type="text"
        placeholder={`Search ${searchFieldPlaceholder}`}
        autoFocus
        onChange={handleSearchStringChange}
        value={searchString}
      />
      {
        showSuggestions && filteredSuggestions.length && (
          <List>
            {
              filteredSuggestions.map((suggestion) => (
                <ListItem
                  role="button"
                  key={suggestion}
                  onClick={() => handleSelectedItem(suggestion)}
                >
                  {suggestion}
                </ListItem>
              ))
            }
          </List>
        )
      }
    </div>
  );
};

Search.propTypes = {
  suggestions: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  searchString: PropTypes.string.isRequired,
  setSearchString: PropTypes.func.isRequired,
  searchFieldPlaceholder: PropTypes.string.isRequired,
};

export default Search;
