$(document).ready(function () {
    $(window).on('load scroll', function () {
        var scrolled = $(this).scrollTop();
        $('#top_vid').css('transform', 'translate3d(0, ' + -(scrolled * 0.25) + 'px, 0)'); // parallax (25% scroll rate)
        var videoScroll = scrolled - 1500;
        $('#vimeo_video').css('transform', 'translate3d(0, ' + (videoScroll * 0.25) + 'px, 0)');
    });
    animateBicycleFeatures();
    enableVimeoVidControls();
    setKeyTechCaptions();
})

function enableVimeoVidControls() {
    var vimeoVideo = $('#vimeo_video').get(0),
        playBtn = $('#play_video_control'),
        textOnVideo = $('#text_video'),
        bottomControls = $('.bottom_controls'),
        pauseBtn = $('#pause_video_control'),
        volumeBtn = $('#volume_video_control');
    $('.vimeo_video_controls').click(function (e) {
        target = $(e.target);
        if (target.closest('#play_video_control').length) {
            playVideo();
        } else if (target.closest('#pause_video_control').length) {
            pauseVideo();
        } else if (target.closest('#volume_video_control').length) {
            toggleVolume();
        }
    })

    function playVideo() {
        textOnVideo.fadeOut();
        vimeoVideo.play();
        playBtn.fadeOut();
        bottomControls.fadeIn();
    }

    function pauseVideo() {
        textOnVideo.fadeIn();
        vimeoVideo.pause();
        playBtn.fadeIn();
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
    indicators.on('mouseover mouseout', function (e) {
        var target = $(e.currentTarget),
            idStr = target.attr('id'),
            descrItem = $("[data-label='" + idStr + "']");
            stylesObject = {};
        if (e.type == 'mouseover') {
            stylesObject['opacity'] = 1;
            if(window.innerWidth >= 992){
                var targetPosition = {
                    top: parseInt(target.css('top')),
                    left: parseInt(target.css('left'))
                },
                    top, left;
                if (target.attr('id') == 'engineered_for_speed') {
                    top = targetPosition.top - descrItem.height() + 24;
                } else {
                    top = targetPosition.top - descrItem.height() / 2 + 12;
                }
                if (target.data('direction') == 'left') {
                    left = targetPosition.left - descrItem.width() - 12;
                } else {
                    left = targetPosition.left + 36;
                }
                stylesObject['top'] = top + 'px';
                stylesObject['left'] = left + 'px';
            }
        } else {
            stylesObject['opacity'] = '';
        }
        descrItem.css(stylesObject);
    })
    $(window).on('resize', function(){
        if(window.innerWidth < 992){
            $('[data-label]').removeAttr('style');
        }
    })
}