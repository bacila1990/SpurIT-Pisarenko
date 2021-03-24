class Popup {
  constructor (play, yuotubeVideoId) {
    this.play = play;
    this.yuotubeVideoId = yuotubeVideoId;
  };

  addPopup() {
    const bodyTag = document.querySelector("body");

    bodyTag.insertAdjacentHTML('beforeend',
    `<div id="popup" class="popup" role="note">
      <div class="popup__content">
        <div class="popup__container thumb-wrap">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/${this.yuotubeVideoId}?autoplay=1&mute=1"
          ></iframe>
        </div>
        <button type="button" id="closePopup" class="popup__button popup__display-topright" aria-label="Close popup">&times;</button>
      </div>
    </div>`);
  };

  listenerPopup = (event) => {
    if (event.key === "Escape" || event.type === "click") {
      const popup = document.getElementById("popup");

      if (popup) {
        document.removeEventListener("keydown", this.listenerPopup, false);
        document.removeEventListener("click", this.listenerPopup, false);
        popup.remove();
      }
    }
  }

  listenerPlay = () => {
    this.addPopup();
    document.addEventListener("keydown", this.listenerPopup, false);
    document.getElementById("closePopup").addEventListener("click", this.listenerPopup, false);
  }

  destroy() {
    const playButton = document.getElementById(this.play);

    playButton.removeEventListener("click", this.listenerPlay, false);
  }

  init() {
    const playButton = document.getElementById(this.play);

    playButton.addEventListener("click", this.listenerPlay, false);
  };
};


// The first argument is the id of the button. The second is id youtube video
let popup = new Popup('play', '7gphiFVVtUI');

popup.init();

// Disconnecting listeners
// popup.destroy();
