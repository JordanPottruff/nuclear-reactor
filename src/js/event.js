
/**
 * Object representing an "event" in the simulation. If an event involves
 * particles, it becomes invalid when those particles have more collisions
 * then they initially did. I.e. those particles are now on a different path
 * than when the event was initialized.
 */
class Event {
  constructor(time, particleA, particleB) {
    this.time = time;
    this.particleA = particleA;
    this.particleB = particleB;
    if (this.particleA != null) this.countA = this.particleA.getCount();
    else this.countA = -1;
    if (this.particleB != null) this.countB = this.particleB.getCount();
    else this.countB = -1;
  }

  /*
   * A method is "smaller" when it is going to occur earlier.
   */
  compareTo(otherEvent) {
    if (this.time > otherEvent.time) return 1;
    else if (this.time < otherEvent.time) return -1;
    else return 0;
  }

  /*
   * Determines an event is valid if its collision counts haven't changed.
   */
  isValid() {
    if (this.particleA != null && this.particleA.getCount() != this.countA) return false;
    if (this.particleB != null && this.particleB.getCount() != this.countB) return false;
    return true;
  }
}
