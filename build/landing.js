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
var colorArray = ['#000000', '#F4F4F4'];
var colorCount = 0;
var generatedColors = randomColor({ luminosity: 'light', count: 10 });
var colorArray = colorArray.concat(generatedColors);
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
            colorArray = shuffle(colorArray);
            colorCount = 0;
        }
    }
}

function generateRandomCircles() {
    var count = arguments.length <= 0 || arguments[0] === undefined ? 3 : arguments[0];

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9sYW5kaW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuLy9GbG93dHlwZVxuJCgnYm9keScpLmZsb3d0eXBlKHtcbiAgICBtaW5pbXVtOiA1MDAsXG4gICAgbWF4aW11bTogMTIwMCxcbiAgICBtaW5Gb250OiA4LFxuICAgIG1heEZvbnQ6IDE4LFxuICAgIGZvbnRSYXRpbzogNTBcbn0pO1xuLy9Vc3VhbGx5IGNhcHMgYXJvdW5kIHR3aWNlIHRoZSBpbnRlcnZhbFxudmFyIGFsbENpcmNsZXMgPSBbXTtcbnZhciBjaXJjbGVDb3VudCA9IDA7XG52YXIgY29sb3JBcnJheSA9IFsnIzAwMDAwMCcsICcjRjRGNEY0J107XG52YXIgY29sb3JDb3VudCA9IDA7XG52YXIgZ2VuZXJhdGVkQ29sb3JzID0gcmFuZG9tQ29sb3IoeyBsdW1pbm9zaXR5OiAnbGlnaHQnLCBjb3VudDogMTAgfSk7XG52YXIgY29sb3JBcnJheSA9IGNvbG9yQXJyYXkuY29uY2F0KGdlbmVyYXRlZENvbG9ycyk7XG5jb2xvckFycmF5ID0gc2h1ZmZsZShjb2xvckFycmF5KTtcbnZhciBzID0gU25hcChcIiNzdmdcIik7XG52YXIgd2luZG93X2ZvY3VzID0gdHJ1ZTtcblxuLy9Hcm93dGggVHdlZW5cbnZhciBncm93ID0gbW90aW9uLnR3ZWVuKHtcbiAgICBibGVuZDogdHJ1ZSxcbiAgICBkdXJhdGlvbjogMzAwMDAsXG4gICAgZWFzZTogbW90aW9uLmVhc2luZy5lYXNlSW5PdXQsXG4gICAgdmFsdWVzOiB7XG4gICAgICAgIHNjYWxlOiA4MDBcbiAgICB9XG59KTtcbi8vU2ltcGxlIElEIGdlbiBhcHBlbmRzIGFuIGluYyBjb3VudCBvbiBldmVyeSBjYWxsXG5mdW5jdGlvbiBnZW5lcmF0ZUlEKCkge1xuICAgIGNpcmNsZUNvdW50ICs9IDE7XG4gICAgcmV0dXJuICdjaXJjbGUnICsgY2lyY2xlQ291bnQ7XG59XG4vL0ZpbmQgYW5kIGJpbmQgb3BhY2l0eSBkZWNyZWFzaW5nIGRlc3RydWN0aW9uIHRvIFNWRyBjaXJjbGVzXG5mdW5jdGlvbiBjbGVhbihzdmdJRCkge1xuICAgICQubWFwKGFsbENpcmNsZXMsIGZ1bmN0aW9uICh2YWwsIGkpIHtcbiAgICAgICAgaWYgKHZhbC5hdHRyKCdpZCcpID09IHN2Z0lEKSB7XG4gICAgICAgICAgICAvL0ZhZGUgb3V0IGFuZCBkZXN0cm95XG4gICAgICAgICAgICB2YWwuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMFxuICAgICAgICAgICAgfSwgMTAwMDAsIG1pbmEuZWFzZUluT3V0LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgLy9SZW1vdmUgU1ZHIGVsZW1lbnQgZnJvbSBET01cbiAgICAgICAgICAgICAgICAkKCcjJyArIHZhbC5hdHRyKCdpZCcpKVswXS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAvL1JlbW92ZSBTVkcgZWxlbWVudCBmcm9tIGFycmF5XG4gICAgICAgICAgICAgICAgYWxsQ2lyY2xlcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBhbmltYXRlQ2lyY2xlKHN2Z0lEKSB7XG4gICAgLy9TZXQgZGVzdHJ1Y3Rpb24gJiBiaW5kIGFuaW1hdGlvblxuICAgIGdyb3cuc2V0KHtcbiAgICAgICAgb25Db21wbGV0ZTogZnVuY3Rpb24gb25Db21wbGV0ZShzdGF0ZSkge1xuICAgICAgICAgICAgY2xlYW4oc3ZnSUQpO1xuICAgICAgICB9XG4gICAgfSkub24oJCgnIycgKyBzdmdJRClbMF0pLnN0YXJ0KCk7XG59XG5cbmZ1bmN0aW9uIHN0b3JlQ2lyY2xlKG9iaikge1xuICAgIGFsbENpcmNsZXMucHVzaChvYmopO1xufVxuXG5mdW5jdGlvbiByZW1vdmVDaXJjbGUob2JqKSB7XG4gICAgb2JqLnJlbW92ZSgpO1xufVxuXG4vL0FycmF5IFNodWZmbGVyXG5mdW5jdGlvbiBzaHVmZmxlKGFycmF5KSB7XG4gICAgdmFyIGN1cnJlbnRJbmRleCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgICAgdGVtcG9yYXJ5VmFsdWUsXG4gICAgICAgIHJhbmRvbUluZGV4O1xuXG4gICAgLy8gV2hpbGUgdGhlcmUgcmVtYWluIGVsZW1lbnRzIHRvIHNodWZmbGUuLi5cbiAgICB3aGlsZSAoMCAhPT0gY3VycmVudEluZGV4KSB7XG5cbiAgICAgICAgLy8gUGljayBhIHJlbWFpbmluZyBlbGVtZW50Li4uXG4gICAgICAgIHJhbmRvbUluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY3VycmVudEluZGV4KTtcbiAgICAgICAgY3VycmVudEluZGV4IC09IDE7XG5cbiAgICAgICAgLy8gQW5kIHN3YXAgaXQgd2l0aCB0aGUgY3VycmVudCBlbGVtZW50LlxuICAgICAgICB0ZW1wb3JhcnlWYWx1ZSA9IGFycmF5W2N1cnJlbnRJbmRleF07XG4gICAgICAgIGFycmF5W2N1cnJlbnRJbmRleF0gPSBhcnJheVtyYW5kb21JbmRleF07XG4gICAgICAgIGFycmF5W3JhbmRvbUluZGV4XSA9IHRlbXBvcmFyeVZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiBhcnJheTtcbn1cbi8vUmFuZG9tIGNvbG9yIHNlcXVlbmNlXG5mdW5jdGlvbiBzZXF1ZW50aWFsUmFuZG9tQ29sb3IoKSB7XG4gICAgdmFyIGludGVydmFsID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8gNyA6IGFyZ3VtZW50c1swXTtcblxuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgICBjYXNlIGNvbG9yQ291bnQgPD0gaW50ZXJ2YWw6XG4gICAgICAgICAgICBpbmNyZW1lbnQoKTtcbiAgICAgICAgICAgIHJldHVybiBjb2xvckFycmF5WzBdO1xuICAgICAgICBjYXNlIGNvbG9yQ291bnQgPD0gaW50ZXJ2YWwgKiAyOlxuICAgICAgICAgICAgaW5jcmVtZW50KCk7XG4gICAgICAgICAgICByZXR1cm4gY29sb3JBcnJheVsxXTtcbiAgICAgICAgY2FzZSBjb2xvckNvdW50IDw9IGludGVydmFsICogMzpcbiAgICAgICAgICAgIGluY3JlbWVudCgpO1xuICAgICAgICAgICAgcmV0dXJuIGNvbG9yQXJyYXlbMl07XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBpbmNyZW1lbnQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpbmNyZW1lbnQoKSB7XG4gICAgICAgIGlmIChjb2xvckNvdW50IDwgaW50ZXJ2YWwgKiAzKSB7XG4gICAgICAgICAgICBjb2xvckNvdW50ICs9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb2xvckFycmF5ID0gc2h1ZmZsZShjb2xvckFycmF5KTtcbiAgICAgICAgICAgIGNvbG9yQ291bnQgPSAwO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZVJhbmRvbUNpcmNsZXMoKSB7XG4gICAgdmFyIGNvdW50ID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8gMyA6IGFyZ3VtZW50c1swXTtcblxuICAgIGlmICh3aW5kb3dfZm9jdXMgPT0gdHJ1ZSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIHZhciBzY3JlZW5IZWlnaHQgPSAkKHdpbmRvdykuaGVpZ2h0KCk7XG4gICAgICAgICAgICB2YXIgc2NyZWVuV2lkdGggPSAkKHdpbmRvdykud2lkdGgoKTtcbiAgICAgICAgICAgIHZhciB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKHNjcmVlbldpZHRoIC0gMCArIDEpICsgMSk7XG4gICAgICAgICAgICB2YXIgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHNjcmVlbkhlaWdodCArIDEpICsgMTtcbiAgICAgICAgICAgIHZhciB1bmlxdWUgPSBnZW5lcmF0ZUlEKCk7XG4gICAgICAgICAgICBzdG9yZUNpcmNsZShzLmNpcmNsZSh4LCB5LCAxKS5hdHRyKHtcbiAgICAgICAgICAgICAgICBmaWxsOiBzZXF1ZW50aWFsUmFuZG9tQ29sb3IoNiksXG4gICAgICAgICAgICAgICAgaWQ6IHVuaXF1ZVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgYW5pbWF0ZUNpcmNsZSh1bmlxdWUpO1xuICAgICAgICB9XG4gICAgfVxufVxuLy9TdGFydCBnZW5lcmF0aW5nIGNpcmNsZXMgZXZlcnkgMyBzZWNvbmRzLlxudmFyIGJlZ2luID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBnZW5lcmF0ZVJhbmRvbUNpcmNsZXMoMSk7XG59LCAzMDAwKTtcbi8vS2VlcCB0cmFjayBvZiB3aGV0aGVyIHRoZSBicm93c2VyIHRhYiBvciB3aW5kb3cgaXMgaW4gZm9jdXMuIElmIG5vdCwgcGF1c2UgYW5pbWF0aW9ucyBhbmQgb3RoZXIgYmFja2dyb3VuZCBqcyBwcm9jZXNzZXMgZm9yIHBlcmZvcm1hbmNlXG4kKHdpbmRvdykuZm9jdXMoZnVuY3Rpb24gKCkge1xuICAgIHdpbmRvd19mb2N1cyA9IHRydWU7XG59KS5ibHVyKGZ1bmN0aW9uICgpIHtcbiAgICB3aW5kb3dfZm9jdXMgPSBmYWxzZTtcbn0pO1xuLy93aW5kb3cub25ibHVyKHdpbmRvdy5jbGVhckludGVydmFsKGJlZ2luKSk7XG5cbi8vT2xkIGFuaW1hdGlvbiBuZWVkIHRvIHJlY29uZmlndXJlXG4vKnN0b3JlQ2lyY2xlKChzLmNpcmNsZSgxNTAsIDE1MCwgMTAwKSkuYXR0cih7XG4gICAgZmlsbDogcmFuZG9tQ29sb3Ioe2h1ZTonYmx1ZScsIGx1bWlub3NpdHk6ICdsaWdodCcsIGNvdW50OiAxfSksXG4gICAgaWQ6IGdlbmVyYXRlSUQoKVxufSkpOyovXG4vL2FuaW1hdGVDaXJjbGUoYWxsQ2lyY2xlc1swXS5hdHRyKCdpZCcpKTtcbi8vYW5pbWF0ZUNpcmNsZSgkKCcjJythbGxDaXJjbGVzWzBdLmF0dHIoJ2lkJykpLmdldCgpKTtcbi8qY29uc3QgYmFsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYWxsJyk7XG5cbmNvbnN0IG1vdmVYID0gbW90aW9uLnRyYWNrKHtcbiAgICB2YWx1ZXM6IHtcbiAgICAgICAgeDoge30sXG4gICAgICAgIHk6e31cbiAgICB9XG59KTtcblxuY29uc3QgbW92ZUJhbGxYID0gbW92ZVgub24oYmFsbCk7XG5cbmNvbnN0IGNoYW5nZUNvbG9yID0gbW90aW9uLnR3ZWVuKHtcbiAgICBkdXJhdGlvbjogMjAwMCxcbiAgICBlYXNlOiBtb3Rpb24uZWFzaW5nLmVhc2VJbk91dCxcbiAgICB2YWx1ZXM6IHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzJmNDdmNycsXG4gICAgICAgIGhlaWdodDogc2NyZWVuSGVpZ2h0LFxuICAgICAgICB3aWR0aDogc2NyZWVuSGVpZ2h0XG4gICAgfVxufSk7XG5cbmNoYW5nZUNvbG9yLm9uKGJhbGwpLnN0YXJ0KCk7Ki8iXX0=
