var allCircles = [];
var count = 0;

var s = Snap("#svg");

//Growth Tween
const grow = motion.tween({
    blend: true,
    duration: 30000,
    ease: motion.easing.easeInOut,
    values: {
        scale: 500
    }
});
//Simple ID gen appends an inc count on every call
function generateID(){
    count += 1;
    return 'circle'+count;
}
function clean(svgID){
    $.map(allCircles, function(val,i){
        if(val.attr('id')==svgID){
            //Fade out and destroy
            val.animate({opacity:0},10000,mina.easeInOut,function(){
                $('#'+val.attr('id'))[0].remove();
            });
        }
    });
}
function animateCircle(svgID){
    //Set destruction & bind animation
    grow.set({
        onComplete: function(state){
            clean(svgID);
        }
    }).on($('#'+svgID)[0]).start();
}
function storeCircle(obj){
    allCircles.push(obj);
}
function removeCircle(obj){
    obj.remove();
}
function randomColor(){
  let choice = Math.floor((Math.random() * 3)+1);
  switch(choice){
    case 1:
      return '#DBDEE0';
    case 2:
      return '#BCD0DB';
    case 3:
      return '#FFED93';
  }
}
function generateRandomCircles(count = 3){
    for(let i=0;i<count;i++){
        var screenHeight = $(window).height();
        var screenWidth = $(window).width();
        console.log(screenWidth);
        let x = Math.floor(Math.random() * ((screenWidth-0)+1) + (1));
        let y = Math.floor((Math.random() * screenHeight) + 1)+1;
        let unique = generateID();
        storeCircle(
            (s.circle(x,y,1)).attr({
                fill: randomColor(),
                id: unique
            })
        );
        animateCircle(unique);
    }
}
var begin = setInterval(()=>generateRandomCircles(1),1000);
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
