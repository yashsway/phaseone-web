//Usually caps around twice the interval
var allCircles = [];
var circleCount = 0;
var colorArray = ['#202426', '#BCD0DB', '#FFED93','#919DA2'];
var colorCount = 0;
colorArray = shuffle(colorArray);

var s = Snap("#svg");

//Growth Tween
const grow = motion.tween({
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
                allCircles.splice(i,1);
            });
        }
    });
}

function animateCircle(svgID) {
    //Set destruction & bind animation
    grow.set({
        onComplete: function (state) {
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
        temporaryValue, randomIndex;

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
function sequentialRandomColor(interval=7) {
    switch (true) {
    case (colorCount <= interval):
        increment();
        return colorArray[0];
    case (colorCount <= interval*2):
        increment();
        return colorArray[1];
    case (colorCount <= interval*3):
        increment();
        return colorArray[2];
    default:
        increment();
        break;
    }
    function increment() {
        if (colorCount < interval*3) {
            colorCount += 1;
        } else {
            colorCount = 0;
        }
    }
}

function generateRandomCircles(count = 3) {
    for (let i = 0; i < count; i++) {
        var screenHeight = $(window).height();
        var screenWidth = $(window).width();
        let x = Math.floor(Math.random() * ((screenWidth - 0) + 1) + (1));
        let y = Math.floor((Math.random() * screenHeight) + 1) + 1;
        let unique = generateID();
        storeCircle(
            (s.circle(x, y, 1)).attr({
                fill: sequentialRandomColor(6),
                id: unique
            })
        );
        animateCircle(unique);
    }
}
var begin = setInterval(() => generateRandomCircles(1), 3000);
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
