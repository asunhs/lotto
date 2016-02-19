var analyzer = require("../rule/rule.js"),
    Chart = require("../lib/Chart.min.js");


require('app').directive('lineChart', /* @ngInject */ function (chartOption) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            item: '@'
        },
        templateUrl: "directives/lineChart.tpl.html",
        link: function (scope, element) {
            
            var canvas = element.find('canvas'),
                ctx = canvas.get(0).getContext("2d");
            
            //element.find('.graph').scrollLeft(canvas.width());

            new Chart(ctx).Line(analyzer.analyze(scope.item), chartOption);
            
        }
    };
});