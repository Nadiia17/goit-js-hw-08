import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

player.on('timeupdate', throttle(timeupdateHandler, 1000));

function timeupdateHandler(event) {
  const currentTime = event.seconds;
  localStorage.setItem('videoplayer-current-time', currentTime);
}

window.addEventListener('DOMContentLoaded', startPlayFromCurrentTime);

function startPlayFromCurrentTime() {
  const currentTimeFromStorage = localStorage.getItem(
    'videoplayer-current-time'
  );
  if (currentTimeFromStorage !== null) {
    player.setCurrentTime(currentTimeFromStorage);
    //   .then(function (seconds) {
    //     // seconds = the actual time that the player seeked to
    //   })
    //   .catch(function (error) {
    //     switch (error.name) {
    //       case 'RangeError':
    //         // the time was less than 0 or greater than the video’s duration
    //         break;

    //       default:
    //         // some other error occurred
    //         break;
    //     }
    //   });
  }
}
