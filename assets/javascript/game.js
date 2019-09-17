var topics = ["Memes of the year", "Cats Memes", "Stress Memes", "Coding Memes",];



function load() {
    //removes any existing buttons!
    $("#buttons").text("");
    //i++ is equivalent to i = i + 1;
    //i-- is equivalent to i = i - 1;
    for (var i = 0; i < topics.length; i++) {
        var topic = topics[i];
        $("#buttons").append("<button data-name=\"" + topic + "\"id=\"gifbutton\" onclick=\"handleClick('" + topic + "');\">" + topic + "</button>  ");
    }
}

function handleClick(query) {
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + query + '&api_key=PPp77FRt6GIzqSe74nkImz3HCFyK0NjS&limit=10';
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data;
        if (results.length === 0) {
            alert("There are no results for this search!");
            return;
        }
        for (var i = 0; i < results.length; i++) {
            var topicDiv = $("<div class='gif'>");
            var rating = $('<p>').text('Rating: ' + results[i].rating.toUpperCase());
            var title = $('<p>').text('Title: ' + results[i].title);
            var url = results[i].images.fixed_height_still.url;
            var gif = $('<img>');
            gif.attr('src', url);
            gif.attr('data-still', results[i].images.fixed_height_still.url);
            gif.attr('data-animate', results[i].images.fixed_height.url);
            gif.attr('data-state', 'still');
            gif.addClass('gifimage');
            topicDiv.append(rating);
            topicDiv.append(title);
            topicDiv.append(gif);
            $("#gifs").prepend(topicDiv);
        }
    });
}

function handleGif() {
    var state = $(this).attr('data-state');
    if (state === "still") {
        $(this).attr('src', $(this).attr('data-animate'));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-state', 'still');
    }
}

function deleteTopic() {
    var topic = $(this).attr("data-name");
    console.log(topic);
    var itemindex = topics.indexOf(topic);
    if (itemindex > -1) {
        topics.splice(itemindex, 1);
        load();
    }
}

$(document).on('dblclick', "#gifbutton", deleteTopic);

$(document).on("click", ".gifimage", handleGif);

$(document).on("click", "#add-topic", function (event) {
    event.preventDefault();
    var topic = $("#topic").val().trim();
    if (topic == '') {
        alert("You cannot enter a empty topic!");
        return;
    }
    topics.push(topic);
    load();
});