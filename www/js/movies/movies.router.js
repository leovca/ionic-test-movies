angular.module('movies')
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('app', {
        url: '/',
        templateUrl :'templates/movies/app.html',
        controller: 'MoviesMainCtrl',
        controllerAs: 'mainCtrl',
        abstract: true,
        resolve: {
          loadData: ['MoviesDataService', '$ionicLoading', '$q', function (MoviesDataService, $ionicLoading, $q) {
            var deferred = $q.defer();
            $ionicLoading.show({
              content: 'Loading',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
            });
            MoviesDataService.load().then(function () {
              $ionicLoading.hide();
              deferred.resolve();
            });
            return deferred.promise;
          }]
        }
      })
      .state('app.movies', {
        url: 'movies?gen',
        templateUrl: 'templates/movies/movies.html',
        controller: 'MoviesCtrl',
        controllerAs: 'moviesCtrl'
      })
      .state('app.movieDetails', {
        url: 'movies/:id',
        templateUrl: 'templates/movies/details.html',
        controller: 'MoviesDetailsCtrl',
        controllerAs: 'movieCtrl'
      });

    $urlRouterProvider.otherwise('/movies');

  }]);
