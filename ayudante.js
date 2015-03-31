
/*window.onload =
  function() {
    var div = document.createElement('div');
    div.id = 'bd';
    if (document.body.firstChild)
      document.body.insertBefore(div, document.body.firstChild);
    else
      document.body.appendChild(div);
  };
//document.getElementByName("body").prependTo*/


	//Add code that sets a div right after the body element 
	//to make class changes to the whole document
	
	
	
	/*
		Function to add class to element
		
		@params element = the element that the class is being added to 
				c = the class name that is being added
	
	*/
	function addContrastClass(element, c) {
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
	}
	
	
	/*
		Function to remove a class from a specified element
		
		@params element = the element that the class is being added to 
				c = the class name that is being added
	
	*/
	function remContrastClass(element, c) {
		
		document.getElementById("ayudante").className =
		document.getElementById("ayudante").className.replace(/\bhigh-contrast\b/,'');
		
		document.getElementById("ayudante").className =
		document.getElementById("ayudante").className.replace(/\blow-contrast\b/,'');
		/*console.log("in rem")
		var currentClassValue = element.className;
		var classToRem = c;
		
		if (currentClassValue.indexOf(classToRem) != -1) {
			console.log("in if loop")
			var startPos = currentClassValue.indexOf(classToRem);
			var endPos =  startPos + currentClassValue.indexOf(classToRem).length;
			while (startPos < endPos) {
				currentClassValue[startPos] = "";
				startPos++
			}
			console.log(currentClassValue);
			element.setAttribute("class", currentClassValue);
			
		}*/
		
	}
	/////////////NEED TO ADD PARAM THAT ACCOUNTS FOR CONTRAST OR FONT*************
	function remFontClass(element, c) {
		
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
	
	/*function checkCookie() {
		var username=getCookie("username");
		if (username!="") {
			alert("Welcome again " + username);
		}else{
			username = prompt("Please enter your name:", "");
			if (username != "" && username != null) {
				setCookie("username", username, 365);
			}
		}
	}*/
	
	
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
	
	

	
