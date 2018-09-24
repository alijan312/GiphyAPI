$(document).ready(function () {

    var topics = ['animals', 'cartoon', 'movies', 'joker', 'dancing', 'fail', 'family guy','sports', 'memes', 'disney'];

    function displayGifbuttons() {
        $('#gifButtonArea').empty();

        for (var i = 0; i < topics.length; i++) {
            var btn = $('<button>');
            btn.addClass('gifBtn');
            btn.attr('data-name', topics[i]);
            btn.text(topics[i]);
            $('#gifButtonArea').append(btn);
        }
    }

    function addnewGifButton() {
        $('#add-gif').on('click', function () {
            var gifTopic = $('#gif-input').val().trim();
            if (gifTopic === ''){
                return false;
            }
            topics.push(gifTopic);
            displayGifbuttons();
            return false;
        });
    }

    function displayGifs() {
        var gifTopic = $(this).attr('data-name');
        var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + gifTopic + '&api_key=nw9loeDZUT5QblEA3A0h7iiuvPgbOMOQ&limit=10';
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: 'GET'

        })
        .then(function (response) {
            console.log(response);
            $('#gifImageArea').empty();

            var gifResults = response.data

            for (var i = 0; i < gifResults.length; i++) {

                var gifHolder = $('<div>');
                gifHolder.addClass('gifHolder');
                var ratingParagraph = $('<p>').text('Rating: ' + gifResults[i].rating);
                gifHolder.append(ratingParagraph);

                var gifImage = $('<img>');
                gifImage.attr('src', gifResults[i].images.fixed_height_still.url);
                gifImage.attr('data-still', gifResults[i].images.fixed_height_still.url);
                gifImage.attr('data-animate', gifResults[i].images.fixed_height.url);
                gifImage.attr('data-state', 'still');
                gifImage.addClass('image');
                gifHolder.append(gifImage);

                $('#gifImageArea').prepend(gifHolder);
            }

        });

    }
    
    displayGifbuttons();
    addnewGifButton();
    
    $(document).on('click', '.gifBtn', displayGifs);
    $(document).on('click', '.image', function () {
        var state = $(this).attr('data-state');
        if (state === 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
});




