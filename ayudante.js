
//JQuery text resizer plugin

//Better way to handle cookies onload************
window.onload =
  function() {
	  
	//Add link to css file to allow only adding one link to html page
	var style = document.createElement('link');
	style.rel = 'stylesheet';
	style.href = 'ayudante.css';
	document.getElementsByTagName('head')[0].appendChild(style);
	
	var menu = document.createElement('div');
	menu.class = 'ayudante-menu';
	menu.id = "ayu";
	var e = document.getElementsByTagName('body')[0];
	e.insertBefore(menu, e.firstChild);
	//document.getElementsByTagName('body')[0].appendChild(menu);
	
	
	
	var menu_html = '<a href="main-content">Main Content</a> ' +
		'<a href="skip-nav">Skip To Navigation</a> ' +
		'<a id="high-contrast-link" href="#" class="high-contrast-icon" data-style="high-contrast" >High Contrast</a> ' +
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
	
	//document.cookie="ayudante-font=large-font";
	var y = getCookie("ayudante-font"); 
	//if (y == "") { document.cookie  = "ayudante-font=normal-font"; }
	//console.log("set font cookie");
	if (y == "small-font") { 
		var c = document.getElementById("ayudante");
		addFontClass(c, "small-font");
	} else if ( y == "large-font") {
		var c = document.getElementById("ayudante");
		addFontClass(c, "large-font");
	}
	
	checkCookie();
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
	
	///////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////
	
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
};
	
	
	
	/*
		Function to add class to element
		
		@params element = the element that the class is being added to 
				c = the class name that is being added
	
	*/
	function addContrastClass(element, c) {
		
		//alert("ayudante-contrast=" + c + ";");
		var currentClassValue = element.className;
		var classToAdd = c;
		
		remContrastClass(element, c);
		  
		if (currentClassValue.indexOf(classToAdd) == -1) {
			if ((currentClassValue == null) || (currentClassValue === "")) {
				element.className = classToAdd;
			} else {
				element.className += " " + classToAdd;
			}
		}
		
		setCookie("ayudante-contrast", c, 1);
	}
	
	function addFontClass(element, c) {
		
		var currentClassValue = element.className;
		var classToAdd = c;
		
		remFontClass(element, c);
		  
		if (currentClassValue.indexOf(classToAdd) == -1) {
			if ((currentClassValue == null) || (currentClassValue === "")) {
				element.className = classToAdd;
			} else {
				element.className += " " + classToAdd;
			}
		}
		
		setCookie("ayudante-font", c, 1);
	}
	
	
	/*
		Function to remove a class from a specified element
		
		@params element = the element that the class is being added to 
				c = the class name that is being added
	
	*/
	function remContrastClass(element, c) {		
		delCookie("ayudante-contrast");
		//document.cookie="ayudante-contrast=";
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
	
	

	
