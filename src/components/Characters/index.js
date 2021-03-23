import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import { STARWARS_CHARACTERS_URL } from '../Common/constants';

const Characters = () => {
  const useQuery = () => new URLSearchParams(useLocation().search);
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
    <>
      {characters.map((character) => (
        <h1 key={character.name}>{character.name}</h1>
      ))}
    </>
  );
};

export default Characters;
