import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

player.on('timeupdate', throttle(timeupdateHandler, 1000));

function timeupdateHandler(event) {
  const currentTime = event.seconds;
  localStorage.setItem('videoplayer-current-time', currentTime);
}

window.addEventListener('DOMContentLoaded', startPlayFromStoredTime);

function startPlayFromStoredTime() {
  const currentTimeFromStorage = localStorage.getItem(
    'videoplayer-current-time'
  );
  if (currentTimeFromStorage !== null) {
    player.setCurrentTime(currentTimeFromStorage);
  }
}
