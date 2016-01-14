var canvas = document.getElementById('fireworks');
var context = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var particleCount = 100;
var firework = new Firework();
var particles = [];

generateParticles();

function generateParticles() {
	for (var i = 0; i < particleCount; i++) {
		particles.push(new Particle());
	}
}

setInterval(world, 30);

function clearCanvas() {
	context.fillStyle = "#000";
	context.fillRect(0,0,canvas.width,canvas.height);
}

function randomBetween(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}

function world() {
	clearCanvas();
	if (!firework.explode) {
		firework.update().draw();
	};
	if (firework.explode) {
		for (var i = 0; i < particles.length; i++) {
			if (particles[i].life > 0) {
				particles[i].update().draw();
			};
		}
	};
	console.log(particles.length);
}

function Firework() {
	this.x = canvas.width / 2;
	this.y = canvas.height;
	this.radius = 5;
	this.explode = false;
	this.speed = 5;

	this.update = function() {
		if (this.y >= canvas.height/2) {
			this.y -= this.speed;
		};
		if (this.y < canvas.height/2) {
			this.explode = true;
		};

		return this;
	}

	this.draw = function() {
		context.beginPath();
		context.arc(this.x, this.y, this.radius, Math.PI*2, false);
		context.fillStyle = "#fff";
		context.fill();

		return this;
	}
}

function Particle() {
	this.x = canvas.width/2;
	this.y = canvas.height/2;
	this.angle = randomBetween(1, 360);
	this.life = 50;
	this.radius = randomBetween(1,5);
	this.speed = randomBetween(1,5);

	this.update = function() {
		this.life--;
		var dx = Math.cos(this.angle) * this.speed;
		var dy = Math.sin(this.angle) * this.speed;
		this.x += dx;
		this.y += dy;

		return this;
	}

	this.draw = function() {
		context.beginPath();
		context.arc(this.x, this.y, this.radius, Math.PI*2, false);
		context.fillStyle = "#fff";
		context.fill();

		return this;
	}
}