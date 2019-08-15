/**
 * Application startup
 * @author Nimmi
 */

angular.module('beerApp', [])

  .controller('BeerController', ['$scope', '$log', '$http', 'api', function($scope, $log, $http, api) {

    $scope.searchBy = {  // search by radio button, made as an array for looping
      labels: ['by Name', 'by Description'],
      selected: 'by Name'
    }

    $scope.getRandomBeer = non => {  // random beer
      api.getRandomBeer(non).then(res => {
        if (res.status == 200) {
          $scope.beer = non ? res.data[(Math.random() * (res.data.length)) ^ 1] : res.data[0]
        }
      }, err => {
        $log.log('error in random API', err)
      })
    }

    $scope.getRandomBeer()  // default beer call

    $scope.validate = key => key && !/^[a-zA-Z0-9\-\s]+$/.test(key)  // validation for the search text

    $scope.search = key => {  // beer search function
      $scope.enableListing = true
      api.getBeerList(key, $scope.searchBy.selected).then(res => {
        if (res.status == 200) {
          $scope.beerLists = res.data
        }
      }, err => {
        $log.log('error in beer search API', err)
      })
    }
  }])

  .factory('api', function($log, $http) {
    return {
      getRandomBeer: (non) => {
        return $http.get('http://localhost:8000/get/random' + '?key=' + (non ? 'abv_lt' : 'random'))
      },
      getBeerList: (key, type) => {
        return $http.get('http://localhost:8000/get/list' + '?key=' + key + '&type=' + (type == 'by Name' ? 'beer_name' : 'beer_description'))
      }
    }
  })