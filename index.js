var canvas = document.querySelector('canvas');
const fpstag = document.getElementById("fps");
const particleCount = document.getElementById("count");
// Function to resize the canvas to the window's inner width and height
function resizeCanvas(particles) {
    canvas.width = window.innerWidth ;
    canvas.height = window.innerHeight ;
   
   
}
// Function to handle touch events
let touchX = 0;
let touchY = 0;
let touch = false;

///////touch



// Function to handle touchstart event
function handleTouchStart(event) {
    // Prevent default behavior (optional)
    event.preventDefault();

    // Get the first touch point's coordinates
    touchX = event.touches[0].clientX;
    touchY = event.touches[0].clientY;
    touch = true;

    console.log(`Touch started at: (${touchX}, ${touchY})`);
}

// Function to handle touchmove event
function handleTouchMove(event) {
    // Prevent default behavior (optional)
    event.preventDefault();

    // Get the updated touch coordinates
    if (event.touches.length > 0) {
        touchX = event.touches[0].clientX;
        touchY = event.touches[0].clientY;
        console.log(`Touch moved to: (${touchX}, ${touchY})`);
    }
}

// Function to handle touchend event
function handleTouchEnd(event) {
    // Prevent default behavior (optional)
    event.preventDefault();

    touch = false;
    console.log("Touch ended");
}

// Attach the touch event listeners
document.addEventListener("touchstart", handleTouchStart, false);
document.addEventListener("touchmove", handleTouchMove, false);
document.addEventListener("touchend", handleTouchEnd, false);


///////touch
// Detect if the device is mobile
function isMobile() {
    return /Mobi|Android/i.test(navigator.userAgent);
}

resizeCanvas()
var c = canvas.getContext('2d');
document.addEventListener('contextmenu', function(e) {
    //e.preventDefault(); // prevents inspect form showing up
});



var mouseX = 0, mouseY = 0;
var RightClick = false;
var LeftClick = false;
var SpacePressed = false;
var ePressed = false;
var reset = false;
var more = false;
var less = false;
var resetpressed = false;
var arows = [false, false, false, false];
var toggle_arows = [false, false, false, false];



function randomInt(num){
    num = Math.floor(Math.random() * num);
    return num;
}
function randomF(num){
    num = Math.random() * num;
    return num;
}

document.addEventListener('mousemove', function(event) {
    mouseX = event.clientX;  // X position relative to the viewport
    mouseY = event.clientY;  // Y position relative to the viewport
});
document.addEventListener('keydown', function(event) {
    if (event.key === ' ') { // The space key's value is a single space character
       SpacePressed = true;
    }
    if (event.key === 'e') { // The space key's value is a single space character
        ePressed = true;
     }
     if (event.key === 'r' && !resetpressed) { // Only trigger the reset action if it hasn't been triggered yet
        reset = true;
    }
    if (event.key === 'm') {
        more = true;
    }
    if (event.key === 'l') {
        less = true;
    }
    if (event.key === "ArrowUp" ) arows[0] = true;
    if (event.key === "ArrowDown") arows[1] = true;
    if (event.key === "ArrowLeft") arows[2] = true;
    if (event.key === "ArrowRight") arows[3] = true;
    
});
document.addEventListener('keyup', function(event) {
    if (event.key === ' ') { // The space key's value is a single space character
       SpacePressed = false;
    }
    if (event.key === 'e') { // The space key's value is a single space character
        ePressed = false;
     }
     if (event.key === 'r') {
        resetpressed = false; // Reset triggered flag on key release
    }
    if (event.key === 'm') {
        more = false;
    }
    if (event.key === 'l') {
        less = false;
    }
    if (event.key === "ArrowUp") arows[0] = false;
    if (event.key === "ArrowDown") arows[1] = false;
    if (event.key === "ArrowLeft") arows[2] = false;
    if (event.key === "ArrowRight") arows[3] = false;
});
// Mouse down event listener to detect mouse press
document.addEventListener('mousedown', function(event) {
    if (event.button === 2) {
        // Right-click detected
        RightClick = true;
    } else if (event.button === 0) {
        // Left-click detected
        LeftClick = true;
    }
});
// Mouse down event listener to detect mouse press
document.addEventListener('mouseup', function(event) {
    if (event.button === 2) {
        // Right-click detected
        RightClick = false;
    } else if (event.button === 0) {
        // Left-click detected
        LeftClick = false;
    }
});
class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // Subtract another vector from this one
    subtract(other) {
        return new Vector2(this.x - other.x, this.y - other.y);
    }
}
class Particle {
    // Constructor method is called when creating a new instance of the class
    constructor(x, y, vx, vy, size) {
        this.x = x;
        this.y = y
        this.vx = vx
        this.vy = vy
        this.size = size
        this.last_pos = new Vector2(x,y)
    }

    draw(index){
          // Draw a red circle
          // Update RGBA values dynamically
         
          let red = 100-this.vx*20;
          let green = 100-this.vy*20;
          let blue = 255;
          let alpha = 1;

          // Create the new rgba string
          let rgbaColor = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
          c.beginPath();
          c.arc(this.x, this.y, this.size, 0, Math.PI * 2); // Create a circle path
          c.fillStyle = rgbaColor; // Set the fill color
          c.fill(); // Fill the circle
          c.closePath(); // Close the path
    }
    avoidWalls(windowWidth,windowHeight, wallDamping){
        {
            // collisions
            if (isNaN(this.x))
            { 
                    this.x = this.last_pos.x + 3-randomF(6)
            }
            if (isNaN(this.y)){
                    this.y = this.last_pos.y + 3-randomF(6)
                     
    
            }
    
            if (!isNaN(this.x)) this.last_pos.x = this.x;
            if (!isNaN(this.y)) this.last_pos.y = this.y;
                
            
            if (arows[1] == true){
                wallDamping = 1;
            }
            if (this.y + this.size > windowHeight)
            {
                this.vy *= -wallDamping;      // Reverse and dampen the vertical velocity
                this.y = windowHeight - this.size; // Prevent sinking below the boundary
            }
            if (this.x + this.size > windowWidth)
            {
                this.vx *= -wallDamping;     // Reverse and dampen the vertical velocity
                this.x = windowWidth - this.size; // Prevent sinking below the boundary
            }
            if (this.y - this.size < 0)
            {
                this.vy *= -wallDamping; // Reverse and dampen the vertical velocity
                this.y = 0 + this.size;       // Prevent sinking below the boundary
            }

            if (this.x - this.size < 0)
            {
                this.vx *= -wallDamping; // Reverse and dampen the vertical velocity
                this.x = 0 + this.size;       // Prevent sinking below the boundary
            }
        }
    }
    applyGravity(gravity, width, height){
        let factor = 2;
        if (arows[0] == true){
            this.vy -= gravity*(1+factor);
        }
        if (arows[3] == true){
            this.vy -= gravity*factor;
            this.vx += gravity*factor;
        }
        if (arows[2] == true){
            this.vy -= gravity*factor;
            this.vx -= gravity*factor;
        }
        if (arows[1] == true){
            this.vy -= gravity;
            
        }
        this.vy += gravity;
        this.x += this.vx;
        this.y += this.vy;

    }
}
class Grid {
    constructor(cellsize) {
        this.cellsize = cellsize * 2;
        this.grid = []; // Initialize the grid as an empty array
    }

    drawGrid(width, height) {
        let gridWidth = Math.ceil(width / this.cellsize);
        let gridHeight = Math.ceil(height / this.cellsize);

        c.strokeStyle = 'rgba(255,255,255,0.1)';
        c.lineWidth = 2;
        c.beginPath();

        // Draw vertical grid lines
        for (let i = 0; i <= gridWidth; ++i) {
            let x = i * this.cellsize;
            c.moveTo(x, 0);
            c.lineTo(x, gridHeight * this.cellsize);
        }

        // Draw horizontal grid lines
        for (let i = 0; i <= gridHeight; ++i) {
            let y = i * this.cellsize;
            c.moveTo(0, y);
            c.lineTo(width, y);
        }
        c.stroke();
    }

    sortParticles(particles, width, height) {
        let gridWidth = Math.ceil(width / this.cellsize);
        let gridHeight = Math.ceil(height / this.cellsize);

        // Initialize the grid as a 2D array of empty arrays
        this.grid = Array.from({ length: gridWidth }, () =>
            Array.from({ length: gridHeight }, () => [])
        );

        for (let particle of particles) {
            const gridX = Math.floor(particle.x / this.cellsize);
            const gridY = Math.floor(particle.y / this.cellsize);

            // Ensure particle position is within grid bounds
            if (gridX >= 0 && gridX < gridWidth && gridY >= 0 && gridY < gridHeight) {
                this.grid[gridX][gridY].push(particle);
            }
        }

        return this.grid;
    }

    resolveCollisions(particles, wall_dampening, width, height) {
        let gridWidth = Math.ceil(width / this.cellsize);
        let gridHeight = Math.ceil(height / this.cellsize);

        // Check and handle collisions for each particle
        for (let p of particles) {
             p.avoidWalls(width, height, wall_dampening);
        }
        for (let x = 1; x < gridWidth-1; ++x)
            {
                for (let y = 1; y < gridHeight-1; ++y){
                    let nearbyParticles = [];   
                    for (let dx = -1; dx <= 1; ++dx)
                        {
                            for (let dy = -1; dy <= 1; ++dy)
                            {
                                let neighborX = x + dx;
                                let neighborY = y + dy;
                                let neighborParticles = this.grid[neighborX][neighborY];
                                for (let p of neighborParticles) {
                                    nearbyParticles.push(p);
                               }

                            }
                        }
                    solveCollisions(nearbyParticles)    


                }
            }
        
    }
}

function distance(ax,ay,bx,by){
    let dx = ax - bx;
    let dy = ay - by;
    return Math.sqrt(dx * dx + dy * dy);  // Pythagorean theorem
}
function solveCollisions(particles){
    let minMoveThreshold = 0; // Minimum movement required to resolve a collision
    for (thi = 0; thi < particles.length; ++thi)
    {
        for (other = 0; other < particles.length; ++other)
        {
            if (thi != other)
            {
                part1 = particles[thi];   // Pointer to first particle
                part2 = particles[other]; // Pointer to second particle

                // Create Vector2 instances for each particle's position
                let pos1 = new Vector2(part1.x, part1.y);
                let pos2 = new Vector2(part2.x, part2.y);

                 // Calculate the collision axis (vector difference)
                let collisionAxis = pos1.subtract(pos2);
                let dist = distance(part1.x, part1.y, part2.x, part2.y);
                overlap_thresh = part1.size + part2.size;
                if (dist < overlap_thresh)
                    {
                        let n = new Vector2(collisionAxis.x / dist, collisionAxis.y / dist);
                        let delta = overlap_thresh - dist;
                        if (delta > minMoveThreshold)
                            {
                            
                            let add = new Vector2( .3 * delta * n.x,  .3 * delta * n.y)
                                part2.x -= add.x;
                                part2.y -= add.y;
                                part1.x += add.x;
                                part1.y += add.y;
                                part1.vx *= 0.9991; // Damp velocity for part1
                                part1.vy *= 0.9991;
                                part2.vx *= 0.9991; // Damp velocity for part2
                                part2.vy *= 0.9991;
                            
                            }

                        
                    }
                
            }
        }
    }
}

function isMobileDevice() {
    const userAgent = navigator.userAgent.toLowerCase();
    return /iphone|ipod|android|windows phone|blackberry|mobile/i.test(userAgent);
}


let Particles = [];
let particleSize = 15 ;
let count = 0;
let total_particles = 1000;
let tree = new Grid(particleSize);  // Create a new Grid instance using particleSize

let ismob = isMobileDevice()



function makeParticles(){
    total_particles = ((canvas.width/particleSize*2) * (canvas.height/particleSize*2))*0.022
    /// make phone sim more defined
    if (ismob){
        total_particles = total_particles*2;
        particleSize = particleSize/2;
    
    }
    /// make phone sim more defined
    

for (let i = 0; i <= total_particles; ++i) {
    count +=1;
    Particles.push( new Particle(randomF(canvas.width),canvas.height/2+randomF(canvas.height/5), 50-randomF(100), 50-randomF(100), (particleSize)))
}
}
makeParticles();

function update(){
    
    if (LeftClick || SpacePressed){
        for (let particle of Particles) {
            
            let dist = distance(mouseX, mouseY, particle.x, particle.y);
            if (dist < 300){
                let dir = new Vector2(mouseX-particle.x, mouseY-particle.y)
                let force = 5000. / (dist * dist + 1.); // Limit force magnitude using distance
                let maxForce = 1.;                       // Limit max force to avoid over-pulling
                force = Math.min(force, maxForce);
                let forcee = (Math.sqrt(dist)) / 20;
                
                if (SpacePressed){
                    particle.vx -= dir.x * force * 0.5; // Reduced multiplier for smoother motion
                    particle.vy -= dir.y * force * 0.5; // Reduced multiplier for smoother motion
                }else{
                    particle.vx += dir.x * forcee * 0.07; // Reduced multiplier for smoother motion
                    particle.vy += dir.y * forcee * 0.07; // Reduced multiplier for smoother motion
                }
               
            }
        }
        
    }
    if (touch){
        for (let particle of Particles) {
            
            let dist = distance(touchX, touchY, particle.x, particle.y);
            if (dist < 300){
                let dir = new Vector2(touchX-particle.x, touchY-particle.y)
                let force = 5000. / (dist * dist + 1.); // Limit force magnitude using distance
                let maxForce = 1.;                       // Limit max force to avoid over-pulling
                force = Math.min(force, maxForce);
                let forcee = (Math.sqrt(dist)) / 20;
                
                
                particle.vx -= dir.x * force * 0.2; // Reduced multiplier for smoother motion
                particle.vy -= dir.y * force * 0.2; // Reduced multiplier for smoother motion
               
               
            }
        }

    }
    if (more){
        for (let i = 0; i <= 3; ++i) {
        Particles.push( new Particle(mouseX,mouseY, 5-randomF(10), 5-randomF(10), particleSize))
        }
    }
    if (less){
        for (let i = 0; i <= 10; ++i) {
        Particles.pop();
        
        }
    }
        
    // In the logic where you want to reset particles
    if (reset && !resetpressed) {
        Particles = [];  // Clear particles array
        makeParticles(); // Call function to create new particles
        resetpressed = true; // Set flag to prevent further resets while holding the key
    } else {
        reset = false; // Reset so it only triggers once
    }

    for (let i of Particles) {
        i.applyGravity(1.5, canvas.width, canvas.height);
    }
    

    if (!ePressed){
        
        for (let i = 0; i <= 20; ++i) {
            grid = tree.sortParticles(Particles, canvas.width, canvas.height);
            tree.resolveCollisions(Particles, 0.2, canvas.width, canvas.height, grid);
           
        }
    }else{
        for (let i = 0; i <25; i++) {
            solveCollisions(Particles);
            for (let i of Particles) {
                i.avoidWalls(canvas.width, canvas.height, 0.2);
               }
        }

    }
   

   
   
    
}

function draw() {
    const currentFrameTime = performance.now();
    const delta = currentFrameTime - lastFrameTime;
    const fps = 1000 / delta; // Convert milliseconds to seconds
    lastFrameTime = currentFrameTime;

    //tree.drawGrid(canvas.width, canvas.height);
    let c = 0
    for (let i of Particles) {
        i.draw(c);
        c++;
    }

    if (ismob || canvas.width < 512){
        instructions.textContent = 'website is optimized for larger devices' ;
    } else{
       instructions.textContent = 'right-click pull, space repel, r restart, m more, l less' ;
    }

     fpstag.textContent = 'frames per second: ' + String(Math.floor(fps));
     particleCount.textContent = 'particles: ' + String(c);
}

let lastFrameTime = performance.now();

function animate() {
   
    requestAnimationFrame(animate);
    c.fillStyle = "rgba(0, 0, 0, 0.1)";
    resizeCanvas(Particles)
    c.fillRect(0, 0, innerWidth, innerHeight)
    update();
    draw(); // Draw the circle
}

animate(); // Start the animation loop
