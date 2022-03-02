let myCircle;
let myRectangle;

class Circle {
  constructor() {
    this.radius = 25;
    this.pos = createVector(this.radius, this.radius);
  }
  draw() {
    if (keyIsDown(UP_ARROW)) {
      this.pos.y -= 5;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.pos.y += 5;
    }
    if (keyIsDown(LEFT_ARROW)) {
      this.pos.x -= 5;
    }

    if (keyIsDown(RIGHT_ARROW)) {
      this.pos.x += 5;
    }
    properCircleRectCol(this, myRectangle);
    fill("red");
    circle(this.pos.x, this.pos.y, this.radius * 2);
  }
}

class Rectangle {
  constructor() {
    this.width = 200;
    this.height = 200;
    this.x = 200;
    this.y = 200;
  }

  draw() {
    fill("yellow");
    rect(this.x, this.y, this.width, this.height);
  }
}
function setup() {
  createCanvas(600, 600);
  myCircle = new Circle();
  myRectangle = new Rectangle();
}

function draw() {
  background(50);
  myCircle.draw();
  myRectangle.draw();
}

function properCircleRectCol(c, R) {
  const nX = max(R.x, min(R.x + R.width, c.pos.x));
  const nY = max(R.y, min(R.y + R.height, c.pos.y));
  const N = createVector(c.pos.x - nX, c.pos.y - nY);

  // actually draw closest point
  fill("white");
  circle(nX, nY, 10);

  const Nmag = N.mag();

  const collisionHasOccured = Nmag <= c.radius;

  if (collisionHasOccured) {
    const Nnorm = N.copy().normalize();
    c.pos.add(Nnorm.mult(c.radius - Nmag));
  }
}
