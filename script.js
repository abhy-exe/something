// Game setup
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set initial game variables
const catSize = 20; 
let catX = 300;
let catY = 200;
let catSpeed = 20;
let catDirection = "RIGHT"; // Possible values: "LEFT", "RIGHT", "UP", "DOWN"
let catBody = [{ x: catX, y: catY }];
let foodX = getRandomCoordinate();
let foodY = getRandomCoordinate();
let score = 0;

// Draw the cat and food
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    // Draw the cat
    catBody.forEach((segment, index) => {
        ctx.fillStyle = "#FFD700"; // Gold color for the cat
        ctx.fillText("😺", segment.x, segment.y); // Drawing the cat emoji on the canvas
    });

    // Draw the food
    ctx.fillStyle = "red";
    ctx.fillText("🍰", foodX, foodY); // Pie emoji (food)

    // Draw score
    document.getElementById("score").textContent = `Score: ${score}`;
}

// Move the cat based on direction
function moveCat() {
    const head = { x: catBody[0].x, y: catBody[0].y };

    switch (catDirection) {
        case "LEFT":
            head.x -= catSpeed;
            break;
        case "RIGHT":
            head.x += catSpeed;
            break;
        case "UP":
            head.y -= catSpeed;
            break;
        case "DOWN":
            head.y += catSpeed;
            break;
    }

    // Add new head to the front of the body
    catBody.unshift(head);

    // Check if the cat eats the food
    if (head.x === foodX && head.y === foodY) {
        score++;
        foodX = getRandomCoordinate();
        foodY = getRandomCoordinate();
    } else {
        catBody.pop(); // Remove the tail
    }
}

// Check for collisions with the canvas borders
function checkCollision() {
    const head = catBody[0];
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        return true; // Collision detected
    }
    // Check if the cat collides with itself
    for (let i = 1; i < catBody.length; i++) {
        if (catBody[i].x === head.x && catBody[i].y === head.y) {
            return true; // Collision detected with itself
        }
    }
    return false;
}

// Generate random coordinates for the food
function getRandomCoordinate() {
    return Math.floor(Math.random() * (canvas.width / catSize)) * catSize;
}

// Listen for arrow key presses to change direction
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" && catDirection !== "DOWN") {
        catDirection = "UP";
    } else if (event.key === "ArrowDown" && catDirection !== "UP") {
        catDirection = "DOWN";
    } else if (event.key === "ArrowLeft" && catDirection !== "RIGHT") {
        catDirection = "LEFT";
    } else if (event.key === "ArrowRight" && catDirection !== "LEFT") {
        catDirection = "RIGHT";
    }
});

// Main game loop
function gameLoop() {
    if (checkCollision()) {
        alert("Game Over! Final Score: " + score);
        resetGame();
        return;
    }

    moveCat();
    drawGame();
    setTimeout(gameLoop, 100); // Loop every 100 ms
}

// Reset the game to its initial state
function resetGame() {
    catX = 300;
    catY = 200;
    catDirection = "RIGHT";
    catBody = [{ x: catX, y: catY }];
    foodX = getRandomCoordinate();
    foodY = getRandomCoordinate();
    score = 0;
}

// Start the game
gameLoop();
