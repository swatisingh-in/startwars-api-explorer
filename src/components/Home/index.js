import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Home = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
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
  if (isLoading) {
    return <h1>Loading....</h1>;
  }
