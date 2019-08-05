# Particular Simulator in JavaScript
**Author**: Jordan Pottruff
<br>
**Link**: [click here to simulate!](https://jordanpottruff.github.io/particle-simulator-js/src/)

This is a JavaScript implementation of an event-driven simulation of elastic particle collisions. 
The benefit of this event-driven design is that it allows for highly precise and consistent 
simulations of thousands of closely packed particles. This is because each collision's timing is 
calculated and treated as an event that must be handled at a precise time. This is superior to 
more naive simulations that rely upon simulating a required number of frames, checking for overlap
in between. 
