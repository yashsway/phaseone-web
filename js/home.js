//Keep track of whether the browser tab or window is in focus. If not, pause animations and other background js processes for performance
$(window).focus(function() {
	window_focus = true;
}).blur(function() {
	window_focus = false;
});
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
});*/
$(function(){
	'use strict';
	var $page = $('#main'),
	options = {
		debug: true,
		prefetch: true,
		cacheLength: 4,
		onStart: {
          duration: 350, // Duration of our animation
          render: function ($container) {
            // Add your CSS animation reversing class
            $container.addClass('is-exiting');
            // Restart your animation
            smoothState.restartCSSAnimations();
        }
    },
    onReady: {
    	duration: 0,
    	render: function ($container, $newContent) {
            // Remove your CSS animation reversing class
            $container.removeClass('is-exiting');
            // Inject the new content
            $container.html($newContent);
        }
    }
},
smoothState = $page.smoothState(options).data('smoothState');
});
