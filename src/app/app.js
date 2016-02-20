var analyzer = require("./rule/rule.js");

module.exports = angular.module('packApp', [
    'templates-html'
]).config(/* @ngInject */ function ($compileProvider, $httpProvider) {
    $compileProvider.debugInfoEnabled(false);
    $httpProvider.useApplyAsync(true);
}).controller('LottoCtrl', /* @ngInject */ function ($scope, chartLast, periods) {

    $scope.last = chartLast;
    $scope.diff200 = getDiffMA(2,0);
    $scope.diff50 = getDiffMA(1,0);

    function getDiffMA(origin, target) {
        return analyzer.analyzeDifference(origin, target);
    }

    function getMATitle(index) {
        return periods[index] + 'MA BEST';
    }

    $scope.getMATitle = getMATitle;
    $scope.getDiffMA = getDiffMA;
});