var analyzer = require("../rule/rule.js");

require("app").constant('periods', analyzer.periods).constant('chartLast', analyzer.analyzeLast()).constant('chartData', analyzer.analyzeAll()).constant('chartOption', {

    animation: false,

    // Boolean - If we want to override with a hard coded scale
    scaleOverride: true,

    // Number - Scale label font size in pixels
    scaleFontSize: 9,

    // ** Required if scaleOverride is true **
    // Number - The number of steps in a hard coded scale
    scaleSteps: 5,
    
    // Number - The value jump in the hard coded scale
    scaleStepWidth: 0.1,

    ///Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : true,

    // String - Scale label font declaration for the scale label
    scaleFontFamily: "'Open Sans Condensed', 'Helvetica', 'Arial', sans-serif",

    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(0,0,0,.05)",

    //Number - Width of the grid lines
    scaleGridLineWidth : 1,

    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,

    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: true,

    //Boolean - Whether the line is curved between points
    bezierCurve : true,

    //Number - Tension of the bezier curve between points
    bezierCurveTension : 0.5,

    //Boolean - Whether to show a dot for each point
    pointDot : false,

    //Number - Radius of each point dot in pixels
    pointDotRadius : 4,

    //Number - Pixel width of point dot stroke
    pointDotStrokeWidth : 1,

    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
    pointHitDetectionRadius : 20,

    //Boolean - If there is a stroke on each bar
    barShowStroke : false,

    //Boolean - Whether to show a stroke for datasets
    datasetStroke : true,

    //Number - Pixel width of dataset stroke
    datasetStrokeWidth : 2,

    //Boolean - Whether to fill the dataset with a colour
    datasetFill : false,

    // Boolean - Determines whether to draw tooltips on the canvas or not
    showTooltips: false,

    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
    
});

console.log("Data ready");