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
var colorArray = ['#000000', '#F4F4F4'];
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
    //Set growth and destruction animations
    obj.animate({
        //scale
        r: 800
    }, 20000, mina.easeInOut, function () {
        //Fade to 0 opacity after scale is complete
        this.animate({
            opacity: 0
        }, 3000, mina.easeInOut, function () {
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
            increment();
            return colorArray[0];
        case colorCount <= interval * 2:
            increment();
            return colorArray[1];
        case colorCount <= interval * 3:
            increment();
            return colorArray[2];
        default:
            increment();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9sYW5kaW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbi8vRmxvd3R5cGVcbiQoJ2JvZHknKS5mbG93dHlwZSh7XG4gICAgbWluaW11bTogNTAwLFxuICAgIG1heGltdW06IDEyMDAsXG4gICAgbWluRm9udDogOCxcbiAgICBtYXhGb250OiAxOCxcbiAgICBmb250UmF0aW86IDUwXG59KTtcbi8vVXN1YWxseSBjYXBzIGFyb3VuZCB0d2ljZSB0aGUgaW50ZXJ2YWxcbnZhciBhbGxDaXJjbGVzID0gW107XG52YXIgY2lyY2xlQ291bnQgPSAwO1xudmFyIGNvbG9yQXJyYXkgPSBbJyMwMDAwMDAnLCAnI0Y0RjRGNCddO1xudmFyIGNvbG9yQ291bnQgPSAwO1xudmFyIGdlbmVyYXRlZENvbG9ycyA9IHJhbmRvbUNvbG9yKHsgbHVtaW5vc2l0eTogJ2xpZ2h0JywgY291bnQ6IDEwIH0pO1xudmFyIGNvbG9yQXJyYXkgPSBjb2xvckFycmF5LmNvbmNhdChnZW5lcmF0ZWRDb2xvcnMpO1xuY29sb3JBcnJheSA9IHNodWZmbGUoY29sb3JBcnJheSk7XG52YXIgcyA9IFNuYXAoXCIjY2lyY2xlTG9hZGVyXCIpO1xudmFyIHdpbmRvd19mb2N1cyA9IHRydWU7XG5cbi8vU2ltcGxlIElEIGdlbiBhcHBlbmRzIGFuIGluYyBjb3VudCBvbiBldmVyeSBjYWxsXG5mdW5jdGlvbiBnZW5lcmF0ZUlEKCkge1xuICAgIGNpcmNsZUNvdW50ICs9IDE7XG4gICAgcmV0dXJuICdjaXJjbGUnICsgY2lyY2xlQ291bnQ7XG59XG4vL1V0aWxpdHkgZnVuY3Rpb24gdG8gcHJpbnQgdGhlIElEJ3Mgb2YgYWxsIFNWRyBjaXJjbGVzIGluIHN0b3JhZ2VcbmZ1bmN0aW9uIHByaW50Q2lyY2xlSWRzKCkge1xuICAgIHZhciBsaXN0ID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhbGxDaXJjbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxpc3QucHVzaChhbGxDaXJjbGVzW2ldLmF0dHIoJ2lkJykpO1xuICAgIH1cbiAgICByZXR1cm4gbGlzdC50b1N0cmluZygpO1xufVxuLy9GaW5kIGFuZCBkZXN0cm95XG5mdW5jdGlvbiBjbGVhbihzdmdJRCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWxsQ2lyY2xlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAvL1RlbXBvcmFyaWx5IHN0b3JlIHRoZSBjdXJyZW50IFNWRyBzZWxlY3RlZFxuICAgICAgICB2YXIgdmFsID0gYWxsQ2lyY2xlc1tpXTtcbiAgICAgICAgLy9JZiB0aGUgaWQgb2YgdGhlIFNWRyBpcyBub3QgdW5kZWZpbmVkXG4gICAgICAgIGlmIChfdHlwZW9mKGFsbENpcmNsZXNbaV0uYXR0cignaWQnKSkgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoYWxsQ2lyY2xlc1tpXS5hdHRyKCdpZCcpID09IHN2Z0lEKSB7XG4gICAgICAgICAgICAgICAgLy9SZW1vdmUgU1ZHIGZyb20gRE9NXG4gICAgICAgICAgICAgICAgJCgnIycgKyB2YWwuYXR0cignaWQnKSkucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgLy9SZW1vdmUgU1ZHIGZyb20gYXJyYXlcbiAgICAgICAgICAgICAgICBhbGxDaXJjbGVzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbi8vQmluZHMgYW5pbWF0aW9uIHRvIFNWRyBjaXJjbGUgb2YgYSBjZXJ0YWluIElEXG5mdW5jdGlvbiBhbmltYXRlQ2lyY2xlKG9iaiwgc3ZnSUQpIHtcbiAgICAvL1NldCBncm93dGggYW5kIGRlc3RydWN0aW9uIGFuaW1hdGlvbnNcbiAgICBvYmouYW5pbWF0ZSh7XG4gICAgICAgIC8vc2NhbGVcbiAgICAgICAgcjogODAwXG4gICAgfSwgMjAwMDAsIG1pbmEuZWFzZUluT3V0LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vRmFkZSB0byAwIG9wYWNpdHkgYWZ0ZXIgc2NhbGUgaXMgY29tcGxldGVcbiAgICAgICAgdGhpcy5hbmltYXRlKHtcbiAgICAgICAgICAgIG9wYWNpdHk6IDBcbiAgICAgICAgfSwgMzAwMCwgbWluYS5lYXNlSW5PdXQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vUmVtb3ZlIFNWRyBjaXJjbGUgZnJvbSBET01cbiAgICAgICAgICAgICQoJyMnICsgdGhpcy5hdHRyKCdpZCcpKVswXS5yZW1vdmUoKTtcbiAgICAgICAgICAgIC8vUmVtb3ZlIFNWRyBjaXJjbGUgZnJvbSBzdG9yYWdlXG4gICAgICAgICAgICBhbGxDaXJjbGVzLnNwbGljZShhbGxDaXJjbGVzLmluZGV4T2YodGhpcyksIDEpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbi8vU3RvcmUgU1ZHIG9iamVjdCBhbmQgYmluZCBhbmltYXRpb25cbmZ1bmN0aW9uIHN0b3JlQ2lyY2xlKG9iaiwgc3ZnSUQpIHtcbiAgICBhbGxDaXJjbGVzLnB1c2gob2JqKTtcbiAgICBhbmltYXRlQ2lyY2xlKG9iaiwgc3ZnSUQpO1xufVxuLy9BcnJheSBTaHVmZmxlciBiYXNlZCBvbiBLbnV0aCBhbGdvcml0aG1cbmZ1bmN0aW9uIHNodWZmbGUoYXJyYXkpIHtcbiAgICB2YXIgY3VycmVudEluZGV4ID0gYXJyYXkubGVuZ3RoLFxuICAgICAgICB0ZW1wb3JhcnlWYWx1ZSxcbiAgICAgICAgcmFuZG9tSW5kZXg7XG5cbiAgICAvLyBXaGlsZSB0aGVyZSByZW1haW4gZWxlbWVudHMgdG8gc2h1ZmZsZS4uLlxuICAgIHdoaWxlICgwICE9PSBjdXJyZW50SW5kZXgpIHtcblxuICAgICAgICAvLyBQaWNrIGEgcmVtYWluaW5nIGVsZW1lbnQuLi5cbiAgICAgICAgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjdXJyZW50SW5kZXgpO1xuICAgICAgICBjdXJyZW50SW5kZXggLT0gMTtcblxuICAgICAgICAvLyBBbmQgc3dhcCBpdCB3aXRoIHRoZSBjdXJyZW50IGVsZW1lbnQuXG4gICAgICAgIHRlbXBvcmFyeVZhbHVlID0gYXJyYXlbY3VycmVudEluZGV4XTtcbiAgICAgICAgYXJyYXlbY3VycmVudEluZGV4XSA9IGFycmF5W3JhbmRvbUluZGV4XTtcbiAgICAgICAgYXJyYXlbcmFuZG9tSW5kZXhdID0gdGVtcG9yYXJ5VmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycmF5O1xufVxuLy9SYW5kb20gY29sb3Igc2VxdWVuY2VcbmZ1bmN0aW9uIHNlcXVlbnRpYWxSYW5kb21Db2xvcigpIHtcbiAgICB2YXIgaW50ZXJ2YWwgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyA3IDogYXJndW1lbnRzWzBdO1xuXG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgIGNhc2UgY29sb3JDb3VudCA8PSBpbnRlcnZhbDpcbiAgICAgICAgICAgIGluY3JlbWVudCgpO1xuICAgICAgICAgICAgcmV0dXJuIGNvbG9yQXJyYXlbMF07XG4gICAgICAgIGNhc2UgY29sb3JDb3VudCA8PSBpbnRlcnZhbCAqIDI6XG4gICAgICAgICAgICBpbmNyZW1lbnQoKTtcbiAgICAgICAgICAgIHJldHVybiBjb2xvckFycmF5WzFdO1xuICAgICAgICBjYXNlIGNvbG9yQ291bnQgPD0gaW50ZXJ2YWwgKiAzOlxuICAgICAgICAgICAgaW5jcmVtZW50KCk7XG4gICAgICAgICAgICByZXR1cm4gY29sb3JBcnJheVsyXTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGluY3JlbWVudCgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGluY3JlbWVudCgpIHtcbiAgICAgICAgaWYgKGNvbG9yQ291bnQgPCBpbnRlcnZhbCAqIDMpIHtcbiAgICAgICAgICAgIGNvbG9yQ291bnQgKz0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vU2h1ZmZsZSBjb2xvcnMgd2hlbiBtYXggKGludGVydmFsKjMpIGlzIHJlYWNoZWRcbiAgICAgICAgICAgIGNvbG9yQXJyYXkgPSBzaHVmZmxlKGNvbG9yQXJyYXkpO1xuICAgICAgICAgICAgLy9SZXN0YXJ0XG4gICAgICAgICAgICBjb2xvckNvdW50ID0gMDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVSYW5kb21DaXJjbGVzKCkge1xuICAgIHZhciBjb3VudCA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IDMgOiBhcmd1bWVudHNbMF07XG5cbiAgICBpZiAod2luZG93X2ZvY3VzID09IHRydWUpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAvL0V4dHJhY3Qgdmlld3BvcnQgZGltZW5zaW9uc1xuICAgICAgICAgICAgdmFyIHNjcmVlbkhlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKTtcbiAgICAgICAgICAgIHZhciBzY3JlZW5XaWR0aCA9ICQod2luZG93KS53aWR0aCgpO1xuICAgICAgICAgICAgLy9Bc3NpZ24gcmFuZG9tIGxvY2F0aW9uXG4gICAgICAgICAgICB2YXIgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChzY3JlZW5XaWR0aCAtIDAgKyAxKSArIDEpO1xuICAgICAgICAgICAgdmFyIHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBzY3JlZW5IZWlnaHQgKyAxKSArIDE7XG4gICAgICAgICAgICAvL0dlbmVyYXRlIHVuaXF1ZSBJRCBmb3IgZXZlcnkgY2lyY2xlXG4gICAgICAgICAgICB2YXIgdW5pcXVlID0gZ2VuZXJhdGVJRCgpO1xuICAgICAgICAgICAgc3RvcmVDaXJjbGUocy5jaXJjbGUoeCwgeSwgMSkuYXR0cih7XG4gICAgICAgICAgICAgICAgZmlsbDogc2VxdWVudGlhbFJhbmRvbUNvbG9yKDYpLFxuICAgICAgICAgICAgICAgIGlkOiB1bmlxdWVcbiAgICAgICAgICAgIH0pLCB1bmlxdWUpO1xuICAgICAgICB9XG4gICAgfVxufVxuLy9TdGFydCBnZW5lcmF0aW5nIGNpcmNsZXMgZXZlcnkgMyBzZWNvbmRzLlxudmFyIGJlZ2luID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBnZW5lcmF0ZVJhbmRvbUNpcmNsZXMoMSk7XG59LCAzMDAwKTtcbi8vS2VlcCB0cmFjayBvZiB3aGV0aGVyIHRoZSBicm93c2VyIHRhYiBvciB3aW5kb3cgaXMgaW4gZm9jdXMuIElmIG5vdCwgcGF1c2UgYW5pbWF0aW9ucyBhbmQgb3RoZXIgYmFja2dyb3VuZCBqcyBwcm9jZXNzZXMgZm9yIHBlcmZvcm1hbmNlXG4kKHdpbmRvdykuZm9jdXMoZnVuY3Rpb24gKCkge1xuICAgIHdpbmRvd19mb2N1cyA9IHRydWU7XG59KS5ibHVyKGZ1bmN0aW9uICgpIHtcbiAgICB3aW5kb3dfZm9jdXMgPSBmYWxzZTtcbn0pOyJdfQ==
