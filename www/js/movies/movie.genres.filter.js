angular.module('movies')
  .filter('genres', [function (){
    return function(genres) {
      return genres.split('|');
    };
  }]);
