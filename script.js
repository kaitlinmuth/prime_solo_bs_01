var apikey = 'c5efa99a7dbd7d52f466cb2413154950ae0a962f'; // Put your API key here


// Use this function to do stuff with your results. 
// It is called after 'search' is executed.
function searchCallback(results) {
    console.log(results);

	for (var i=0; i<9; i++){

		// check for null items
		var name = results[i].name;
		var deck = "";
		if (results[i].deck){
			deck = results[i].deck;
		}
		var image = "";
		if (results[i].image.thumb_url){
			image = results[i].image.thumb_url;
		}
		$(".container").append("<div class='col-xs-10 col-sm-10 col-md-8 col-lg-8 well'><p class='lead'>" + name + "</p> <img class='hidden-xs hidden-sm' src='" + image + "'><p class='deck'>" + deck + "</p><div class='btn btn-sm btn-success'>Remove</div></div>");
	}
}

$(document).ready(function() {

	search("unicorn");

	$('.container').on('click', '.btn', function(){
		$(this).parent().remove();
	})

	
});

// HELPER FUNCTION
// Executes a search using 'query' and runs searchCallback on the results of a success.
function search(query){

	$.ajax ({
	    type: 'GET',
	    dataType: 'jsonp',
	    crossDomain: true,
	    jsonp: 'json_callback',
	    url: 'http://www.giantbomb.com/api/search/?format=jsonp&resources=game&api_key=' + apikey +'&query=' + encodeURI(query),
	    complete: function() {
	        console.log('ajax complete');
	    },
	    success: function(data) {
	        searchCallback(data.results);
	    }
	});

}
