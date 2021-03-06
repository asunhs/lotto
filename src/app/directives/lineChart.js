var Chart = require("../lib/Chart.min.js");


require('app').directive('lineChart', /* @ngInject */ function (chartOption, chartData) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            item: '@'
        },
        templateUrl: "directives/lineChart.tpl.html",
        link: function (scope, element) {
            
            var canvas = element.find('canvas'),
                ctx = canvas.get(0).getContext("2d"),
                data = chartData[parseInt(scope.item) - 1];
            
            //element.find('.graph').scrollLeft(canvas.width());

            scope.last = data.datasets.map(function (record) {
                return record.data[record.data.length - 1];
            });

            new Chart(ctx).Line(data, chartOption);
            
        }
    };
});