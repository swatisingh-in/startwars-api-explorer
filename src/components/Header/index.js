import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Wrapper from './styles/Wrapper';
import AutocompleteSearch from '../Common/AutocompleteSearch';
import Logo from '../../images/logo.svg';

const Header = (props) => {
  const { searchString, setSearchString, suggestions } = props;

  return (
    <Wrapper>
      <Link to="/">
        <img src={Logo} alt="Star Wars Universe" />
      </Link>
      <AutocompleteSearch
        suggestions={suggestions}
        searchString={searchString}
        setSearchString={setSearchString}
      />
    </Wrapper>
  );
};

Header.defaultProps = {
  searchString: '',
  setSearchString: () => {},
  suggestions: [],
};

Header.propTypes = {
  searchString: PropTypes.string,
  setSearchString: PropTypes.func,
  suggestions: PropTypes.arrayOf(PropTypes.string),
};

export default Header;
