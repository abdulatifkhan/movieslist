var compactMovies = movies.map(function (movie, i) {
  return {
    id: i + 1,
    title: movie.Title.toString(),
    year: movie.movie_year,
    categories: movie.Categories.split('|').join(', '),
    summary: movie.summary,
    imageUrl: `http://i3.ytimg.com/vi/${movie.ytid}/maxresdefault.jpg`,
    imdbId: movie.imdb_id,
    imdbRating: movie.imdb_rating,
    runtime: movie.runtime,
    language: movie.language,
    youtubeId: `https://www.youtube.com/watch?v=${movie.ytid}`
  };
});

var elMoviesList = $_('.movies-list');
var elMovieTemplate = $_('#movie-template').content;



var createMovieElement = function (compactMovies) {
  var elNewMovie = elMovieTemplate.cloneNode(true);
  $_('.movie-title', elNewMovie).textContent = compactMovies.title;
  $_('.movie-image', elNewMovie).src = compactMovies.imageUrl;
  $_('.movie-image', elNewMovie).alt = compactMovies.title;
  $_('.movie-year', elNewMovie).textContent = compactMovies.year;
  $_('.movie-categories', elNewMovie).textContent = compactMovies.categories;
  $_('.movie-summary', elNewMovie).textContent = compactMovies.summary;
  $_('.movie-imdb-id', elNewMovie).textContent = compactMovies.imdbId;
  $_('.movie-imdb-rating', elNewMovie).textContent = compactMovies.imdbRating;
  $_('.movie-runtime', elNewMovie).textContent = compactMovies.runtime;
  $_('.movie-language', elNewMovie).textContent = compactMovies.language;
  $_('.movie-youtube', elNewMovie).href = compactMovies.youtubeId;

  return elNewMovie;
};

var renderMovies = function (compactMovies) {
  elMoviesList.innerHTML = '';

  var elMoviesWrapperFragment = document.createDocumentFragment();

  compactMovies.forEach(function (movie) {
    elMoviesWrapperFragment.appendChild(createMovieElement(movie));
  });

  elMoviesList.appendChild(elMoviesWrapperFragment);
};

renderMovies(compactMovies.slice(0, 100));

var elSearchForm = $_('.js-search-form');
var elSearchInput = $_('.js-search-input');

elSearchForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  var searchRegexValue = elSearchInput.value.trim();
  var searchRegex = new RegExp(searchRegexValue, 'gi');

  var findMoviesBySearch = compactMovies.filter(function (movie) {
    return movie.title.match(searchRegex);
  });

  renderMovies(findMoviesBySearch);
});