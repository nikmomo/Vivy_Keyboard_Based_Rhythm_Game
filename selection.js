class SongSelection {
    constructor() {
        this.songs = [
            { title: "ALL RANDOM", level: "Easy", length: "0:30", author: "Vivy", bpm: "100" },
            song1Notes];
        this.selectedSong = null;
        this.hoveredSong = null;
    }

    display() {
        this.drawStartButton();
        push();
        for (let i = 0; i < this.songs.length; i++) {
            let y = 60 * i + 20; // Spacing out songs

            // Highlight the selected song
            if (this.songs[i] === this.selectedSong) {
                fill(255);
            } else if (this.songs[i] === this.hoveredSong){
                fill(100, 100, 150, 220);
            }
            else {
                fill(100, 100, 150, 100);
            }
            rect(100, y, 700, 50);

            fill(0);
            text(`${this.songs[i].title}`, 120, y + 20);
            text(`${this.songs[i].level}`, 120, y + 40);
            text(`BPM: ${this.songs[i].bpm}`, 160, y + 40);
            text(`Length: ${this.songs[i].length}`, 280, y + 20);
            text(`Author: ${this.songs[i].author}`, 280, y + 40);
        }
        pop();
    }

    update(mouseX, mouseY) {
        this.hoveredSong = null;
        for (let i = 0; i < this.songs.length; i++) {
            let y = 60 * i + 20;
            if (mouseX > 50 && mouseX < 750 && mouseY > y && mouseY < y + 50) {
                this.hoveredSong = this.songs[i];
                break;
            }
        }
    }

    checkSelection(mouseX, mouseY) {
        if (this.hoveredSong) {
            this.selectedSong = this.hoveredSong;
            console.log(`Selected: ${this.selectedSong.title}`);
            return this.selectedSong;
        }
        return null;
    }

    drawStartButton() {
        push();
        if (this.selectedSong) {
            fill(255);
        } else {
            fill(100, 100, 150, 100);
        }
        rect(10, 325, 80, 40); // Button position

        fill(0);
        textSize(12);
        textAlign(CENTER, CENTER);
        text("Start Game", 50, 345);
        pop();
    }

    isStartButtonClicked(mouseX, mouseY) {
        if (this.selectedSong && mouseX >= 10 && mouseX <= 90 && mouseY >= 325 && mouseY <= 365) {
            return true;
        }
        return false;
    }
}
