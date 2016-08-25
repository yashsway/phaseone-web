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
    //Set growth and destruction animations
    // TweenLite.to($('#' + obj.attr('id')),10,{
    //   scale: 300,
    //   ease:Quad.easeInOut,
    //   onComplete: function(tween,obj){
    //     TweenLite.to(tween.target,5,{
    //       opacity: 0,
    //       ease:Quad.easeInOut,
    //       transformOrigin: '50% 50%',
    //       onComplete: function(){
    //         //Remove SVG circle from DOM
    //         $('#' + obj.attr('id'))[0].remove();
    //         //Remove SVG circle from storage
    //         allCircles.splice(allCircles.indexOf(obj),1);
    //       }
    //     });
    //   },
    //   onCompleteParams:["{self}",obj]
    // });
    obj.animate({
        //scale
        r: 800
    }, 20000, mina.easeInOut, function () {
        //Fade to 0 opacity after scale is complete
        this.animate({
            opacity: 0
        }, 10000, mina.easeInOut, function () {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9sYW5kaW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbi8vRmxvd3R5cGVcbiQoJ2JvZHknKS5mbG93dHlwZSh7XG4gICAgbWluaW11bTogNTAwLFxuICAgIG1heGltdW06IDEyMDAsXG4gICAgbWluRm9udDogOCxcbiAgICBtYXhGb250OiAxOCxcbiAgICBmb250UmF0aW86IDUwXG59KTtcbi8vVXN1YWxseSBjYXBzIGFyb3VuZCB0d2ljZSB0aGUgaW50ZXJ2YWxcbnZhciBhbGxDaXJjbGVzID0gW107XG52YXIgY2lyY2xlQ291bnQgPSAwO1xudmFyIGNvbG9yQXJyYXkgPSBbXTtcbnZhciBjb2xvckNvdW50ID0gMDtcbnZhciBnZW5lcmF0ZWRDb2xvcnMgPSByYW5kb21Db2xvcih7IGx1bWlub3NpdHk6ICdsaWdodCcsIGNvdW50OiAxMCB9KTtcbnZhciBjb2xvckFycmF5ID0gY29sb3JBcnJheS5jb25jYXQoZ2VuZXJhdGVkQ29sb3JzKTtcbmNvbG9yQXJyYXkgPSBzaHVmZmxlKGNvbG9yQXJyYXkpO1xudmFyIHMgPSBTbmFwKFwiI2NpcmNsZUxvYWRlclwiKTtcbnZhciB3aW5kb3dfZm9jdXMgPSB0cnVlO1xuXG4vL1NpbXBsZSBJRCBnZW4gYXBwZW5kcyBhbiBpbmMgY291bnQgb24gZXZlcnkgY2FsbFxuZnVuY3Rpb24gZ2VuZXJhdGVJRCgpIHtcbiAgICBjaXJjbGVDb3VudCArPSAxO1xuICAgIHJldHVybiAnY2lyY2xlJyArIGNpcmNsZUNvdW50O1xufVxuLy9VdGlsaXR5IGZ1bmN0aW9uIHRvIHByaW50IHRoZSBJRCdzIG9mIGFsbCBTVkcgY2lyY2xlcyBpbiBzdG9yYWdlXG5mdW5jdGlvbiBwcmludENpcmNsZUlkcygpIHtcbiAgICB2YXIgbGlzdCA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWxsQ2lyY2xlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsaXN0LnB1c2goYWxsQ2lyY2xlc1tpXS5hdHRyKCdpZCcpKTtcbiAgICB9XG4gICAgcmV0dXJuIGxpc3QudG9TdHJpbmcoKTtcbn1cbi8vRmluZCBhbmQgZGVzdHJveVxuZnVuY3Rpb24gY2xlYW4oc3ZnSUQpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFsbENpcmNsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy9UZW1wb3JhcmlseSBzdG9yZSB0aGUgY3VycmVudCBTVkcgc2VsZWN0ZWRcbiAgICAgICAgdmFyIHZhbCA9IGFsbENpcmNsZXNbaV07XG4gICAgICAgIC8vSWYgdGhlIGlkIG9mIHRoZSBTVkcgaXMgbm90IHVuZGVmaW5lZFxuICAgICAgICBpZiAoX3R5cGVvZihhbGxDaXJjbGVzW2ldLmF0dHIoJ2lkJykpICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKGFsbENpcmNsZXNbaV0uYXR0cignaWQnKSA9PSBzdmdJRCkge1xuICAgICAgICAgICAgICAgIC8vUmVtb3ZlIFNWRyBmcm9tIERPTVxuICAgICAgICAgICAgICAgICQoJyMnICsgdmFsLmF0dHIoJ2lkJykpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIC8vUmVtb3ZlIFNWRyBmcm9tIGFycmF5XG4gICAgICAgICAgICAgICAgYWxsQ2lyY2xlcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4vL0JpbmRzIGFuaW1hdGlvbiB0byBTVkcgY2lyY2xlIG9mIGEgY2VydGFpbiBJRFxuZnVuY3Rpb24gYW5pbWF0ZUNpcmNsZShvYmosIHN2Z0lEKSB7XG4gICAgLy9TZXQgZ3Jvd3RoIGFuZCBkZXN0cnVjdGlvbiBhbmltYXRpb25zXG4gICAgLy8gVHdlZW5MaXRlLnRvKCQoJyMnICsgb2JqLmF0dHIoJ2lkJykpLDEwLHtcbiAgICAvLyAgIHNjYWxlOiAzMDAsXG4gICAgLy8gICBlYXNlOlF1YWQuZWFzZUluT3V0LFxuICAgIC8vICAgb25Db21wbGV0ZTogZnVuY3Rpb24odHdlZW4sb2JqKXtcbiAgICAvLyAgICAgVHdlZW5MaXRlLnRvKHR3ZWVuLnRhcmdldCw1LHtcbiAgICAvLyAgICAgICBvcGFjaXR5OiAwLFxuICAgIC8vICAgICAgIGVhc2U6UXVhZC5lYXNlSW5PdXQsXG4gICAgLy8gICAgICAgdHJhbnNmb3JtT3JpZ2luOiAnNTAlIDUwJScsXG4gICAgLy8gICAgICAgb25Db21wbGV0ZTogZnVuY3Rpb24oKXtcbiAgICAvLyAgICAgICAgIC8vUmVtb3ZlIFNWRyBjaXJjbGUgZnJvbSBET01cbiAgICAvLyAgICAgICAgICQoJyMnICsgb2JqLmF0dHIoJ2lkJykpWzBdLnJlbW92ZSgpO1xuICAgIC8vICAgICAgICAgLy9SZW1vdmUgU1ZHIGNpcmNsZSBmcm9tIHN0b3JhZ2VcbiAgICAvLyAgICAgICAgIGFsbENpcmNsZXMuc3BsaWNlKGFsbENpcmNsZXMuaW5kZXhPZihvYmopLDEpO1xuICAgIC8vICAgICAgIH1cbiAgICAvLyAgICAgfSk7XG4gICAgLy8gICB9LFxuICAgIC8vICAgb25Db21wbGV0ZVBhcmFtczpbXCJ7c2VsZn1cIixvYmpdXG4gICAgLy8gfSk7XG4gICAgb2JqLmFuaW1hdGUoe1xuICAgICAgICAvL3NjYWxlXG4gICAgICAgIHI6IDgwMFxuICAgIH0sIDIwMDAwLCBtaW5hLmVhc2VJbk91dCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAvL0ZhZGUgdG8gMCBvcGFjaXR5IGFmdGVyIHNjYWxlIGlzIGNvbXBsZXRlXG4gICAgICAgIHRoaXMuYW5pbWF0ZSh7XG4gICAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgIH0sIDEwMDAwLCBtaW5hLmVhc2VJbk91dCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy9SZW1vdmUgU1ZHIGNpcmNsZSBmcm9tIERPTVxuICAgICAgICAgICAgJCgnIycgKyB0aGlzLmF0dHIoJ2lkJykpWzBdLnJlbW92ZSgpO1xuICAgICAgICAgICAgLy9SZW1vdmUgU1ZHIGNpcmNsZSBmcm9tIHN0b3JhZ2VcbiAgICAgICAgICAgIGFsbENpcmNsZXMuc3BsaWNlKGFsbENpcmNsZXMuaW5kZXhPZih0aGlzKSwgMSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuLy9TdG9yZSBTVkcgb2JqZWN0IGFuZCBiaW5kIGFuaW1hdGlvblxuZnVuY3Rpb24gc3RvcmVDaXJjbGUob2JqLCBzdmdJRCkge1xuICAgIGFsbENpcmNsZXMucHVzaChvYmopO1xuICAgIGFuaW1hdGVDaXJjbGUob2JqLCBzdmdJRCk7XG59XG4vL0FycmF5IFNodWZmbGVyIGJhc2VkIG9uIEtudXRoIGFsZ29yaXRobVxuZnVuY3Rpb24gc2h1ZmZsZShhcnJheSkge1xuICAgIHZhciBjdXJyZW50SW5kZXggPSBhcnJheS5sZW5ndGgsXG4gICAgICAgIHRlbXBvcmFyeVZhbHVlLFxuICAgICAgICByYW5kb21JbmRleDtcblxuICAgIC8vIFdoaWxlIHRoZXJlIHJlbWFpbiBlbGVtZW50cyB0byBzaHVmZmxlLi4uXG4gICAgd2hpbGUgKDAgIT09IGN1cnJlbnRJbmRleCkge1xuXG4gICAgICAgIC8vIFBpY2sgYSByZW1haW5pbmcgZWxlbWVudC4uLlxuICAgICAgICByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGN1cnJlbnRJbmRleCk7XG4gICAgICAgIGN1cnJlbnRJbmRleCAtPSAxO1xuXG4gICAgICAgIC8vIEFuZCBzd2FwIGl0IHdpdGggdGhlIGN1cnJlbnQgZWxlbWVudC5cbiAgICAgICAgdGVtcG9yYXJ5VmFsdWUgPSBhcnJheVtjdXJyZW50SW5kZXhdO1xuICAgICAgICBhcnJheVtjdXJyZW50SW5kZXhdID0gYXJyYXlbcmFuZG9tSW5kZXhdO1xuICAgICAgICBhcnJheVtyYW5kb21JbmRleF0gPSB0ZW1wb3JhcnlWYWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyYXk7XG59XG4vL1JhbmRvbSBjb2xvciBzZXF1ZW5jZVxuZnVuY3Rpb24gc2VxdWVudGlhbFJhbmRvbUNvbG9yKCkge1xuICAgIHZhciBpbnRlcnZhbCA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IDcgOiBhcmd1bWVudHNbMF07XG5cbiAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgICAgY2FzZSBjb2xvckNvdW50IDw9IGludGVydmFsOlxuICAgICAgICAgICAgY29sb3JDb3VudCArPSAxO1xuICAgICAgICAgICAgcmV0dXJuIGNvbG9yQXJyYXlbMF07XG4gICAgICAgIGNhc2UgY29sb3JDb3VudCA8PSBpbnRlcnZhbCAqIDI6XG4gICAgICAgICAgICBjb2xvckNvdW50ICs9IDE7XG4gICAgICAgICAgICByZXR1cm4gY29sb3JBcnJheVsxXTtcbiAgICAgICAgY2FzZSBjb2xvckNvdW50IDw9IGludGVydmFsICogMzpcbiAgICAgICAgICAgIGNvbG9yQ291bnQgKz0gMTtcbiAgICAgICAgICAgIGlmIChjb2xvckNvdW50ID4gaW50ZXJ2YWwgKiAzKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRlbXAgPSBjb2xvckFycmF5WzJdO1xuICAgICAgICAgICAgICAgIC8vU2h1ZmZsZSBjb2xvcnMgd2hlbiBtYXggKGludGVydmFsKjMpIGlzIHJlYWNoZWRcbiAgICAgICAgICAgICAgICBjb2xvckFycmF5ID0gc2h1ZmZsZShjb2xvckFycmF5KTtcbiAgICAgICAgICAgICAgICAvL1Jlc3RhcnRcbiAgICAgICAgICAgICAgICBjb2xvckNvdW50ID0gMDtcbiAgICAgICAgICAgICAgICAvL1JldHVybiBjb2xvciBzdG9yZWQgZnJvbSBlYXJsaWVyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRlbXA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY29sb3JBcnJheVsyXTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiAnIzAwMCc7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG4gICAgZnVuY3Rpb24gaW5jcmVtZW50KCkge1xuICAgICAgICBpZiAoY29sb3JDb3VudCA8IGludGVydmFsICogMykge1xuICAgICAgICAgICAgY29sb3JDb3VudCArPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy9TaHVmZmxlIGNvbG9ycyB3aGVuIG1heCAoaW50ZXJ2YWwqMykgaXMgcmVhY2hlZFxuICAgICAgICAgICAgY29sb3JBcnJheSA9IHNodWZmbGUoY29sb3JBcnJheSk7XG4gICAgICAgICAgICAvL1Jlc3RhcnRcbiAgICAgICAgICAgIGNvbG9yQ291bnQgPSAwO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZVJhbmRvbUNpcmNsZXMoKSB7XG4gICAgdmFyIGNvdW50ID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8gMyA6IGFyZ3VtZW50c1swXTtcblxuICAgIGlmICh3aW5kb3dfZm9jdXMgPT0gdHJ1ZSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIC8vRXh0cmFjdCB2aWV3cG9ydCBkaW1lbnNpb25zXG4gICAgICAgICAgICB2YXIgc2NyZWVuSGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpO1xuICAgICAgICAgICAgdmFyIHNjcmVlbldpZHRoID0gJCh3aW5kb3cpLndpZHRoKCk7XG4gICAgICAgICAgICAvL0Fzc2lnbiByYW5kb20gbG9jYXRpb25cbiAgICAgICAgICAgIHZhciB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKHNjcmVlbldpZHRoIC0gMCArIDEpICsgMSk7XG4gICAgICAgICAgICB2YXIgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHNjcmVlbkhlaWdodCArIDEpICsgMTtcbiAgICAgICAgICAgIC8vR2VuZXJhdGUgdW5pcXVlIElEIGZvciBldmVyeSBjaXJjbGVcbiAgICAgICAgICAgIHZhciB1bmlxdWUgPSBnZW5lcmF0ZUlEKCk7XG4gICAgICAgICAgICBzdG9yZUNpcmNsZShzLmNpcmNsZSh4LCB5LCAxKS5hdHRyKHtcbiAgICAgICAgICAgICAgICBmaWxsOiBzZXF1ZW50aWFsUmFuZG9tQ29sb3IoNiksXG4gICAgICAgICAgICAgICAgaWQ6IHVuaXF1ZVxuICAgICAgICAgICAgfSksIHVuaXF1ZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vL1N0YXJ0IGdlbmVyYXRpbmcgY2lyY2xlcyBldmVyeSAzIHNlY29uZHMuXG52YXIgYmVnaW4gPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGdlbmVyYXRlUmFuZG9tQ2lyY2xlcygxKTtcbn0sIDMwMDApO1xuLy9LZWVwIHRyYWNrIG9mIHdoZXRoZXIgdGhlIGJyb3dzZXIgdGFiIG9yIHdpbmRvdyBpcyBpbiBmb2N1cy4gSWYgbm90LCBwYXVzZSBhbmltYXRpb25zIGFuZCBvdGhlciBiYWNrZ3JvdW5kIGpzIHByb2Nlc3NlcyBmb3IgcGVyZm9ybWFuY2VcbiQod2luZG93KS5mb2N1cyhmdW5jdGlvbiAoKSB7XG4gICAgd2luZG93X2ZvY3VzID0gdHJ1ZTtcbn0pLmJsdXIoZnVuY3Rpb24gKCkge1xuICAgIHdpbmRvd19mb2N1cyA9IGZhbHNlO1xufSk7Il19
