//Keep track of whether the browser tab or window is in focus. If not, pause animations and other background js processes for performance
$(window).focus(function() {
    window_focus = true;
}).blur(function() {
    window_focus = false;
});