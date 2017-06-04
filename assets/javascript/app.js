var topics = ['Aaron Rodgers', 'Kobe Bryant', 'Marshawn Lynch'];


//Adding Buttons========================================================================
var addButtons = function() {
    $('#buttonbar').empty(); // empty the bar on add button rather than on click.
	for (var i=0; i<topics.length; i++) {

		var button = $('<button class = newButton>');
			button.attr("data-person", topics[i]);
			button.html(topics[i]);
			console.log(topics[i]);


	$('#buttonbar').append(button);
	};
}
addButtons(); //generate buttons dynamically from the start

$('#search').on('click', function(event) {
	event.preventDefault()



	var userInput = $('#searchbar').val();

	if (userInput !== '') {
		topics.push(userInput);
	}

	$("#searchbar").val('');

	addButtons();

});



//Pulls from Giphy API to prepend 10 Gifs====================================================
$(document).on("click", ".newButton", "#search", function() {

	var athlete = $(this).attr("data-person");
	console.log(athlete);

	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + athlete + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({
		url: queryURL,
		method: "GET"
	})

	.done(function(response) {

		console.log(queryURL);
		var results = response.data;

		for (var i=0; i < results.length; i++) {

			if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

				var rating = results[i].rating;

				var p = $("<p>").text("Rating: " + rating);

				var gifDiv = $("<div class ='item'>");

				var athleteImage = $("<img>");

				athleteImage.addClass("gif");

				athleteImage.attr("src", results[i].images.original.url);

				athleteImage.attr("data-still", results[i].images.original_still.url);

				athleteImage.attr("data-animate", results[i].images.original.url);

				gifDiv.append(p);

				gifDiv.append(athleteImage);

				$("#gifs-appear-here").prepend(gifDiv);


	}

			}


		//===================================================================================
		//Pausing and Stoping Gifs
		$(".gif").on("click", function() {

			var state = $(this).attr("data-state");

			if (state === "still") {
				$(this).attr("src", $(this).attr("data-animate"));
				$(this).attr("data-state", "animate");
			} 	else {
				$(this).attr("src", $(this).attr("data-still"));
				$(this).attr("data-state", "still");
			}
		});

	});
});