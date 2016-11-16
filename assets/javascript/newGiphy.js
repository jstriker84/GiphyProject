var gifs = ["cat", "dog", "snake", "tiger", "wolf", "lion", "bear", "parrot", "giraffe", "gorilla"];

//displays content
function displayGifInfo(){
	var gif = $(this).attr("data-name");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&limit=10";

	//creates ajax
	$.ajax({url: queryURL, method: 'GET'}).done(function(response){
		$("img").remove(); //remove the classes to resest the container
         $("p").remove();
		var results = response.data;
		//var gifDiv = $("<div class='gif'>");
		var rating = response.rating;

        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>")
            $(".item").width("400px");
            $(".item").height("400px");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

           var personImage = $("<img>");
            personImage.attr("src", results[i].images.fixed_height_still.url);
            personImage.attr("data-still", results[i].images.fixed_height_still.url);
            personImage.attr("data-state","still");
            personImage.addClass("item");
            personImage.attr("data-animate", results[i].images.fixed_height.url);

            gifDiv.append(p)
            gifDiv.append(personImage)

            $("#gifView").prepend(gifDiv);
        }
	});
}

//displays data
function renderButtons(){
	$("#buttonsView").empty();
	console.log("inside render buttons function");
	//loops through array
	for (var i = 0; i < gifs.length; i++){
		var a = $("<button>")
		a.addClass("gif");
		a.attr("data-name", gifs[i]);
		a.text(gifs[i]);
		$("#buttonsView").append(a);

	}
}

//what happens when a button is clicked
$("#addGif").on("click", function(event){
	event.preventDefault();
	console.log("inside onclick function");
	var gif = $("#gif-input-the-box").val().trim();
	//input from text box added to array
	console.log(gif);
	gifs.push(gif);
	renderButtons();

});
/*
//not working...
function gifMovement(){
	console.log("inside still function");
	var state = $(this).attr("data-state");

    if ( state == "still"){
       $(this).attr("src", $(this).data("animate"));
       $(this).attr("data-state", "animate");
    }else{
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
    }
 };
*/

// Function to change the gif state to animated or still
    function changeGifState(){
    	console.log("inside change state function");
        // Stores the data state into a variable
        var state = $(this).attr("data-state");
        // Stores the data animate into a variable
        var animation = $(this).attr("data-animate");
        // Stores the data still into a variable
        var still = $(this).attr("data-still");
        // Check if the image is still or animate
        if(state == "still"){
            // Change the attribute of src into the animation url to make the gif animated
            $(this).attr("src", animation);
            // Change the data state to animate
            $(this).attr("data-state", "animate");
        } else {
            // Change the attribute of src into the still url to make the gif still
            $(this).attr("src", still);
            // Change the data state to still
            $(this).attr("data-state", "still");
        }
    } 
    
$(document).on("click", ".gif", displayGifInfo);
$(document).on("click", ".item", changeGifState);

renderButtons();

