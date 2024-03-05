const w = 400;
const h = 600;
const ballsize = 10;
const brickW = 30;
const brickH = 20;
const batH = 20;
const batW = 100;
let ballX;
let ballY;
let dx;
let dy;
let bricks = [];
let batX = w / 2;
let batY = h - 50;

let canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = w;
canvas.height = h;

function init() {
	(bricks = []), (ballX = w / 2), (ballY = h - 100), (dx = 1), (dy = -1);
	for (let y = 0; y < 4; y++) {
		for (let x = y; x < 10 - y; x++) {
			bricks.push({
				x: 50 + x * brickW,
				y: 50 + y * brickH,
				active: true,
			});
		}
	}
}

function drawRect(color, x, y, w, h) {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.rect(x, y, w, h);
	ctx.fill();
	ctx.stroke();
}

function drawCircle(color, x, y, r) {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(x, y, r, 0, 2 * Math.PI, false);
	ctx.fill();
}

function draw() {
	drawRect('#eee', 0, 0, w, h);
	drawCircle('#f00', ballX, ballY, ballsize);
	for (let i = 0; i < bricks.length; i++) {
		let b = bricks[i];
		if (!b.active) {
			continue;
		}
		drawRect('#ccc', b.x, b.y, brickW, brickH);
	}
	drawRect('#0f0', batX - batW / 2, batY - batH / 2, batW, batH);
}

function move() {
	if (ballX - ballsize + dx < 0 || ballX + ballsize + dx > w) {
		dx = -dx;
	}
	if (ballY - ballsize + dy < 0) {
		dy = -dy;
	}
	if (ballY - ballsize > batY) {
		return false;
	}

	if (
		ballY + ballsize > batY - batH / 2 &&
		ballY - ballsize < batY + batH / 2 &&
		ballX > batX - batW / 2 &&
		ballX < batX + batW / 2
	) {
		dy = -dy;
	}

	ballX += dx;
	ballY += dy;

	for (let i = 0; i < bricks.length; i++) {
		let b = bricks[i];
		if (!b.active) {
			continue;
		}
		if (
			b.x < ballX + ballsize &&
			ballX - ballsize < b.x + brickW &&
			b.y < ballY + ballsize &&
			ballY - ballsize < b.y + brickH
		) {
			b.active = false;
			dy = -dy;
			break;
		}
	}

	return true;
}

function game() {
	if (!move()) {
		alert('Game over');
		init();
	}
	draw();
}

document.addEventListener('keydown', function (e) {
	switch (e.key) {
		case 'ArrowLeft':
			if (batX > batW) {
				batX -= 20;
			}
			break;
		case 'ArrowRight':
			if (batX < w - batW) {
				batX += 20;
			}
			break;
	}
});

init();
setInterval(game, 1);
