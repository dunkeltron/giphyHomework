console.log("hello world");
var searchTerm;
$("#submit-button").on("click",function(event){
    searchTerm = $("#input-textbox").val().trim();
    var button = $("<button>");
    button.text=searchTerm;
    button.attr("id",searchTerm);
    $("#button-zone").prepend(button);
})