
class Event {
  constructor(time, particleA, particleB) {
    this.time = time;
    this.particleA = particleA;
    this.particleB = particleB;
    if (particleA != null) this.countA = this.particleA.count;
    else this.countA = -1;
    if (particleB != null) this.countB = this.particleB.count;
    else this.countB = -1;
  }

  compareTo(otherEvent) {
    if (this.time > otherEvent.time) return 1;
    else if (this.time < otherEvent.time) return -1;
    else return 0;
  }

  isValid() {
    if (this.particleA != null && this.particleA.count != this.countA) return false;
    if (this.particleB != null && this.particleB.count != this.countB) return false;
    return true;
  }
}
