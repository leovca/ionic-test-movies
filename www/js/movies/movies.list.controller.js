angular.module('movies')
  .controller('MoviesCtrl', ['MoviesDataService', '$stateParams', function (MoviesDataService, $stateParams) {
    var vm = this;

    vm.order = '-score';
    vm.movieList = MoviesDataService.getMovieList();
    vm.filter = $stateParams.gen;

  }]);
