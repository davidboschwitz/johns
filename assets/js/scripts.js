//fade in from the preloader with a little delay
$(window).on("load", function() {
    console.log('loaded');
    $('.full-height').height(window.innerHeight);
    setTimeout(function() {
        $('body').addClass('loaded');
        setTimeout(function() {
            $(".typed").typed({
                //And I love
                strings: ['<a href="https://soundcloud.com/john-lensing-213121142">Soundcloud</a> ^500| <a href="">Shows</a> ^500 | <span style="color:red">Fall in Love</span> ^500 | <a href="">Contact</a>'],
                typeSpeed: 70,
                backDelay: 700,
                loop: false,
                callback: function() {
                    $('.typed').parent().children('.typed-cursor').delay(1500).fadeOut('slow');
                }
            });
        }, 1000);
    }, 2000)


});
console.info('hello world!')
