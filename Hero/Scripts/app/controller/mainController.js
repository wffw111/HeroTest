+(function () {
    'use strict';

    var heroTestApp = angular.module('heroTest', ["viewModel"]);

    //#region value
    heroTestApp.value('serviceUrl', {
        heroUrl: '/api/Heroes',
        imageUrl: '/api/HeroesImage',
    })
    //#endregion

    //#region directive
    heroTestApp.directive("heroProfile", function () {
        var profile = {
            restrict: 'AE',
            scope: {
                heroProfile: '='
            },
            templateUrl: '/Home/ProfileTemplate',
            link: function (scope, element, attrs) {
            }
        }
        return profile
    })

    //#endregion

    //#region factory
    //create api factory to get heroes from server
    heroTestApp.factory("apiFactory", ['$http', 'serviceUrl', function ($http, serviceUrl) {
        return {
            getHeroes: function () {
                return $http.get(serviceUrl.heroUrl);
            },

        }
    }])

    //end region

    //#region controller
    //main controller 
    heroTestApp.controller('mainCtrl', ['$scope', 'apiFactory', 'heroCollection', 'hero', 'serviceUrl',
        function ($scope, apiFactory, heroCollection, hero, serviceUrl) {
            $scope.title = "hero comes";
            $scope.model = {
                heroCollection: undefined
            }

            $scope.searchModel = {
                key: undefined
            }
            apiFactory.getHeroes().then(function (response) {
                if (response.data && angular.isArray(response.data.heroes)) {
                    if ($scope.model.heroCollection) {

                    }
                    else {
                        $scope.model.heroCollection = new heroCollection();
                        angular.forEach(response.data.heroes, function (h, i) {
                            var heroView = new hero(h, 'name');
                            heroView.createImageUrl('profileImage', serviceUrl.imageUrl);
                            $scope.model.heroCollection.collection.push(heroView);
                        })
                    }
                }
            }, function (reject) {  
                alert(reject);
            })
        }])

    //#endregion

})()