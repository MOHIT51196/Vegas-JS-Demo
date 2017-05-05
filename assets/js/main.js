var isNavActive = false;
var isPushable = true;
var shiftWidth;
$(document).ready(function () {
    $('body').vegas({
        slides: [
            {
                src: "assets/images/screen1.jpg"
            }
            , {
                src: "assets/images/screen2.jpg"
            }
            , {
                src: "assets/images/screen3.jpg"
            }
            , {
                src: "assets/images/screen4.jpg"
            }
            , {
                src: "assets/images/screen5.jpg"
            }
        ]
        , delay: 5000
        , align: 'center'
        , valign: 'center'
        , loop: true
        , autoplay: true
        , transition: ['fade', 'flash', 'swirlLeft', 'swirlRight']
        , animation: 'random'
    });
    shiftWidth = -$('#faded-list').outerWidth();
    $("#nav-btn").click(navAnimation);
    $.each($('.pushable>span'), function (index, pushEntity) {
        $(pushEntity).click(pushAnimation);
    });
    //    ==========================================
    $('.homepage-info').click(fetchSiteData);
});

function navAnimation() {
    var listEntity = $('.nav-menu-list>li');
    if (!isNavActive) {
        listEntity.removeClass();
        listEntity.addClass('animated fadeInUp');
        $('.nav-menu-list').show();
    }
    else {
        listEntity.removeClass();
        listEntity.addClass('animated fadeOutDown');
    }
    isNavActive = !isNavActive;
}

function pushAnimation() {
   
    console.log(shiftWidth);
    $('.pushable>span').css('transform', 'translateX(' + shiftWidth + 'px)');
    //    $('#push-list').css('transform','translateX('+shiftWidth +'px)');
    if (isPushable) {
        $('.pushable>span').css('opacity', '0.4');
        this.style.opacity = 1;
        $('#faded-list').fadeIn('easy');
        $('#faded-list').css('display','inline-block');
        
    }
    else {
        $('#faded-list').fadeOut('easy');
        $('.pushable>span').css('opacity', '1');
    }
    
    shiftWidth = -shiftWidth;
    isPushable = !isPushable;
}
//**************************************************************
//prefilter for the ajax request
function fetchSiteData() {
    $.ajaxPrefilter(function (options) {
        if (options.crossDomain) {
            var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
            console.log(options.url)
            options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
            //options.url = "http://cors.corsproxy.io/url=" + options.url;
        }
    });
    $.get('https://github.com/MOHIT51196?tab=repositories').done(function (data) {
        $('.pop-me').append($(data).popup());
        $('.pop-me').css('background', 'rgba(0, 0, 0, 0.7)');
        $(data).popup('open');
    });
}

function ajaxFetch(response) {
    siteContainer = $('#site-wrapper');
    $('#fetchBtn').hide();
    siteContainer.html(response).promise().done(function () {
        siteContainer.fadeIn(2000);
        $('#water-mark').show();
    });
}
//****************************************************************