console.log("hello world");

var topics = ["nice", "lol", "thumbs-up", "no", "agreed"];
//adds the buttons to the document
function addButtons(arr) {
    //clear the div since we are adding all new buttons
    $("#button-zone").empty();
    //iterate through the array of topics and create buttons and add the buttons to the document
    arr.forEach(element => {
        var button = $("<button>");
        button.text(element);
        button.attr("searchData", element);
        button.addClass("gif-search")
        $("#button-zone").prepend(button);
    })

}
//when thr submit button is hit in the form put a new string into the topics array and all addButtons to displaty the buttons
$("#submit-button").on("click", function (event) {
    topics.push($("#input-textbox").val().trim());
    addButtons(topics);
});

//this is the get gifs functionality. it attaches a click listener to each of the buttons made in addButtons.
$(document).on("click", ".gif-search", function (event) {
    //grab the searchTerm from the buttons searchData attribute
    var searchTerm = $(this).attr("searchData");

    // create our queryUrl using our api key and the search term acquired from the button
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=wPFL6duJh96S7lE2i0smKFLMpHplSg64&limit=10&q=" + searchTerm;

    // Perfoming an AJAX GET request to our queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
    })

        // After the data from the AJAX request comes back
        .then(function (response) {
            // iterate through the data array in the ajax response
            response.data.forEach(element => {
                //create a div and give it a class so we can style it
                var imgDiv = $("<div>");
                imgDiv.addClass("image-container");

                // Creating and storing an image tag
                var moveUrl = element.images.fixed_height.url;
                var stillUrl = element.images.fixed_height_still.url;
                var image = $("<img>");
                // Setting the image urls to attributes of the image so we can have stop/start functionality
                image.attr("src", stillUrl);
                image.attr("still-image", stillUrl);
                image.attr("moving-image", moveUrl)
                image.attr("moving", "false");
                image.addClass("gif");

                //create and store rating text
                var p = $("<p>");
                p.text("Rating: " + element.rating);

                // Prepend the image and rating to the new div
                imgDiv.append(p);
                imgDiv.append(image);
                //put the new div into the gif-zone element
                $("#gif-zone").append(imgDiv);

            });
        });

});
//when you click the gif it start or stop movign depending on if it was paused or not
$(document).on("click", ".gif", function (event) {
    //create a flag variable that contains the "moving" attribute of the clicked gif
    var moving = $(this).attr("moving");
    //if the gif is not moving make it move otherwise make it stop
    if (moving === "false") {
        $(this).attr("src", $(this).attr("moving-image"));
        $(this).attr("moving", "true");
    } else {
        $(this).attr("src", $(this).attr("still-image"));
        $(this).attr("moving", "false");
    }
});
//add our initial buttons to the document
addButtons(topics);