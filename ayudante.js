
	//Add code that sets a div right after the body element 
	//to make class changes to the whole document
	
	//Test Code
	function addClass(element, c) {
		var currentClassValue = element.className;
		var classToAdd = c;
		  
		if (currentClassValue.indexOf(classToAdd) == -1) {
			if ((currentClassValue == null) || (currentClassValue === "")) {
				element.className = classToAdd;
			} else {
				element.className += " " + classToAdd;
			}
		}
	}
	
	
	
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
	
