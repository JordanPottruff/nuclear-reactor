
const INFINITY = Number.MAX_VALUE;

/**
 * Object for defining a particle by its position, velocity, radius, mass, and
 * color.
 */
class Particle {

  constructor(x, y, vx, vy, radius, mass, color) {
      this.x = x;
      this.y = y;
      this.vx = vx;
      this.vy = vy;
      this.radius = radius;
      this.mass = mass;
      this.color = color;
      this.count = 0;
  }

  /**
   * Gets the count of collisions this particle has undergone.
   */
  getCount() {
    return this.count;
  }

  /**
   * Draws the particle at its current position
   */
  draw() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.radius*2, this.radius*2);
  }

  /**
   * Moves the particle to its position after dt time.
   */
  move(dt) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
  }

//
//  CALCULATIONS FOR FINDING THE TIME TO A COLLISION
//

  timeToHit(particle) {
      if (this == particle) return INFINITY;
      const dx = particle.x - this.x;
      const dy = particle.y - this.y;
      const dvx = particle.vx - this.vx;
      const dvy = particle.vy - this.vy;
      const dvdr = dx*dvx + dy*dvy;
      if (dvdr > 0) return INFINITY;
      const dvdv = dvx*dvx + dvy*dvy;
      if(dvdv == 0) return INFINITY;
      const drdr = dx*dx + dy*dy;
      const sigma = particle.radius + this.radius;
      const d = (dvdr*dvdr) - dvdv * (drdr - sigma*sigma);

      if(d < 0) return INFINITY;
      const answer = -(dvdr + Math.sqrt(d)) / dvdv;
      return Math.abs(answer);
  }

  timeToHitVerticalWall() {
    if (this.vx > 0) return (WIDTH - this.x - this.radius) / this.vx;
    else if (this.vx < 0) return (this.radius - this.x) / this.vx;
    else return INFINITY;
  }

  timeToHitHorizontalWall() {
    if (this.vy > 0) return (HEIGHT - this.y - this.radius) / this.vy;
    else if (this.vy < 0) return (this.radius - this.y) / this.vy;
    else return INFINITY;
  }

//
// METHODS FOR DETERMINING COLLISION RESOLUTION
//

  bounceOff(particle) {
    const dx = particle.x - this.x;
    const dy = particle.y - this.y;
    const dvx = particle.vx - this.vx;
    const dvy = particle.vy - this.vy;
    const dvdr = dx*dvx + dy*dvy;
    const dist = particle.radius + this.radius;

    const magnitude = 2 * particle.mass * this.mass * dvdr / ((particle.mass + this.mass) * dist);

    const fx = magnitude * dx / dist;
    const fy = magnitude * dy / dist;

    this.vx += fx / this.mass;
    this.vy += fy / this.mass;
    particle.vx -= fx / particle.mass;
    particle.vy -= fy / particle.mass;

    this.count++;
    particle.count++;
  }

  bounceOffVerticalWall() {
    this.vx = -this.vx;
    this.count++;
  }

  bounceOffHorizontalWall() {
    this.vy = -this.vy;
    this.count++;
  }
}
