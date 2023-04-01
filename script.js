const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const house = {
  x: 0,
  y: 0,
  width: canvas.width,
  height: canvas.height,
  image: new Image()
};

const livingRoom = {
  x: 0,
  y: 0,
  width: canvas.width,
  height: canvas.height,
  image: new Image()
};

house.image.src = "images/house.jpg";
house.image.addEventListener("load", draw);

livingRoom.image.src = "images/living-room.jpg";
livingRoom.image.addEventListener("load", draw);

let gameState = "outside";

function drawHouse() {
  ctx.drawImage(house.image, house.x, house.y, house.width, house.height);
}

function drawLivingRoom() {
  ctx.drawImage(livingRoom.image, livingRoom.x, livingRoom.y, livingRoom.width, livingRoom.height);
}

const leaveHouseBtn = document.getElementById("leaveHouseBtn");
leaveHouseBtn.addEventListener("click", () => {
  gameState = "outside";
  leaveHouseBtn.style.display = "none";
  draw();
}); 

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (gameState === "outside") {
    drawHouse();
  } else if (gameState === "livingRoom") {
    drawLivingRoom();
  }
}

canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  if (gameState === "outside" && x >= house.x && x <= house.x + house.width && y >= house.y && y <= house.y + house.height) {
    gameState = "livingRoom";
    leaveHouseBtn.style.display = "block";
    draw();
  }
});

draw();

