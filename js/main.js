$(document).ready(function () {
    $(window).on('load scroll', function () {
        var scrolled = $(this).scrollTop();
        $('#top_vid').css('transform', 'translate3d(0, ' + -(scrolled * 0.25) + 'px, 0)'); // parallax (25% scroll rate)
    });
    enableVimeoVidControls();
})

function enableVimeoVidControls() {
    var vimeoVideo = $('#vimeo_video').get(0),
        playBtn = $('#play_video_control'),
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
        vimeoVideo.play();
        playBtn.fadeOut();
        bottomControls.fadeIn();
    }

    function pauseVideo() {
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