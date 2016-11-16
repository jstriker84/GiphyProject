var gifs = ["cat", "dog", "snake"];

$(document).ready(function(){
	console.log("document ready");
//what happens when you click on a button
	$("button").on("click", function(){
	console.log("inside button function");
	var gif = $(this).attr("data-name");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&limit=10";
	
		$.ajax({url: queryURL, method: 'GET'})
		.done(function(response) {
		console.log(response);
		var results = response.data;

		for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div class='item'>")

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var personImage = $("<img>");
                    personImage.attr("src", results[i].images.fixed_height.url);

                    gifDiv.append(p)
                    gifDiv.append(personImage)

                    $("#gifView").prepend(gifDiv);
                }

		})	
	})
	//function to make buttons
	console.log("outside function");
	function renderButtons(){
		console.log("inside function");
	$("#buttonsView").empty();

	//loops through array
	for (var i = 0; i < gifs.length; i++){
		var a = $("<button>")
		a.addClass("gif");
		a.attr("data-name", gifs[i]);
		a.text(gifs[i]);
		$("#buttonsView").append(a);
	}
}
	

});
renderButtons();