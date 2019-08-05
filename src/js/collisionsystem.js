// Global constants
var MAX_DT = 1000000;
var MAX_PQ_SIZE = 100000;

// Global fields for managing the simulation
var particles;
var freq;
var time;
var eventPQ;
var currentEventTimeout;

/**
 * Start the simulation given particles and an initial draw frequency. Clearing
 * the currentEventTimeout guaruntees safe reuse of this method throughout the
 * programs life.
 */
function simulate(particlesIn, drawFreq) {
  if(currentEventTimeout) clearTimeout(currentEventTimeout);
  eventPQ = new MinPQ();
  particles = particlesIn;
  freq = drawFreq;
  time = 0;

  particles.forEach((particle) => predict(particle));
  eventPQ.insert(new Event(0, null, null));
  nextEvent();
}

/**
 * Adds collision events to the priority queue for the given particle.
 */
function predict(particle) {
  if (particle == null) return;

  for(let i=0; i<particles.length; i++){
    let dt = particle.timeToHit(particles[i]);
    if(dt < MAX_DT) eventPQ.insert(new Event(time + dt, particle, particles[i]));
  }

  let dtX = particle.timeToHitVerticalWall();
  let dtY = particle.timeToHitHorizontalWall();

  if(dtX < MAX_DT) eventPQ.insert(new Event(time + dtX, particle, null));
  if(dtY < MAX_DT) eventPQ.insert(new Event(time + dtY, null, particle));
}

/**
 * Takes the next event off the stack and conducts it. nextEvent is called
 * recursively in order to support setTimeout() in the redrawSimulation method.
 * The call stack will be depleted regularly when setTimeout() is used. This
 * solution is not ideal but is practical given JavaScript's synchronous
 * nature.
 */
function nextEvent() {
  if(eventPQ.isEmpty()) return;

  if(eventPQ.size() > MAX_PQ_SIZE) clearInactives();

  let e = eventPQ.delMin();
  if(e.isValid()) {
    let a = e.particleA;
    let b = e.particleB;

    particles.forEach((particle) => particle.move(e.time - time));

    time = e.time;

    if(a == null && b == null){
      redrawSimulation();
      predict(a);
      predict(b);
      return;
    } else if (a != null && b != null){
      a.bounceOff(b);
    } else if (a != null && b == null) {
      a.bounceOffVerticalWall();
    } else if (a == null && b != null) {
      b.bounceOffHorizontalWall();
    }
    predict(a);
    predict(b);
  }
  nextEvent();
}

/**
 * Draws the simulation at the current point, and then continues the recursive
 * calls after a delay using setTimeout().
 */
function redrawSimulation() {
  background(224, 224, 224);

  particles.forEach((particle) => {
    particle.draw();
  })

  eventPQ.insert(new Event(time + 1.0 / freq, null, null));
  currentEventTimeout = setTimeout(nextEvent, 17);
}

/**
 * Clears all inactive events from the priority queue. Requires iteration over
 * all event items in the priority queue, but can reduce strain elsewhere.
 */
function clearInactives() {
  let activeOnlyPQ = new MinPQ();
  while(!eventPQ.isEmpty()) {
    let e = eventPQ.delMin();
    if(e.isValid()) activeOnlyPQ.insert(e);
  }
  eventPQ = activeOnlyPQ;
}

/**
 * Sets the frequency of redraw events.
 */
function setFreq(freqIn) {
  freq = freqIn
}
