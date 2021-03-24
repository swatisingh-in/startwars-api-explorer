import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { CHARACTER_ROUTE } from '../../routes/routes';
import { STARWARS_MOVIES_URL } from '../Common/constants';

import Header from '../Header';
import List from './styles/List';
import ListItem from './styles/ListItem';
import Container from './styles/Container';
import MovieContent from './styles/MovieContent';
import MovieCrawl from './styles/MovieCrawl';
import Button from './styles/Button';
import MovieHeader from '../MovieHeader';

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

  const handleShowCharacters = (url, characters) => {
    const movieId = url.split(/\//)[5];
    const characterIds = characters.map((character) => character.split(/\//)[5]);
    history.push(`${CHARACTER_ROUTE}?movieid=${movieId}&characterids=${characterIds}`);
  };

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  if (error) {
    return <h1>Some error has occurred.</h1>;
  }

  return (
    <Container>
      <Header
        searchFieldPlaceholder="movie"
        searchString={searchString}
        setSearchString={setSearchString}
        suggestions={movies.map((movie) => movie.title)}
      />
      <List>
        {visibleMovieList().map((movie) => (
          <ListItem key={movie.title}>
            <MovieContent>
              <MovieHeader movie={movie} />
              <MovieCrawl>
                {movie.opening_crawl}
              </MovieCrawl>
              <Button
                type="button"
                onClick={() => handleShowCharacters(movie.url, movie.characters)}
              >
                View Characters
              </Button>
            </MovieContent>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Home;
