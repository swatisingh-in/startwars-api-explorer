import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { CHARACTER_ROUTE } from '../../routes/routes';
import { STARWARS_MOVIES_URL } from '../Common/constants';
import AutocompleteSearch from '../Common/AutocompleteSearch';

import Logo from '../../images/logo.svg';
import MovieList from './styles/MovieList';
import Container from './styles/Container';
import Header from './styles/Header';
import MovieItem from './styles/MovieItem';
import MovieContent from './styles/MovieContent';

const Home = (props) => {
  const { history } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [searchString, setSearchString] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  // Fetch all the starwars movies.
  useEffect(async () => {
    try {
      const response = await axios.get(STARWARS_MOVIES_URL);
      if (response.status === 200) {
        setMovies(response.data.results);
        setIsLoading(false);
      }
    } catch (err) {
      setError(err);
    }
  }, []);

  const visibleMovieList = () => (movies.filter(
    (movie) => movie.title.toLowerCase().includes(searchString.toLowerCase()),
  ));

  const handleShowCharacters = (characters) => {
    const characterIds = characters.map((character) => character.split(/\//)[5]);
    history.push(`${CHARACTER_ROUTE}?characterids=${characterIds}`);
  };

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  if (error) {
    return <h1>Some error has occurred.</h1>;
  }

  return (
    <Container>
      <Header>
        <img src={Logo} alt="Star Wars Universe" />
        <AutocompleteSearch
          suggestions={movies.map((movie) => movie.title)}
          searchString={searchString}
          setSearchString={setSearchString}
        />
      </Header>
      <MovieList>
        {visibleMovieList().map((movie) => (
          <MovieItem key={movie.title}>
            <MovieContent>
              <h1 key={movie.title}>{movie.title}</h1>
              <button type="button" onClick={() => handleShowCharacters(movie.characters)}>View Characters</button>
            </MovieContent>
          </MovieItem>
        ))}
      </MovieList>
    </Container>
  );
};

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Home;
