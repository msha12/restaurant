


$(function () {
    $('.icons div').on('click', function () {
        $(this).addClass('overlay').siblings().removeClass('overlay');
    })
    ////////////////////////////
    $('.lunch , .dessert').on('click', function () {
        $('.images1').fadeOut(500);
        $('.images2').fadeIn(1500);
    })
    ///////////////////////////
    $('.breakfast, .dinner, .drink').on('click', function () {
        $('.images2').fadeOut(500);
        $('.images1').fadeIn(1500);
    })
})

$(window).scroll(function () {
    if ($(window).scrollTop() > 0) {
        $(".navbar").css('position', 'fixed');
        $(".navbar").css('paddingTop', '0px');
        $(".navbar").css('backgroundColor', 'black');

    } else {
        $(".navbar").css('position', 'relative');
        $(".navbar").css('paddingTop', '20px');
        $(".navbar").css('backgroundColor', 'transparent');

    }
})

var swiper = new Swiper('.swiper-container', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: false,
    slidesPerView: 'auto',
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 200,
        modifier: 1,
        slideShadows: true,
    },
    pagination: {
        el: '.swiper-pagination',
    },
});


$(function () {
    'use strict';
    $('.animate').typed({
        strings: ['Restaurant'],
        typeSpeed: 120,
        loop: true
    })
})

////////////











