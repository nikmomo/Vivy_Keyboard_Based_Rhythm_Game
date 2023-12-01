let notes = [];
let noteTimer = 0;
let noteInterval = 20; // note drop speed

function setup() {
  createCanvas(400, 400);
  stat = 0;
  start = new startPage();
  songSelection = new SongSelection();
  gameplay = new Gameplay();
  decisionLine = new decisionLines();
  testsong =  { title: "TEST", level: "Easy", length: "0:30", author: "Vivy", bpm: "100" }
  if (stat == 5){
    gameplay.loadSong(testsong);
  }
  preload();
}

function draw() {
  background(100);
  switch (stat) {
    case 0:
      // Start page
      noteTimer++;
      if (noteTimer > noteInterval) {
        let position = floor(random(7));
        notes.push(new Note(position));
        noteTimer = 0;
      }

      for (let i = notes.length - 1; i >= 0; i--) {
        notes[i].update();
        notes[i].display();

        if (!notes[i].update()) {
          notes.splice(i, 1); // remove note
        }
      }
      decisionLine.draw();
      background(0, 100);
      drawStartTitle();
      start.draw();

      break;
    case 1:
      // instruction page
      noteTimer++;
      if (noteTimer > noteInterval) {
        let position = floor(random(7));
        notes.push(new Note(position));
        noteTimer = 0;
      }

      for (let i = notes.length - 1; i >= 0; i--) {
        notes[i].update();
        notes[i].display();

        if (!notes[i].update()) {
          notes.splice(i, 1); // remove note
        }
      }
      decisionLine.draw();
      background(0, 100);
      displayInstructions();
      break;
    case 2:
      // Selection page
      noteTimer++;
      if (noteTimer > noteInterval) {
        let position = floor(random(7));
        notes.push(new Note(position));
        noteTimer = 0;
      }

      for (let i = notes.length - 1; i >= 0; i--) {
        notes[i].update();
        notes[i].display();

        if (!notes[i].update()) {
          notes.splice(i, 1); // remove note
        }
      }
      decisionLine.draw();
      background(0, 100);
      songSelection.update(mouseX, mouseY);
      songSelection.display();
      break;
    case 3:
      // game page
      gameplay.update();
      decisionLine.draw();
      if (!gameplay.isPlaying) stat = 4;
      break;
    case 4:
      displayPlayAgain();
      break;
    case 5:
      // test page
      gameplay.update();
      decisionLine.draw();
  }
}

function drawStartTitle() {
  push();
  textSize(60);
  fill("white");
  text("Vivy", 202, 162);
  fill(135, 206, 250);
  text("Vivy", 200, 160);
  pop();

  push();
  textSize(20);

  if (mouseX > 100 && mouseX < 250 && mouseY > 230 && mouseY < 270) {
    fill(255);
  } else {
    fill(255, 180);
  }
  text("> Game start", 120, 260);
  if (mouseX > 100 && mouseX < 250 && mouseY > 275 && mouseY < 305) {
    fill(255);
  } else {
    fill(255, 180);
  }
  text("> Instruction", 120, 290);
  pop();

  push();
  textSize(10);

  fill(255);
  text('Author: Zhen "Shin" Zhang', 260, 380);
  pop();
}

function displayInstructions() {
  push();
  fill(255);
  textSize(32);
  text("How to Play:", 40, 100);
  textSize(16);
  text("Hit the left notes with: QW, ASD, ZXC", 40, 140);
  text("Hit the right notes with: PO, JKL, NM,", 40, 170);
  text("Hit the bottom note with: SPACE", 40, 200);

  textSize(20);
  if (mouseX > 130 && mouseX < 230 && mouseY > 300 && mouseY < 340) {
    fill(255);
  } else {
    fill(255, 180);
  }
  text("> To homepage", 130, 320);
  pop();
}

function displayPlayAgain() {
  push();
  fill(255);
  textSize(32);
  text("End Game", 40, 100);
  textSize(16);
  text("Your Result: " + round(gameplay.counter.point, 2) + "/" + gameplay.counter.goal, 40, 140);
  text("Score: " + gameplay.counter.result, 40, 160);
  text("Perfect: " + gameplay.counter.perfect, 40, 180);
  text("Good: " + gameplay.counter.good, 40, 200);
  text("Miss: " + gameplay.counter.miss, 40, 220);

  textSize(20);
  if (mouseX > 100 && mouseX < 250 && mouseY > 230 && mouseY < 270) {
    fill(255);
  } else {
    fill(255, 180);
  }
  text("> Continue", 120, 260);
  if (mouseX > 100 && mouseX < 250 && mouseY > 275 && mouseY < 305) {
    fill(255);
  } else {
    fill(255, 180);
  }
  text("> To homepage", 120, 290);
  pop();
}

function mouseClicked() {
  switch (stat) {
    case 0:
      if (mouseX > 100 && mouseX < 250 && mouseY > 230 && mouseY < 270) {
        stat = 2;
      } else if (mouseX > 100 && mouseX < 250 && mouseY > 275 && mouseY < 305) {
        stat = 1;
      }
      break;
    case 1:
      if (mouseX > 130 && mouseX < 230 && mouseY > 300 && mouseY < 340) {
        stat = 0;
      }
      break;
    case 2:
      songSelection.checkSelection(mouseX, mouseY);
      if (songSelection.isStartButtonClicked(mouseX, mouseY)) {
        console.log("Start the game with:", songSelection.selectedSong.title);
        gameplay.loadSong(songSelection.selectedSong);
        // Proceed to start the game
        stat = 3;
      }
      break;
    case 4:
      if (mouseX > 100 && mouseX < 250 && mouseY > 230 && mouseY < 270) {
        stat = 2;
      } else if (mouseX > 100 && mouseX < 250 && mouseY > 275 && mouseY < 305) {
        stat = 0;
      }
      break;
  }
}

function keyPressed() {
  // console.log(key);
  switch (key.toLowerCase()) {
    case "q":
    case "w":
    case "e":
      gameplay.hitNote(0);
      break;
    case "a":
    case "s":
    case "d":
      gameplay.hitNote(1);
      break;
    case "z":
    case "x":
    case "c":
      gameplay.hitNote(2);
      break;
    case "p":
    case "o":
    case "i":
      gameplay.hitNote(3);
      break;
    case "l":
    case "k":
    case "j":
      gameplay.hitNote(4);
      break;
    case "m":
    case "n":
    case "b":
    case ",":
      gameplay.hitNote(5);
      break;
    case " ": // Spacebar
      gameplay.hitNote(6);
      break;
  }
}
