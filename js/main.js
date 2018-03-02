$(document).ready(function () {
    $(window).on('load scroll', function (e) {
        var scrolled = $(this).scrollTop();
        setParallax(scrolled, $('.parallax_item'));
        e.type == 'load' && setKeyTechCaptions();
    });
    animateBicycleFeatures();
    enableVimeoVidControls();
    enable360Slider();
    $('.popup_grid_section').magnificPopup({
        delegate: 'a', // child items selector, by clicking on it popup will open
        type: 'image',
        gallery: {
            enabled: true
        },
        titleSrc: function (item) {
            return item.el.attr('title');
        },
        removalDelay: 500, //delay removal by X to allow out-animation
        callbacks: {
            beforeOpen: function () {
                // just a hack that adds mfp-anim class to markup 
                this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                this.st.mainClass = this.st.el.attr('data-effect');
            },
            open: function () {
                $('html').css({
                    'overflow': 'auto',
                    'margin-right': 0
                })
            }
        },
        closeOnContentClick: true,
        midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
        // other options
    });
})

function enableVimeoVidControls() {
    var vimeoVideo = $('#vimeo_video').get(0),
        playVideoBlock = $('.play_btn_container'),
        bottomControls = $('.bottom_controls'),
        volumeBtn = $('#volume_video_control'),
        background = true;
    $('.vimeo_video_controls').click(function (e) {
        var target = $(e.target);
        if (target.closest('#play_video_control').length) {
            if (background) {
                e.delegateTarget.style.background = 'transparent';
                background = false;
            }
            playVideo();
        } else if (target.closest('#pause_video_control').length) {
            pauseVideo();
        } else if (target.closest('#volume_video_control').length) {
            toggleVolume();
        }
    })

    function playVideo() {
        playVideoBlock.fadeOut();
        vimeoVideo.play();
        bottomControls.fadeIn();
    }

    function pauseVideo() {
        playVideoBlock.fadeIn();
        vimeoVideo.pause();
        bottomControls.fadeOut();
    }

    function toggleVolume() {
        var volumeEnabled = (!vimeoVideo.volume == 0),
            volumeIcon = volumeBtn.find('.fa');
        switch (volumeEnabled) {
            case true:
                vimeoVideo.volume = 0;
                volumeIcon.addClass('fa-volume-off').removeClass('fa-volume-up');
                break;
            case false:
                vimeoVideo.volume = 1;
                volumeIcon.addClass('fa-volume-up').removeClass('fa-volume-off');
                break;
        }
    }
}

function animateBicycleFeatures() {
    var animatedListItems = $('.animated');

    $.each(animatedListItems, function (index, item) {
        $(item).waypoint(function () {
            $(animatedListItems[index]).addClass('fadeInUp');
        }, { offset: '80%' });
    });
}

function setKeyTechCaptions() {
    var indicators = $('.key_tech_svg_container');
    indicators.each(setCaptionPosition);
    indicators.on('mouseover mouseout', function (e) {
        var target = $(e.currentTarget),
            idStr = target.attr('id'),
            descrItem = $("[data-label='" + idStr + "']");
        if (e.type == 'mouseover') {
            descrItem.css('opacity', 1);
        } else {
            descrItem.css('opacity', '');
        }
    })
    $(window).on('resize', function () {
        if (window.innerWidth < 992) {
            $('[data-label]').removeAttr('style');
        } else {
            indicators.each(setCaptionPosition);
        }
    })

    function setCaptionPosition(index, indicator) {
        var indicator = $(indicator),
            idStr = indicator.attr('id'),
            descrItem = $("[data-label='" + idStr + "']");
        if (window.innerWidth >= 992) {
            var targetPosition = {
                top: parseInt(indicator.css('top')),
                left: parseInt(indicator.css('left'))
            },
                top, left;
            if (indicator.attr('id') == 'engineered_for_speed') {
                top = targetPosition.top - descrItem.height() + 24;
            } else {
                top = targetPosition.top - descrItem.height() / 2 + 12;
            }
            if (indicator.data('direction') == 'left') {
                left = targetPosition.left - descrItem.width() - 12;
            } else {
                left = targetPosition.left + 36;
            }
            descrItem.css({
                'top': top + 'px',
                'left': left + 'px'
            })
        }
    }
}

function enable360Slider() {
    var imagesList = $('.threesixty_images li'),
        previous = 0;
    $('#threesixty_range_slider').on('input', function (e) {
        var value = $(this).val(),
            percent = value < 4 ? Math.ceil(100 / 7 * value) : Math.floor(100 / 7 * value);
        gradient = 'linear-gradient(to right, #0033ff ' + percent + '%, silver 0)';
        $(this).css('background', gradient);
        imagesList[previous].classList.remove('active');
        imagesList[value].classList.add('active');
        previous = value;
    })
}

function setParallax(scrolled, elemArray) {
    $.each(elemArray, function (index, item) {
        var elem = $(item),
            translateVal = (scrolled - Math.round(elem.offset().top)) * 0.5;
        elem.css('transform', 'translateY(' + translateVal + 'px)');
    })
}