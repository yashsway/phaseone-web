(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

//Flowtype
$('body').flowtype({
    minimum: 500,
    maximum: 1200,
    minFont: 8,
    maxFont: 18,
    fontRatio: 50
});
//Usually caps around twice the interval
var allCircles = [];
var circleCount = 0;
var colorArray = [];
var colorCount = 0;
var generatedColors = randomColor({ luminosity: 'light', count: 10 });
var colorArray = colorArray.concat(generatedColors);
colorArray = shuffle(colorArray);
var s = Snap("#circleLoader");
var window_focus = true;

//Simple ID gen appends an inc count on every call
function generateID() {
    circleCount += 1;
    return 'circle' + circleCount;
}
//Utility function to print the ID's of all SVG circles in storage
function printCircleIds() {
    var list = [];
    for (var i = 0; i < allCircles.length; i++) {
        list.push(allCircles[i].attr('id'));
    }
    return list.toString();
}
//Find and destroy
function clean(svgID) {
    for (var i = 0; i < allCircles.length; i++) {
        //Temporarily store the current SVG selected
        var val = allCircles[i];
        //If the id of the SVG is not undefined
        if (_typeof(allCircles[i].attr('id')) != undefined) {
            if (allCircles[i].attr('id') == svgID) {
                //Remove SVG from DOM
                $('#' + val.attr('id')).remove();
                //Remove SVG from array
                allCircles.splice(i, 1);
            }
        }
    }
}
//Binds animation to SVG circle of a certain ID
function animateCircle(obj, svgID) {
    obj.animate({
        //scale
        r: 800
    }, 20000, mina.easeInOut, function () {
        //Fade to 0 opacity after scale is complete
        this.animate({
            opacity: 0
        }, 15000, mina.easeInOut, function () {
            //Remove SVG circle from DOM
            $('#' + this.attr('id'))[0].remove();
            //Remove SVG circle from storage
            allCircles.splice(allCircles.indexOf(this), 1);
        });
    });
}
//Store SVG object and bind animation
function storeCircle(obj, svgID) {
    allCircles.push(obj);
    animateCircle(obj, svgID);
}
//Array Shuffler based on Knuth algorithm
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
//Random color sequence
function sequentialRandomColor() {
    var interval = arguments.length <= 0 || arguments[0] === undefined ? 7 : arguments[0];

    switch (true) {
        case colorCount <= interval:
            colorCount += 1;
            return colorArray[0];
        case colorCount <= interval * 2:
            colorCount += 1;
            return colorArray[1];
        case colorCount <= interval * 3:
            colorCount += 1;
            if (colorCount > interval * 3) {
                var temp = colorArray[2];
                //Shuffle colors when max (interval*3) is reached
                colorArray = shuffle(colorArray);
                //Restart
                colorCount = 0;
                //Return color stored from earlier
                return temp;
            }
            return colorArray[2];
        default:
            return '#000';
            break;
    }
    function increment() {
        if (colorCount < interval * 3) {
            colorCount += 1;
        } else {
            //Shuffle colors when max (interval*3) is reached
            colorArray = shuffle(colorArray);
            //Restart
            colorCount = 0;
        }
    }
}

function generateRandomCircles() {
    var count = arguments.length <= 0 || arguments[0] === undefined ? 3 : arguments[0];

    if (window_focus == true) {
        for (var i = 0; i < count; i++) {
            //Extract viewport dimensions
            var screenHeight = $(window).height();
            var screenWidth = $(window).width();
            //Assign random location
            var x = Math.floor(Math.random() * (screenWidth - 0 + 1) + 1);
            var y = Math.floor(Math.random() * screenHeight + 1) + 1;
            //Generate unique ID for every circle
            var unique = generateID();
            storeCircle(s.circle(x, y, 1).attr({
                fill: sequentialRandomColor(6),
                id: unique
            }), unique);
        }
    }
}
//Start generating circles every 3 seconds.
var begin = setInterval(function () {
    return generateRandomCircles(1);
}, 3000);
//Keep track of whether the browser tab or window is in focus. If not, pause animations and other background js processes for performance
$(window).focus(function () {
    window_focus = true;
}).blur(function () {
    window_focus = false;
});
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9sYW5kaW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG4vL0Zsb3d0eXBlXG4kKCdib2R5JykuZmxvd3R5cGUoe1xuICAgIG1pbmltdW06IDUwMCxcbiAgICBtYXhpbXVtOiAxMjAwLFxuICAgIG1pbkZvbnQ6IDgsXG4gICAgbWF4Rm9udDogMTgsXG4gICAgZm9udFJhdGlvOiA1MFxufSk7XG4vL1VzdWFsbHkgY2FwcyBhcm91bmQgdHdpY2UgdGhlIGludGVydmFsXG52YXIgYWxsQ2lyY2xlcyA9IFtdO1xudmFyIGNpcmNsZUNvdW50ID0gMDtcbnZhciBjb2xvckFycmF5ID0gW107XG52YXIgY29sb3JDb3VudCA9IDA7XG52YXIgZ2VuZXJhdGVkQ29sb3JzID0gcmFuZG9tQ29sb3IoeyBsdW1pbm9zaXR5OiAnbGlnaHQnLCBjb3VudDogMTAgfSk7XG52YXIgY29sb3JBcnJheSA9IGNvbG9yQXJyYXkuY29uY2F0KGdlbmVyYXRlZENvbG9ycyk7XG5jb2xvckFycmF5ID0gc2h1ZmZsZShjb2xvckFycmF5KTtcbnZhciBzID0gU25hcChcIiNjaXJjbGVMb2FkZXJcIik7XG52YXIgd2luZG93X2ZvY3VzID0gdHJ1ZTtcblxuLy9TaW1wbGUgSUQgZ2VuIGFwcGVuZHMgYW4gaW5jIGNvdW50IG9uIGV2ZXJ5IGNhbGxcbmZ1bmN0aW9uIGdlbmVyYXRlSUQoKSB7XG4gICAgY2lyY2xlQ291bnQgKz0gMTtcbiAgICByZXR1cm4gJ2NpcmNsZScgKyBjaXJjbGVDb3VudDtcbn1cbi8vVXRpbGl0eSBmdW5jdGlvbiB0byBwcmludCB0aGUgSUQncyBvZiBhbGwgU1ZHIGNpcmNsZXMgaW4gc3RvcmFnZVxuZnVuY3Rpb24gcHJpbnRDaXJjbGVJZHMoKSB7XG4gICAgdmFyIGxpc3QgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFsbENpcmNsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGlzdC5wdXNoKGFsbENpcmNsZXNbaV0uYXR0cignaWQnKSk7XG4gICAgfVxuICAgIHJldHVybiBsaXN0LnRvU3RyaW5nKCk7XG59XG4vL0ZpbmQgYW5kIGRlc3Ryb3lcbmZ1bmN0aW9uIGNsZWFuKHN2Z0lEKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhbGxDaXJjbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vVGVtcG9yYXJpbHkgc3RvcmUgdGhlIGN1cnJlbnQgU1ZHIHNlbGVjdGVkXG4gICAgICAgIHZhciB2YWwgPSBhbGxDaXJjbGVzW2ldO1xuICAgICAgICAvL0lmIHRoZSBpZCBvZiB0aGUgU1ZHIGlzIG5vdCB1bmRlZmluZWRcbiAgICAgICAgaWYgKF90eXBlb2YoYWxsQ2lyY2xlc1tpXS5hdHRyKCdpZCcpKSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChhbGxDaXJjbGVzW2ldLmF0dHIoJ2lkJykgPT0gc3ZnSUQpIHtcbiAgICAgICAgICAgICAgICAvL1JlbW92ZSBTVkcgZnJvbSBET01cbiAgICAgICAgICAgICAgICAkKCcjJyArIHZhbC5hdHRyKCdpZCcpKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAvL1JlbW92ZSBTVkcgZnJvbSBhcnJheVxuICAgICAgICAgICAgICAgIGFsbENpcmNsZXMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuLy9CaW5kcyBhbmltYXRpb24gdG8gU1ZHIGNpcmNsZSBvZiBhIGNlcnRhaW4gSURcbmZ1bmN0aW9uIGFuaW1hdGVDaXJjbGUob2JqLCBzdmdJRCkge1xuICAgIG9iai5hbmltYXRlKHtcbiAgICAgICAgLy9zY2FsZVxuICAgICAgICByOiA4MDBcbiAgICB9LCAyMDAwMCwgbWluYS5lYXNlSW5PdXQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy9GYWRlIHRvIDAgb3BhY2l0eSBhZnRlciBzY2FsZSBpcyBjb21wbGV0ZVxuICAgICAgICB0aGlzLmFuaW1hdGUoe1xuICAgICAgICAgICAgb3BhY2l0eTogMFxuICAgICAgICB9LCAxNTAwMCwgbWluYS5lYXNlSW5PdXQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vUmVtb3ZlIFNWRyBjaXJjbGUgZnJvbSBET01cbiAgICAgICAgICAgICQoJyMnICsgdGhpcy5hdHRyKCdpZCcpKVswXS5yZW1vdmUoKTtcbiAgICAgICAgICAgIC8vUmVtb3ZlIFNWRyBjaXJjbGUgZnJvbSBzdG9yYWdlXG4gICAgICAgICAgICBhbGxDaXJjbGVzLnNwbGljZShhbGxDaXJjbGVzLmluZGV4T2YodGhpcyksIDEpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbi8vU3RvcmUgU1ZHIG9iamVjdCBhbmQgYmluZCBhbmltYXRpb25cbmZ1bmN0aW9uIHN0b3JlQ2lyY2xlKG9iaiwgc3ZnSUQpIHtcbiAgICBhbGxDaXJjbGVzLnB1c2gob2JqKTtcbiAgICBhbmltYXRlQ2lyY2xlKG9iaiwgc3ZnSUQpO1xufVxuLy9BcnJheSBTaHVmZmxlciBiYXNlZCBvbiBLbnV0aCBhbGdvcml0aG1cbmZ1bmN0aW9uIHNodWZmbGUoYXJyYXkpIHtcbiAgICB2YXIgY3VycmVudEluZGV4ID0gYXJyYXkubGVuZ3RoLFxuICAgICAgICB0ZW1wb3JhcnlWYWx1ZSxcbiAgICAgICAgcmFuZG9tSW5kZXg7XG5cbiAgICAvLyBXaGlsZSB0aGVyZSByZW1haW4gZWxlbWVudHMgdG8gc2h1ZmZsZS4uLlxuICAgIHdoaWxlICgwICE9PSBjdXJyZW50SW5kZXgpIHtcblxuICAgICAgICAvLyBQaWNrIGEgcmVtYWluaW5nIGVsZW1lbnQuLi5cbiAgICAgICAgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjdXJyZW50SW5kZXgpO1xuICAgICAgICBjdXJyZW50SW5kZXggLT0gMTtcblxuICAgICAgICAvLyBBbmQgc3dhcCBpdCB3aXRoIHRoZSBjdXJyZW50IGVsZW1lbnQuXG4gICAgICAgIHRlbXBvcmFyeVZhbHVlID0gYXJyYXlbY3VycmVudEluZGV4XTtcbiAgICAgICAgYXJyYXlbY3VycmVudEluZGV4XSA9IGFycmF5W3JhbmRvbUluZGV4XTtcbiAgICAgICAgYXJyYXlbcmFuZG9tSW5kZXhdID0gdGVtcG9yYXJ5VmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycmF5O1xufVxuLy9SYW5kb20gY29sb3Igc2VxdWVuY2VcbmZ1bmN0aW9uIHNlcXVlbnRpYWxSYW5kb21Db2xvcigpIHtcbiAgICB2YXIgaW50ZXJ2YWwgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyA3IDogYXJndW1lbnRzWzBdO1xuXG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgIGNhc2UgY29sb3JDb3VudCA8PSBpbnRlcnZhbDpcbiAgICAgICAgICAgIGNvbG9yQ291bnQgKz0gMTtcbiAgICAgICAgICAgIHJldHVybiBjb2xvckFycmF5WzBdO1xuICAgICAgICBjYXNlIGNvbG9yQ291bnQgPD0gaW50ZXJ2YWwgKiAyOlxuICAgICAgICAgICAgY29sb3JDb3VudCArPSAxO1xuICAgICAgICAgICAgcmV0dXJuIGNvbG9yQXJyYXlbMV07XG4gICAgICAgIGNhc2UgY29sb3JDb3VudCA8PSBpbnRlcnZhbCAqIDM6XG4gICAgICAgICAgICBjb2xvckNvdW50ICs9IDE7XG4gICAgICAgICAgICBpZiAoY29sb3JDb3VudCA+IGludGVydmFsICogMykge1xuICAgICAgICAgICAgICAgIHZhciB0ZW1wID0gY29sb3JBcnJheVsyXTtcbiAgICAgICAgICAgICAgICAvL1NodWZmbGUgY29sb3JzIHdoZW4gbWF4IChpbnRlcnZhbCozKSBpcyByZWFjaGVkXG4gICAgICAgICAgICAgICAgY29sb3JBcnJheSA9IHNodWZmbGUoY29sb3JBcnJheSk7XG4gICAgICAgICAgICAgICAgLy9SZXN0YXJ0XG4gICAgICAgICAgICAgICAgY29sb3JDb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgLy9SZXR1cm4gY29sb3Igc3RvcmVkIGZyb20gZWFybGllclxuICAgICAgICAgICAgICAgIHJldHVybiB0ZW1wO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNvbG9yQXJyYXlbMl07XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gJyMwMDAnO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGluY3JlbWVudCgpIHtcbiAgICAgICAgaWYgKGNvbG9yQ291bnQgPCBpbnRlcnZhbCAqIDMpIHtcbiAgICAgICAgICAgIGNvbG9yQ291bnQgKz0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vU2h1ZmZsZSBjb2xvcnMgd2hlbiBtYXggKGludGVydmFsKjMpIGlzIHJlYWNoZWRcbiAgICAgICAgICAgIGNvbG9yQXJyYXkgPSBzaHVmZmxlKGNvbG9yQXJyYXkpO1xuICAgICAgICAgICAgLy9SZXN0YXJ0XG4gICAgICAgICAgICBjb2xvckNvdW50ID0gMDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVSYW5kb21DaXJjbGVzKCkge1xuICAgIHZhciBjb3VudCA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IDMgOiBhcmd1bWVudHNbMF07XG5cbiAgICBpZiAod2luZG93X2ZvY3VzID09IHRydWUpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAvL0V4dHJhY3Qgdmlld3BvcnQgZGltZW5zaW9uc1xuICAgICAgICAgICAgdmFyIHNjcmVlbkhlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKTtcbiAgICAgICAgICAgIHZhciBzY3JlZW5XaWR0aCA9ICQod2luZG93KS53aWR0aCgpO1xuICAgICAgICAgICAgLy9Bc3NpZ24gcmFuZG9tIGxvY2F0aW9uXG4gICAgICAgICAgICB2YXIgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChzY3JlZW5XaWR0aCAtIDAgKyAxKSArIDEpO1xuICAgICAgICAgICAgdmFyIHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBzY3JlZW5IZWlnaHQgKyAxKSArIDE7XG4gICAgICAgICAgICAvL0dlbmVyYXRlIHVuaXF1ZSBJRCBmb3IgZXZlcnkgY2lyY2xlXG4gICAgICAgICAgICB2YXIgdW5pcXVlID0gZ2VuZXJhdGVJRCgpO1xuICAgICAgICAgICAgc3RvcmVDaXJjbGUocy5jaXJjbGUoeCwgeSwgMSkuYXR0cih7XG4gICAgICAgICAgICAgICAgZmlsbDogc2VxdWVudGlhbFJhbmRvbUNvbG9yKDYpLFxuICAgICAgICAgICAgICAgIGlkOiB1bmlxdWVcbiAgICAgICAgICAgIH0pLCB1bmlxdWUpO1xuICAgICAgICB9XG4gICAgfVxufVxuLy9TdGFydCBnZW5lcmF0aW5nIGNpcmNsZXMgZXZlcnkgMyBzZWNvbmRzLlxudmFyIGJlZ2luID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBnZW5lcmF0ZVJhbmRvbUNpcmNsZXMoMSk7XG59LCAzMDAwKTtcbi8vS2VlcCB0cmFjayBvZiB3aGV0aGVyIHRoZSBicm93c2VyIHRhYiBvciB3aW5kb3cgaXMgaW4gZm9jdXMuIElmIG5vdCwgcGF1c2UgYW5pbWF0aW9ucyBhbmQgb3RoZXIgYmFja2dyb3VuZCBqcyBwcm9jZXNzZXMgZm9yIHBlcmZvcm1hbmNlXG4kKHdpbmRvdykuZm9jdXMoZnVuY3Rpb24gKCkge1xuICAgIHdpbmRvd19mb2N1cyA9IHRydWU7XG59KS5ibHVyKGZ1bmN0aW9uICgpIHtcbiAgICB3aW5kb3dfZm9jdXMgPSBmYWxzZTtcbn0pOyJdfQ==
