/**
 * ECE 4525 - Project 0
 * @author Zhen "Shin" Zhang
 * @description This project is mainly designing a logo animation,
 *              the logo I designed is based on my initial, ZZ.
 *              Two letter overlapping together and give some angle
 *              can provide a feeling of a thunder symbol, so basically
 *              the animation has two meaning, 
 *              1. my name initial; 2. Fast like thunder.
 */

class startPage{
  /**
   * Setting up the program before actually drawing
   */
      constructor() {
          // based variable to record the actual location and spin angle
          this.angle = 0.1;
          this.leftX = 100;
          this.leftY = 150;
          this.rightX = 400;
          this.rightY = 150; // Coordinate of Object Left and Right
          this.ringX = 250;
          this.ringY = 150; // Coordinate of the Circle
      
          this.phase1 = false; // The bool variable to track if the phase 1 is complete
      
          // create the Z symbol at original and the circle at the middle
          this.left = new z(0, 0, [135, 150, 255]);
          this.right = new z(0, 0, [255, 255, 255]); 
      
          this.cir = new ring(this.ringX, this.ringY); 
  
          this.n = 0; // n is use as a parameter of the expontential number
          this.height = 0;
      }
    
    /**
     * Draw function that drawing/ updating the objects repeatly
     */
      draw() {
        push();
        translate(-150, -10);
          color(255); // set the default color as white
      
          if (this.phase1){ // Phase 2 operation
              if (this.cir.size <= 90) // Enlarge the circle size to 90
                  this.cir.enlarge();
              this.rotateExp(); // Make the logo rotate
          }
          else if (this.leftX <= this.rightX + 9){ // Phase 1 Operation end before two Z overlap
              this.moveTowardCenter();
              if (this.leftY <= this.rightY + 8){ // Let this.right Z move a bit upward to looks nice
                  this.rightY -= 0.1;
                  this.right.moveY(-0.1);
              }
              this.rotateNDraw(this.left);
              this.rotateNDraw(this.right);
              
              if (this.angle < 30){ // Slowly increase the angle
                  
                  this.angle += 0.005;
              }
          }
          else { // Let the animation stay still if no matched action
            // this.height = this.height > -50 ? -1 : 0;
              this.rotateNDraw(this.left); 
              this.rotateNDraw(this.right);
              this.phase1 = true;
              
          }
        pop();
          
      }
  
      /**
       * Only adjust X coordinate of two Z object to make them overlap slowly
       */
      moveTowardCenter(){
          this.leftX += 2;
          this.rightX -= 2;
      }
  
      
      /**
       * Rotating all objects exponentially, increase the speed then decrease
       */
      rotateExp(){
          // To make a overlapping effect, Left Z is drawn first 
          // then the circle, then the Right Z
          this.rotateNDraw(this.left);
          
          if (this.angle < 43){ // Increase the rotating speed exponentially
          this.angle += exp(this.n) * 0.262;
          this.n += 0.2;
          }
          else { // Then decrease the speed till n <= 0;
          this.angle += exp(this.n);
          this.n -= 0.1;
          }
          this.rotateNDraw(this.cir);
          this.rotateNDraw(this.right);
      }
  
      /**
       * Rotate the object and draw them out
       * @param {*} target - the object that planning to rotate and draw 
       */
      rotateNDraw(target){
          if (target == this.left){
          push();
          translate(this.leftX, this.leftY);
          rotate(this.angle);
          this.left.draw();
          pop();
          }
          else if (target == this.right){
          push();
          translate(this.rightX, this.rightY);
          rotate(this.angle);
          this.right.draw();
          pop();
          }
          else{
          push();
          translate(this.ringX, this.ringY);
          rotate(this.angle);
          this.cir.draw();
          pop()
          }
      }
    
  }
  
  /**
     * The class for Symbol Z
     * @param:
     * x - X coordinate
     * y - Y coordinate
     * color - The color of the object
     */
  class z{
      constructor(x, y, color){
        // X, Y are center of the object
        this.x = x - 62.5;
        this.y = y - 22.5;
        this.color = color;
      }
      
      draw(){ // Draw out the object
        push();
        noStroke();
        fill(this.color);
        push();
        translate(this.x, this.y);
        
        rect(0, 0, 100, 15);
        rect(22, 44, 100, 15);
        
        push();
        rotate(PI / 3);
        rect(50, -86, 15, 90);
        pop();
        pop();
        pop();
      }
      
      moveY(distance){ // Move on Y coordinate
        this.y += distance;
      }
    
    }
    
    
    
    /**
     * Ring class for the circle ring at the outside of the logo
     * It has two color half orange half white
     * @param
     * x - X coordinate
     * y - Y coordinate
     */
    class ring{
      constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = 5; // default size of the ring
      }
    
      draw(){ // Draw out the ring
        push();
        noFill();
        push();
        // stroke(255, 255, 255, 255);
        stroke(135, 150, 255);
        strokeWeight(9);
        // fill(255, 255, 255);
        arc(0, 0, this.size, this.size, PI / 2, PI * 3 / 2); // The ring starts from PI / 2
        pop();
        push();
        // stroke(230, 230, 0, 255);
        stroke(255, 255, 255, 255);
        strokeWeight(9);
        arc(0, 0, this.size, this.size, PI * 3 / 2, PI / 2);
        pop();
        pop();
      }
    
      enlarge(){
        this.size += 1;
      }
    }
    
  