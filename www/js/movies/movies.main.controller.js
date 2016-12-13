angular.module('movies')
  .controller('MoviesMainCtrl', ['MoviesDataService', function (MoviesDataService) {
    var vm = this;

    vm.genres = MoviesDataService.getGenres();

  }]);
