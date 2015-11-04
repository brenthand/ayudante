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
function add_alt() {
	$("img").each(function(i, e) {
  	if(! $(this).attr("alt") >= 1) { // At does not exist
			
    	$( this ).attr('alt', $(this).attr('src'));
    	//$( this ).attr('aria-hidden', true);
		}	 
});
}

function set_up() {
	
	//document.getElementsByName("body")[0].setAttribute("id", "ayudante");
	$('body').wrapInner('<div id="ayudante" />');
	//Add link to css file to allow only adding one link to html page
	var style = document.createElement('link');
	style.rel = 'stylesheet';
	
	//THIS IS FOR TESTING ONLY NEED TO ***************************************
	//PUBLISH JS ONCE DONE the '../../' WILL NO LNGER BE NEEDED **************
	style.href = '../../../ayudante.css';
	
	document.getElementsByTagName('head')[0].appendChild(style);
	
	var menu = document.createElement('div');
	menu.class = 'ayudante-menu';
	menu.id = "ayu";
	var e = document.getElementsByTagName('body')[0];
	e.insertBefore(menu, e.firstChild);
	//document.getElementsByTagName('body')[0].appendChild(menu);
	
	
	
	var menu_html = '<a id="high-contrast-link" href="#" class="high-contrast-icon" data-style="high-contrast" >High Contrast</a> ' +
		'<a id="normal-contrast-link" href="#" class="normal-contrast-icon" data-style="normal-contrast" >Normal Contrast</a> ' +
		'<a id="low-contrast-link" href="#" class="low-contrast-icon" data-style="low-contrast" >Low Contrast</a> ' +
		'<a id="small-font-link" href="#" class="small-font-icon" data-style="small-font" >Small font </a> ' +
		'<a id="normal-font-link" href="#" class="normal-font-icon" data-style="normal-font" >Normal Font</a> ' +
		'<a id="large-font-link" href="#" class="large-font-icon" data-style="large-font" >Large Font</a> ';
		
	document.getElementById("ayu").innerHTML = menu_html;
   
	var x = getCookie("ayudante-contrast");
	
	if (x == "high-contrast") { 
		var c = document.getElementById("ayudante");
		addContrastClass(c, "high-contrast");
	} else if ( x == "low-contrast") {
		var c = document.getElementById("ayudante");
		addContrastClass(c, "low-contrast");
	}
	
	
	var y = getCookie("ayudante-font"); 
	
	if (y == "small-font") { 
		var c = document.getElementById("ayudante");
		addFontClass(c, "small-font");
	} else if ( y == "large-font") {
		var c = document.getElementById("ayudante");
		addFontClass(c, "large-font");
	}
	
	//checkCookie();
	
	document.getElementById("high-contrast-link").addEventListener("click", function() {
		var val = document.getElementById("high-contrast-link").getAttribute("data-style");
		var change = document.getElementById("ayudante");
		addContrastClass(change, val);	
	}, false);
	
	document.getElementById("normal-contrast-link").addEventListener("click", function() {
		var val = document.getElementById("normal-contrast-link").getAttribute("data-style");
		var change = document.getElementById("ayudante");
		remContrastClass(change, "high-contrast");	
	}, false);
	
	document.getElementById("low-contrast-link").addEventListener("click", function() {
		var val = document.getElementById("low-contrast-link").getAttribute("data-style");
		var change = document.getElementById("ayudante");
		addContrastClass(change, val);	
	}, false);
	
	document.getElementById("small-font-link").addEventListener("click", function() {
		var val = document.getElementById("small-font-link").getAttribute("data-style");
		var change = document.getElementById("ayudante");
		addFontClass(change, val);	
	}, false);
	
	document.getElementById("normal-font-link").addEventListener("click", function() {
		var val = document.getElementById("normal-font-link").getAttribute("data-style");
		var change = document.getElementById("ayudante");
		remFontClass(change, "high-contrast");	
	}, false);
	
	document.getElementById("large-font-link").addEventListener("click", function() {
		var val = document.getElementById("large-font-link").getAttribute("data-style");
		var change = document.getElementById("ayudante");
		addFontClass(change, val);	
	}, false);
	
	
	
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
	try {
		document.getElementsByTagName('h1')[0].setAttribute("id", "ayu-main-content");
	}
	catch(err) {
		try { 
			document.getElementsByTagName('h2')[0].setAttribute("id", "ayu-main-content");
		}
		catch(err2) {
			document.getElementsByTagName('body')[0];
		}
	}
		
	
	//add skip to main content link
	var skip = document.createElement('div');
	skip.id = "ayu-skip-to";
	var e = document.getElementsByTagName('body')[0];
	e.insertBefore(skip, e.firstChild);
	// need to add style or class for style !!!!!!!!!!!!!!!!!!!!!
	document.getElementById("ayu-skip-to").innerHTML = "<a id='ayu-skip-to-link' href='#ayu-main-content'> Skip to main content</a>";
	
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
	var css = '#ayu-skip-to-link {position:absolute;left:-1000px;top:-1000px;width:1px;height:1px;text-align: left;overflow:hidden;} #ayu-skip-to-link:focus, #ayu-skip-to-link:active, #ayu-skip-to-link:hover {position:absolute;left:0;top:0;width:auto;height:auto;overflow:visible;background-color:#FF3;color:black;border: 1px dotted #000;z-index: 100000;} ',
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


function remove_all_onclick() {
	var x = get_all();
	for (var i = 0; i < x.length; i++) {
		has_onclick_remove(x[i]);
	}  

}

function add_styles() {

	var style = "#ayudante.small-font { "+
			"font-size: .75em !important;"+
			"}"+
			"#ayudante.normal-font {"+
			"	font-size: 1.5em !important;"+
			"}"+
			"#ayudante.large-font {"+
			"	font-size: 2em !important;"+
			"}"+
			"#ayudante.extra-large-font {"+
			"	font-size: 3em !important;"+
			"}"+
			"#ayudante.high-contrast {"+
			"	color: #ffff33 !important;"+
			"	background-color: #000000 !important;"+
			"}"+
			"#ayudante.high-contrast p{"+
			"	color: white !important;"+
			"	background-color: #000000 !important;"+
			"}"+
			"#ayudante.low-contrast {"+
			"	color: #003c87 !important;"+
			"	background-color: #aeebff !important;" +
			"}";
			
	head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

	style.type = 'text/css';
	if (style.styleSheet){
	  style.styleSheet.cssText = style;
	} else {
	  style.appendChild(document.createTextNode(style));
	}

	head.appendChild(style);
	
}


/*
		Function to add class to element
		
		@params element = the element that the class is being added to 
				c = the class name that is being added
	
	*/
	function addContrastClass(element, c) {
		
		var classToAdd = c;
		//alert("ayudante-contrast=" + c + ";");
		try {
			var currentClassValue = element.className;
			remContrastClass(element, c);
			element.className += " " + classToAdd;
		}
		catch(err) {
			element.addClass(classToAdd);
		}
		
		
		setCookie("ayudante-contrast", c, 1);
		
		  
		//if (currentClassValue.indexOf(classToAdd) == -1) {
		//	if ((currentClassValue == null) || (currentClassValue === "")) {
		//		element.className = classToAdd;
		//	} else {
		//		element.className += " " + classToAdd;
		//	}
		//}
		
		//setCookie("ayudante-contrast", c, 1);
	}
	
	function addFontClass(element, c) {
		
		var classToAdd = c;
		//alert("ayudante-contrast=" + c + ";");
		try {
			var currentClassValue = element.className;
			remFontClass(element, c);
			element.className += " " + classToAdd;
		}
		catch(err) {
			element.addClass(classToAdd);
		}
		
		
		setCookie("ayudante-font", c, 1);
		
		
		//var currentClassValue = element.className;
		//var classToAdd = c;
		
		//remFontClass(element, c);
		  
		//if (currentClassValue.indexOf(classToAdd) == -1) {
		//	if ((currentClassValue == null) || (currentClassValue === "")) {
		//		element.className = classToAdd;
		//	} else {
		//		element.className += " " + classToAdd;
		//	}
		//}
		
		//setCookie("ayudante-font", c, 1);
	}
	
	
	/*
		Function to remove a class from a specified element
		
		@params element = the element that the class is being added to 
				c = the class name that is being added
	
	*/
	function remContrastClass(element, c) {		
		delCookie("ayudante-contrast");
		
		document.getElementById("ayudante").className =
		document.getElementById("ayudante").className.replace(/\bhigh-contrast\b/,'');
		
		document.getElementById("ayudante").className =
		document.getElementById("ayudante").className.replace(/\blow-contrast\b/,'');
		
	}
	
	/*
		Function to remove a class from a specified element
		
		@params element = the element that the class is being added to 
				c = the class name that is being added
	
	*/
	function remFontClass(element, c) {
		delCookie("ayudante-font");
		//document.cookie="ayudante-font=";
		document.getElementById("ayudante").className =
		document.getElementById("ayudante").className.replace(/\blarge-font\b/,'');
		
		document.getElementById("ayudante").className =
		document.getElementById("ayudante").className.replace(/\bsmall-font\b/,'');
		
	}
	
	//Cookies need to be added to keep selection across pages
	//Cookie handlers
	
	/*
		Function sets cookie value
		
		@params name = the name of the cookie	
				v = the value of the cookie
				t the time in days that the cookie should stay live
		
	*/
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
	
	
	/*
		function to set focus of item and scroll item into view
		
		e.x.
			<link onclick="setFocus(this.id)" />;
			
		@params id = the id of the element that is being focused
	*/
function setFocus(id) {
		var x = document.getElementById(id);
		x.focus();
		x.scrollIntoView();
}



//Test function when moved to production this function will run all operations on DOM

$(document).ready(function () {

add_style_for_skip_link();
find_main_content();
set_up(); 
add_alt();
  
remove_all_onclick();

replace_br();

document.getElementsByTagName('body')[0].setAttribute("id", "ayudante");

  
  
});
	
