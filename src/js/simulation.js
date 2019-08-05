const WIDTH = 700;
const HEIGHT = 700;
const RADIUS_SCALING = 700;

function setup() {
  let canvas = createCanvas(WIDTH, HEIGHT);
  canvas.parent('sketch-holder');
  getSimulation();
}

function getSimulation() {
  let select = document.getElementById("simulation-select");
  let choice = select.options[select.selectedIndex].value;

  let particles;

  switch(choice) {
    case "P10":
      particles = stringToParticles(P10);
      break;
    case "P2000":
      particles = stringToParticles(P2000);
      break;
    case "BILLIARDS3":
      particles = stringToParticles(BILLIARDS3);
      break;
    case "DIFFUSION1":
      particles = stringToParticles(DIFFUSION1);
      break;
    case "DIFFUSION2":
      particles = stringToParticles(DIFFUSION2);
      break;
    case "DIFFUSION3":
      particles = stringToParticles(DIFFUSION3);
      break;
    default:
      particles = new Array();
      maxEvents = 1;
      console.log("Could not get a valid selection");
      break;
  }
  simulate(particles, getSelectedSpeed());
}

function changeSpeed() {
  setFreq(getSelectedSpeed());
}

function getSelectedSpeed() {
  let speedSelect = document.getElementById('speed-select');
  let freqChoice = map(speedSelect.value, speedSelect.min, speedSelect.max, 5, .5);
  return Math.pow(freqChoice, 2)
}

function stringToParticles(particleString) {
  let data = particleString.split(" ");
  let particles = new Array();
  for(let i=0; i<data.length; i+=9) {
    particles.push(new Particle(data[i]*WIDTH,
                                data[i+1]*HEIGHT,
                                data[i+2]*WIDTH,
                                data[i+3]*HEIGHT,
                                data[i+4]*RADIUS_SCALING,
                                data[i+5]*1,
                                color(data[i+6]*1, data[i+7]*1, data[i+8]*1)));
  }
  return particles;
}
