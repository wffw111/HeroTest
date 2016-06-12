'use strict';

describe('Controller: mainCtrl', function () {
    var mainCtrl, scope;
    beforeEach(module('heroTest'));
    beforeEach(inject(function ($controller) {
        scope = {};
        mainCtrl = $controller('mainCtrl', {
            $scope: scope
        });
    }));
    it('scope shoud be defined', function () {
        expect(scope).toBeDefined();
    });
});

describe('Factory: apiFactory', function () {
    var apiFactroy, httpBackEnd, serviceUrl;
    beforeEach(module('heroTest'));
    beforeEach(inject(function (_apiFactory_, _$httpBackend_, _serviceUrl_) {
        apiFactroy = _apiFactory_;
        httpBackEnd = _$httpBackend_;
        serviceUrl = _serviceUrl_;
    }));

    it("should do something", function () {
        httpBackEnd.expectGET(serviceUrl.heroUrl).respond({

            name: 'testHeroes',
            heroes: [
              {
                  name: 'test1',
                  gender: 'male'
              },
              {
                  name: 'test2',
                  gender: 'female'
              }
            ]

        });
        var length = 0;
        apiFactroy.getHeroes().then(function (response) {
            length = response.data.heroes.length;

        })
        httpBackEnd.flush();
        expect(length).toEqual(2);



    });
})