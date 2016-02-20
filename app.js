require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
angular.module('templates-html', ['directives/lineChart.tpl.html', 'directives/stackChart.tpl.html']);

angular.module("directives/lineChart.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("directives/lineChart.tpl.html",
    "<div class=\"section\">\n" +
    "    <div class=\"header\">\n" +
    "        <div>{{::item}}</div>\n" +
    "        <div><span>ESTIMATE</span>20MA : {{::last[0]}}, 50MA : {{::last[1]}}, 200MA : {{::last[2]}}</div>\n" +
    "    </div>\n" +
    "    <div class=\"graph\">\n" +
    "        <canvas></canvas>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("directives/stackChart.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("directives/stackChart.tpl.html",
    "<div class=\"section\">\n" +
    "    <div class=\"header\">\n" +
    "        <div>{{::label}}</div>\n" +
    "        <div>\n" +
    "            <span>BEST</span>\n" +
    "            <ul>\n" +
    "                <li ng-repeat=\"item in top track by $index\">{{::item.i}} <span>{{::item.n}}</span></li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"graph\">\n" +
    "        <canvas></canvas>\n" +
    "    </div>\n" +
    "</div>");
}]);

},{}],2:[function(require,module,exports){
var Chart = require("../lib/Chart.min.js");


require('app').directive('lineChart', /* @ngInject */ ["chartOption", "chartData", function (chartOption, chartData) {
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
}]);
},{"../lib/Chart.min.js":4,"app":"app"}],3:[function(require,module,exports){
var Chart = require("../lib/Chart.min.js");


require('app').directive('stackChart', /* @ngInject */ ["chartOption", "chartLast", "periods", function (chartOption, chartLast, periods) {
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
}]);
},{"../lib/Chart.min.js":4,"app":"app"}],4:[function(require,module,exports){
/*!
 * Chart.js
 * http://chartjs.org/
 * Version: 1.0.1
 *
 * Copyright 2015 Nick Downie
 * Released under the MIT license
 * https://github.com/nnnick/Chart.js/blob/master/LICENSE.md
 */
(function(){"use strict";var t=this,i=t.Chart,e=function(t){this.canvas=t.canvas,this.ctx=t;var i=function(t,i){return t["offset"+i]?t["offset"+i]:document.defaultView.getComputedStyle(t).getPropertyValue(i)},e=this.width=i(t.canvas,"Width"),n=this.height=i(t.canvas,"Height");t.canvas.width=e,t.canvas.height=n;var e=this.width=t.canvas.width,n=this.height=t.canvas.height;return this.aspectRatio=this.width/this.height,s.retinaScale(this),this};e.defaults={global:{animation:!0,animationSteps:60,animationEasing:"easeOutQuart",showScale:!0,scaleOverride:!1,scaleSteps:null,scaleStepWidth:null,scaleStartValue:null,scaleLineColor:"rgba(0,0,0,.1)",scaleLineWidth:1,scaleShowLabels:!0,scaleLabel:"<%=value%>",scaleIntegersOnly:!0,scaleBeginAtZero:!1,scaleFontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",scaleFontSize:12,scaleFontStyle:"normal",scaleFontColor:"#666",responsive:!1,maintainAspectRatio:!0,showTooltips:!0,customTooltips:!1,tooltipEvents:["mousemove","touchstart","touchmove","mouseout"],tooltipFillColor:"rgba(0,0,0,0.8)",tooltipFontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",tooltipFontSize:14,tooltipFontStyle:"normal",tooltipFontColor:"#fff",tooltipTitleFontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",tooltipTitleFontSize:14,tooltipTitleFontStyle:"bold",tooltipTitleFontColor:"#fff",tooltipYPadding:6,tooltipXPadding:6,tooltipCaretSize:8,tooltipCornerRadius:6,tooltipXOffset:10,tooltipTemplate:"<%if (label){%><%=label%>: <%}%><%= value %>",multiTooltipTemplate:"<%= value %>",multiTooltipKeyBackground:"#fff",onAnimationProgress:function(){},onAnimationComplete:function(){}}},e.types={};var s=e.helpers={},n=s.each=function(t,i,e){var s=Array.prototype.slice.call(arguments,3);if(t)if(t.length===+t.length){var n;for(n=0;n<t.length;n++)i.apply(e,[t[n],n].concat(s))}else for(var o in t)i.apply(e,[t[o],o].concat(s))},o=s.clone=function(t){var i={};return n(t,function(e,s){t.hasOwnProperty(s)&&(i[s]=e)}),i},a=s.extend=function(t){return n(Array.prototype.slice.call(arguments,1),function(i){n(i,function(e,s){i.hasOwnProperty(s)&&(t[s]=e)})}),t},h=s.merge=function(){var t=Array.prototype.slice.call(arguments,0);return t.unshift({}),a.apply(null,t)},l=s.indexOf=function(t,i){if(Array.prototype.indexOf)return t.indexOf(i);for(var e=0;e<t.length;e++)if(t[e]===i)return e;return-1},r=(s.where=function(t,i){var e=[];return s.each(t,function(t){i(t)&&e.push(t)}),e},s.findNextWhere=function(t,i,e){e||(e=-1);for(var s=e+1;s<t.length;s++){var n=t[s];if(i(n))return n}},s.findPreviousWhere=function(t,i,e){e||(e=t.length);for(var s=e-1;s>=0;s--){var n=t[s];if(i(n))return n}},s.inherits=function(t){var i=this,e=t&&t.hasOwnProperty("constructor")?t.constructor:function(){return i.apply(this,arguments)},s=function(){this.constructor=e};return s.prototype=i.prototype,e.prototype=new s,e.extend=r,t&&a(e.prototype,t),e.__super__=i.prototype,e}),c=s.noop=function(){},u=s.uid=function(){var t=0;return function(){return"chart-"+t++}}(),d=s.warn=function(t){window.console&&"function"==typeof window.console.warn&&console.warn(t)},p=s.amd="function"==typeof define&&define.amd,f=s.isNumber=function(t){return!isNaN(parseFloat(t))&&isFinite(t)},g=s.max=function(t){return Math.max.apply(Math,t)},m=s.min=function(t){return Math.min.apply(Math,t)},v=(s.cap=function(t,i,e){if(f(i)){if(t>i)return i}else if(f(e)&&e>t)return e;return t},s.getDecimalPlaces=function(t){return t%1!==0&&f(t)?t.toString().split(".")[1].length:0}),S=s.radians=function(t){return t*(Math.PI/180)},x=(s.getAngleFromPoint=function(t,i){var e=i.x-t.x,s=i.y-t.y,n=Math.sqrt(e*e+s*s),o=2*Math.PI+Math.atan2(s,e);return 0>e&&0>s&&(o+=2*Math.PI),{angle:o,distance:n}},s.aliasPixel=function(t){return t%2===0?0:.5}),y=(s.splineCurve=function(t,i,e,s){var n=Math.sqrt(Math.pow(i.x-t.x,2)+Math.pow(i.y-t.y,2)),o=Math.sqrt(Math.pow(e.x-i.x,2)+Math.pow(e.y-i.y,2)),a=s*n/(n+o),h=s*o/(n+o);return{inner:{x:i.x-a*(e.x-t.x),y:i.y-a*(e.y-t.y)},outer:{x:i.x+h*(e.x-t.x),y:i.y+h*(e.y-t.y)}}},s.calculateOrderOfMagnitude=function(t){return Math.floor(Math.log(t)/Math.LN10)}),C=(s.calculateScaleRange=function(t,i,e,s,n){var o=2,a=Math.floor(i/(1.5*e)),h=o>=a,l=g(t),r=m(t);l===r&&(l+=.5,r>=.5&&!s?r-=.5:l+=.5);for(var c=Math.abs(l-r),u=y(c),d=Math.ceil(l/(1*Math.pow(10,u)))*Math.pow(10,u),p=s?0:Math.floor(r/(1*Math.pow(10,u)))*Math.pow(10,u),f=d-p,v=Math.pow(10,u),S=Math.round(f/v);(S>a||a>2*S)&&!h;)if(S>a)v*=2,S=Math.round(f/v),S%1!==0&&(h=!0);else if(n&&u>=0){if(v/2%1!==0)break;v/=2,S=Math.round(f/v)}else v/=2,S=Math.round(f/v);return h&&(S=o,v=f/S),{steps:S,stepValue:v,min:p,max:p+S*v}},s.template=function(t,i){function e(t,i){var e=/\W/.test(t)?new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+t.replace(/[\r\t\n]/g," ").split("<%").join("	").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("	").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');"):s[t]=s[t];return i?e(i):e}if(t instanceof Function)return t(i);var s={};return e(t,i)}),w=(s.generateLabels=function(t,i,e,s){var o=new Array(i);return labelTemplateString&&n(o,function(i,n){o[n]=C(t,{value:e+s*(n+1)})}),o},s.easingEffects={linear:function(t){return t},easeInQuad:function(t){return t*t},easeOutQuad:function(t){return-1*t*(t-2)},easeInOutQuad:function(t){return(t/=.5)<1?.5*t*t:-0.5*(--t*(t-2)-1)},easeInCubic:function(t){return t*t*t},easeOutCubic:function(t){return 1*((t=t/1-1)*t*t+1)},easeInOutCubic:function(t){return(t/=.5)<1?.5*t*t*t:.5*((t-=2)*t*t+2)},easeInQuart:function(t){return t*t*t*t},easeOutQuart:function(t){return-1*((t=t/1-1)*t*t*t-1)},easeInOutQuart:function(t){return(t/=.5)<1?.5*t*t*t*t:-0.5*((t-=2)*t*t*t-2)},easeInQuint:function(t){return 1*(t/=1)*t*t*t*t},easeOutQuint:function(t){return 1*((t=t/1-1)*t*t*t*t+1)},easeInOutQuint:function(t){return(t/=.5)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)},easeInSine:function(t){return-1*Math.cos(t/1*(Math.PI/2))+1},easeOutSine:function(t){return 1*Math.sin(t/1*(Math.PI/2))},easeInOutSine:function(t){return-0.5*(Math.cos(Math.PI*t/1)-1)},easeInExpo:function(t){return 0===t?1:1*Math.pow(2,10*(t/1-1))},easeOutExpo:function(t){return 1===t?1:1*(-Math.pow(2,-10*t/1)+1)},easeInOutExpo:function(t){return 0===t?0:1===t?1:(t/=.5)<1?.5*Math.pow(2,10*(t-1)):.5*(-Math.pow(2,-10*--t)+2)},easeInCirc:function(t){return t>=1?t:-1*(Math.sqrt(1-(t/=1)*t)-1)},easeOutCirc:function(t){return 1*Math.sqrt(1-(t=t/1-1)*t)},easeInOutCirc:function(t){return(t/=.5)<1?-0.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},easeInElastic:function(t){var i=1.70158,e=0,s=1;return 0===t?0:1==(t/=1)?1:(e||(e=.3),s<Math.abs(1)?(s=1,i=e/4):i=e/(2*Math.PI)*Math.asin(1/s),-(s*Math.pow(2,10*(t-=1))*Math.sin(2*(1*t-i)*Math.PI/e)))},easeOutElastic:function(t){var i=1.70158,e=0,s=1;return 0===t?0:1==(t/=1)?1:(e||(e=.3),s<Math.abs(1)?(s=1,i=e/4):i=e/(2*Math.PI)*Math.asin(1/s),s*Math.pow(2,-10*t)*Math.sin(2*(1*t-i)*Math.PI/e)+1)},easeInOutElastic:function(t){var i=1.70158,e=0,s=1;return 0===t?0:2==(t/=.5)?1:(e||(e=.3*1.5),s<Math.abs(1)?(s=1,i=e/4):i=e/(2*Math.PI)*Math.asin(1/s),1>t?-.5*s*Math.pow(2,10*(t-=1))*Math.sin(2*(1*t-i)*Math.PI/e):s*Math.pow(2,-10*(t-=1))*Math.sin(2*(1*t-i)*Math.PI/e)*.5+1)},easeInBack:function(t){var i=1.70158;return 1*(t/=1)*t*((i+1)*t-i)},easeOutBack:function(t){var i=1.70158;return 1*((t=t/1-1)*t*((i+1)*t+i)+1)},easeInOutBack:function(t){var i=1.70158;return(t/=.5)<1?.5*t*t*(((i*=1.525)+1)*t-i):.5*((t-=2)*t*(((i*=1.525)+1)*t+i)+2)},easeInBounce:function(t){return 1-w.easeOutBounce(1-t)},easeOutBounce:function(t){return(t/=1)<1/2.75?7.5625*t*t:2/2.75>t?1*(7.5625*(t-=1.5/2.75)*t+.75):2.5/2.75>t?1*(7.5625*(t-=2.25/2.75)*t+.9375):1*(7.5625*(t-=2.625/2.75)*t+.984375)},easeInOutBounce:function(t){return.5>t?.5*w.easeInBounce(2*t):.5*w.easeOutBounce(2*t-1)+.5}}),b=s.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){return window.setTimeout(t,1e3/60)}}(),P=s.cancelAnimFrame=function(){return window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.oCancelAnimationFrame||window.msCancelAnimationFrame||function(t){return window.clearTimeout(t,1e3/60)}}(),L=(s.animationLoop=function(t,i,e,s,n,o){var a=0,h=w[e]||w.linear,l=function(){a++;var e=a/i,r=h(e);t.call(o,r,e,a),s.call(o,r,e),i>a?o.animationFrame=b(l):n.apply(o)};b(l)},s.getRelativePosition=function(t){var i,e,s=t.originalEvent||t,n=t.currentTarget||t.srcElement,o=n.getBoundingClientRect();return s.touches?(i=s.touches[0].clientX-o.left,e=s.touches[0].clientY-o.top):(i=s.clientX-o.left,e=s.clientY-o.top),{x:i,y:e}},s.addEvent=function(t,i,e){t.addEventListener?t.addEventListener(i,e):t.attachEvent?t.attachEvent("on"+i,e):t["on"+i]=e}),k=s.removeEvent=function(t,i,e){t.removeEventListener?t.removeEventListener(i,e,!1):t.detachEvent?t.detachEvent("on"+i,e):t["on"+i]=c},F=(s.bindEvents=function(t,i,e){t.events||(t.events={}),n(i,function(i){t.events[i]=function(){e.apply(t,arguments)},L(t.chart.canvas,i,t.events[i])})},s.unbindEvents=function(t,i){n(i,function(i,e){k(t.chart.canvas,e,i)})}),R=s.getMaximumWidth=function(t){var i=t.parentNode;return i.clientWidth},T=s.getMaximumHeight=function(t){var i=t.parentNode;return i.clientHeight},A=(s.getMaximumSize=s.getMaximumWidth,s.retinaScale=function(t){var i=t.ctx,e=t.canvas.width,s=t.canvas.height;window.devicePixelRatio&&(i.canvas.style.width=e+"px",i.canvas.style.height=s+"px",i.canvas.height=s*window.devicePixelRatio,i.canvas.width=e*window.devicePixelRatio,i.scale(window.devicePixelRatio,window.devicePixelRatio))}),M=s.clear=function(t){t.ctx.clearRect(0,0,t.width,t.height)},W=s.fontString=function(t,i,e){return i+" "+t+"px "+e},z=s.longestText=function(t,i,e){t.font=i;var s=0;return n(e,function(i){var e=t.measureText(i).width;s=e>s?e:s}),s},B=s.drawRoundedRectangle=function(t,i,e,s,n,o){t.beginPath(),t.moveTo(i+o,e),t.lineTo(i+s-o,e),t.quadraticCurveTo(i+s,e,i+s,e+o),t.lineTo(i+s,e+n-o),t.quadraticCurveTo(i+s,e+n,i+s-o,e+n),t.lineTo(i+o,e+n),t.quadraticCurveTo(i,e+n,i,e+n-o),t.lineTo(i,e+o),t.quadraticCurveTo(i,e,i+o,e),t.closePath()};e.instances={},e.Type=function(t,i,s){this.options=i,this.chart=s,this.id=u(),e.instances[this.id]=this,i.responsive&&this.resize(),this.initialize.call(this,t)},a(e.Type.prototype,{initialize:function(){return this},clear:function(){return M(this.chart),this},stop:function(){return P(this.animationFrame),this},resize:function(t){this.stop();var i=this.chart.canvas,e=R(this.chart.canvas),s=this.options.maintainAspectRatio?e/this.chart.aspectRatio:T(this.chart.canvas);return i.width=this.chart.width=e,i.height=this.chart.height=s,A(this.chart),"function"==typeof t&&t.apply(this,Array.prototype.slice.call(arguments,1)),this},reflow:c,render:function(t){return t&&this.reflow(),this.options.animation&&!t?s.animationLoop(this.draw,this.options.animationSteps,this.options.animationEasing,this.options.onAnimationProgress,this.options.onAnimationComplete,this):(this.draw(),this.options.onAnimationComplete.call(this)),this},generateLegend:function(){return C(this.options.legendTemplate,this)},destroy:function(){this.clear(),F(this,this.events);var t=this.chart.canvas;t.width=this.chart.width,t.height=this.chart.height,t.style.removeProperty?(t.style.removeProperty("width"),t.style.removeProperty("height")):(t.style.removeAttribute("width"),t.style.removeAttribute("height")),delete e.instances[this.id]},showTooltip:function(t,i){"undefined"==typeof this.activeElements&&(this.activeElements=[]);var o=function(t){var i=!1;return t.length!==this.activeElements.length?i=!0:(n(t,function(t,e){t!==this.activeElements[e]&&(i=!0)},this),i)}.call(this,t);if(o||i){if(this.activeElements=t,this.draw(),this.options.customTooltips&&this.options.customTooltips(!1),t.length>0)if(this.datasets&&this.datasets.length>1){for(var a,h,r=this.datasets.length-1;r>=0&&(a=this.datasets[r].points||this.datasets[r].bars||this.datasets[r].segments,h=l(a,t[0]),-1===h);r--);var c=[],u=[],d=function(){var t,i,e,n,o,a=[],l=[],r=[];return s.each(this.datasets,function(i){t=i.points||i.bars||i.segments,t[h]&&t[h].hasValue()&&a.push(t[h])}),s.each(a,function(t){l.push(t.x),r.push(t.y),c.push(s.template(this.options.multiTooltipTemplate,t)),u.push({fill:t._saved.fillColor||t.fillColor,stroke:t._saved.strokeColor||t.strokeColor})},this),o=m(r),e=g(r),n=m(l),i=g(l),{x:n>this.chart.width/2?n:i,y:(o+e)/2}}.call(this,h);new e.MultiTooltip({x:d.x,y:d.y,xPadding:this.options.tooltipXPadding,yPadding:this.options.tooltipYPadding,xOffset:this.options.tooltipXOffset,fillColor:this.options.tooltipFillColor,textColor:this.options.tooltipFontColor,fontFamily:this.options.tooltipFontFamily,fontStyle:this.options.tooltipFontStyle,fontSize:this.options.tooltipFontSize,titleTextColor:this.options.tooltipTitleFontColor,titleFontFamily:this.options.tooltipTitleFontFamily,titleFontStyle:this.options.tooltipTitleFontStyle,titleFontSize:this.options.tooltipTitleFontSize,cornerRadius:this.options.tooltipCornerRadius,labels:c,legendColors:u,legendColorBackground:this.options.multiTooltipKeyBackground,title:t[0].label,chart:this.chart,ctx:this.chart.ctx,custom:this.options.customTooltips}).draw()}else n(t,function(t){var i=t.tooltipPosition();new e.Tooltip({x:Math.round(i.x),y:Math.round(i.y),xPadding:this.options.tooltipXPadding,yPadding:this.options.tooltipYPadding,fillColor:this.options.tooltipFillColor,textColor:this.options.tooltipFontColor,fontFamily:this.options.tooltipFontFamily,fontStyle:this.options.tooltipFontStyle,fontSize:this.options.tooltipFontSize,caretHeight:this.options.tooltipCaretSize,cornerRadius:this.options.tooltipCornerRadius,text:C(this.options.tooltipTemplate,t),chart:this.chart,custom:this.options.customTooltips}).draw()},this);return this}},toBase64Image:function(){return this.chart.canvas.toDataURL.apply(this.chart.canvas,arguments)}}),e.Type.extend=function(t){var i=this,s=function(){return i.apply(this,arguments)};if(s.prototype=o(i.prototype),a(s.prototype,t),s.extend=e.Type.extend,t.name||i.prototype.name){var n=t.name||i.prototype.name,l=e.defaults[i.prototype.name]?o(e.defaults[i.prototype.name]):{};e.defaults[n]=a(l,t.defaults),e.types[n]=s,e.prototype[n]=function(t,i){var o=h(e.defaults.global,e.defaults[n],i||{});return new s(t,o,this)}}else d("Name not provided for this chart, so it hasn't been registered");return i},e.Element=function(t){a(this,t),this.initialize.apply(this,arguments),this.save()},a(e.Element.prototype,{initialize:function(){},restore:function(t){return t?n(t,function(t){this[t]=this._saved[t]},this):a(this,this._saved),this},save:function(){return this._saved=o(this),delete this._saved._saved,this},update:function(t){return n(t,function(t,i){this._saved[i]=this[i],this[i]=t},this),this},transition:function(t,i){return n(t,function(t,e){this[e]=(t-this._saved[e])*i+this._saved[e]},this),this},tooltipPosition:function(){return{x:this.x,y:this.y}},hasValue:function(){return f(this.value)}}),e.Element.extend=r,e.Point=e.Element.extend({display:!0,inRange:function(t,i){var e=this.hitDetectionRadius+this.radius;return Math.pow(t-this.x,2)+Math.pow(i-this.y,2)<Math.pow(e,2)},draw:function(){if(this.display){var t=this.ctx;t.beginPath(),t.arc(this.x,this.y,this.radius,0,2*Math.PI),t.closePath(),t.strokeStyle=this.strokeColor,t.lineWidth=this.strokeWidth,t.fillStyle=this.fillColor,t.fill(),t.stroke()}}}),e.Arc=e.Element.extend({inRange:function(t,i){var e=s.getAngleFromPoint(this,{x:t,y:i}),n=e.angle>=this.startAngle&&e.angle<=this.endAngle,o=e.distance>=this.innerRadius&&e.distance<=this.outerRadius;return n&&o},tooltipPosition:function(){var t=this.startAngle+(this.endAngle-this.startAngle)/2,i=(this.outerRadius-this.innerRadius)/2+this.innerRadius;return{x:this.x+Math.cos(t)*i,y:this.y+Math.sin(t)*i}},draw:function(t){var i=this.ctx;i.beginPath(),i.arc(this.x,this.y,this.outerRadius,this.startAngle,this.endAngle),i.arc(this.x,this.y,this.innerRadius,this.endAngle,this.startAngle,!0),i.closePath(),i.strokeStyle=this.strokeColor,i.lineWidth=this.strokeWidth,i.fillStyle=this.fillColor,i.fill(),i.lineJoin="bevel",this.showStroke&&i.stroke()}}),e.Rectangle=e.Element.extend({draw:function(){var t=this.ctx,i=this.width/2,e=this.x-i,s=this.x+i,n=this.base-(this.base-this.y),o=this.strokeWidth/2;this.showStroke&&(e+=o,s-=o,n+=o),t.beginPath(),t.fillStyle=this.fillColor,t.strokeStyle=this.strokeColor,t.lineWidth=this.strokeWidth,t.moveTo(e,this.base),t.lineTo(e,n),t.lineTo(s,n),t.lineTo(s,this.base),t.fill(),this.showStroke&&t.stroke()},height:function(){return this.base-this.y},inRange:function(t,i){return t>=this.x-this.width/2&&t<=this.x+this.width/2&&i>=this.y&&i<=this.base}}),e.Tooltip=e.Element.extend({draw:function(){var t=this.chart.ctx;t.font=W(this.fontSize,this.fontStyle,this.fontFamily),this.xAlign="center",this.yAlign="above";var i=this.caretPadding=2,e=t.measureText(this.text).width+2*this.xPadding,s=this.fontSize+2*this.yPadding,n=s+this.caretHeight+i;this.x+e/2>this.chart.width?this.xAlign="left":this.x-e/2<0&&(this.xAlign="right"),this.y-n<0&&(this.yAlign="below");var o=this.x-e/2,a=this.y-n;if(t.fillStyle=this.fillColor,this.custom)this.custom(this);else{switch(this.yAlign){case"above":t.beginPath(),t.moveTo(this.x,this.y-i),t.lineTo(this.x+this.caretHeight,this.y-(i+this.caretHeight)),t.lineTo(this.x-this.caretHeight,this.y-(i+this.caretHeight)),t.closePath(),t.fill();break;case"below":a=this.y+i+this.caretHeight,t.beginPath(),t.moveTo(this.x,this.y+i),t.lineTo(this.x+this.caretHeight,this.y+i+this.caretHeight),t.lineTo(this.x-this.caretHeight,this.y+i+this.caretHeight),t.closePath(),t.fill()}switch(this.xAlign){case"left":o=this.x-e+(this.cornerRadius+this.caretHeight);break;case"right":o=this.x-(this.cornerRadius+this.caretHeight)}B(t,o,a,e,s,this.cornerRadius),t.fill(),t.fillStyle=this.textColor,t.textAlign="center",t.textBaseline="middle",t.fillText(this.text,o+e/2,a+s/2)}}}),e.MultiTooltip=e.Element.extend({initialize:function(){this.font=W(this.fontSize,this.fontStyle,this.fontFamily),this.titleFont=W(this.titleFontSize,this.titleFontStyle,this.titleFontFamily),this.height=this.labels.length*this.fontSize+(this.labels.length-1)*(this.fontSize/2)+2*this.yPadding+1.5*this.titleFontSize,this.ctx.font=this.titleFont;var t=this.ctx.measureText(this.title).width,i=z(this.ctx,this.font,this.labels)+this.fontSize+3,e=g([i,t]);this.width=e+2*this.xPadding;var s=this.height/2;this.y-s<0?this.y=s:this.y+s>this.chart.height&&(this.y=this.chart.height-s),this.x>this.chart.width/2?this.x-=this.xOffset+this.width:this.x+=this.xOffset},getLineHeight:function(t){var i=this.y-this.height/2+this.yPadding,e=t-1;return 0===t?i+this.titleFontSize/2:i+(1.5*this.fontSize*e+this.fontSize/2)+1.5*this.titleFontSize},draw:function(){if(this.custom)this.custom(this);else{B(this.ctx,this.x,this.y-this.height/2,this.width,this.height,this.cornerRadius);var t=this.ctx;t.fillStyle=this.fillColor,t.fill(),t.closePath(),t.textAlign="left",t.textBaseline="middle",t.fillStyle=this.titleTextColor,t.font=this.titleFont,t.fillText(this.title,this.x+this.xPadding,this.getLineHeight(0)),t.font=this.font,s.each(this.labels,function(i,e){t.fillStyle=this.textColor,t.fillText(i,this.x+this.xPadding+this.fontSize+3,this.getLineHeight(e+1)),t.fillStyle=this.legendColorBackground,t.fillRect(this.x+this.xPadding,this.getLineHeight(e+1)-this.fontSize/2,this.fontSize,this.fontSize),t.fillStyle=this.legendColors[e].fill,t.fillRect(this.x+this.xPadding,this.getLineHeight(e+1)-this.fontSize/2,this.fontSize,this.fontSize)},this)}}}),e.Scale=e.Element.extend({initialize:function(){this.fit()},buildYLabels:function(){this.yLabels=[];for(var t=v(this.stepValue),i=0;i<=this.steps;i++)this.yLabels.push(C(this.templateString,{value:(this.min+i*this.stepValue).toFixed(t)}));this.yLabelWidth=this.display&&this.showLabels?z(this.ctx,this.font,this.yLabels):0},addXLabel:function(t){this.xLabels.push(t),this.valuesCount++,this.fit()},removeXLabel:function(){this.xLabels.shift(),this.valuesCount--,this.fit()},fit:function(){this.startPoint=this.display?this.fontSize:0,this.endPoint=this.display?this.height-1.5*this.fontSize-5:this.height,this.startPoint+=this.padding,this.endPoint-=this.padding;var t,i=this.endPoint-this.startPoint;for(this.calculateYRange(i),this.buildYLabels(),this.calculateXLabelRotation();i>this.endPoint-this.startPoint;)i=this.endPoint-this.startPoint,t=this.yLabelWidth,this.calculateYRange(i),this.buildYLabels(),t<this.yLabelWidth&&this.calculateXLabelRotation()},calculateXLabelRotation:function(){this.ctx.font=this.font;var t,i,e=this.ctx.measureText(this.xLabels[0]).width,s=this.ctx.measureText(this.xLabels[this.xLabels.length-1]).width;if(this.xScalePaddingRight=s/2+3,this.xScalePaddingLeft=e/2>this.yLabelWidth+10?e/2:this.yLabelWidth+10,this.xLabelRotation=0,this.display){var n,o=z(this.ctx,this.font,this.xLabels);this.xLabelWidth=o;for(var a=Math.floor(this.calculateX(1)-this.calculateX(0))-6;this.xLabelWidth>a&&0===this.xLabelRotation||this.xLabelWidth>a&&this.xLabelRotation<=90&&this.xLabelRotation>0;)n=Math.cos(S(this.xLabelRotation)),t=n*e,i=n*s,t+this.fontSize/2>this.yLabelWidth+8&&(this.xScalePaddingLeft=t+this.fontSize/2),this.xScalePaddingRight=this.fontSize/2,this.xLabelRotation++,this.xLabelWidth=n*o;this.xLabelRotation>0&&(this.endPoint-=Math.sin(S(this.xLabelRotation))*o+3)}else this.xLabelWidth=0,this.xScalePaddingRight=this.padding,this.xScalePaddingLeft=this.padding},calculateYRange:c,drawingArea:function(){return this.startPoint-this.endPoint},calculateY:function(t){var i=this.drawingArea()/(this.min-this.max);return this.endPoint-i*(t-this.min)},calculateX:function(t){var i=(this.xLabelRotation>0,this.width-(this.xScalePaddingLeft+this.xScalePaddingRight)),e=i/Math.max(this.valuesCount-(this.offsetGridLines?0:1),1),s=e*t+this.xScalePaddingLeft;return this.offsetGridLines&&(s+=e/2),Math.round(s)},update:function(t){s.extend(this,t),this.fit()},draw:function(){var t=this.ctx,i=(this.endPoint-this.startPoint)/this.steps,e=Math.round(this.xScalePaddingLeft);this.display&&(t.fillStyle=this.textColor,t.font=this.font,n(this.yLabels,function(n,o){var a=this.endPoint-i*o,h=Math.round(a),l=this.showHorizontalLines;t.textAlign="right",t.textBaseline="middle",this.showLabels&&t.fillText(n,e-10,a),0!==o||l||(l=!0),l&&t.beginPath(),o>0?(t.lineWidth=this.gridLineWidth,t.strokeStyle=this.gridLineColor):(t.lineWidth=this.lineWidth,t.strokeStyle=this.lineColor),h+=s.aliasPixel(t.lineWidth),l&&(t.moveTo(e,h),t.lineTo(this.width,h),t.stroke(),t.closePath()),t.lineWidth=this.lineWidth,t.strokeStyle=this.lineColor,t.beginPath(),t.moveTo(e-5,h),t.lineTo(e,h),t.stroke(),t.closePath()},this),n(this.xLabels,function(i,e){var s=this.calculateX(e)+x(this.lineWidth),n=this.calculateX(e-(this.offsetGridLines?.5:0))+x(this.lineWidth),o=this.xLabelRotation>0,a=this.showVerticalLines;0!==e||a||(a=!0),a&&t.beginPath(),e>0?(t.lineWidth=this.gridLineWidth,t.strokeStyle=this.gridLineColor):(t.lineWidth=this.lineWidth,t.strokeStyle=this.lineColor),a&&(t.moveTo(n,this.endPoint),t.lineTo(n,this.startPoint-3),t.stroke(),t.closePath()),t.lineWidth=this.lineWidth,t.strokeStyle=this.lineColor,t.beginPath(),t.moveTo(n,this.endPoint),t.lineTo(n,this.endPoint+5),t.stroke(),t.closePath(),t.save(),t.translate(s,o?this.endPoint+12:this.endPoint+8),t.rotate(-1*S(this.xLabelRotation)),t.font=this.font,t.textAlign=o?"right":"center",t.textBaseline=o?"middle":"top",t.fillText(i,0,0),t.restore()},this))}}),e.RadialScale=e.Element.extend({initialize:function(){this.size=m([this.height,this.width]),this.drawingArea=this.display?this.size/2-(this.fontSize/2+this.backdropPaddingY):this.size/2},calculateCenterOffset:function(t){var i=this.drawingArea/(this.max-this.min);return(t-this.min)*i},update:function(){this.lineArc?this.drawingArea=this.display?this.size/2-(this.fontSize/2+this.backdropPaddingY):this.size/2:this.setScaleSize(),this.buildYLabels()},buildYLabels:function(){this.yLabels=[];for(var t=v(this.stepValue),i=0;i<=this.steps;i++)this.yLabels.push(C(this.templateString,{value:(this.min+i*this.stepValue).toFixed(t)}))},getCircumference:function(){return 2*Math.PI/this.valuesCount},setScaleSize:function(){var t,i,e,s,n,o,a,h,l,r,c,u,d=m([this.height/2-this.pointLabelFontSize-5,this.width/2]),p=this.width,g=0;for(this.ctx.font=W(this.pointLabelFontSize,this.pointLabelFontStyle,this.pointLabelFontFamily),i=0;i<this.valuesCount;i++)t=this.getPointPosition(i,d),e=this.ctx.measureText(C(this.templateString,{value:this.labels[i]})).width+5,0===i||i===this.valuesCount/2?(s=e/2,t.x+s>p&&(p=t.x+s,n=i),t.x-s<g&&(g=t.x-s,a=i)):i<this.valuesCount/2?t.x+e>p&&(p=t.x+e,n=i):i>this.valuesCount/2&&t.x-e<g&&(g=t.x-e,a=i);l=g,r=Math.ceil(p-this.width),o=this.getIndexAngle(n),h=this.getIndexAngle(a),c=r/Math.sin(o+Math.PI/2),u=l/Math.sin(h+Math.PI/2),c=f(c)?c:0,u=f(u)?u:0,this.drawingArea=d-(u+c)/2,this.setCenterPoint(u,c)},setCenterPoint:function(t,i){var e=this.width-i-this.drawingArea,s=t+this.drawingArea;this.xCenter=(s+e)/2,this.yCenter=this.height/2},getIndexAngle:function(t){var i=2*Math.PI/this.valuesCount;return t*i-Math.PI/2},getPointPosition:function(t,i){var e=this.getIndexAngle(t);return{x:Math.cos(e)*i+this.xCenter,y:Math.sin(e)*i+this.yCenter}},draw:function(){if(this.display){var t=this.ctx;if(n(this.yLabels,function(i,e){if(e>0){var s,n=e*(this.drawingArea/this.steps),o=this.yCenter-n;if(this.lineWidth>0)if(t.strokeStyle=this.lineColor,t.lineWidth=this.lineWidth,this.lineArc)t.beginPath(),t.arc(this.xCenter,this.yCenter,n,0,2*Math.PI),t.closePath(),t.stroke();else{t.beginPath();for(var a=0;a<this.valuesCount;a++)s=this.getPointPosition(a,this.calculateCenterOffset(this.min+e*this.stepValue)),0===a?t.moveTo(s.x,s.y):t.lineTo(s.x,s.y);t.closePath(),t.stroke()}if(this.showLabels){if(t.font=W(this.fontSize,this.fontStyle,this.fontFamily),this.showLabelBackdrop){var h=t.measureText(i).width;t.fillStyle=this.backdropColor,t.fillRect(this.xCenter-h/2-this.backdropPaddingX,o-this.fontSize/2-this.backdropPaddingY,h+2*this.backdropPaddingX,this.fontSize+2*this.backdropPaddingY)}t.textAlign="center",t.textBaseline="middle",t.fillStyle=this.fontColor,t.fillText(i,this.xCenter,o)}}},this),!this.lineArc){t.lineWidth=this.angleLineWidth,t.strokeStyle=this.angleLineColor;for(var i=this.valuesCount-1;i>=0;i--){if(this.angleLineWidth>0){var e=this.getPointPosition(i,this.calculateCenterOffset(this.max));t.beginPath(),t.moveTo(this.xCenter,this.yCenter),t.lineTo(e.x,e.y),t.stroke(),t.closePath()}var s=this.getPointPosition(i,this.calculateCenterOffset(this.max)+5);t.font=W(this.pointLabelFontSize,this.pointLabelFontStyle,this.pointLabelFontFamily),t.fillStyle=this.pointLabelFontColor;var o=this.labels.length,a=this.labels.length/2,h=a/2,l=h>i||i>o-h,r=i===h||i===o-h;t.textAlign=0===i?"center":i===a?"center":a>i?"left":"right",t.textBaseline=r?"middle":l?"bottom":"top",t.fillText(this.labels[i],s.x,s.y)}}}}}),s.addEvent(window,"resize",function(){var t;return function(){clearTimeout(t),t=setTimeout(function(){n(e.instances,function(t){t.options.responsive&&t.resize(t.render,!0)})},50)}}()),p?define(function(){return e}):"object"==typeof module&&module.exports&&(module.exports=e),t.Chart=e,e.noConflict=function(){return t.Chart=i,e}}).call(this),function(){"use strict";var t=this,i=t.Chart,e=i.helpers,s={scaleBeginAtZero:!0,scaleShowGridLines:!0,scaleGridLineColor:"rgba(0,0,0,.05)",scaleGridLineWidth:1,scaleShowHorizontalLines:!0,scaleShowVerticalLines:!0,barShowStroke:!0,barStrokeWidth:2,barValueSpacing:5,barDatasetSpacing:1,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'};i.Type.extend({name:"Bar",defaults:s,initialize:function(t){var s=this.options;this.ScaleClass=i.Scale.extend({offsetGridLines:!0,calculateBarX:function(t,i,e){var n=this.calculateBaseWidth(),o=this.calculateX(e)-n/2,a=this.calculateBarWidth(t);return o+a*i+i*s.barDatasetSpacing+a/2},calculateBaseWidth:function(){return this.calculateX(1)-this.calculateX(0)-2*s.barValueSpacing},calculateBarWidth:function(t){var i=this.calculateBaseWidth()-(t-1)*s.barDatasetSpacing;return i/t}}),this.datasets=[],this.options.showTooltips&&e.bindEvents(this,this.options.tooltipEvents,function(t){var i="mouseout"!==t.type?this.getBarsAtEvent(t):[];this.eachBars(function(t){t.restore(["fillColor","strokeColor"])}),e.each(i,function(t){t.fillColor=t.highlightFill,t.strokeColor=t.highlightStroke}),this.showTooltip(i)}),this.BarClass=i.Rectangle.extend({strokeWidth:this.options.barStrokeWidth,showStroke:this.options.barShowStroke,ctx:this.chart.ctx}),e.each(t.datasets,function(i){var s={label:i.label||null,fillColor:i.fillColor,strokeColor:i.strokeColor,bars:[]};this.datasets.push(s),e.each(i.data,function(e,n){s.bars.push(new this.BarClass({value:e,label:t.labels[n],datasetLabel:i.label,strokeColor:i.strokeColor,fillColor:i.fillColor,highlightFill:i.highlightFill||i.fillColor,highlightStroke:i.highlightStroke||i.strokeColor}))},this)},this),this.buildScale(t.labels),this.BarClass.prototype.base=this.scale.endPoint,this.eachBars(function(t,i,s){e.extend(t,{width:this.scale.calculateBarWidth(this.datasets.length),x:this.scale.calculateBarX(this.datasets.length,s,i),y:this.scale.endPoint}),t.save()},this),this.render()},update:function(){this.scale.update(),e.each(this.activeElements,function(t){t.restore(["fillColor","strokeColor"])}),this.eachBars(function(t){t.save()}),this.render()},eachBars:function(t){e.each(this.datasets,function(i,s){e.each(i.bars,t,this,s)},this)},getBarsAtEvent:function(t){for(var i,s=[],n=e.getRelativePosition(t),o=function(t){s.push(t.bars[i])},a=0;a<this.datasets.length;a++)for(i=0;i<this.datasets[a].bars.length;i++)if(this.datasets[a].bars[i].inRange(n.x,n.y))return e.each(this.datasets,o),s;return s},buildScale:function(t){var i=this,s=function(){var t=[];return i.eachBars(function(i){t.push(i.value)}),t},n={templateString:this.options.scaleLabel,height:this.chart.height,width:this.chart.width,ctx:this.chart.ctx,textColor:this.options.scaleFontColor,fontSize:this.options.scaleFontSize,fontStyle:this.options.scaleFontStyle,fontFamily:this.options.scaleFontFamily,valuesCount:t.length,beginAtZero:this.options.scaleBeginAtZero,integersOnly:this.options.scaleIntegersOnly,calculateYRange:function(t){var i=e.calculateScaleRange(s(),t,this.fontSize,this.beginAtZero,this.integersOnly);e.extend(this,i)},xLabels:t,font:e.fontString(this.options.scaleFontSize,this.options.scaleFontStyle,this.options.scaleFontFamily),lineWidth:this.options.scaleLineWidth,lineColor:this.options.scaleLineColor,showHorizontalLines:this.options.scaleShowHorizontalLines,showVerticalLines:this.options.scaleShowVerticalLines,gridLineWidth:this.options.scaleShowGridLines?this.options.scaleGridLineWidth:0,gridLineColor:this.options.scaleShowGridLines?this.options.scaleGridLineColor:"rgba(0,0,0,0)",padding:this.options.showScale?0:this.options.barShowStroke?this.options.barStrokeWidth:0,showLabels:this.options.scaleShowLabels,display:this.options.showScale};this.options.scaleOverride&&e.extend(n,{calculateYRange:e.noop,steps:this.options.scaleSteps,stepValue:this.options.scaleStepWidth,min:this.options.scaleStartValue,max:this.options.scaleStartValue+this.options.scaleSteps*this.options.scaleStepWidth}),this.scale=new this.ScaleClass(n)},addData:function(t,i){e.each(t,function(t,e){this.datasets[e].bars.push(new this.BarClass({value:t,label:i,x:this.scale.calculateBarX(this.datasets.length,e,this.scale.valuesCount+1),y:this.scale.endPoint,width:this.scale.calculateBarWidth(this.datasets.length),base:this.scale.endPoint,strokeColor:this.datasets[e].strokeColor,fillColor:this.datasets[e].fillColor}))
},this),this.scale.addXLabel(i),this.update()},removeData:function(){this.scale.removeXLabel(),e.each(this.datasets,function(t){t.bars.shift()},this),this.update()},reflow:function(){e.extend(this.BarClass.prototype,{y:this.scale.endPoint,base:this.scale.endPoint});var t=e.extend({height:this.chart.height,width:this.chart.width});this.scale.update(t)},draw:function(t){var i=t||1;this.clear();this.chart.ctx;this.scale.draw(i),e.each(this.datasets,function(t,s){e.each(t.bars,function(t,e){t.hasValue()&&(t.base=this.scale.endPoint,t.transition({x:this.scale.calculateBarX(this.datasets.length,s,e),y:this.scale.calculateY(t.value),width:this.scale.calculateBarWidth(this.datasets.length)},i).draw())},this)},this)}})}.call(this),function(){"use strict";var t=this,i=t.Chart,e=i.helpers,s={segmentShowStroke:!0,segmentStrokeColor:"#fff",segmentStrokeWidth:2,percentageInnerCutout:50,animationSteps:100,animationEasing:"easeOutBounce",animateRotate:!0,animateScale:!1,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'};i.Type.extend({name:"Doughnut",defaults:s,initialize:function(t){this.segments=[],this.outerRadius=(e.min([this.chart.width,this.chart.height])-this.options.segmentStrokeWidth/2)/2,this.SegmentArc=i.Arc.extend({ctx:this.chart.ctx,x:this.chart.width/2,y:this.chart.height/2}),this.options.showTooltips&&e.bindEvents(this,this.options.tooltipEvents,function(t){var i="mouseout"!==t.type?this.getSegmentsAtEvent(t):[];e.each(this.segments,function(t){t.restore(["fillColor"])}),e.each(i,function(t){t.fillColor=t.highlightColor}),this.showTooltip(i)}),this.calculateTotal(t),e.each(t,function(t,i){this.addData(t,i,!0)},this),this.render()},getSegmentsAtEvent:function(t){var i=[],s=e.getRelativePosition(t);return e.each(this.segments,function(t){t.inRange(s.x,s.y)&&i.push(t)},this),i},addData:function(t,i,e){var s=i||this.segments.length;this.segments.splice(s,0,new this.SegmentArc({value:t.value,outerRadius:this.options.animateScale?0:this.outerRadius,innerRadius:this.options.animateScale?0:this.outerRadius/100*this.options.percentageInnerCutout,fillColor:t.color,highlightColor:t.highlight||t.color,showStroke:this.options.segmentShowStroke,strokeWidth:this.options.segmentStrokeWidth,strokeColor:this.options.segmentStrokeColor,startAngle:1.5*Math.PI,circumference:this.options.animateRotate?0:this.calculateCircumference(t.value),label:t.label})),e||(this.reflow(),this.update())},calculateCircumference:function(t){return 2*Math.PI*(Math.abs(t)/this.total)},calculateTotal:function(t){this.total=0,e.each(t,function(t){this.total+=Math.abs(t.value)},this)},update:function(){this.calculateTotal(this.segments),e.each(this.activeElements,function(t){t.restore(["fillColor"])}),e.each(this.segments,function(t){t.save()}),this.render()},removeData:function(t){var i=e.isNumber(t)?t:this.segments.length-1;this.segments.splice(i,1),this.reflow(),this.update()},reflow:function(){e.extend(this.SegmentArc.prototype,{x:this.chart.width/2,y:this.chart.height/2}),this.outerRadius=(e.min([this.chart.width,this.chart.height])-this.options.segmentStrokeWidth/2)/2,e.each(this.segments,function(t){t.update({outerRadius:this.outerRadius,innerRadius:this.outerRadius/100*this.options.percentageInnerCutout})},this)},draw:function(t){var i=t?t:1;this.clear(),e.each(this.segments,function(t,e){t.transition({circumference:this.calculateCircumference(t.value),outerRadius:this.outerRadius,innerRadius:this.outerRadius/100*this.options.percentageInnerCutout},i),t.endAngle=t.startAngle+t.circumference,t.draw(),0===e&&(t.startAngle=1.5*Math.PI),e<this.segments.length-1&&(this.segments[e+1].startAngle=t.endAngle)},this)}}),i.types.Doughnut.extend({name:"Pie",defaults:e.merge(s,{percentageInnerCutout:0})})}.call(this),function(){"use strict";var t=this,i=t.Chart,e=i.helpers,s={scaleShowGridLines:!0,scaleGridLineColor:"rgba(0,0,0,.05)",scaleGridLineWidth:1,scaleShowHorizontalLines:!0,scaleShowVerticalLines:!0,bezierCurve:!0,bezierCurveTension:.4,pointDot:!0,pointDotRadius:4,pointDotStrokeWidth:1,pointHitDetectionRadius:20,datasetStroke:!0,datasetStrokeWidth:2,datasetFill:!0,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'};i.Type.extend({name:"Line",defaults:s,initialize:function(t){this.PointClass=i.Point.extend({strokeWidth:this.options.pointDotStrokeWidth,radius:this.options.pointDotRadius,display:this.options.pointDot,hitDetectionRadius:this.options.pointHitDetectionRadius,ctx:this.chart.ctx,inRange:function(t){return Math.pow(t-this.x,2)<Math.pow(this.radius+this.hitDetectionRadius,2)}}),this.datasets=[],this.options.showTooltips&&e.bindEvents(this,this.options.tooltipEvents,function(t){var i="mouseout"!==t.type?this.getPointsAtEvent(t):[];this.eachPoints(function(t){t.restore(["fillColor","strokeColor"])}),e.each(i,function(t){t.fillColor=t.highlightFill,t.strokeColor=t.highlightStroke}),this.showTooltip(i)}),e.each(t.datasets,function(i){var s={label:i.label||null,fillColor:i.fillColor,strokeColor:i.strokeColor,pointColor:i.pointColor,pointStrokeColor:i.pointStrokeColor,points:[]};this.datasets.push(s),e.each(i.data,function(e,n){s.points.push(new this.PointClass({value:e,label:t.labels[n],datasetLabel:i.label,strokeColor:i.pointStrokeColor,fillColor:i.pointColor,highlightFill:i.pointHighlightFill||i.pointColor,highlightStroke:i.pointHighlightStroke||i.pointStrokeColor}))},this),this.buildScale(t.labels),this.eachPoints(function(t,i){e.extend(t,{x:this.scale.calculateX(i),y:this.scale.endPoint}),t.save()},this)},this),this.render()},update:function(){this.scale.update(),e.each(this.activeElements,function(t){t.restore(["fillColor","strokeColor"])}),this.eachPoints(function(t){t.save()}),this.render()},eachPoints:function(t){e.each(this.datasets,function(i){e.each(i.points,t,this)},this)},getPointsAtEvent:function(t){var i=[],s=e.getRelativePosition(t);return e.each(this.datasets,function(t){e.each(t.points,function(t){t.inRange(s.x,s.y)&&i.push(t)})},this),i},buildScale:function(t){var s=this,n=function(){var t=[];return s.eachPoints(function(i){t.push(i.value)}),t},o={templateString:this.options.scaleLabel,height:this.chart.height,width:this.chart.width,ctx:this.chart.ctx,textColor:this.options.scaleFontColor,fontSize:this.options.scaleFontSize,fontStyle:this.options.scaleFontStyle,fontFamily:this.options.scaleFontFamily,valuesCount:t.length,beginAtZero:this.options.scaleBeginAtZero,integersOnly:this.options.scaleIntegersOnly,calculateYRange:function(t){var i=e.calculateScaleRange(n(),t,this.fontSize,this.beginAtZero,this.integersOnly);e.extend(this,i)},xLabels:t,font:e.fontString(this.options.scaleFontSize,this.options.scaleFontStyle,this.options.scaleFontFamily),lineWidth:this.options.scaleLineWidth,lineColor:this.options.scaleLineColor,showHorizontalLines:this.options.scaleShowHorizontalLines,showVerticalLines:this.options.scaleShowVerticalLines,gridLineWidth:this.options.scaleShowGridLines?this.options.scaleGridLineWidth:0,gridLineColor:this.options.scaleShowGridLines?this.options.scaleGridLineColor:"rgba(0,0,0,0)",padding:this.options.showScale?0:this.options.pointDotRadius+this.options.pointDotStrokeWidth,showLabels:this.options.scaleShowLabels,display:this.options.showScale};this.options.scaleOverride&&e.extend(o,{calculateYRange:e.noop,steps:this.options.scaleSteps,stepValue:this.options.scaleStepWidth,min:this.options.scaleStartValue,max:this.options.scaleStartValue+this.options.scaleSteps*this.options.scaleStepWidth}),this.scale=new i.Scale(o)},addData:function(t,i){e.each(t,function(t,e){this.datasets[e].points.push(new this.PointClass({value:t,label:i,x:this.scale.calculateX(this.scale.valuesCount+1),y:this.scale.endPoint,strokeColor:this.datasets[e].pointStrokeColor,fillColor:this.datasets[e].pointColor}))},this),this.scale.addXLabel(i),this.update()},removeData:function(){this.scale.removeXLabel(),e.each(this.datasets,function(t){t.points.shift()},this),this.update()},reflow:function(){var t=e.extend({height:this.chart.height,width:this.chart.width});this.scale.update(t)},draw:function(t){var i=t||1;this.clear();var s=this.chart.ctx,n=function(t){return null!==t.value},o=function(t,i,s){return e.findNextWhere(i,n,s)||t},a=function(t,i,s){return e.findPreviousWhere(i,n,s)||t};this.scale.draw(i),e.each(this.datasets,function(t){var h=e.where(t.points,n);e.each(t.points,function(t,e){t.hasValue()&&t.transition({y:this.scale.calculateY(t.value),x:this.scale.calculateX(e)},i)},this),this.options.bezierCurve&&e.each(h,function(t,i){var s=i>0&&i<h.length-1?this.options.bezierCurveTension:0;t.controlPoints=e.splineCurve(a(t,h,i),t,o(t,h,i),s),t.controlPoints.outer.y>this.scale.endPoint?t.controlPoints.outer.y=this.scale.endPoint:t.controlPoints.outer.y<this.scale.startPoint&&(t.controlPoints.outer.y=this.scale.startPoint),t.controlPoints.inner.y>this.scale.endPoint?t.controlPoints.inner.y=this.scale.endPoint:t.controlPoints.inner.y<this.scale.startPoint&&(t.controlPoints.inner.y=this.scale.startPoint)},this),s.lineWidth=this.options.datasetStrokeWidth,s.strokeStyle=t.strokeColor,s.beginPath(),e.each(h,function(t,i){if(0===i)s.moveTo(t.x,t.y);else if(this.options.bezierCurve){var e=a(t,h,i);s.bezierCurveTo(e.controlPoints.outer.x,e.controlPoints.outer.y,t.controlPoints.inner.x,t.controlPoints.inner.y,t.x,t.y)}else s.lineTo(t.x,t.y)},this),s.stroke(),this.options.datasetFill&&h.length>0&&(s.lineTo(h[h.length-1].x,this.scale.endPoint),s.lineTo(h[0].x,this.scale.endPoint),s.fillStyle=t.fillColor,s.closePath(),s.fill()),e.each(h,function(t){t.draw()})},this)}})}.call(this),function(){"use strict";var t=this,i=t.Chart,e=i.helpers,s={scaleShowLabelBackdrop:!0,scaleBackdropColor:"rgba(255,255,255,0.75)",scaleBeginAtZero:!0,scaleBackdropPaddingY:2,scaleBackdropPaddingX:2,scaleShowLine:!0,segmentShowStroke:!0,segmentStrokeColor:"#fff",segmentStrokeWidth:2,animationSteps:100,animationEasing:"easeOutBounce",animateRotate:!0,animateScale:!1,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'};i.Type.extend({name:"PolarArea",defaults:s,initialize:function(t){this.segments=[],this.SegmentArc=i.Arc.extend({showStroke:this.options.segmentShowStroke,strokeWidth:this.options.segmentStrokeWidth,strokeColor:this.options.segmentStrokeColor,ctx:this.chart.ctx,innerRadius:0,x:this.chart.width/2,y:this.chart.height/2}),this.scale=new i.RadialScale({display:this.options.showScale,fontStyle:this.options.scaleFontStyle,fontSize:this.options.scaleFontSize,fontFamily:this.options.scaleFontFamily,fontColor:this.options.scaleFontColor,showLabels:this.options.scaleShowLabels,showLabelBackdrop:this.options.scaleShowLabelBackdrop,backdropColor:this.options.scaleBackdropColor,backdropPaddingY:this.options.scaleBackdropPaddingY,backdropPaddingX:this.options.scaleBackdropPaddingX,lineWidth:this.options.scaleShowLine?this.options.scaleLineWidth:0,lineColor:this.options.scaleLineColor,lineArc:!0,width:this.chart.width,height:this.chart.height,xCenter:this.chart.width/2,yCenter:this.chart.height/2,ctx:this.chart.ctx,templateString:this.options.scaleLabel,valuesCount:t.length}),this.updateScaleRange(t),this.scale.update(),e.each(t,function(t,i){this.addData(t,i,!0)},this),this.options.showTooltips&&e.bindEvents(this,this.options.tooltipEvents,function(t){var i="mouseout"!==t.type?this.getSegmentsAtEvent(t):[];e.each(this.segments,function(t){t.restore(["fillColor"])}),e.each(i,function(t){t.fillColor=t.highlightColor}),this.showTooltip(i)}),this.render()},getSegmentsAtEvent:function(t){var i=[],s=e.getRelativePosition(t);return e.each(this.segments,function(t){t.inRange(s.x,s.y)&&i.push(t)},this),i},addData:function(t,i,e){var s=i||this.segments.length;this.segments.splice(s,0,new this.SegmentArc({fillColor:t.color,highlightColor:t.highlight||t.color,label:t.label,value:t.value,outerRadius:this.options.animateScale?0:this.scale.calculateCenterOffset(t.value),circumference:this.options.animateRotate?0:this.scale.getCircumference(),startAngle:1.5*Math.PI})),e||(this.reflow(),this.update())},removeData:function(t){var i=e.isNumber(t)?t:this.segments.length-1;this.segments.splice(i,1),this.reflow(),this.update()},calculateTotal:function(t){this.total=0,e.each(t,function(t){this.total+=t.value},this),this.scale.valuesCount=this.segments.length},updateScaleRange:function(t){var i=[];e.each(t,function(t){i.push(t.value)});var s=this.options.scaleOverride?{steps:this.options.scaleSteps,stepValue:this.options.scaleStepWidth,min:this.options.scaleStartValue,max:this.options.scaleStartValue+this.options.scaleSteps*this.options.scaleStepWidth}:e.calculateScaleRange(i,e.min([this.chart.width,this.chart.height])/2,this.options.scaleFontSize,this.options.scaleBeginAtZero,this.options.scaleIntegersOnly);e.extend(this.scale,s,{size:e.min([this.chart.width,this.chart.height]),xCenter:this.chart.width/2,yCenter:this.chart.height/2})},update:function(){this.calculateTotal(this.segments),e.each(this.segments,function(t){t.save()}),this.reflow(),this.render()},reflow:function(){e.extend(this.SegmentArc.prototype,{x:this.chart.width/2,y:this.chart.height/2}),this.updateScaleRange(this.segments),this.scale.update(),e.extend(this.scale,{xCenter:this.chart.width/2,yCenter:this.chart.height/2}),e.each(this.segments,function(t){t.update({outerRadius:this.scale.calculateCenterOffset(t.value)})},this)},draw:function(t){var i=t||1;this.clear(),e.each(this.segments,function(t,e){t.transition({circumference:this.scale.getCircumference(),outerRadius:this.scale.calculateCenterOffset(t.value)},i),t.endAngle=t.startAngle+t.circumference,0===e&&(t.startAngle=1.5*Math.PI),e<this.segments.length-1&&(this.segments[e+1].startAngle=t.endAngle),t.draw()},this),this.scale.draw()}})}.call(this),function(){"use strict";var t=this,i=t.Chart,e=i.helpers;i.Type.extend({name:"Radar",defaults:{scaleShowLine:!0,angleShowLineOut:!0,scaleShowLabels:!1,scaleBeginAtZero:!0,angleLineColor:"rgba(0,0,0,.1)",angleLineWidth:1,pointLabelFontFamily:"'Arial'",pointLabelFontStyle:"normal",pointLabelFontSize:10,pointLabelFontColor:"#666",pointDot:!0,pointDotRadius:3,pointDotStrokeWidth:1,pointHitDetectionRadius:20,datasetStroke:!0,datasetStrokeWidth:2,datasetFill:!0,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'},initialize:function(t){this.PointClass=i.Point.extend({strokeWidth:this.options.pointDotStrokeWidth,radius:this.options.pointDotRadius,display:this.options.pointDot,hitDetectionRadius:this.options.pointHitDetectionRadius,ctx:this.chart.ctx}),this.datasets=[],this.buildScale(t),this.options.showTooltips&&e.bindEvents(this,this.options.tooltipEvents,function(t){var i="mouseout"!==t.type?this.getPointsAtEvent(t):[];this.eachPoints(function(t){t.restore(["fillColor","strokeColor"])}),e.each(i,function(t){t.fillColor=t.highlightFill,t.strokeColor=t.highlightStroke}),this.showTooltip(i)}),e.each(t.datasets,function(i){var s={label:i.label||null,fillColor:i.fillColor,strokeColor:i.strokeColor,pointColor:i.pointColor,pointStrokeColor:i.pointStrokeColor,points:[]};this.datasets.push(s),e.each(i.data,function(e,n){var o;this.scale.animation||(o=this.scale.getPointPosition(n,this.scale.calculateCenterOffset(e))),s.points.push(new this.PointClass({value:e,label:t.labels[n],datasetLabel:i.label,x:this.options.animation?this.scale.xCenter:o.x,y:this.options.animation?this.scale.yCenter:o.y,strokeColor:i.pointStrokeColor,fillColor:i.pointColor,highlightFill:i.pointHighlightFill||i.pointColor,highlightStroke:i.pointHighlightStroke||i.pointStrokeColor}))},this)},this),this.render()},eachPoints:function(t){e.each(this.datasets,function(i){e.each(i.points,t,this)},this)},getPointsAtEvent:function(t){var i=e.getRelativePosition(t),s=e.getAngleFromPoint({x:this.scale.xCenter,y:this.scale.yCenter},i),n=2*Math.PI/this.scale.valuesCount,o=Math.round((s.angle-1.5*Math.PI)/n),a=[];return(o>=this.scale.valuesCount||0>o)&&(o=0),s.distance<=this.scale.drawingArea&&e.each(this.datasets,function(t){a.push(t.points[o])}),a},buildScale:function(t){this.scale=new i.RadialScale({display:this.options.showScale,fontStyle:this.options.scaleFontStyle,fontSize:this.options.scaleFontSize,fontFamily:this.options.scaleFontFamily,fontColor:this.options.scaleFontColor,showLabels:this.options.scaleShowLabels,showLabelBackdrop:this.options.scaleShowLabelBackdrop,backdropColor:this.options.scaleBackdropColor,backdropPaddingY:this.options.scaleBackdropPaddingY,backdropPaddingX:this.options.scaleBackdropPaddingX,lineWidth:this.options.scaleShowLine?this.options.scaleLineWidth:0,lineColor:this.options.scaleLineColor,angleLineColor:this.options.angleLineColor,angleLineWidth:this.options.angleShowLineOut?this.options.angleLineWidth:0,pointLabelFontColor:this.options.pointLabelFontColor,pointLabelFontSize:this.options.pointLabelFontSize,pointLabelFontFamily:this.options.pointLabelFontFamily,pointLabelFontStyle:this.options.pointLabelFontStyle,height:this.chart.height,width:this.chart.width,xCenter:this.chart.width/2,yCenter:this.chart.height/2,ctx:this.chart.ctx,templateString:this.options.scaleLabel,labels:t.labels,valuesCount:t.datasets[0].data.length}),this.scale.setScaleSize(),this.updateScaleRange(t.datasets),this.scale.buildYLabels()},updateScaleRange:function(t){var i=function(){var i=[];return e.each(t,function(t){t.data?i=i.concat(t.data):e.each(t.points,function(t){i.push(t.value)})}),i}(),s=this.options.scaleOverride?{steps:this.options.scaleSteps,stepValue:this.options.scaleStepWidth,min:this.options.scaleStartValue,max:this.options.scaleStartValue+this.options.scaleSteps*this.options.scaleStepWidth}:e.calculateScaleRange(i,e.min([this.chart.width,this.chart.height])/2,this.options.scaleFontSize,this.options.scaleBeginAtZero,this.options.scaleIntegersOnly);e.extend(this.scale,s)},addData:function(t,i){this.scale.valuesCount++,e.each(t,function(t,e){var s=this.scale.getPointPosition(this.scale.valuesCount,this.scale.calculateCenterOffset(t));this.datasets[e].points.push(new this.PointClass({value:t,label:i,x:s.x,y:s.y,strokeColor:this.datasets[e].pointStrokeColor,fillColor:this.datasets[e].pointColor}))},this),this.scale.labels.push(i),this.reflow(),this.update()},removeData:function(){this.scale.valuesCount--,this.scale.labels.shift(),e.each(this.datasets,function(t){t.points.shift()},this),this.reflow(),this.update()},update:function(){this.eachPoints(function(t){t.save()}),this.reflow(),this.render()},reflow:function(){e.extend(this.scale,{width:this.chart.width,height:this.chart.height,size:e.min([this.chart.width,this.chart.height]),xCenter:this.chart.width/2,yCenter:this.chart.height/2}),this.updateScaleRange(this.datasets),this.scale.setScaleSize(),this.scale.buildYLabels()},draw:function(t){var i=t||1,s=this.chart.ctx;this.clear(),this.scale.draw(),e.each(this.datasets,function(t){e.each(t.points,function(t,e){t.hasValue()&&t.transition(this.scale.getPointPosition(e,this.scale.calculateCenterOffset(t.value)),i)},this),s.lineWidth=this.options.datasetStrokeWidth,s.strokeStyle=t.strokeColor,s.beginPath(),e.each(t.points,function(t,i){0===i?s.moveTo(t.x,t.y):s.lineTo(t.x,t.y)},this),s.closePath(),s.stroke(),s.fillStyle=t.fillColor,s.fill(),e.each(t.points,function(t){t.hasValue()&&t.draw()})},this)}})}.call(this);
},{}],5:[function(require,module,exports){
var movingAvg = require('../rule/movingAvg');
var Tables = require('../rule/table');
var dataset = require("../rule/dataset");
var balls = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
var Analyzer = (function () {
    function Analyzer(lottos) {
        this.periods = [20, 50, 200];
        this.averages = this.averageAll(lottos);
        this.length = lottos.length;
    }
    Analyzer.prototype.average = function (lottos, n) {
        var spreadLotto = Tables.spread(lottos, balls);
        return this.periods.map(function (period) { return new movingAvg.MovingAvg(period, spreadLotto[n]).toArray(); });
    };
    Analyzer.prototype.averageAll = function (lottos) {
        var _this = this;
        return balls.map(function (ball) { return _this.average(lottos, ball); });
    };
    Analyzer.prototype.analyze = function (n, recent) {
        var _this = this;
        var recentData = this.averages[n - 1].map(function (record) {
            return record.slice(record.length - recent);
        }), labels = recentData[0].map(function (item, index) {
            var s = _this.length - recent + index + 1;
            return (s % 10 && index != (recent - 1)) ? "" : s.toString();
        });
        return dataset.Dataset.build(labels, recentData);
    };
    Analyzer.prototype.analyzeAll = function () {
        var _this = this;
        return balls.map(function (ball) { return _this.analyze(ball, 30); });
    };
    Analyzer.prototype.getLasts = function () {
        var lasts = this.averages.map(function (average) {
            return average.map(function (period) {
                return period[period.length - 1];
            });
        });
        return this.periods.map(function (period, index) {
            return lasts.map(function (last) { return last[index]; });
        });
    };
    Analyzer.prototype.analyzeLast = function () {
        var lasts = this.getLasts();
        return lasts.map(function (last) { return dataset.Dataset.build(balls.map(function (ball) { return ball.toString(); }), [last]); });
    };
    return Analyzer;
})();
exports.Analyzer = Analyzer;
},{"../rule/dataset":6,"../rule/movingAvg":7,"../rule/table":9}],6:[function(require,module,exports){
var Dataset;
(function (Dataset) {
    var DataSetType = (function () {
        function DataSetType(label, r, g, b) {
            var colorPrefix = "rgba(" + r + "," + g + "," + b;
            this.label = label;
            this.fillColor = colorPrefix + ",0.2)";
            this.strokeColor = colorPrefix + ",1)";
        }
        return DataSetType;
    })();
    var dataSetTypes = [
        new DataSetType("20", 220, 0, 0),
        new DataSetType("50", 0, 220, 0),
        new DataSetType("200", 0, 0, 220)
    ];
    var DataSet = (function () {
        function DataSet(type, data) {
            this.label = type.label;
            this.fillColor = type.fillColor;
            this.strokeColor = type.strokeColor;
            this.pointColor = type.strokeColor;
            this.data = data;
        }
        return DataSet;
    })();
    function build(labels, data) {
        return {
            labels: labels,
            datasets: data.map(function (record, index) {
                return new DataSet(dataSetTypes[index], record);
            })
        };
    }
    Dataset.build = build;
})(Dataset = exports.Dataset || (exports.Dataset = {}));
},{}],7:[function(require,module,exports){
var MovingAvg = (function () {
    function MovingAvg(period, data) {
        this.averages = [];
        if (data.length < period) {
            throw "period too short";
        }
        this.period = period;
        this.calculate(data);
    }
    MovingAvg.prototype.calculate = function (data) {
        for (var from = 0, to = this.period; to <= data.length; from += 1, to += 1) {
            this.averages.push(data.slice(from, to).reduce(function (x, y) { return x + y; }) / this.period);
        }
    };
    MovingAvg.prototype.get = function (index) {
        index -= this.period - 1;
        if (index < 0 || index >= this.averages.length) {
            return 0;
        }
        return this.averages[index];
    };
    MovingAvg.prototype.toArray = function () {
        var arr = [];
        for (var i = 1; i < this.period; ++i) {
            arr.push(0);
        }
        return arr.concat(this.averages);
    };
    return MovingAvg;
})();
exports.MovingAvg = MovingAvg;
},{}],8:[function(require,module,exports){
var lottos = [[7,17,19,30,36,38,34],
    [5,15,22,23,34,35,2],
    [1,8,10,13,28,42,45],
    [7,12,15,24,25,43,13],
    [6,7,12,28,38,40,18],
    [1,11,15,17,25,39,40],
    [6,13,20,27,28,40,15],
    [17,23,27,35,38,43,2],
    [21,24,27,29,43,44,7],
    [4,10,19,29,32,42,30],
    [3,5,7,14,26,34,35],
    [4,5,6,12,25,37,45],
    [12,15,24,36,41,44,42],
    [1,8,17,34,39,45,27],
    [1,8,11,15,18,45,7],
    [9,10,14,25,27,31,11],
    [7,10,17,29,33,44,5],
    [8,21,28,31,36,45,43],
    [7,9,10,13,31,35,24],
    [11,18,26,27,40,41,25],
    [7,8,20,29,33,38,9],
    [12,14,15,24,27,32,3],
    [15,17,25,37,42,43,13],
    [2,4,6,11,17,28,16],
    [5,6,11,17,38,44,13],
    [10,20,33,36,41,44,5],
    [3,5,8,19,38,42,20],
    [5,6,9,11,15,37,26],
    [2,3,12,20,27,38,40],
    [4,9,23,33,39,44,14],
    [7,18,19,27,29,42,45],
    [8,19,25,28,32,36,37],
    [10,14,19,39,40,43,23],
    [3,7,14,16,31,40,39],
    [7,37,38,39,40,44,18],
    [16,21,26,31,36,43,6],
    [5,6,26,27,38,39,1],
    [3,13,15,40,41,44,20],
    [11,12,16,26,29,44,18],
    [3,4,7,11,31,41,35],
    [3,21,22,33,41,42,20],
    [13,19,28,37,38,43,4],
    [5,16,21,23,24,30,29],
    [2,9,24,41,43,45,30],
    [1,4,16,26,40,41,31],
    [5,13,17,23,28,36,8],
    [15,24,31,32,33,40,13],
    [8,17,18,24,39,45,32],
    [11,18,21,36,37,43,12],
    [14,15,18,21,26,35,23],
    [6,15,22,23,25,32,40],
    [7,18,22,24,31,34,6],
    [3,16,22,37,38,44,23],
    [6,7,15,16,20,31,26],
    [11,13,25,26,29,33,32],
    [4,10,11,12,20,27,38],
    [9,12,19,20,39,41,13],
    [15,18,21,32,35,44,6],
    [1,2,4,23,31,34,8],
    [8,17,21,24,27,31,15],
    [19,28,31,38,43,44,1],
    [1,7,12,15,23,42,11],
    [2,9,22,25,31,45,12],
    [13,14,26,33,40,43,15],
    [3,6,7,20,21,39,13],
    [1,7,19,26,27,35,16],
    [7,13,30,39,41,45,25],
    [9,15,16,21,28,34,24],
    [1,2,6,16,19,42,9],
    [2,16,17,32,39,45,40],
    [6,8,13,30,35,40,21],
    [8,16,25,30,42,43,15],
    [4,5,11,12,24,27,28],
    [5,13,18,23,40,45,3],
    [10,17,18,19,23,27,35],
    [8,21,25,39,40,44,18],
    [7,8,11,16,41,44,35],
    [6,9,18,19,25,33,40],
    [2,22,27,33,36,37,14],
    [14,18,20,23,28,36,33],
    [4,8,27,34,39,40,13],
    [4,8,18,19,39,44,41],
    [8,14,23,36,38,39,13],
    [1,5,6,14,20,39,22],
    [1,2,7,9,10,38,42],
    [2,6,18,21,33,34,30],
    [2,19,25,26,27,43,28],
    [13,14,22,27,30,38,2],
    [2,16,19,31,34,35,37],
    [5,11,14,27,29,36,44],
    [5,12,17,29,34,35,27],
    [4,12,24,33,38,45,22],
    [8,10,23,24,35,43,37],
    [3,4,12,14,25,43,17],
    [8,24,28,35,38,40,5],
    [2,8,13,25,28,37,3],
    [9,10,13,24,33,38,28],
    [2,5,6,13,28,44,43],
    [8,13,14,30,38,39,5],
    [20,30,36,38,41,45,23],
    [6,8,28,33,38,39,22],
    [2,8,15,22,25,41,30],
    [14,21,29,31,32,37,17],
    [2,7,12,15,21,34,5],
    [6,7,10,16,38,41,4],
    [7,18,30,39,40,41,36],
    [8,17,27,33,40,44,24],
    [2,12,14,33,40,41,25],
    [3,5,14,20,42,44,33],
    [5,7,9,11,32,35,33],
    [5,7,20,22,37,42,39],
    [5,12,14,32,34,42,16],
    [16,17,22,31,34,37,33],
    [10,11,15,25,35,41,13],
    [2,8,20,30,33,34,6],
    [14,15,16,19,25,43,2],
    [2,4,20,34,35,43,14],
    [3,13,18,33,37,45,1],
    [11,18,21,26,38,43,29],
    [1,12,26,27,29,33,42],
    [3,6,13,23,24,35,1],
    [1,3,17,20,31,44,40],
    [1,10,15,16,32,41,28],
    [4,5,6,25,26,43,41],
    [4,10,18,27,40,45,38],
    [14,19,25,26,27,34,2],
    [5,10,16,17,31,32,21],
    [4,11,13,17,20,31,33],
    [5,7,18,37,42,45,20],
    [1,4,20,23,29,45,28],
    [11,12,25,32,44,45,23],
    [12,15,19,26,40,43,29],
    [4,20,26,28,35,40,31],
    [12,20,23,28,30,44,43],
    [11,17,21,24,26,36,12],
    [13,14,17,32,41,42,6],
    [2,7,17,28,29,39,37],
    [1,10,20,32,35,40,43],
    [3,6,20,24,27,44,25],
    [1,7,14,20,34,37,41],
    [29,31,35,38,40,44,17],
    [1,12,13,21,32,45,14],
    [6,7,15,22,34,39,28],
    [8,17,20,27,37,43,6],
    [4,24,25,27,34,35,2],
    [5,17,21,25,36,44,10],
    [13,18,26,31,34,44,12],
    [5,6,19,26,41,45,34],
    [8,13,26,28,32,34,43],
    [3,12,13,15,34,36,14],
    [3,19,22,31,42,43,26],
    [6,10,18,31,32,34,11],
    [12,23,26,30,36,43,11],
    [7,8,18,32,37,43,12],
    [11,12,14,15,18,39,34],
    [10,24,26,29,37,38,32],
    [9,14,15,17,31,33,23],
    [16,17,23,24,29,44,3],
    [1,5,9,21,27,35,45],
    [16,23,27,29,33,41,22],
    [18,20,24,27,31,42,39],
    [5,17,25,31,39,40,10],
    [1,12,22,32,33,42,38],
    [7,14,17,20,35,39,31],
    [11,23,26,29,39,44,22],
    [10,11,29,38,41,45,21],
    [1,4,37,38,40,45,7],
    [4,5,13,14,37,41,11],
    [3,7,18,29,32,36,19],
    [4,22,27,28,38,40,1],
    [6,8,13,16,30,43,3],
    [14,23,30,32,34,38,6],
    [1,9,12,28,36,41,10],
    [2,8,23,41,43,44,30],
    [2,11,12,15,23,37,8],
    [1,15,20,26,35,42,9],
    [5,8,21,23,27,33,12],
    [4,5,9,13,26,27,1],
    [3,7,14,23,26,42,24],
    [12,29,32,33,39,40,42],
    [12,25,29,35,42,43,24],
    [5,27,31,34,35,43,37],
    [12,13,32,33,40,41,4],
    [6,9,11,22,24,30,31],
    [7,20,22,25,38,40,44],
    [6,14,22,26,43,44,31],
    [1,5,27,30,34,36,40],
    [6,22,28,32,34,40,26],
    [1,4,10,17,31,42,2],
    [3,4,12,20,24,34,41],
    [5,20,23,27,35,40,43],
    [13,14,24,32,39,41,3],
    [19,20,23,24,43,44,13],
    [4,13,20,29,36,41,39],
    [4,13,22,27,34,44,6],
    [5,7,8,15,30,43,22],
    [20,22,26,33,36,37,25],
    [22,27,31,35,37,40,42],
    [8,17,35,36,39,42,4],
    [2,7,26,29,40,43,42],
    [2,4,8,15,20,27,11],
    [2,8,17,30,31,38,25],
    [4,8,25,27,37,41,21],
    [1,2,23,25,38,40,43],
    [17,22,26,27,36,39,20],
    [1,3,27,28,32,45,11],
    [12,15,19,22,28,34,5],
    [1,10,16,24,25,35,43],
    [3,4,23,29,40,41,20],
    [3,5,10,17,30,31,16],
    [8,23,25,27,35,44,24],
    [18,29,30,37,39,43,8],
    [14,25,29,32,33,45,37],
    [9,12,13,15,37,38,27],
    [1,9,14,16,21,29,3],
    [4,13,18,31,33,45,43],
    [8,13,20,22,23,36,34],
    [16,25,26,31,36,43,44],
    [6,13,29,37,39,41,43],
    [10,16,20,39,41,42,27],
    [4,21,22,34,37,38,33],
    [8,13,15,28,37,43,17],
    [2,12,14,17,24,40,39],
    [4,10,13,23,32,44,20],
    [1,8,11,13,22,38,31],
    [6,12,15,34,42,44,4],
    [23,29,31,33,34,44,40],
    [3,20,24,32,37,45,4],
    [11,18,26,31,37,40,43],
    [8,11,28,30,43,45,41],
    [4,6,10,14,25,40,12],
    [4,9,10,32,36,40,18],
    [8,10,18,23,27,40,33],
    [1,7,12,18,23,27,44],
    [4,19,20,26,30,35,24],
    [13,25,27,34,38,41,10],
    [12,24,33,38,40,42,30],
    [8,10,18,30,32,34,27],
    [12,15,20,24,30,38,29],
    [6,14,19,21,23,31,13],
    [3,10,20,26,35,43,36],
    [3,7,13,27,40,41,36],
    [2,7,8,9,17,33,34],
    [1,11,12,14,26,35,6],
    [13,20,21,30,39,45,32],
    [11,13,23,35,43,45,17],
    [4,6,10,19,20,44,14],
    [25,27,29,36,38,40,41],
    [1,23,28,30,34,35,9],
    [10,22,28,34,36,44,2],
    [17,20,30,31,37,40,25],
    [6,12,20,26,29,38,45],
    [11,16,29,38,41,44,21],
    [9,14,20,22,33,34,28],
    [8,16,26,30,38,45,42],
    [3,13,20,24,33,37,35],
    [19,23,29,33,35,43,27],
    [2,3,5,11,27,39,33],
    [18,22,25,31,38,45,6],
    [1,3,16,18,30,34,44],
    [3,23,28,34,39,42,16],
    [12,16,19,22,37,40,8],
    [6,7,15,24,28,30,21],
    [4,17,18,27,39,43,19],
    [8,10,14,27,33,38,3],
    [10,11,26,31,34,44,30],
    [1,17,27,28,29,40,5],
    [8,15,19,21,34,44,12],
    [6,11,26,27,28,44,30],
    [4,9,10,29,31,34,27],
    [2,11,13,14,28,30,7],
    [11,13,15,26,28,34,31],
    [4,5,14,20,22,43,44],
    [5,6,8,11,22,26,44],
    [7,17,20,26,30,40,24],
    [2,14,15,22,23,44,43],
    [2,9,15,23,34,40,3],
    [4,7,39,41,42,45,40],
    [11,14,22,35,37,39,5],
    [1,3,18,32,40,41,16],
    [6,9,21,31,32,40,38],
    [9,20,21,22,30,37,16],
    [6,7,13,16,24,25,1],
    [7,12,21,24,27,36,45],
    [1,2,10,25,26,44,4],
    [5,20,21,24,33,40,36],
    [10,14,22,24,28,37,26],
    [5,9,15,19,22,36,32],
    [6,12,18,31,38,43,9],
    [9,21,27,34,41,43,2],
    [1,2,9,17,19,42,20],
    [10,15,20,23,42,44,7],
    [12,13,17,22,25,33,8],
    [18,20,31,34,40,45,30],
    [11,15,20,26,31,35,7],
    [1,13,20,22,25,28,15],
    [9,16,28,40,41,43,21],
    [1,3,7,8,24,42,43],
    [10,11,18,22,28,39,30],
    [16,17,28,37,39,40,15],
    [7,16,18,20,23,26,3],
    [1,8,9,17,29,32,45],
    [1,26,31,34,40,43,20],
    [4,7,10,19,31,40,26],
    [7,12,19,21,29,32,9],
    [11,22,24,32,36,38,7],
    [4,15,28,33,37,40,25],
    [10,15,22,24,27,42,19],
    [1,5,10,12,16,20,11],
    [1,2,8,17,26,37,27],
    [6,10,22,31,35,40,19],
    [5,22,29,31,34,39,43],
    [6,22,29,37,43,45,23],
    [1,11,13,24,28,40,7],
    [4,8,19,25,27,45,7],
    [11,13,15,17,25,34,26],
    [15,26,37,42,43,45,9],
    [8,11,14,16,18,21,13],
    [7,9,15,26,27,42,18],
    [16,18,24,42,44,45,17],
    [17,20,35,36,41,43,21],
    [11,21,24,30,39,45,26],
    [3,22,25,29,32,44,19],
    [5,12,19,26,27,44,38],
    [5,15,21,25,26,30,31],
    [2,5,7,14,16,40,4],
    [11,12,14,21,32,38,6],
    [2,3,22,27,30,40,29],
    [5,10,16,24,27,35,33],
    [4,16,23,25,35,40,27],
    [1,10,19,20,24,40,23],
    [1,9,10,12,21,40,37],
    [10,14,18,21,36,37,5],
    [2,8,14,25,29,45,24],
    [5,8,29,30,35,44,38],
    [14,19,36,43,44,45,1],
    [11,16,19,22,29,36,26],
    [5,16,17,20,26,41,24],
    [5,25,27,29,34,36,33],
    [1,8,18,24,29,33,35],
    [5,13,14,20,24,25,36],
    [3,14,17,20,24,31,34],
    [3,8,13,27,32,42,10],
    [5,13,14,22,44,45,33],
    [15,20,23,29,39,42,2],
    [1,2,15,28,34,45,38],
    [1,10,17,29,31,43,15],
    [1,13,14,33,34,43,25],
    [1,8,19,34,39,43,41],
    [18,24,26,29,34,38,32],
    [6,8,14,21,30,37,45],
    [2,13,34,38,42,45,16],
    [1,5,14,18,32,37,4],
    [3,5,20,34,35,44,16],
    [5,9,16,23,26,45,21],
    [13,15,21,29,39,43,33],
    [5,14,27,30,39,43,35],
    [16,17,34,36,42,45,3],
    [4,9,14,26,31,44,39],
    [3,4,16,17,19,20,23],
    [9,17,19,30,35,42,4],
    [1,6,9,16,17,28,24],
    [6,12,13,17,32,44,24],
    [16,23,25,33,36,39,40],
    [7,17,20,32,44,45,33],
    [2,4,21,25,33,36,17],
    [10,14,15,32,36,42,3],
    [9,18,29,32,38,43,20],
    [12,18,20,21,25,34,42],
    [16,19,23,25,41,45,3],
    [5,8,22,28,33,42,37],
    [2,17,19,20,34,45,21],
    [3,10,11,22,36,39,8],
    [10,11,21,27,31,39,43],
    [1,13,33,35,43,45,23],
    [15,17,19,34,38,41,2],
    [9,17,34,35,43,45,2],
    [2,3,5,6,12,20,25],
    [4,12,24,27,28,32,10],
    [1,5,19,28,34,41,16],
    [1,2,5,11,18,36,22],
    [14,15,17,19,37,45,40],
    [5,15,21,23,25,45,12],
    [4,18,23,30,34,41,19],
    [7,8,18,21,23,39,9],
    [4,10,16,26,33,41,38],
    [2,14,17,30,38,45,43],
    [13,19,20,32,38,42,4],
    [7,11,13,33,37,43,26],
    [7,9,10,12,26,38,39],
    [1,3,20,25,36,45,24],
    [5,9,27,29,37,40,19],
    [6,11,19,20,28,32,34],
    [3,8,15,27,30,45,44],
    [1,4,12,16,18,38,8],
    [6,10,17,30,37,38,40],
    [1,9,17,21,29,33,24],
    [17,18,31,32,33,34,10],
    [3,7,8,18,20,42,45],
    [8,13,18,32,39,45,7],
    [3,14,33,37,38,42,10],
    [1,12,17,28,35,41,10],
    [6,12,24,27,35,37,41],
    [1,15,19,40,42,44,17],
    [13,33,37,40,41,45,2],
    [2,7,15,24,30,45,28],
    [6,8,18,31,38,45,42],
    [2,5,10,18,31,32,30],
    [1,3,4,6,14,41,12],
    [10,11,23,24,36,37,35],
    [7,16,31,36,37,38,11],
    [3,11,37,39,41,43,13],
    [10,12,13,15,25,29,20],
    [4,15,21,33,39,41,25],
    [14,19,20,35,38,40,26],
    [13,14,15,26,35,39,25],
    [1,8,24,31,34,44,6],
    [7,9,12,27,39,43,28],
    [3,8,9,27,29,40,36],
    [5,9,12,20,21,26,27],
    [5,18,20,36,42,43,32],
    [3,10,19,24,32,45,12],
    [7,8,24,34,36,41,1],
    [3,4,9,11,22,42,37],
    [5,9,34,37,38,39,12],
    [9,16,27,36,41,44,5],
    [1,27,28,32,37,40,18],
    [9,12,24,25,29,31,36],
    [6,11,16,18,31,43,2],
    [7,12,15,24,37,40,43],
    [4,5,14,35,42,45,34],
    [14,27,30,31,38,40,17],
    [6,13,27,31,32,37,4],
    [4,11,14,21,23,43,32],
    [1,5,6,24,27,42,32],
    [1,5,19,20,24,30,27],
    [8,19,25,31,34,36,33],
    [14,23,26,31,39,45,28],
    [6,7,19,25,28,38,45],
    [19,23,30,37,43,45,38],
    [3,8,27,31,41,44,11],
    [3,8,17,23,38,45,13],
    [12,15,28,36,39,40,13],
    [13,18,21,23,26,39,15],
    [9,11,27,31,32,38,22],
    [13,16,25,36,37,38,19],
    [2,12,17,19,28,42,34],
    [4,19,20,21,32,34,43],
    [2,16,24,27,28,35,21],
    [6,10,16,40,41,43,21],
    [11,15,24,39,41,44,7],
    [2,4,15,28,31,34,35],
    [1,11,17,21,24,44,33],
    [1,4,8,13,37,39,7],
    [21,22,26,27,31,37,8],
    [13,21,22,24,26,37,4],
    [4,6,13,17,28,40,39],
    [8,9,10,12,24,44,35],
    [5,10,19,31,44,45,27],
    [5,11,14,29,32,33,12],
    [4,5,9,11,23,38,35],
    [17,25,35,36,39,44,23],
    [4,5,15,16,22,42,2],
    [2,6,8,14,21,22,34],
    [5,11,13,19,31,36,7],
    [4,19,26,27,30,42,7],
    [1,3,18,20,26,27,38],
    [5,7,28,29,39,43,44],
    [2,20,33,35,37,40,10],
    [5,11,19,21,34,43,31],
    [4,11,20,26,35,37,16],
    [1,8,14,18,29,44,20],
    [16,20,27,33,35,39,38],
    [7,16,17,33,36,40,1],
    [2,3,7,15,43,44,4],
    [5,7,20,25,28,37,32],
    [2,3,4,5,20,24,42],
    [11,12,18,21,31,38,8],
    [12,13,17,20,33,41,8],
    [10,19,22,23,25,37,39],
    [2,7,18,20,24,33,37],
    [14,25,31,34,40,44,24],
    [3,11,14,31,32,37,38],
    [1,2,3,15,20,25,43],
    [1,3,21,29,35,37,30],
    [3,12,14,35,40,45,5],
    [1,3,11,24,30,32,7],
    [12,14,27,33,39,44,17],
    [3,11,24,38,39,44,26],
    [5,6,13,14,17,20,7],
    [14,21,22,25,30,36,43],
    [12,19,20,25,41,45,2],
    [7,12,16,34,42,45,4],
    [35,36,37,41,44,45,30],
    [7,10,19,22,35,40,31],
    [15,20,23,26,39,44,28],
    [6,14,18,26,36,39,13],
    [4,8,11,18,37,45,33],
    [5,6,24,25,32,37,8],
    [8,14,18,30,31,44,15],
    [8,14,32,35,37,45,28],
    [19,24,27,30,31,34,36],
    [1,2,8,18,29,38,42],
    [4,10,14,19,21,45,9],
    [1,2,4,8,19,38,14],
    [1,2,6,16,20,33,41],
    [2,18,24,34,40,42,5],
    [13,15,27,29,34,40,35],
    [14,21,23,32,40,45,44],
    [2,15,20,21,29,34,22],
    [5,9,17,25,39,43,32],
    [1,5,11,12,18,23,9],
    [1,10,13,16,37,43,6],
    [4,17,30,32,33,34,15],
    [19,26,28,31,33,36,17],
    [13,14,18,22,35,39,16],
    [3,9,24,30,33,34,18],
    [4,19,21,24,26,41,35],
    [4,16,25,29,34,35,1],
    [2,11,13,15,31,42,10],
    [16,27,35,37,43,45,19],
    [3,10,31,40,42,43,30],
    [24,27,28,30,36,39,4],
    [9,12,27,36,39,45,14],
    [5,13,18,19,22,42,31],
    [6,9,10,11,39,41,27],
    [7,11,26,28,29,44,16],
    [1,5,21,25,38,41,24],
    [22,34,36,40,42,45,44],
    [3,7,8,34,39,41,1],
    [1,18,30,41,42,43,32],
    [4,9,13,18,21,34,7],
    [19,26,30,33,35,39,37],
    [5,18,28,30,42,45,2],
    [16,19,20,32,33,41,4],
    [6,19,21,35,40,45,20],
    [3,8,11,12,13,36,33],
    [1,5,13,26,29,34,43],
    [1,2,10,13,18,19,15],
    [2,18,25,28,37,39,16],
    [2,11,21,34,41,42,27],
    [21,25,33,34,35,36,17],
    [4,6,13,21,40,42,36],
    [2,19,27,35,41,42,25],
    [2,3,13,20,27,44,9],
    [4,15,17,26,36,37,43],
    [26,27,28,42,43,45,8],
    [12,16,30,34,40,44,19],
    [8,12,29,31,42,43,2],
    [3,13,17,18,19,28,8],
    [9,11,15,20,28,43,13],
    [10,11,27,28,37,39,19],
    [7,9,20,25,36,39,15],
    [2,16,30,36,41,42,11],
    [6,14,22,28,35,39,16],
    [3,12,20,23,31,35,43],
    [4,7,15,18,23,26,13],
    [3,17,23,34,41,45,43],
    [8,10,11,14,15,21,37],
    [7,19,24,27,42,45,31],
    [19,23,25,28,38,42,17],
    [12,30,34,36,37,45,39],
    [3,5,10,29,32,43,35],
    [7,20,22,27,40,43,1],
    [2,8,32,33,35,36,18],
    [4,16,23,25,29,42,1],
    [7,17,18,28,30,45,27],
    [1,11,16,17,36,40,8],
    [12,28,30,34,38,43,9],
    [4,6,10,11,32,37,30],
    [3,11,13,14,17,21,38],
    [3,4,10,17,19,22,38],
    [5,10,22,34,36,44,35],
    [2,4,25,31,34,37,17],
    [1,2,6,9,25,28,31],
    [11,14,19,26,28,41,2],
    [4,9,28,33,36,45,26],
    [26,29,30,33,41,42,43],
    [7,18,31,33,36,40,27],
    [7,20,22,23,29,43,1],
    [1,5,34,36,42,44,33],
    [7,18,22,23,29,44,12],
    [1,4,5,6,9,31,17],
    [4,10,12,22,24,33,29],
    [8,10,20,34,41,45,28],
    [17,32,33,34,42,44,35],
    [5,14,15,27,30,45,10],
    [17,22,24,26,35,40,42],
    [1,3,17,32,35,45,8],
    [1,7,11,23,37,42,6],
    [1,3,10,27,29,37,11],
    [6,9,16,23,24,32,43],
    [6,7,14,15,20,36,3],
    [1,3,8,21,22,31,20],
    [8,17,27,31,34,43,14],
    [5,32,34,40,41,45,6],
    [6,22,24,36,38,44,19],
    [3,14,24,33,35,36,17],
    [1,21,24,26,29,42,27],
    [17,20,29,35,38,44,10],
    [4,26,28,29,33,40,37],
    [1,17,20,24,30,41,27],
    [4,12,16,23,34,43,26],
    [2,12,37,39,41,45,33],
    [6,8,13,23,31,36,21],
    [16,23,27,34,42,45,11],
    [6,10,15,17,19,34,14],
    [1,2,3,14,27,42,39],
    [5,7,11,13,20,33,6],
    [17,18,24,25,26,30,1],
    [3,12,24,27,30,32,14],
    [10,13,25,29,33,35,38],
    [2,18,29,32,43,44,37],
    [1,3,15,22,25,37,43],
    [2,5,24,32,34,44,28],
    [6,15,17,18,35,40,23],
    [3,12,18,32,40,43,38],
    [2,4,11,17,26,27,1],
    [5,9,12,16,29,41,21],
    [5,19,22,25,28,43,26],
    [5,8,14,15,19,39,35],
    [10,12,15,16,26,39,38],
    [3,7,10,15,36,38,33],
    [2,3,7,17,22,24,45],
    [4,25,33,36,40,43,39],
    [14,15,18,21,26,36,39],
    [3,20,23,36,38,40,5],
    [3,8,15,27,29,35,21],
    [14,15,19,30,38,43,8],
    [2,8,25,36,39,42,11],
    [6,29,36,39,41,45,13],
    [10,24,25,33,40,44,1],
    [7,10,16,25,29,44,6],
    [10,14,30,31,33,37,19],
    [17,21,31,37,40,44,7],
    [1,8,21,27,36,39,37],
    [7,8,14,32,33,39,42],
    [2,4,15,16,20,29,1],
    [2,3,11,16,26,44,35],
    [2,10,12,15,22,44,1],
    [4,7,16,19,33,40,30],
    [6,10,18,26,37,38,3],
    [14,17,26,31,36,45,27],
    [8,13,15,23,31,38,39],
    [1,10,20,27,33,35,17],
    [3,11,21,30,38,45,39],
    [6,31,35,38,39,44,1],
    [17,18,19,21,23,32,1],
    [13,20,23,35,38,43,34],
    [7,13,18,19,25,26,6],
    [6,7,13,15,21,43,8],
    [16,17,22,30,37,43,36],
    [7,27,30,33,35,37,42],
    [1,10,23,26,28,40,31],
    [2,3,11,26,37,43,39],
    [9,26,35,37,40,42,2],
    [4,7,32,33,40,41,9],
    [6,14,19,25,34,44,11],
    [7,9,18,23,28,35,32],
    [8,17,20,35,36,44,4],
    [1,5,13,34,39,40,11],
    [9,18,23,25,35,37,1],
    [1,20,26,28,37,43,27],
    [4,5,7,18,20,25,31],
    [2,4,21,26,43,44,16],
    [7,8,27,29,36,43,6],
    [5,13,17,18,33,42,44],
    [4,5,6,8,17,39,25],
    [6,12,17,18,31,32,21],
    [10,14,18,20,23,30,41],
    [6,30,38,39,40,43,26],
    [3,12,13,19,32,35,29],
    [3,4,9,17,32,37,1],
    [6,7,24,37,38,40,33],
    [3,4,16,30,31,37,13],
    [2,6,12,31,33,40,15],
    [22,23,25,37,38,42,26],
    [2,11,21,25,39,45,44],
    [1,7,36,37,41,42,14],
    [9,25,30,33,41,44,6],
    [2,4,16,17,36,39,14],
    [8,19,25,34,37,39,9],
    [2,9,16,25,26,40,42],
    [14,15,26,27,40,42,34],
    [16,24,29,40,41,42,3],
    [14,27,30,31,40,42,2],
    [11,16,19,21,27,31,30],
    [9,13,21,25,32,42,2],
    [10,23,29,33,37,40,16]];

var Analyzer = require("../lotto/analyzer.ts").Analyzer;

module.exports = new Analyzer(lottos);
},{"../lotto/analyzer.ts":5}],9:[function(require,module,exports){
function count(records, base) {
    var counting = base || {};
    records.forEach(function (record) { return record.forEach(function (item) { return counting[item] ? counting[item]++ : (counting[item] = 1); }); });
    return counting;
}
exports.count = count;
function merge(lhs, rhs) {
    var merged = {};
    for (var item in lhs) {
        if (lhs.hasOwnProperty(item)) {
            merged[item] = rhs[item] ? lhs[item] + rhs[item] : lhs[item];
        }
    }
    for (var item in rhs) {
        if (rhs.hasOwnProperty(item)) {
            merged[item] = merged[item] || rhs[item];
        }
    }
    return merged;
}
exports.merge = merge;
function spread(records, keys) {
    var table = keys.reduce(function (acc, key) { acc[key] = []; return acc; }, {});
    records.forEach(function (record, index) {
        for (var item in table) {
            if (table.hasOwnProperty(item)) {
                table[item].push(0);
            }
        }
        record.forEach(function (item) {
            table[item] && (table[item][index] += 1);
        });
    });
    return table;
}
exports.spread = spread;
},{}],10:[function(require,module,exports){
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
},{"../rule/rule.js":8,"app":"app"}],"app":[function(require,module,exports){
module.exports = angular.module('packApp', [
    'templates-html'
]).config(/* @ngInject */ ["$compileProvider", "$httpProvider", function ($compileProvider, $httpProvider) {
    $compileProvider.debugInfoEnabled(false);
    $httpProvider.useApplyAsync(true);
}]);
},{}]},{},["app",2,3,4,8,10,5,6,7,9,1]);
