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
    	$( this ).attr('aria-hidden', true);
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
*/
function get_all() {
	return document.getElementsByTagName('*');
}


/*
if element has onclick funcion remove it and add a JS listener

TODO Need to capture original onclick event and ad to new script 
*/
function has_onclick_remove(e) {
	if (e.getAttribute("onclick") !== null) {
		e.removeAttribute("onClick");
		var rand_id = Math.floor((Math.random() * 100000) + 1);
		$(e).attr("ayu-id", rand_id);
		$( "body" ).append("<script>  $( \"[ayu-id='" + rand_id + "']\" ).click(function() { alert( 'Handler for .click() called.' );});");
	}
}


//Test function
$(document).ready(function () {
  
  var e = document.getElementById("btn");
  
  get_all_img();
  
  //has_onclick_remove(e);
  
  
	/*var t0 = performance.now();
	get_by_attr("alt");
	var t1 = performance.now();
	console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")*/
  
  
});
	
