var min = 0;
var sec = 0;
var hours = 0;
var stop = 0;
window.onload = function() {
    setInterval(function() {
        if (stop !== 1) {
            sec++;
            if (sec === 60) {
                min++;
                sec = 0;
            }
            if (min === 60) {
                hours++;
                min = 0;
                sec = 0;
            }
            $('.timer').html(hours + ':' + min + ':' + sec);
        }

    }, 1000);
};

// list of all cards
var cards = [];
var cardsName = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-anchor', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-diamond', 'fa fa-bomb', 'fa fa-leaf', 'fa fa-bomb', 'fa fa-bolt', 'fa fa-bicycle', 'fa fa-paper-plane-o', 'fa fa-cube'];
var cardsOpen = [];

$('.deck').each(function() {
    $(this).find('li').each(function() {
        cards.push($(this));
    });
});

// temp variable to store card value
var temp = 0;

cardsName = shuffle(cardsName);

var cardNumber = 0;
$('.deck').each(function() {
    $(this).find('li').find('i').each(function() {
        $(this).removeAttr('class');
        $(this).addClass(cardsName[cardNumber]);
        cardNumber++;
    });
});

$('.deck').each(function() {
    $(this).find('li').find('i').each(function() {
        var classTemp = $($(cards[temp][0]).find('i')[0]).attr('class');
        $(this).removeAttr('class');
        $(this).addClass(classTemp);
        temp++;
    });
});
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// star ratings according to attempts taken
var attempts = 0,
    stars = 3;

removeProperties = function(prop) {
    setTimeout(function() {
        prop.removeClass('show open animated wobble');
        cardsOpen[0].removeClass('show open animated wobble');
        cardsOpen = [];
    }, 400);
};
// star ratings according to attempts taken
showCardOnClick = function(clickEvent) {
    clickEvent.on('click', function() {
        attempts++;
        if (attempts === 25) {

        } else if (attempts > 26 && attempts <= 35) {
            $('section ul li').hide();
            $('section ul').append('<li><i class="fa fa-star"></i></li>');
            $('section ul').append('<li><i class="fa fa-star"></i></li>');
            stars = 2;
        } else if (attempts > 35) {
            $('section ul li').hide();
            $('section ul').append('<li><i class="fa fa-star"></i></li>');
            stars = 1;
        }
        $('.attempts').html(attempts);
        if ((cardsOpen.length % 2) === 0) {
            $(this).addClass('show open animated wobble');
            $(this).off('click');
            cardsOpen.push($(this));
        } else if (cardsOpen.length !== 0) {
            $(this).addClass('show open animated wobble');
            // if cards match
            var match = $(this);
            for (var i = 0; i < cardsOpen.length; i++) {
                if (cardsOpen[i].find('i').attr('class') === match.find('i').attr('class')) {
                    match.removeClass('animated wobble');
                    match.addClass('show match animated rubberBand');
                    cardsOpen[i].removeClass('animated wobble');
                    cardsOpen[i].addClass('show match animated rubberBand');
                    console.log('match');
                    $(this).off('click');
                    cardsOpen = [];
                    break;
                } else {
                    match.addClass('show open animated wobble');
                    removeProperties(match);
                    cardsOpen[0].on('click', showCardOnClick(cardsOpen[0]));
                    console.log('no match');
                }
            }
        }
        if ($('.deck').find('.match').length === 16) {
            setTimeout(function() {
                $('.deck').each(function() {

                    // this is the modal appers after game is complete
                    swal({
                        title: 'Congratulations',
                        type: 'success',
                        text: 'You have won the game . attempts taken are ' + attempts + '. You have got ' + stars + ' Stars rating. Time taken is ' + hours + ' Hours ' + min + ' Minutes and ' + sec + ' Seconds',
                        allowOutsideClick: false,
                        showCancelButton: true,
                        confirmButtonText: 'Play Again',
                        confirmButtonColor: '#228B22',
                        cancelButtonText: 'Close',
                        cancelButtonColor: '#FF0000'
                    }).then(function() {
                        location.reload();
                        console.log('restarted')
                    }, function(dismiss) {
                        console.log('closed');
                    });

                });
            }, 300);
            stop = 1;
            $('.timer').hide();
            $('.timer').html('0:0:0');
            $('.timer').show();
        }


    });
};

for (var i = 0; i < cards.length; i++) {
    cards[i].on('click', showCardOnClick(cards[i]));
}

// restart
$('.restart').on('click', function() {
    location.reload();
});
