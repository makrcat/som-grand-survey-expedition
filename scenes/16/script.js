var player;
let hasPlayed = false;

function onYouTubePlayerAPIReady() {
    player = new YT.Player('player', {
              width: '640',
              height: '390',
              videoId: 'LDU_Txk06tM',
              playerVars: {
                  'rel': 0,
                  'modestbranding': 0,
                //   'controls': 0,
                  // 'autoplay': 1,
                  // 'loop': 1,
                  // 'playlist': 'LDU_Txk06tM'
                },
              events: {
                onStateChange: onPlayerStateChange
              }
            });
}

function onPlayerStateChange(event) {
    console.log(event);
    if (event.data == YT.PlayerState.PLAYING) {
        if (!hasPlayed) {
            hasPlayed = true;
        }
        console.log("Video is playing.");
    } else if (event.data == YT.PlayerState.PAUSED) {
        console.log("Video is paused.");
    } else if (event.data == YT.PlayerState.ENDED) {
        console.log("Video has ended.");
    } else if (event.data == YT.PlayerState.BUFFERING) {
        console.log("Video is buffering.");
    }
}

document.addEventListener('DOMContentLoaded', () => {

});