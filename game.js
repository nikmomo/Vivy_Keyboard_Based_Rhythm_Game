const perfectScore = 1;
const goodScore = 0.7;

class Gameplay {
  constructor() {
    this.currentNotes = [];
    this.ptr = 0;
    this.displayNotes = [];
    this.currentSong = null;
    this.isPlaying = false;
    this.startTime = 0;
    this.interval = 0;
    this.counter = null;
    this.song = null;
  }

  loadSong(song) {
    this.currentSong = song;
    this.isPlaying = true;
    const time = parseTimeToMs(this.currentSong.length);
    this.interval = calculateNoteIntervals(this.currentSong.bpm);
    if (this.currentSong.title == "ALL RANDOM")
      this.currentNotes = this.randomNotes(time, this.interval);
    else if (this.currentSong.title == "TEST")
      this.currentNotes = this.testNotes(time, this.interval);
    // else this.currentNotes = this.currentSong.notes;
    else {
      this.currentNotes = this.randomNotes(time, this.interval);
      this.song = musicFile;
    }

    this.startTime = millis();
    this.counter = new counter(this.currentNotes.length);
    if (this.song != null)
      this.song.play();
    console.log("Total time in ms:", time, "Interval: ", this.interval);
  }

  update() {
    if (!this.isPlaying) {
      console.log("END GAME");
      return;
    }

    let currentTime = millis() - this.startTime;

    if (currentTime >= this.interval) {
      let noteToDisplay = this.currentNotes[this.ptr];
      playBeat();
      this.startTime = millis();
      if (noteToDisplay != undefined) {
        this.displayNotes.push(new Note(noteToDisplay));
        //   console.log("Current time:", currentTime);
        //   console.log("Note generated at:", noteToDisplay);
        
        this.ptr++;
      }
    }

    if (this.ptr >= this.currentNotes.length && this.displayNotes.length == 0) {
      this.isPlaying = false;
      this.counter.countMiss();
      console.log("END GAME");
      return;
    }

    // Update and display notes in displayNotes
    for (let i = this.displayNotes.length - 1; i >= 0; i--) {
      let note = this.displayNotes[i];

      if (!note.update())
        this.displayNotes.splice(i, 1);
      else 
        note.display();
    }
    this.counter.draw();
  }

  randomNotes(time, interval) {
    const count = time / interval;
    var result = [];
    for (var n = 0; n < count; n++) {
      let position = floor(random(7));
      result.push(position);
    }
    console.log("random notes:", this.currentNotes);
    return result;
  }

  testNotes(time, interval) {
    const count = time / interval;
    var result = [];
    for (var n = 0; n < count; n++) {
      let position = 6;
      result.push(position);
    }
    return result;
  }

  // Function to handle when a note is hit
  hitNote(position) {
    // Check if there is a note at the decision line for the given position
    // This pseudocode assumes you have a method to check this
    for (let i = this.displayNotes.length - 1; i >= 0; i--) {
      if (
        this.displayNotes[i].position == position &&
        this.displayNotes[i].isOnDecisionLine()
      ) {
        if (this.displayNotes[i].isPerfect) {
          this.counter.addPerfect();
          console.log("Perfect!");
        }
        else {
          this.counter.addGood();
          console.log("Good");
        }
        this.displayNotes.splice(i, 1);
        break;
      }
    }
  }
}

function parseTimeToMs(timeStr) {
  const parts = timeStr.split(":");
  const minutes = parseInt(parts[0]);
  const seconds = parseInt(parts[1]);
  return (minutes * 60 + seconds) * 1000;
}

function calculateNoteIntervals(bpm) {
  return (secondsPerBeat = (60 / bpm) * 1000);
}

class decisionLines {
  constructor() {}

  draw() {
    push();
    this.drawDecisionLine();
    pop();
  }

  drawDecisionLine() {
    // rect(25, 90, 10, 20)
    // rect(25, 190, 10, 20)
    // rect(25, 300, 10, 20)
    push();
    noStroke();
    fill(255, 255, 255, 100);

    push();
    translate(10, 80);

    // Draw a 4-point star shape
    beginShape();
    vertex(10, 20); // Left point
    vertex(18, 19);
    vertex(20, 5); // Top point
    vertex(22, 19);
    vertex(30, 20); // Right point
    vertex(22, 21);
    vertex(20, 35); // Bottom point
    vertex(18, 21);
    endShape(CLOSE);

    pop();

    push();
    translate(10, 180);

    // Draw a 4-point star shape
    beginShape();
    vertex(10, 20); // Left point
    vertex(18, 19);
    vertex(20, 5); // Top point
    vertex(22, 19);
    vertex(30, 20); // Right point
    vertex(22, 21);
    vertex(20, 35); // Bottom point
    vertex(18, 21);
    endShape(CLOSE);

    pop();

    push();
    translate(10, 290);

    // Draw a 4-point star shape
    beginShape();
    vertex(10, 20); // Left point
    vertex(18, 19);
    vertex(20, 5); // Top point
    vertex(22, 19);
    vertex(30, 20); // Right point
    vertex(22, 21);
    vertex(20, 35); // Bottom point
    vertex(18, 21);
    endShape(CLOSE);

    pop();

    push();
    translate(350, 80);

    // Draw a 4-point star shape
    beginShape();
    vertex(10, 20); // Left point
    vertex(18, 19);
    vertex(20, 5); // Top point
    vertex(22, 19);
    vertex(30, 20); // Right point
    vertex(22, 21);
    vertex(20, 35); // Bottom point
    vertex(18, 21);
    endShape(CLOSE);

    pop();

    push();
    translate(350, 180);

    // Draw a 4-point star shape
    beginShape();
    vertex(10, 20); // Left point
    vertex(18, 19);
    vertex(20, 5); // Top point
    vertex(22, 19);
    vertex(30, 20); // Right point
    vertex(22, 21);
    vertex(20, 35); // Bottom point
    vertex(18, 21);
    endShape(CLOSE);

    pop();

    push();

    push();
    translate(350, 290);

    // Draw a 4-point star shape
    beginShape();
    vertex(10, 20); // Left point
    vertex(18, 19);
    vertex(20, 5); // Top point
    vertex(22, 19);
    vertex(30, 20); // Right point
    vertex(22, 21);
    vertex(20, 35); // Bottom point
    vertex(18, 21);
    endShape(CLOSE);

    pop();

    push();
    translate(180, 330);

    // Draw a 4-point star shape
    beginShape();
    vertex(-10, 20); // Left point
    vertex(14, 16);
    vertex(20, 10); // Top point
    vertex(26, 16);
    vertex(50, 20); // Right point
    vertex(24, 24);
    vertex(20, 30); // Bottom point
    vertex(16, 24);
    endShape(CLOSE);

    pop();
    pop();
  }
}
