var showTitle = ['The office', 'Game of Thrones', 'Parks and Recreation', 'Friends', 'New Girl', 'Trailer Park Boys', 'Unbreakable Kimmy Schmidt', 'Master of None', 'Silicon Valley', 'Black Mirror', 'That 70s Show', 'Veep', 'Arrested Development', 'The Mindy Project', 'How I Met Your Mother', 'Bobs Burger', 'Community'];
var currentGif;
var pausedGif;
var animatedGif;
var stillGif;

//creates buttons
function createButtons() {
    $('#TVButtons').empty();
    for (var i = 0; i < showTitle.length; i++) {
        var showBtn = $('<button>').text(showTitle[i]).addClass('showBtn').attr({
            'data-name': showTitle[i]
        });
        $('#TVButtons').append(showBtn);
    }

    //displays gifs on click
    $('.showBtn').on('click', function () {
        $('.display').empty();

        var thisShow = $(this).data('name');
        var giphyURL = "http://api.giphy.com/v1/gifs/search?q=tv+show+" + thisShow + "&limit=10&api_key=dc6zaTOxFJmzC";
        $.ajax({
            url: giphyURL,
            method: 'GET'
        }).done(function (giphy) {
            currentGif = giphy.data;
            $.each(currentGif, function (index, value) {
                animatedGif = value.images.original.url;
                pausedGif = value.images.original_still.url;
                var thisRating = value.rating;
                //gives blank ratings 'unrated' text
                if (thisRating == '') {
                    thisRating = 'unrated';
                }
                var rating = $('<h5>').html('Rated: ' + thisRating).addClass('ratingStyle');
                stillGif = $('<img>').attr('data-animated', animatedGif).attr('data-paused', pausedGif).attr('src', pausedGif).addClass('playOnHover');
                var fullGifDisplay = $('<button>').append(rating, stillGif);
                $('.display').append(fullGifDisplay);
            });
        });
    });
}

//animates and pauses gif on hover
$(document).on('mouseover', '.playOnHover', function () {
    $(this).attr('src', $(this).data('animated'));
});
$(document).on('mouseleave', '.playOnHover', function () {
    $(this).attr('src', $(this).data('paused'));
});

//sets a button from input
$('#addShow').on('click', function () {
    var newShow = $('#newShowInput').val().trim();
    showTitle.push(newShow);
    createButtons();
    return false;
});

createButtons();