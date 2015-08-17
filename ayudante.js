/*########################################################################################
		                    _______                                                         
                            \  ___ `'.                _..._                  __.....__      
        .-.          .-      ' |--.\  \             .'     '.            .-''         '.    
         \ \        / /      | |    \  '           .   .-.   .     .|   /     .-''"'-.  `.  
    __    \ \      / /       | |     |  '    __    |  '   '  |   .' |_ /     /________\   \ 
 .:--.'.   \ \    / /_    _  | |     |  | .:--.'.  |  |   |  | .'     ||                  | 
/ |   \ |   \ \  / /| '  / | | |     ' .'/ |   \ | |  |   |  |'--.  .-'\    .-------------' 
`" __ | |    \ `  /.' | .' | | |___.' /' `" __ | | |  |   |  |   |  |   \    '-.____...---. 
 .'.''| |     \  / /  | /  |/_______.'/   .'.''| | |  |   |  |   |  |    `.             .'  
/ /   | |_    / / |   `'.  |\_______|/   / /   | |_|  |   |  |   |  '.'    `''-...... -'    
\ \._,\ '/|`-' /  '   .'|  '/            \ \._,\ '/|  |   |  |   |   /                      
 `--'  `"  '..'    `-'  `--'              `--'  `" '--'   '--'   `'-'                       
########################################################################################*/
	
// acc. plugin that changes dom of web page and allows it be be enabled for screen readers
//jquery must be included for this script to work


/*
  function that grabs all images and checks for description or alt text if none set 
  to aria hidden = true and change alt to file name.
*/
function get_all_img() {
	$("img").each(function(i, e) {
  	if(! $(this).attr("alt") >= 1) { // At does not exist
			
    	$( this ).attr('alt', $(this).attr('src'));
    	//$( this ).attr('aria-hidden', true);
		}	 
});
}




/*
	Function is SLOW. it parses whole DOM to find an element with a matching attribute.
	AVOID USING

*/
function get_by_attr(a) {
  var matchingElements = [];
  var allElements = get_all();
  for (var i = 0, n = allElements.length; i < n; i++)
  {
    if (allElements[i].getAttribute(a) !== null)
    {
      matchingElements.push(allElements[i]);
    }
  }
  return matchingElements;
}


/*
functions returns an array of all tags in DOM

Function is SLOW. it parses whole DOM to find an element with a matching attribute.
	AVOID USING
*/
function get_all() {
	return document.getElementsByTagName('*');
}


/*
if element has onclick funcion remove it and add a JS listener to replace
 
*/
function has_onclick_remove(e) {
	if (e.getAttribute("onClick") != null) {
		var x = e.getAttribute("onClick");
		e.removeAttribute("onClick");
		var rand_id = Math.floor((Math.random() * 100000) + 1);
		$(e).attr("ayu-id", rand_id);
		$( "body" ).append("<script>  $( \"[ayu-id='" + rand_id + "']\" ).click(function() {" + x + ";});");
	}
}


/*
	find first h1 and add attribute main-content="true"

*/
function find_main_content() {
	//set attribute on first h1 for main content
	// !!!!!!!!!!!!!!!!!!!! need to add error handling on code below
	var x = document.getElementsByTagName('h1')[0].setAttribute("id", "ayu-main-content");
	
	//add skip to main content link
	var skip = document.createElement('div');
	skip.id = "ayu-skip-to";
	var e = document.getElementsByTagName('body')[0];
	e.insertBefore(skip, e.firstChild);
	// need to add style or class for style !!!!!!!!!!!!!!!!!!!!!
	document.getElementById("ayu-skip-to").innerHTML = "<a id='ayu-skip-to-link' href='#ayu-main-content'> Skipt to main content</a>";
	
}
	
	
	
function setCookie(name, v, t) {
		var d = new Date();
		d.setTime(d.getTime() + (t*24*60*60*1000));
		var expire = "expires=" + d.toUTCString();
		document.cookie = name + "=" + v +"; " + expire;
	}
	
	
	/*
		function gets the value of the specified cookie. If cookie does not exist return empty string
		
		@params name = the name of the cookie
	
	*/
	function getCookie(name) {
		name += "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1);
			if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
		}
		
		return "";
	}
	
	
	/*
		Function to check the values of the cookies used in ayudante
		
		********** FOR TEST ONLY ********
	
	*/
	function checkCookie() {
		
		var contrast = getCookie("ayudante-contrast");
		var size = getCookie("ayudante-font");
		
		
		alert("Contrast: " + contrast + "Font: " + size  );
		
	}
	
	/*
		Function to delete a cookie by name
		
		@params name = the name of the cookie to be deleted
	
	*/
	function delCookie(name) {
		document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}


function add_style_for_skip_link() {
	var css = '#ayu-skip-to-link {position:absolute;left:-1000px;top:-1000px;width:1px;height:1px;text-align: left;overflow:hidden;} #ayu-skip-to-link:focus, #ayu-skip-to-link:active, #ayu-skip-to-link:hover {position:absolute;left:0;top:0;width:auto;height:auto;overflow:visible;background-color:#FF3;border: 1px dotted #000;} ',
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

	style.type = 'text/css';
	if (style.styleSheet){
	  style.styleSheet.cssText = css;
	} else {
	  style.appendChild(document.createTextNode(css));
	}

	head.appendChild(style);

}


function replace_br() {
	$('br').replaceWith(function(){
    	return $("<p />").append($(this).contents()).css("clear", "both");
    	
	});

}



//Test function when moved to production this function will run all operations on DOM

$(document).ready(function () {
 
add_style_for_skip_link();
find_main_content();
  
get_all_img();
  
var x = get_all();
for (var i = 0; i < x.length; i++) {
	has_onclick_remove(x[i]);
}  

replace_br();

  
  
});
	
