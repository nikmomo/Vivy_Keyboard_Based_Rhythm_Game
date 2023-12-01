class Particle {
  constructor(x, y, direction) {
    this.x = x;
    this.y = y;
    this.direction = direction; 
    this.alpha = 255; 
    this.length = 5; 
  }

  update() {
    this.alpha -= 6;
    
    if (this.direction === "left" || this.direction === "right") {
      this.length += 3;  
    } else {
      this.length += 1; 
    }

    return this.alpha > 0; 
  }

  display() {
    fill(255, this.alpha);
    noStroke();

    if (this.direction === "left") {
      triangle(
        this.x, this.y,
        this.x + this.length, this.y - this.length / 2,
        this.x + this.length, this.y + this.length / 2
      );
    } else if (this.direction === "right") {
      triangle(
        this.x, this.y,
        this.x - this.length, this.y - this.length / 2,
        this.x - this.length, this.y + this.length / 2
      );
    } else {
      triangle(
        this.x, this.y,
        this.x - this.length / 2, this.y + this.length,
        this.x + this.length / 2, this.y + this.length
      );
    }
  }
}
