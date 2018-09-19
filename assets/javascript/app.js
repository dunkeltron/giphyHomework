console.log("hello world");
var searchTerm;
var topics = ["nice", "lol", "thumbs-up", "no", "agreed"];
function addButtons(arr) {
    $("#button-zone").empty();
    arr.forEach(element => {
        var button = $("<button>");
        button.text(element);
        button.attr("searchData", element);
        button.addClass("gif-search")
        $("#button-zone").prepend(button);
    })

}

$("#submit-button").on("click", function (event) {
    //event.preventDefault();
    searchTerm = $("#input-textbox").val().trim();
    topics.push(searchTerm);
    addButtons(topics);
});


$(document).on("click", ".gif-search", function (event) {
    console.log($(this).attr("searchData"));
    searchTerm = $(this).attr("searchData");
    // // Storing our giphy API URL for a random cat image
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=wPFL6duJh96S7lE2i0smKFLMpHplSg64&limit=10&q=" + searchTerm;

    // // Perfoming an AJAX GET request to our queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
    })

        // After the data from the AJAX request comes back
        .then(function (response) {
            console.log(response);
            // Saving the image_original_url property
            response.data.forEach(element => {
                // var imgDiv = $("div");
                // imgDiv.text("Rating: "+ response.data[i].rating)
                // imgDiv.addClass("image-container");

                // Creating and storing an image tag
                var imageUrl = element.images.fixed_width.url;
                var image = $("<img>");
                // Setting the catImage src attribute to imageUrl
                image.attr("src", element.images.fixed_width_still.url);
                image.attr("still-image",element.images.fixed_width_still.url);
                image.attr("moving-image",imageUrl)
                image.attr("moving","false");
                image.addClass("gif");

                // Prepending the catImage to the images div
                //imgDiv.append(catImage);
                $("#gif-zone").append(image);

            });
        });

});
$(document).on("click", ".gif", function (event) {
    var moving = $(this).attr("moving");
    if (moving === "false") {
        $(this).attr("src", $(this).attr("moving-image"));
        $(this).attr("moving", "true");
      } else {
        $(this).attr("src", $(this).attr("still-image"));
        $(this).attr("moving", "false");
      }
});
addButtons(topics);