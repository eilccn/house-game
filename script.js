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

const bedroom = {
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

bedroom.image.src = "images/bedroom.jpg";
bedroom.image.addEventListener("load", draw);

let gameState = "outside";

function drawHouse() {
    ctx.drawImage(house.image, house.x, house.y, house.width, house.height);
}
  
function drawLivingRoom() {
ctx.drawImage(livingRoom.image, livingRoom.x, livingRoom.y, livingRoom.width, livingRoom.height);
}

function drawBedroom() {
    ctx.drawImage(bedroom.image, bedroom.x, bedroom.y, bedroom.width, bedroom.height);
}

const leaveHouseBtn = document.getElementById("leaveHouseBtn");


leaveHouseBtn.addEventListener("click", () => {
  gameState = "outside";
  leaveHouseBtn.style.display = "none";
  draw();
}); 

const leaveBedroomBtn = document.createElement("button");
leaveBedroomBtn.textContent = "Leave the Bedroom";
leaveBedroomBtn.style.display = "none";
document.body.appendChild(leaveBedroomBtn);

leaveBedroomBtn.addEventListener("click", () => {
  gameState = "livingRoom";
  leaveBedroomBtn.style.display = "none";
  draw();
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (gameState === "outside") {
    drawHouse();
  } else if (gameState === "livingRoom") {
    drawLivingRoom();
  } else if (gameState === "bedroom") {
    drawBedroom();
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
  else if (gameState === "livingRoom" && x >= bedroom.x && x <= bedroom.x + bedroom.width && y >= bedroom.y && y <= bedroom.y + bedroom.height) {
    gameState = "bedroom";
    leaveHouseBtn.style.display = "block";
    leaveBedroomBtn.style.display = "block";
    draw();
  }
});

draw();

