$("document").ready(function(){
    var bubbleCursor = $("#bubble-cursor");
    $(".bubble").on('mouseenter',function(evt){
	bubbleCursor.css("opacity","1");
	var offset = $(this).offset();
	offset.top += $(this).height();
	offset.left -= bubbleCursor.width()*1.75;
	bubbleCursor.offset(offset);
	var title = $(this).attr("title");
	bubbleCursor.find("#bubble-cursor-content h3").html(title);	
    });
    $(".bubble").on('mouseleave',function(evt){
	bubbleCursor.css("opacity","0");
    });
    $(".bubble").on('click',function(evt){
	$("#details").css("display","block");
	var image = $(this).find("pic").html();
	console.log(image);
	var description = $(this).find("description").html();
	var title = $(this).attr("title");
	$("#lab-image").attr("src",image);
	$("#details h3").html(title);
	$("#details #lab-description").html(description);	
    });
});
