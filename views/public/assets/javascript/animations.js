function pageSetUp(){

}


function beeAnimation(){
    	$("#bee_logo").animate({left: "+=50"}, 50);
    	$("#bee_logo").animate({top: "+=50"}, 50);
    	$("#bee_logo").animate({right: "+=50"}, 50);
   	 $("#bee_logo").animate({bottom: "+=50"}, 50)
	}


$(document).ready(function(){

beeAnimation();


$("input").click(function(e){
	$("#bee_logo").animate({left: "+=10"}, 50);
    $("#bee_logo").animate({top: "+=10"}, 50);
    $("#bee_logo").animate({right: "+=10"}, 50);
    $("#bee_logo").animate({bottom: "+=10"}, 50);
	$('#bee_logo').animate({
    top: e.pageY,
    left: e.ScrollX,
}, 100);

})
});



/*--to get Bee to float next to form input
//on focus scrollY position input 	
set bee to scrollY position 


li input onfocus 
animate from dismissing one and enabling another */