const tmdbKey = "4c3ce7d1aa3793bc25112c98bdf7c43b";
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

// asynchronous function to fetch a list of genres from the TMDB API
const getGenres = async () => {
  const genreRequestEndpoint = '/genre/movie/list';
  const requestParams = `?api_key=${tmdbKey}`

  const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`

  try {
    const response = await fetch(urlToFetch)
    if (response.ok) {
      const jsonResponse = await response.json()
      //console.log(jsonResponse)
      const genres = jsonResponse.genres;

      return genres
    }
  } catch (error) {
    console.log(error)
  }
};

// asynchronous function to fetch a list of movies based on the genre that was seleected from the list of genres returned in the getGenres() function
const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = '/discover/movie';
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`

  const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`

  try {
    const response = await fetch(urlToFetch)
    if (response.ok) {
      const jsonResponse = await response.json()
      // console.log(jsonResponse)
      const movies = jsonResponse.results;
      // console.log(movies)

      return movies
    }
  } catch (error) {
    console.log(error)
  }
};

// asynchronous function to fetch the details of a random movie returned in the getMovies() function
const getMovieInfo = async (movie) => {
  const movieId = movie.id;
  const movieEndpoint = `/movie/${movieId}`
  const requestParams = `?api_key=${tmdbKey}`

  const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`

  try {
    const response = await fetch(urlToFetch)
    if (response.ok) {
      const movieInfo = await response.json()

      return movieInfo
    }
  } catch (error) {
    console.log(error);
  }
};

// asynchronous function that gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };

  // await the response since getMovies returns a promise
  const movies = await getMovies()
  const randomMovie = getRandomMovie(movies)
  const info = await getMovieInfo(randomMovie)
  
  displayMovie(info)
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;