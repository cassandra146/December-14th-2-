let points = [];
const numPoints = 100;
const connectionDistance = 100;
const pointSize = 4;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Create initial points with random positions
  for (let i = 0; i < numPoints; i++) {
    points.push({
      x: random(width),
      y: random(height),
      vx: random(-1, 1),
      vy: random(-1, 1)
    });
  }
}

function draw() {
  background(0); // Black background
  
  // Create a point that follows the mouse with easing
  let mousePoint = {
    x: mouseX,
    y: mouseY
  };
  
  // Update and draw points
  for (let i = 0; i < points.length; i++) {
    let p = points[i];
    
    // Move points
    p.x += p.vx;
    p.y += p.vy;
    
    // Bounce off edges
    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;
    
    // Attract points to mouse
    let d = dist(p.x, p.y, mouseX, mouseY);
    if (d < 200) {
      let angle = atan2(mouseY - p.y, mouseX - p.x);
      p.vx += cos(angle) * 0.2;
      p.vy += sin(angle) * 0.2;
    }
    
    // Limit velocity
    let velocity = sqrt(p.vx * p.vx + p.vy * p.vy);
    if (velocity > 2) {
      p.vx = (p.vx / velocity) * 2;
      p.vy = (p.vy / velocity) * 2;
    }
    
    // Draw connections
    stroke(255, 100); // White with transparency
    for (let j = i + 1; j < points.length; j++) {
      let other = points[j];
      d = dist(p.x, p.y, other.x, other.y);
      if (d < connectionDistance) {
        // Make line opacity based on distance
        let alpha = map(d, 0, connectionDistance, 255, 0);
        stroke(255, alpha);
        line(p.x, p.y, other.x, other.y);
      }
    }
    
    // Draw points
    noStroke();
    fill(255);
    ellipse(p.x, p.y, pointSize, pointSize);
  }
}

// Resize canvas when window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

