var stickTop = window.innerHeight - 70;

function fixHeight() {

    $('.hero').height(window.innerHeight);
    $('.full-height').each(function(i, _e) {
        var e = $(_e);
        e.css('min-height', window.innerHeight + (e.data('heightoffset') || 0));
    });
    stickTop = window.innerHeight - 70;
}

var stuck = false;
$(window).scroll(function() {
    if (window.scrollY > stickTop) {
        if (!stuck) {
            stuck = true;
            $('#menu').css('display', 'block');
        }
    } else if (stuck) {
        $('#menu').css('display','none');
        stuck = false;
    }
});

//fade in from the preloader with a little delay
$(window).on("load", function() {
    console.log('loaded');

    fixHeight();

    setTimeout(function() {
        $('body').addClass('loaded');
        setTimeout(function() {
            $(".typed").typed({
                //And I love
                strings: ['<a href="#/music" title="Listen to John Play">Music</a> ^150| <a href="#/videos" title="Watch John Play">Videos</a> ^150| <a href="#/shows" title="See John Live">Shows</a> ^150| <a href="#/blog" title="Read John\'s thoughts">Blog</a> ^150| <a href="#/lyrics" title="Read/Sing along to John\'s music">Lyrics</a> ^150| <a href="#/contact" title="Talk to John">Contact</a>'],
                typeSpeed: 20,
                backDelay: 700,
                loop: false,
                callback: function() {
                    $('.typed').parent().children('.typed-cursor').css('display', 'none') //.delay(1500).fadeOut('slow');
                    $('.hero_carrot').delay(1000).fadeIn('slow');
                    $('.typed').children('a').click(function() {
                        scrollTo(0, window.innerHeight - (window.innerWidth < 600 ? 140 : 42));
                    });
                }
            });
        }, 1000);
    }, 1000)


});


$(window).resize(function() {
    console.log('window was resized');
    //set the height of the hero image to the height of the browser.
    fixHeight();
});
console.info('hello world!')
$('.hero_carrot').css('display', 'none');


function scrollToID(id) {
    var e = $(id);
    $('body, html').animate({
        scrollTop: e.offset().top + (e.data('offset') || 0)
    }, {
        duration: 250,
        queue: false
    }, 'easeInOutCubic');
}
