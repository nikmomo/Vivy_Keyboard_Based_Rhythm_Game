let beatSound;
let musicFile;

function preload() {
  beatSound = loadSound("./music/beat.wav");
  musicFile = loadSound("./music/t+pazolite - Oshama Scramble!.mp3");
}

function playBeat() {
  if (beatSound.isPlaying()) {
    beatSound.stop();
  }
  beatSound.play();
}

const song1Notes = {
  title: "Oshama Scramble!",
  level: "HARD",
  length: "1:50",
  author: "Shin",
  file: "t+pazolite - Oshama Scramble!.mp3",
  bpm: 190,
  notes: [1, 3, 7, 6, 2, 3, 4, 5, 6, 7, 2, 3],
};
