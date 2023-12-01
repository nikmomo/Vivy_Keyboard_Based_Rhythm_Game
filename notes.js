perfectZone = [{'x1': 25, 'y1': 90, 'x2': 35, 'y2': 110},
                {'x1': 15, 'y1': 180, 'x2': 45, 'y2': 220},
                {'x1': 15, 'y1': 290, 'x2': 35, 'y2': 380},
                {'x1': 365, 'y1': 90, 'x2': 375, 'y2': 110},
                {'x1': 355, 'y1': 180, 'x2': 385, 'y2': 220},
                {'x1': 355, 'y1': 300, 'x2': 375, 'y2': 380},
                {'x1': 185, 'y1': 345, 'x2': 215, 'y2': 355}];

goodZone = [{'x1': 15, 'y1': 80, 'x2': 45, 'y2': 120},
              {'x1': 5, 'y1': 170, 'x2': 55, 'y2': 230},
              {'x1': 5, 'y1': 280, 'x2': 55, 'y2': 390},
              {'x1': 345, 'y1': 70, 'x2': 395, 'y2': 130},
              {'x1': 345, 'y1': 170, 'x2': 395, 'y2': 230},
              {'x1': 345, 'y1': 280, 'x2': 395, 'y2': 390},
              {'x1': 175, 'y1': 335, 'x2': 225, 'y2': 365}];

class Note {
  constructor(position) {
    this.position = position; // 0 top left, 1 mid left, 2 bottom left, 3 top right, 4 mid right, 5 bottom right, 6 mid bottom
    this.x = width / 2;
    this.y = 0;
    this.z = height;
    this.speed = 2;
    this.radius = 20;
    this.particles = [];
    this.travelTime = 300;
    this.calculateSpeed();
    this.isPerfect = false;
  }

  update() {
    
    switch (this.position) {
      case 0:
        this.x -= this.speed * 0.88;
        this.y += this.speed * 0.5;
        break;
      case 1:
        this.x -= this.speed * 0.88;
        this.y += this.speed * 1.1;
        break;
      case 2:
        this.x -= this.speed * 0.9;
        this.y += this.speed * 1.7;
        break;
      case 3:
        this.x += this.speed * 0.88;
        this.y += this.speed * 0.5;
        break;
      case 4:
        this.x += this.speed * 0.88;
        this.y += this.speed * 1.1;
        break;
      case 5:
        this.x += this.speed * 0.88;
        this.y += this.speed * 1.8;
        break;
      case 6:
        this.y += this.speed * 1.85;
        break;
    }
    this.z -= 20;

    // Scale the note
    let scaleFactor = map(this.z, 0, height, 1.5, 0.5);
    this.radius = 20 * scaleFactor;

    if (
      (this.position <= 2 && this.x < -100) ||
      (this.position >= 3 && this.position < 6 && this.x > 600) ||
      this.y >= 600
    ) {
      return false; // delete note
    }

    return true; // Note is still active
  }

  display() {
    // Display particles
    for (let p of this.particles) {
      p.display();
    }

    push();
    fill("pink");
    ellipse(this.x, this.y, this.radius / 2, this.radius * 0.3);
    pop();
  }

  calculateSpeed() {
    let horizontalDistance;
    switch (this.position) {
      case 0: // top left
      case 1: // mid left
      case 2: // bottom left
        horizontalDistance = width / 100;
        break;
      case 3: // top right
      case 4: // mid right
      case 5: // bottom right
        horizontalDistance = width / 100;
        break;
      case 6: // mid bottom
        horizontalDistance = 0; 
        break;
    }
    const totalDistance = Math.sqrt(horizontalDistance ** 2 + height ** 2);
    this.speed = totalDistance / this.travelTime;
  }

  isOnDecisionLine() {
    var zone = goodZone[this.position];
    var result = this.y >= zone['y1'] && this.y <= zone['y2'] && this.x >= zone['x1'] && this.x <= zone['x2'];
    var perfect = perfectZone[this.position];
    // push();
    // rect(zone['x1'], zone['y1'], zone['x2'] - zone['x1'], zone['y2'] - zone['y1']);
    // pop();
    this.isPerfect = this.y >= perfect['y1'] && this.y <= perfect['y2'] && this.x >= perfect['x1'] && this.x <= perfect['x2'];
    return result;
  }

}
