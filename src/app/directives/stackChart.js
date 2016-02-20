var Chart = require("../lib/Chart.min.js");


require('app').directive('stackChart', /* @ngInject */ function (chartOption, chartLast, periods) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            period: '@'
        },
        templateUrl: "directives/stackChart.tpl.html",
        link: function (scope, element) {

            var canvas = element.find('canvas'),
                ctx = canvas.get(0).getContext("2d"),
                data = chartLast[scope.period];

            scope.label = periods[scope.period];

            scope.top = data.datasets[0].data.map(function (n, i) {
                return { n : n, i : i+1 };
            }).sort(function (l, r) {
                return r.n - l.n;
            }).slice(0,7);

            new Chart(ctx).Bar(data, chartOption);
        }
    };
});