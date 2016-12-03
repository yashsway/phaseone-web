"use strict";

//Keep track of whether the browser tab or window is in focus. If not, pause animations and other background js processes for performance
$(window).focus(function () {
    window_focus = true;
}).blur(function () {
    window_focus = false;
});
function bind() {
    $("#talkToUs").on('click', function () {
        $(".contact-bar").css({ top: '200px' });
        $(".contact-bar").removeClass('contact-bar-hidden');
        $(".contact-bar").addClass('contact-bar-shown');
    });
    $(".contact-bar .close").on('click', function () {
        $(".contact-bar").removeClass('contact-bar-shown');
        $(".contact-bar").addClass('contact-bar-hidden');
    });
}
bind();
/*$("#talkToUs").on('click',function(){
    console.log("cool");
    $("#contact-bar").css('visibility','visible');
    $("#contact-bar").css('top','0px');
    $("#contact-bar").slideDown(3);
});*/
/*$('body').flowtype({
 minimum   : 0,
 maximum   : 1200,
 minFont   : 8,
 maxFont   : 18,
 fontRatio : 40
});*/
//Toggle current for clicked menu links
/*$(function (){
    [].slice.call(document.querySelectorAll('.menu')).forEach(function(menu) {
        var menuItems = menu.querySelectorAll('.menu__link'),
        setCurrent = function(ev) {
            ev.preventDefault();

                        var item = ev.target.parentNode; // li

                        // return if already current
                        if ($(item).hasClass('menu__item--current')) {
                            return false;
                        }
                        // remove current
                        $('.menu__item--current').removeClass('menu__item--current');
                        // set current
                        $(item).addClass('menu__item--current')
                    };

                    [].slice.call(menuItems).forEach(function(el) {
                        el.addEventListener('click', setCurrent);
                    });
                });
});
$("#work").on('click',function(){
    $(".page").load("work.html");
});*/
$(function () {
    'use strict';

    var $page = $('#main'),
        options = {
        debug: true,
        prefetch: true,
        cacheLength: 5,
        onStart: {
            duration: 350, // Duration of our animation
            render: function render($container) {
                // Add your CSS animation reversing class
                $container.addClass('is-exiting');
                // Restart your animation
                smoothState.restartCSSAnimations();
            }
        },
        onReady: {
            duration: 0,
            render: function render($container, $newContent) {
                // Remove your CSS animation reversing class
                $container.removeClass('is-exiting');
                // Inject the new content
                $container.html($newContent);
                bind();
            }
        }
    },
        smoothState = $page.smoothState(options).data('smoothState');
});