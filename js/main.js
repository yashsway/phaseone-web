$("document").ready(function(){
    var navTopDelta = $("#about").offset().top+1;
    $(window).scroll(function(){
        var currentScroll = $(window).scrollTop();
        if(currentScroll >= navTopDelta){
            $("nav").css({
                position: 'fixed',
                top: '0',
                left: '0',
                boxShadow:'0 2px 2px gray'
            });
        }else{
            $("nav").css({
                position: 'absolute',
                boxShadow:'none'
            });
        }
    });
    $("section").css({paddingTop:$("nav").height()+40});    
});
