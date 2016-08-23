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
var colorArray = ['#202426', '#BCD0DB', '#FFED93', '#dbdee0'];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9sYW5kaW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG4vL0Zsb3d0eXBlXG4kKCdib2R5JykuZmxvd3R5cGUoe1xuICAgIG1pbmltdW06IDUwMCxcbiAgICBtYXhpbXVtOiAxMjAwLFxuICAgIG1pbkZvbnQ6IDgsXG4gICAgbWF4Rm9udDogMTgsXG4gICAgZm9udFJhdGlvOiA1MFxufSk7XG4vL1VzdWFsbHkgY2FwcyBhcm91bmQgdHdpY2UgdGhlIGludGVydmFsXG52YXIgYWxsQ2lyY2xlcyA9IFtdO1xudmFyIGNpcmNsZUNvdW50ID0gMDtcbnZhciBjb2xvckFycmF5ID0gWycjMjAyNDI2JywgJyNCQ0QwREInLCAnI0ZGRUQ5MycsICcjZGJkZWUwJ107XG52YXIgY29sb3JDb3VudCA9IDA7XG5jb2xvckFycmF5ID0gc2h1ZmZsZShjb2xvckFycmF5KTtcbnZhciBzID0gU25hcChcIiNzdmdcIik7XG52YXIgd2luZG93X2ZvY3VzID0gdHJ1ZTtcblxuLy9Hcm93dGggVHdlZW5cbnZhciBncm93ID0gbW90aW9uLnR3ZWVuKHtcbiAgICBibGVuZDogdHJ1ZSxcbiAgICBkdXJhdGlvbjogMzAwMDAsXG4gICAgZWFzZTogbW90aW9uLmVhc2luZy5lYXNlSW5PdXQsXG4gICAgdmFsdWVzOiB7XG4gICAgICAgIHNjYWxlOiA4MDBcbiAgICB9XG59KTtcbi8vU2ltcGxlIElEIGdlbiBhcHBlbmRzIGFuIGluYyBjb3VudCBvbiBldmVyeSBjYWxsXG5mdW5jdGlvbiBnZW5lcmF0ZUlEKCkge1xuICAgIGNpcmNsZUNvdW50ICs9IDE7XG4gICAgcmV0dXJuICdjaXJjbGUnICsgY2lyY2xlQ291bnQ7XG59XG4vL0ZpbmQgYW5kIGJpbmQgb3BhY2l0eSBkZWNyZWFzaW5nIGRlc3RydWN0aW9uIHRvIFNWRyBjaXJjbGVzXG5mdW5jdGlvbiBjbGVhbihzdmdJRCkge1xuICAgICQubWFwKGFsbENpcmNsZXMsIGZ1bmN0aW9uICh2YWwsIGkpIHtcbiAgICAgICAgaWYgKHZhbC5hdHRyKCdpZCcpID09IHN2Z0lEKSB7XG4gICAgICAgICAgICAvL0ZhZGUgb3V0IGFuZCBkZXN0cm95XG4gICAgICAgICAgICB2YWwuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMFxuICAgICAgICAgICAgfSwgMTAwMDAsIG1pbmEuZWFzZUluT3V0LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgLy9SZW1vdmUgU1ZHIGVsZW1lbnQgZnJvbSBET01cbiAgICAgICAgICAgICAgICAkKCcjJyArIHZhbC5hdHRyKCdpZCcpKVswXS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAvL1JlbW92ZSBTVkcgZWxlbWVudCBmcm9tIGFycmF5XG4gICAgICAgICAgICAgICAgYWxsQ2lyY2xlcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBhbmltYXRlQ2lyY2xlKHN2Z0lEKSB7XG4gICAgLy9TZXQgZGVzdHJ1Y3Rpb24gJiBiaW5kIGFuaW1hdGlvblxuICAgIGdyb3cuc2V0KHtcbiAgICAgICAgb25Db21wbGV0ZTogZnVuY3Rpb24gb25Db21wbGV0ZShzdGF0ZSkge1xuICAgICAgICAgICAgY2xlYW4oc3ZnSUQpO1xuICAgICAgICB9XG4gICAgfSkub24oJCgnIycgKyBzdmdJRClbMF0pLnN0YXJ0KCk7XG59XG5cbmZ1bmN0aW9uIHN0b3JlQ2lyY2xlKG9iaikge1xuICAgIGFsbENpcmNsZXMucHVzaChvYmopO1xufVxuXG5mdW5jdGlvbiByZW1vdmVDaXJjbGUob2JqKSB7XG4gICAgb2JqLnJlbW92ZSgpO1xufVxuXG4vL0FycmF5IFNodWZmbGVyXG5mdW5jdGlvbiBzaHVmZmxlKGFycmF5KSB7XG4gICAgdmFyIGN1cnJlbnRJbmRleCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgICAgdGVtcG9yYXJ5VmFsdWUsXG4gICAgICAgIHJhbmRvbUluZGV4O1xuXG4gICAgLy8gV2hpbGUgdGhlcmUgcmVtYWluIGVsZW1lbnRzIHRvIHNodWZmbGUuLi5cbiAgICB3aGlsZSAoMCAhPT0gY3VycmVudEluZGV4KSB7XG5cbiAgICAgICAgLy8gUGljayBhIHJlbWFpbmluZyBlbGVtZW50Li4uXG4gICAgICAgIHJhbmRvbUluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY3VycmVudEluZGV4KTtcbiAgICAgICAgY3VycmVudEluZGV4IC09IDE7XG5cbiAgICAgICAgLy8gQW5kIHN3YXAgaXQgd2l0aCB0aGUgY3VycmVudCBlbGVtZW50LlxuICAgICAgICB0ZW1wb3JhcnlWYWx1ZSA9IGFycmF5W2N1cnJlbnRJbmRleF07XG4gICAgICAgIGFycmF5W2N1cnJlbnRJbmRleF0gPSBhcnJheVtyYW5kb21JbmRleF07XG4gICAgICAgIGFycmF5W3JhbmRvbUluZGV4XSA9IHRlbXBvcmFyeVZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiBhcnJheTtcbn1cbi8vUmFuZG9tIGNvbG9yIHNlcXVlbmNlXG5mdW5jdGlvbiBzZXF1ZW50aWFsUmFuZG9tQ29sb3IoKSB7XG4gICAgdmFyIGludGVydmFsID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8gNyA6IGFyZ3VtZW50c1swXTtcblxuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgICBjYXNlIGNvbG9yQ291bnQgPD0gaW50ZXJ2YWw6XG4gICAgICAgICAgICBpbmNyZW1lbnQoKTtcbiAgICAgICAgICAgIHJldHVybiBjb2xvckFycmF5WzBdO1xuICAgICAgICBjYXNlIGNvbG9yQ291bnQgPD0gaW50ZXJ2YWwgKiAyOlxuICAgICAgICAgICAgaW5jcmVtZW50KCk7XG4gICAgICAgICAgICByZXR1cm4gY29sb3JBcnJheVsxXTtcbiAgICAgICAgY2FzZSBjb2xvckNvdW50IDw9IGludGVydmFsICogMzpcbiAgICAgICAgICAgIGluY3JlbWVudCgpO1xuICAgICAgICAgICAgcmV0dXJuIGNvbG9yQXJyYXlbMl07XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBpbmNyZW1lbnQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpbmNyZW1lbnQoKSB7XG4gICAgICAgIGlmIChjb2xvckNvdW50IDwgaW50ZXJ2YWwgKiAzKSB7XG4gICAgICAgICAgICBjb2xvckNvdW50ICs9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb2xvckNvdW50ID0gMDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVSYW5kb21DaXJjbGVzKCkge1xuICAgIHZhciBjb3VudCA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IDMgOiBhcmd1bWVudHNbMF07XG5cbiAgICBjb25zb2xlLmxvZyhhbGxDaXJjbGVzLmxlbmd0aCk7XG4gICAgaWYgKHdpbmRvd19mb2N1cyA9PSB0cnVlKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICAgdmFyIHNjcmVlbkhlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKTtcbiAgICAgICAgICAgIHZhciBzY3JlZW5XaWR0aCA9ICQod2luZG93KS53aWR0aCgpO1xuICAgICAgICAgICAgdmFyIHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoc2NyZWVuV2lkdGggLSAwICsgMSkgKyAxKTtcbiAgICAgICAgICAgIHZhciB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogc2NyZWVuSGVpZ2h0ICsgMSkgKyAxO1xuICAgICAgICAgICAgdmFyIHVuaXF1ZSA9IGdlbmVyYXRlSUQoKTtcbiAgICAgICAgICAgIHN0b3JlQ2lyY2xlKHMuY2lyY2xlKHgsIHksIDEpLmF0dHIoe1xuICAgICAgICAgICAgICAgIGZpbGw6IHNlcXVlbnRpYWxSYW5kb21Db2xvcig2KSxcbiAgICAgICAgICAgICAgICBpZDogdW5pcXVlXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICBhbmltYXRlQ2lyY2xlKHVuaXF1ZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vL1N0YXJ0IGdlbmVyYXRpbmcgY2lyY2xlcyBldmVyeSAzIHNlY29uZHMuXG52YXIgYmVnaW4gPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGdlbmVyYXRlUmFuZG9tQ2lyY2xlcygxKTtcbn0sIDMwMDApO1xuLy9LZWVwIHRyYWNrIG9mIHdoZXRoZXIgdGhlIGJyb3dzZXIgdGFiIG9yIHdpbmRvdyBpcyBpbiBmb2N1cy4gSWYgbm90LCBwYXVzZSBhbmltYXRpb25zIGFuZCBvdGhlciBiYWNrZ3JvdW5kIGpzIHByb2Nlc3NlcyBmb3IgcGVyZm9ybWFuY2VcbiQod2luZG93KS5mb2N1cyhmdW5jdGlvbiAoKSB7XG4gICAgd2luZG93X2ZvY3VzID0gdHJ1ZTtcbn0pLmJsdXIoZnVuY3Rpb24gKCkge1xuICAgIHdpbmRvd19mb2N1cyA9IGZhbHNlO1xufSk7XG4vL3dpbmRvdy5vbmJsdXIod2luZG93LmNsZWFySW50ZXJ2YWwoYmVnaW4pKTtcblxuLy9PbGQgYW5pbWF0aW9uIG5lZWQgdG8gcmVjb25maWd1cmVcbi8qc3RvcmVDaXJjbGUoKHMuY2lyY2xlKDE1MCwgMTUwLCAxMDApKS5hdHRyKHtcbiAgICBmaWxsOiByYW5kb21Db2xvcih7aHVlOidibHVlJywgbHVtaW5vc2l0eTogJ2xpZ2h0JywgY291bnQ6IDF9KSxcbiAgICBpZDogZ2VuZXJhdGVJRCgpXG59KSk7Ki9cbi8vYW5pbWF0ZUNpcmNsZShhbGxDaXJjbGVzWzBdLmF0dHIoJ2lkJykpO1xuLy9hbmltYXRlQ2lyY2xlKCQoJyMnK2FsbENpcmNsZXNbMF0uYXR0cignaWQnKSkuZ2V0KCkpO1xuLypjb25zdCBiYWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JhbGwnKTtcblxuY29uc3QgbW92ZVggPSBtb3Rpb24udHJhY2soe1xuICAgIHZhbHVlczoge1xuICAgICAgICB4OiB7fSxcbiAgICAgICAgeTp7fVxuICAgIH1cbn0pO1xuXG5jb25zdCBtb3ZlQmFsbFggPSBtb3ZlWC5vbihiYWxsKTtcblxuY29uc3QgY2hhbmdlQ29sb3IgPSBtb3Rpb24udHdlZW4oe1xuICAgIGR1cmF0aW9uOiAyMDAwLFxuICAgIGVhc2U6IG1vdGlvbi5lYXNpbmcuZWFzZUluT3V0LFxuICAgIHZhbHVlczoge1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjMmY0N2Y3JyxcbiAgICAgICAgaGVpZ2h0OiBzY3JlZW5IZWlnaHQsXG4gICAgICAgIHdpZHRoOiBzY3JlZW5IZWlnaHRcbiAgICB9XG59KTtcblxuY2hhbmdlQ29sb3Iub24oYmFsbCkuc3RhcnQoKTsqLyJdfQ==
