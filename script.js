var apikey = 'c5efa99a7dbd7d52f466cb2413154950ae0a962f'; // Put your API key here


// Use this function to do stuff with your results. 
// It is called after 'search' is executed.
function searchCallback(results) {
    console.log(results);

	for (var i=0; i<9; i++){
		//create row
		if (i%2 == 0){
		$('.container').append("<div class='row'></div>");
		}
		//create column
		$(".row").last().append("<div class='col-xs-10 col-sm-10 col-md-6 col-lg-6 well newResult'></div>");
		//append data
		$(".newResult").last().append("<p class='lead'>" + results[i].name + "</p>");
		//check for null values
		if (results[i].image.thumb_url) {
			$('.newResult').last().append("<img class='hidden-xs hidden-sm' src='" + results[i].image.thumb_url + "'>");
			}
		if (results[i].deck) {
			$('.newResult').last().append("<p class='deck'>" + results[i].deck + "</p>");
			}
		// append button
		$('.newResult').last().append("<div class='btn btn-sm btn-success rm-btn'>Remove</div>");
		//show row
		$(".row").hide().delay(i*500).fadeIn("slow");
	};

}

function shuffleCells(cellName){
		console.log("Next row contents: ", $(cellName).closest('.row').next().contents());
	if ($(cellName).closest('.row').next().contents().length>0) {
		console.log("Get a cell: ", $(cellName).closest('.row').next().contents().first());
		$(cellName).insertAfter($(cellName).closest('.row').next().contents().first());
		console.log("Now work on ", cellName.closest('.row').next().contents().first());
		shuffleCells(cellName.closest('.row').next().contents().first());
	} else {return;}
}


$(document).ready(function() {

	$(".searchBtn").on('click', function(){
		$(".container").children(".row").remove();
		var searchTerm = $("#searchField").val();
		console.log(searchTerm);
		$("#searchField").val('');
		search(searchTerm);
	});

	$('.container').on('click', '.rm-btn', function() {
		$(this).parent().fadeOut("slow", function() {
			var nextCell = $(this).next();
			console.log(nextCell);
			shuffleCells(nextCell);
			$(this).remove();
		});
	});

	
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
