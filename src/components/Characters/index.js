import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useQuery from '../Common/useQuery';

import Header from '../Header';
import { STARWARS_MOVIES_URL, STARWARS_CHARACTERS_URL } from '../Common/constants';
import MovieHeader from '../MovieHeader';
import Container from '../Home/styles/Container';
import PageContainer from './styles/PageContainer';
import MovieCrawl from './styles/MovieCrawl';
import List from '../Home/styles/List';
import ListItem from '../Home/styles/ListItem';
import CharacterContent from './styles/CharacterContent';

const Characters = () => {
  const characterIds = useQuery().get('characterids').split(',');
  const movieId = useQuery().get('movieid');

  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [movie, setMovie] = useState('');
  const [error, setError] = useState('');

  // Fetch details of the selected movie and all its characters.
  useEffect(async () => {
    const promises = characterIds.map((id) => axios.get(`${STARWARS_CHARACTERS_URL}${id}/`));
    try {
      const responses = await axios.all(promises);
      const charactersData = responses.map((response) => response.data);
      setCharacters(charactersData);

      const movieDetail = await axios.get(`${STARWARS_MOVIES_URL}${movieId}`);
      setMovie(movieDetail.data);

      setIsLoading(false);
    } catch (err) {
      setError(err);
    }
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Some error has occurred.</h1>;
  }

  console.log(movie);

  return (
    <Container>
      <Header
        searchString=""
        setSearchString={() => {}}
        suggestions={[]}
      />
      <PageContainer>
        <MovieHeader movie={movie} />
        <MovieCrawl>
          {movie.opening_crawl}
        </MovieCrawl>

        <List>
          {characters.map((character) => (
            <ListItem key={character.name}>
              <CharacterContent>
                <h1 key={character.name}>{character.name}</h1>
              </CharacterContent>
            </ListItem>
          ))}
        </List>
      </PageContainer>
    </Container>
  );
};

export default Characters;
