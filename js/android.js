var FlipKart = {

	draw_pattern:false,
	pattern_start:'',
	pattern_end:'',
	pattern_save:false,

	init:function(){ 
		var circles = document.getElementsByClassName("circle");
		var fpel = document.getElementById("final-pattern");
		var cpel = document.getElementById("current-pattern");

		for (var i = 0; i < circles.length; i++) {
			element = circles[i];

			element.onmousedown = function(e){
				if (!e) var e = window.event;
				e.preventDefault();
				FlipKart.resetPattern();
				FlipKart.draw_pattern = true;
				FlipKart.startPattern(this);
				fpel.value = '';
			};
			element.onmouseover = function(e){
				FlipKart.startPattern(this);
			};			
			element.onmouseup = function(e){
				FlipKart.draw_pattern = false;
				if(!FlipKart.pattern_save)
					fpel.value = cpel.value;
				else
					FlipKart.checkPattern();

				cpel.value = '';
				FlipKart.stopPattern();
			};
		}

		FlipKart.userMessage("Begin to Draw a Pattern, <a target='_blank' href='http://en.wikipedia.org/wiki/KISS_principle'>KISS</a>");
		FlipKart.resetPattern();
	},

	startPattern:function(e){
		if(FlipKart.draw_pattern)
		{
			if(this.pattern_start != e.id)
			{
				var cpel = document.getElementById("current-pattern");
				e.className = "circle selected";
				cpel.value += e.id;
				this.pattern_start = e.id;
			}
		}
		return false;
	},
	stopPattern:function(e){ 
		if(!FlipKart.pattern_save)
			FlipKart.userMessage("Super !! You can now save your pattern");
	},
	resetPattern:function(e){ 
		var circles = document.getElementsByClassName("circle");
		for (var i = 0; i < circles.length; i++) {
			circles[i].className = "circle";	
		}
		FlipKart.draw_pattern = false;
	},
	savePattern:function(e){ 
		var fpel = document.getElementById("final-pattern");
		var spel = document.getElementById("saved-pattern");

		spel.value = fpel.value;
		fpel.value='';
		FlipKart.pattern_save = true;

		FlipKart.userMessage("Now try and draw the same pattern, Best of Luck !!");

		FlipKart.resetPattern();
	},
	unsavePattern:function(e){ 
		document.getElementById("saved-pattern").value = '';
		document.getElementById("final-pattern").value = '';
		FlipKart.init();
		this.draw_pattern = false;
		FlipKart.pattern_start = '';
		FlipKart.pattern_save = false;
	},
	checkPattern:function(e){
		if(FlipKart.pattern_save)
		{
			if(document.getElementById("saved-pattern").value == document.getElementById("current-pattern").value)
			{
				FlipKart.userMessage("Bingo, Pattern Matched !!");
			}
			else
			{
				FlipKart.userMessage("Opps, you got to try again, I told you to Keep it simple.");
			}
		}
	},
	userMessage:function(message){
		document.getElementById("answer").innerHTML = message;
	}

}
function addEventHandler(elem,eventType,handler) {
	if (elem.addEventListener)
		elem.addEventListener (eventType,handler,false);
	else if (elem.attachEvent)
		elem.attachEvent ('on'+eventType,handler); 
}

addEventHandler(window, "load",FlipKart.init()) ;