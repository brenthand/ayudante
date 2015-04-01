//Better way to handle cookies onload************
window.onload =
  function() {
   
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
	/////////////NEED TO ADD PARAM THAT ACCOUNTS FOR CONTRAST OR FONT*************
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
	function setCookie(name, v, t) {
		var d = new Date();
		d.setTime(d.getTime() + (t*24*60*60*1000));
		var expire = "expires=" + d.toUTCString();
		document.cookie = name + "=" + v +"; " + expire;
	}
	
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
	
	function checkCookie() {
		
		var contrast = getCookie("ayudante-contrast");
		var size = getCookie("ayudante-font");
		
		
		alert("Contrast: " + contrast + "Font: " + size  );
		
	}
	
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
	
	

	
