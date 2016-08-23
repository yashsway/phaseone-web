(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

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
var colorArray = ['#202426', '#BCD0DB', '#FFED93', '#dbdee0', '#7AC397', '#E56B62'];
var colorCount = 0;
colorArray = shuffle(colorArray);
var s = Snap("#svg");
var window_focus = true;

//Growth Tween
var grow = motion.tween({
    blend: true,
    duration: 30000,
    ease: motion.easing.easeInOut,
    values: {
        scale: 800
    }
});
//Simple ID gen appends an inc count on every call
function generateID() {
    circleCount += 1;
    return 'circle' + circleCount;
}
//Find and bind opacity decreasing destruction to SVG circles
function clean(svgID) {
    $.map(allCircles, function (val, i) {
        if (val.attr('id') == svgID) {
            //Fade out and destroy
            val.animate({
                opacity: 0
            }, 10000, mina.easeInOut, function () {
                //Remove SVG element from DOM
                $('#' + val.attr('id'))[0].remove();
                //Remove SVG element from array
                allCircles.splice(i, 1);
            });
        }
    });
}

function animateCircle(svgID) {
    //Set destruction & bind animation
    grow.set({
        onComplete: function onComplete(state) {
            clean(svgID);
        }
    }).on($('#' + svgID)[0]).start();
}

function storeCircle(obj) {
    allCircles.push(obj);
}

function removeCircle(obj) {
    obj.remove();
}

//Array Shuffler
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
            colorCount = 0;
        }
    }
}

function generateRandomCircles() {
    var count = arguments.length <= 0 || arguments[0] === undefined ? 3 : arguments[0];

    console.log(allCircles.length);
    if (window_focus == true) {
        for (var i = 0; i < count; i++) {
            var screenHeight = $(window).height();
            var screenWidth = $(window).width();
            var x = Math.floor(Math.random() * (screenWidth - 0 + 1) + 1);
            var y = Math.floor(Math.random() * screenHeight + 1) + 1;
            var unique = generateID();
            storeCircle(s.circle(x, y, 1).attr({
                fill: sequentialRandomColor(6),
                id: unique
            }));
            animateCircle(unique);
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
//window.onblur(window.clearInterval(begin));

//Old animation need to reconfigure
/*storeCircle((s.circle(150, 150, 100)).attr({
    fill: randomColor({hue:'blue', luminosity: 'light', count: 1}),
    id: generateID()
}));*/
//animateCircle(allCircles[0].attr('id'));
//animateCircle($('#'+allCircles[0].attr('id')).get());
/*const ball = document.getElementById('ball');

const moveX = motion.track({
    values: {
        x: {},
        y:{}
    }
});

const moveBallX = moveX.on(ball);

const changeColor = motion.tween({
    duration: 2000,
    ease: motion.easing.easeInOut,
    values: {
        backgroundColor: '#2f47f7',
        height: screenHeight,
        width: screenHeight
    }
});

changeColor.on(ball).start();*/
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9sYW5kaW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG4vL0Zsb3d0eXBlXG4kKCdib2R5JykuZmxvd3R5cGUoe1xuICAgIG1pbmltdW06IDUwMCxcbiAgICBtYXhpbXVtOiAxMjAwLFxuICAgIG1pbkZvbnQ6IDgsXG4gICAgbWF4Rm9udDogMTgsXG4gICAgZm9udFJhdGlvOiA1MFxufSk7XG4vL1VzdWFsbHkgY2FwcyBhcm91bmQgdHdpY2UgdGhlIGludGVydmFsXG52YXIgYWxsQ2lyY2xlcyA9IFtdO1xudmFyIGNpcmNsZUNvdW50ID0gMDtcbnZhciBjb2xvckFycmF5ID0gWycjMjAyNDI2JywgJyNCQ0QwREInLCAnI0ZGRUQ5MycsICcjZGJkZWUwJywgJyM3QUMzOTcnLCAnI0U1NkI2MiddO1xudmFyIGNvbG9yQ291bnQgPSAwO1xuY29sb3JBcnJheSA9IHNodWZmbGUoY29sb3JBcnJheSk7XG52YXIgcyA9IFNuYXAoXCIjc3ZnXCIpO1xudmFyIHdpbmRvd19mb2N1cyA9IHRydWU7XG5cbi8vR3Jvd3RoIFR3ZWVuXG52YXIgZ3JvdyA9IG1vdGlvbi50d2Vlbih7XG4gICAgYmxlbmQ6IHRydWUsXG4gICAgZHVyYXRpb246IDMwMDAwLFxuICAgIGVhc2U6IG1vdGlvbi5lYXNpbmcuZWFzZUluT3V0LFxuICAgIHZhbHVlczoge1xuICAgICAgICBzY2FsZTogODAwXG4gICAgfVxufSk7XG4vL1NpbXBsZSBJRCBnZW4gYXBwZW5kcyBhbiBpbmMgY291bnQgb24gZXZlcnkgY2FsbFxuZnVuY3Rpb24gZ2VuZXJhdGVJRCgpIHtcbiAgICBjaXJjbGVDb3VudCArPSAxO1xuICAgIHJldHVybiAnY2lyY2xlJyArIGNpcmNsZUNvdW50O1xufVxuLy9GaW5kIGFuZCBiaW5kIG9wYWNpdHkgZGVjcmVhc2luZyBkZXN0cnVjdGlvbiB0byBTVkcgY2lyY2xlc1xuZnVuY3Rpb24gY2xlYW4oc3ZnSUQpIHtcbiAgICAkLm1hcChhbGxDaXJjbGVzLCBmdW5jdGlvbiAodmFsLCBpKSB7XG4gICAgICAgIGlmICh2YWwuYXR0cignaWQnKSA9PSBzdmdJRCkge1xuICAgICAgICAgICAgLy9GYWRlIG91dCBhbmQgZGVzdHJveVxuICAgICAgICAgICAgdmFsLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDBcbiAgICAgICAgICAgIH0sIDEwMDAwLCBtaW5hLmVhc2VJbk91dCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIC8vUmVtb3ZlIFNWRyBlbGVtZW50IGZyb20gRE9NXG4gICAgICAgICAgICAgICAgJCgnIycgKyB2YWwuYXR0cignaWQnKSlbMF0ucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgLy9SZW1vdmUgU1ZHIGVsZW1lbnQgZnJvbSBhcnJheVxuICAgICAgICAgICAgICAgIGFsbENpcmNsZXMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gYW5pbWF0ZUNpcmNsZShzdmdJRCkge1xuICAgIC8vU2V0IGRlc3RydWN0aW9uICYgYmluZCBhbmltYXRpb25cbiAgICBncm93LnNldCh7XG4gICAgICAgIG9uQ29tcGxldGU6IGZ1bmN0aW9uIG9uQ29tcGxldGUoc3RhdGUpIHtcbiAgICAgICAgICAgIGNsZWFuKHN2Z0lEKTtcbiAgICAgICAgfVxuICAgIH0pLm9uKCQoJyMnICsgc3ZnSUQpWzBdKS5zdGFydCgpO1xufVxuXG5mdW5jdGlvbiBzdG9yZUNpcmNsZShvYmopIHtcbiAgICBhbGxDaXJjbGVzLnB1c2gob2JqKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlQ2lyY2xlKG9iaikge1xuICAgIG9iai5yZW1vdmUoKTtcbn1cblxuLy9BcnJheSBTaHVmZmxlclxuZnVuY3Rpb24gc2h1ZmZsZShhcnJheSkge1xuICAgIHZhciBjdXJyZW50SW5kZXggPSBhcnJheS5sZW5ndGgsXG4gICAgICAgIHRlbXBvcmFyeVZhbHVlLFxuICAgICAgICByYW5kb21JbmRleDtcblxuICAgIC8vIFdoaWxlIHRoZXJlIHJlbWFpbiBlbGVtZW50cyB0byBzaHVmZmxlLi4uXG4gICAgd2hpbGUgKDAgIT09IGN1cnJlbnRJbmRleCkge1xuXG4gICAgICAgIC8vIFBpY2sgYSByZW1haW5pbmcgZWxlbWVudC4uLlxuICAgICAgICByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGN1cnJlbnRJbmRleCk7XG4gICAgICAgIGN1cnJlbnRJbmRleCAtPSAxO1xuXG4gICAgICAgIC8vIEFuZCBzd2FwIGl0IHdpdGggdGhlIGN1cnJlbnQgZWxlbWVudC5cbiAgICAgICAgdGVtcG9yYXJ5VmFsdWUgPSBhcnJheVtjdXJyZW50SW5kZXhdO1xuICAgICAgICBhcnJheVtjdXJyZW50SW5kZXhdID0gYXJyYXlbcmFuZG9tSW5kZXhdO1xuICAgICAgICBhcnJheVtyYW5kb21JbmRleF0gPSB0ZW1wb3JhcnlWYWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyYXk7XG59XG4vL1JhbmRvbSBjb2xvciBzZXF1ZW5jZVxuZnVuY3Rpb24gc2VxdWVudGlhbFJhbmRvbUNvbG9yKCkge1xuICAgIHZhciBpbnRlcnZhbCA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IDcgOiBhcmd1bWVudHNbMF07XG5cbiAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgICAgY2FzZSBjb2xvckNvdW50IDw9IGludGVydmFsOlxuICAgICAgICAgICAgaW5jcmVtZW50KCk7XG4gICAgICAgICAgICByZXR1cm4gY29sb3JBcnJheVswXTtcbiAgICAgICAgY2FzZSBjb2xvckNvdW50IDw9IGludGVydmFsICogMjpcbiAgICAgICAgICAgIGluY3JlbWVudCgpO1xuICAgICAgICAgICAgcmV0dXJuIGNvbG9yQXJyYXlbMV07XG4gICAgICAgIGNhc2UgY29sb3JDb3VudCA8PSBpbnRlcnZhbCAqIDM6XG4gICAgICAgICAgICBpbmNyZW1lbnQoKTtcbiAgICAgICAgICAgIHJldHVybiBjb2xvckFycmF5WzJdO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgaW5jcmVtZW50KCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG4gICAgZnVuY3Rpb24gaW5jcmVtZW50KCkge1xuICAgICAgICBpZiAoY29sb3JDb3VudCA8IGludGVydmFsICogMykge1xuICAgICAgICAgICAgY29sb3JDb3VudCArPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29sb3JDb3VudCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlUmFuZG9tQ2lyY2xlcygpIHtcbiAgICB2YXIgY291bnQgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyAzIDogYXJndW1lbnRzWzBdO1xuXG4gICAgY29uc29sZS5sb2coYWxsQ2lyY2xlcy5sZW5ndGgpO1xuICAgIGlmICh3aW5kb3dfZm9jdXMgPT0gdHJ1ZSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIHZhciBzY3JlZW5IZWlnaHQgPSAkKHdpbmRvdykuaGVpZ2h0KCk7XG4gICAgICAgICAgICB2YXIgc2NyZWVuV2lkdGggPSAkKHdpbmRvdykud2lkdGgoKTtcbiAgICAgICAgICAgIHZhciB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKHNjcmVlbldpZHRoIC0gMCArIDEpICsgMSk7XG4gICAgICAgICAgICB2YXIgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHNjcmVlbkhlaWdodCArIDEpICsgMTtcbiAgICAgICAgICAgIHZhciB1bmlxdWUgPSBnZW5lcmF0ZUlEKCk7XG4gICAgICAgICAgICBzdG9yZUNpcmNsZShzLmNpcmNsZSh4LCB5LCAxKS5hdHRyKHtcbiAgICAgICAgICAgICAgICBmaWxsOiBzZXF1ZW50aWFsUmFuZG9tQ29sb3IoNiksXG4gICAgICAgICAgICAgICAgaWQ6IHVuaXF1ZVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgYW5pbWF0ZUNpcmNsZSh1bmlxdWUpO1xuICAgICAgICB9XG4gICAgfVxufVxuLy9TdGFydCBnZW5lcmF0aW5nIGNpcmNsZXMgZXZlcnkgMyBzZWNvbmRzLlxudmFyIGJlZ2luID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBnZW5lcmF0ZVJhbmRvbUNpcmNsZXMoMSk7XG59LCAzMDAwKTtcbi8vS2VlcCB0cmFjayBvZiB3aGV0aGVyIHRoZSBicm93c2VyIHRhYiBvciB3aW5kb3cgaXMgaW4gZm9jdXMuIElmIG5vdCwgcGF1c2UgYW5pbWF0aW9ucyBhbmQgb3RoZXIgYmFja2dyb3VuZCBqcyBwcm9jZXNzZXMgZm9yIHBlcmZvcm1hbmNlXG4kKHdpbmRvdykuZm9jdXMoZnVuY3Rpb24gKCkge1xuICAgIHdpbmRvd19mb2N1cyA9IHRydWU7XG59KS5ibHVyKGZ1bmN0aW9uICgpIHtcbiAgICB3aW5kb3dfZm9jdXMgPSBmYWxzZTtcbn0pO1xuLy93aW5kb3cub25ibHVyKHdpbmRvdy5jbGVhckludGVydmFsKGJlZ2luKSk7XG5cbi8vT2xkIGFuaW1hdGlvbiBuZWVkIHRvIHJlY29uZmlndXJlXG4vKnN0b3JlQ2lyY2xlKChzLmNpcmNsZSgxNTAsIDE1MCwgMTAwKSkuYXR0cih7XG4gICAgZmlsbDogcmFuZG9tQ29sb3Ioe2h1ZTonYmx1ZScsIGx1bWlub3NpdHk6ICdsaWdodCcsIGNvdW50OiAxfSksXG4gICAgaWQ6IGdlbmVyYXRlSUQoKVxufSkpOyovXG4vL2FuaW1hdGVDaXJjbGUoYWxsQ2lyY2xlc1swXS5hdHRyKCdpZCcpKTtcbi8vYW5pbWF0ZUNpcmNsZSgkKCcjJythbGxDaXJjbGVzWzBdLmF0dHIoJ2lkJykpLmdldCgpKTtcbi8qY29uc3QgYmFsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYWxsJyk7XG5cbmNvbnN0IG1vdmVYID0gbW90aW9uLnRyYWNrKHtcbiAgICB2YWx1ZXM6IHtcbiAgICAgICAgeDoge30sXG4gICAgICAgIHk6e31cbiAgICB9XG59KTtcblxuY29uc3QgbW92ZUJhbGxYID0gbW92ZVgub24oYmFsbCk7XG5cbmNvbnN0IGNoYW5nZUNvbG9yID0gbW90aW9uLnR3ZWVuKHtcbiAgICBkdXJhdGlvbjogMjAwMCxcbiAgICBlYXNlOiBtb3Rpb24uZWFzaW5nLmVhc2VJbk91dCxcbiAgICB2YWx1ZXM6IHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzJmNDdmNycsXG4gICAgICAgIGhlaWdodDogc2NyZWVuSGVpZ2h0LFxuICAgICAgICB3aWR0aDogc2NyZWVuSGVpZ2h0XG4gICAgfVxufSk7XG5cbmNoYW5nZUNvbG9yLm9uKGJhbGwpLnN0YXJ0KCk7Ki8iXX0=
