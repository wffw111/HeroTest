+(function () {
    'use strict';

    angular.module('viewModel', [])

        //wrapper for hero
    .service('hero', function () {
        var hero = function (data,nameProperty) {
            this.data = data;
            this.active = false;
            this.name = '';
            if(nameProperty){
                this.name = data[nameProperty];
            }
            
        }

        hero.prototype.createImageUrl = function (propertyName, serviceUrl) {
            var _this = this;
            var imageProperty = _this.data[propertyName];
            if (imageProperty) {
                _this.imageUrl = serviceUrl + '/' + imageProperty;
            }
        }
        return hero;
    })
        //wrapper for hero collection
    .service('heroCollection',function () {
        var heroCollection = function () {
            var _this = this;
            _this.collection = [];
            
            this.name = "Heroes";
        }
        return heroCollection;
    })

})()