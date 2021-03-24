import React from 'react';
import PropTypes from 'prop-types';

import MovieIcon from '../../images/movie-icon.svg';
import MovieTitleWrapper from './styles/MovieTitleWrapper';
import MovieTitle from './styles/MovieTitle';
import MovieSubtitle from './styles/MovieSubtitle';

const MovieHeader = (props) => {
  const { movie } = props;

  return (
    <>
      <MovieTitleWrapper>
        <img src={MovieIcon} alt="Movie Icon" />
        <MovieTitle key={movie.title}>{movie.title}</MovieTitle>
      </MovieTitleWrapper>
      <MovieSubtitle>
        Release date: &nbsp;
        {movie.release_date}
      </MovieSubtitle>
      <MovieSubtitle>
        Director: &nbsp;
        {movie.director}
      </MovieSubtitle>
      <MovieSubtitle>
        Producer: &nbsp;
        {movie.producer}
      </MovieSubtitle>
    </>
  );
};

MovieHeader.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    producer: PropTypes.string.isRequired,
  }).isRequired,
};

export default MovieHeader;
