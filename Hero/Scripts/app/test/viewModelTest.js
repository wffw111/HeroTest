'use strict';

describe('Service:hero ', function () {
    var hero,mockData;
    beforeEach(module('heroTest'));
    beforeEach(inject(function (_hero_) {
        hero = _hero_;
        mockData = {
            "name":"Jack",
            "profileImage":"Jack_image"
        }
    }));
    it('hero shoud be defined', function () {
        expect(hero).toBeDefined();
    });
    
    //test if createImageUrl function can add imageUrl property into new hero object with property link
    it('hero should have profile image', function () {
        var testHero = new hero(mockData);
        testHero.createImageUrl('profileImage', '/api/HeroesImage');
        expect(testHero.imageUrl).toEqual('/api/HeroesImage/Jack_image');
    })
});