//fade in from the preloader with a little delay
$(window).on("load", function() {
    console.log('loaded');
    $('.full-height').height(window.innerHeight);
    setTimeout(function() {
        $('body').addClass('loaded');
        setTimeout(function() {
            $(".typed").typed({
                //And I love
                strings: ['<a href="#/music">Music</a> ^150| <a href="#/shows">Shows</a> ^150 | <a href="#/lyrics">Lyrics</a> ^150 | <a href="#/contact">Contact</a>'],
                typeSpeed: 70,
                backDelay: 700,
                loop: false,
                callback: function() {
                    $('.typed').parent().children('.typed-cursor').delay(1500).fadeOut('slow');
                    $('.hero_carrot').delay(1000).fadeIn('slow');
                }
            });
        }, 1000);
    }, 2000)


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
