import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useQuery from '../Common/useQuery';

import Header from '../Header';
import { STARWARS_CHARACTERS_URL } from '../Common/constants';
import Container from '../Home/styles/Container';

const Characters = () => {
  const characterIds = useQuery().get('characterids').split(',');

  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState('');

  // Fetch all the characters of a starwars movie.
  useEffect(async () => {
    const promises = characterIds.map((id) => axios.get(`${STARWARS_CHARACTERS_URL}${id}/`));
    try {
      const responses = await axios.all(promises);
      const charactersData = responses.map((response) => response.data);
      setCharacters(charactersData);
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

  return (
    <Container>
      <Header
        searchString=""
        setSearchString={() => {}}
        suggestions={[]}
      />
      {characters.map((character) => (
        <h1 key={character.name}>{character.name}</h1>
      ))}
    </Container>
  );
};

export default Characters;
