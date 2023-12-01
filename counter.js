// Class representing a counter that keeps 
// track of the progress towards a goal
class counter{
    // Constructor to initialize the counter with a goal
    constructor(goal){
        this.point = 0;
        this.goal = goal;
        this.miss = 0;
        this.good = 0;
        this.perfect = 0;
        this.result = "0.0%";
    }

    // draw the counter on the canvas
    draw(){
        let score = round(this.point / this.goal * 100, 2);
        push();
        textSize(20);
        this.result = score + "%";
        fill(255);
        text(this.result, 330, 30);
        pop();
    }

    countMiss(){
        this.miss = this.goal - this.good - this.perfect;
    }

    addGood(){
        this.good++;
        this.point += goodScore;
    }

    addPerfect(){
        this.perfect++;
        this.point += perfectScore;
    }
}
