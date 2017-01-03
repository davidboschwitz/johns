//fade in from the preloader with a little delay
$(window).on("load", function() {
    console.log('loaded');
    $('.full-height').each(function(i, _e) {
        var e = $(_e);
        e.css('height', window.innerHeight + (e.data('heightoffset') || 0));
    });
    setTimeout(function() {
        $('body').addClass('loaded');
        setTimeout(function() {
            $(".typed").typed({
                //And I love
                strings: ['<a href="#/music">Music</a> ^150| <a href="#/shows">Shows</a> ^150 | <a href="#/lyrics">Lyrics</a> ^150 | <a href="#/contact">Contact</a>'],
                typeSpeed: 20,
                backDelay: 700,
                loop: false,
                callback: function() {
                    $('.typed').parent().children('.typed-cursor').css('display', 'none') //.delay(1500).fadeOut('slow');
                    $('.hero_carrot').delay(1000).fadeIn('slow');
                    $('.typed').children('a').click(function() {
                        scrollTo(0, window.innerHeight - 200);
                    });
                }
            });
        }, 1000);
    }, 1000)


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
