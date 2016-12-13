angular.module('movies')
  .controller('MoviesDetailsCtrl', ['MoviesDataService', '$stateParams', function (MoviesDataService, $stateParams) {
    var vm = this;

    vm.movie = MoviesDataService.getMovie($stateParams.id);
    vm.users = MoviesDataService.getUsersById();

    vm.getDateTime = function (timestamp){
      return new Date(timestamp * 1000).toGMTString();
    };

  }]);
