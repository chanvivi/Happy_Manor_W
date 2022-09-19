const HOST ='ws.srl.tw';
const INDEX_URL = 'https://index2.hl-heritagelife.com/index.html';

$(document).ready(function () {

    //-- 判斷手機 (iphone) --
    if (navigator.userAgent.match(/iPhone/i)) {
        $('.bottom_tool').css('padding-bottom', '15px');
        $('.footer_div').css('margin-bottom', '65px');
    }


    //-- loading_dv .box 轉動 暫時隱藏 --
    var tl = new TimelineMax({ repeat: -1 });
    tl.to('.loading_div .box', 0.8, { 'rotation': '45deg' })
        .to('.loading_div .box', 0.8, { 'rotation': '90deg' });


    setTimeout(() => {

        var tl = new TimelineMax();
        tl.to('.loading_div .box', 0.3, { 'filter': 'blur(5px)', scale: 1.5, opacity: 0 })
            .to('.loading_div img', 0.5, { y: -20, opacity: 0 })
            .to('.loading_div .left_div', 1, { opacity: 0 })
            .to('.loading_div .right_div', 1, { opacity: 0, delay: -1 })
            .to('.loading_div', 0, { 'display': 'none' });

        new WOW().init();

    }, 500);



    if ($(window).width() > 768) {
        var ScrollOut_op = {
            threshold: 0.5,
            once: true,
            cssProps: {
                viewportY: true,
                visibleY: true
            }
        };

    } else {
        var ScrollOut_op = {
            scrollingElement: "#case_div",
            threshold: 0.3,
            once: true,
            cssProps: {
                viewportY: true,
                visibleY: true
            }
        };
    }

    ScrollOut(ScrollOut_op);


    if ($('#myaudio').length > 0) {

        /* ============================== 手機網頁自動播歌 ============================== */
        var audioEl = document.getElementById('myaudio');

        // 可以自动播放时正确的事件顺序是
        // loadstart
        // loadedmetadata
        // loadeddata
        // canplay
        // play
        // playing
        //
        // 不能自动播放时触发的事件是
        // iPhone5  iOS 7.0.6 loadstart
        // iPhone6s iOS 9.1   loadstart -> loadedmetadata -> loadeddata -> canplay

        audioEl.addEventListener('loadstart', function () {
            log('loadstart');
        }, false);

        audioEl.addEventListener('loadeddata', function () {
            log('loadeddata');
        }, false);

        audioEl.addEventListener('loadedmetadata', function () {
            log('loadedmetadata');
        }, false);

        audioEl.addEventListener('canplay', function () {
            log('canplay');
        }, false);

        audioEl.addEventListener('play', function () {
            log('play');
            // 当 audio 能够播放后, 移除这个事件
            window.removeEventListener('touchstart', forceSafariPlayAudio, false);
        }, false);

        audioEl.addEventListener('playing', function () {
            log('playing');
        }, false);

        audioEl.addEventListener('pause', function () {
            log('pause');
        }, false);

        // 由于 iOS Safari 限制不允许 audio autoplay, 必须用户主动交互(例如 click)后才能播放 audio,
        // 因此我们通过一个用户交互事件来主动 play 一下 audio.

        window.addEventListener('touchstart', forceSafariPlayAudio, false);

        audioEl.src = $('#myaudio').attr('data-src');
    }
});


function log(info) {
    console.log(info);
}

function forceSafariPlayAudio() {
    audioEl.load(); // iOS 9   还需要额外的 load 一下, 否则直接 play 无效
    audioEl.play(); // iOS 7/8 仅需要 play 一下
}