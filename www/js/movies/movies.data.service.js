angular.module('movies')
  .service('MoviesDataService', ['$http', '$q', function ($http, $q) {

    var usersById = null;
    var users = null;
    var moviesById = null;
    var movies = null;

    var genres = [];

    function _getData() {
      return $http.get('https://cdn.cubos.io/downloads/moviesdataset.json');
    }

    function _processUsers(data){
      users = data.users;
      usersById = {};

      _.reduce(users, function (map, user) {
        map[user.id] = user;

        return map;
      }, usersById);
    }

    function _addGenres(genresList) {
      genresList.split('|').forEach(function (item){
        if(genres.indexOf(item) == -1){
          genres.push(item);
        }
      })
    }

    function _processMovies(data) {
      movies = data.movies;
      moviesById = {};
      _.reduce(data.movies, function (map, movie) {
        map[movie.id] = movie;

        movie.rating = [];
        movie.score = 0;

        _addGenres(movie.genres);

        return map;
      }, moviesById);

      return moviesById;
    }

    function _processMoviesRating(data) {
      _.forEach(data.ratings, function (rating) {
        var movie = moviesById[rating.movie];
        movie.rating.push(rating);
        movie.score += rating.score;
      });

      //calc rate
      _.forEach(movies, function (movie) {
        if(movie.score){
          movie.score = movie.score / movie.rating.length;
        }
      })
    }

    function getMovieList() {
      return movies;
    }

    function getMovie(id){
      return moviesById[id];
    }

    function getUsersById(){
      return usersById;
    }

    function getGenres(){
      return genres;
    }

    function load() {
      var deferred = $q.defer();

      _getData().then(function (data) {

        _processUsers(data.data);
        _processMovies(data.data);
        _processMoviesRating(data.data);

        deferred.resolve();
      });

      return deferred.promise;
    }

    return {
      load: load,
      getMovieList: getMovieList,
      getMovie: getMovie,
      getUsersById: getUsersById,
      getGenres: getGenres
    }

  }]);
