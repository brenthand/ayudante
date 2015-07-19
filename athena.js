//Athena acc. plugin that changes dom of web page and allows it be be enabled for screen readers
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





function get_by_attr(a)
{
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
if element has onclick funcion remove it
*/
function has_onclick_remove(e) {
	if (e.getAttribute("onclick") !== null) {
		e.removeAttribute("onClick");
	}
}


//Test function
$(document).ready(function () {
  
  var e = document.getElementById("btn");
  
  get_all_img();
  
  has_onclick_remove(e);
  
  
  
});