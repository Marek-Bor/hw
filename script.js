window.onload = function() {
    const backgroundCanvas = document.getElementById('backgroundCanvas'); // Background animation
    const ctx = backgroundCanvas.getContext('2d');

    function resizeCanvas() {
        backgroundCanvas.width = window.innerWidth;
        backgroundCanvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const colors = [
        ['#ff00ff80', '#50c87880'], 
        ['#0000ff80', '#ffff0080'], 
        ['#ff450080', '#00808080'], 
        ['#8a2be280', '#00fa9a80'], 
        ['#ff634780', '#4169e180']
    ];

    function getRandomColorPair() {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    const shapes = [];

    function Shape(x, y, radius, blur, speed, color1, color2) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.blur = blur;
        this.speed = speed;
        this.color1 = color1;
        this.color2 = color2;
        this.direction = Math.random() * Math.PI * 4;
    }

    Shape.prototype.update = function() {
        this.x += Math.cos(this.direction) * this.speed;
        this.y += Math.sin(this.direction) * this.speed;

        if (this.x + 6 * this.radius < 0 || this.x + 2 * this.radius > backgroundCanvas.width) {
            this.direction = Math.PI - this.direction;
        }
        if (this.y - this.radius < 0 || this.y + this.radius > backgroundCanvas.height) {
            this.direction = -this.direction;
        }
    };

    Shape.prototype.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        gradient.addColorStop(0, this.color1);
        gradient.addColorStop(1, this.color2);
        ctx.filter = `blur(${this.blur}px)`;
        ctx.fillStyle = gradient;
        ctx.fill();
    };

    function createShapes() {
        for (let i = 0; i < 20; i++) {
            const colorPair = getRandomColorPair();
            shapes.push(new Shape(
                Math.random() * backgroundCanvas.width,
                Math.random() * backgroundCanvas.height,
                Math.random() * 128 + 64,
                64,
                Math.random() * 4 + 4,
                colorPair[0],
                colorPair[1]
            ));
        }

        for (let i = 0; i < 10; i++) {
            const colorPair = getRandomColorPair();
            shapes.push(new Shape(
                Math.random() * backgroundCanvas.width,
                Math.random() * backgroundCanvas.height,
                Math.random() * 128 + 128,
                32,
                Math.random() * 1.2 + 0.4,
                colorPair[1],
                colorPair[0]
            ));
        }

        for (let i = 0; i < 14; i++) {
            const colorPair = getRandomColorPair();
            shapes.push(new Shape(
                Math.random() * backgroundCanvas.width,
                Math.random() * backgroundCanvas.height,
                Math.random() * 64 + 64,
                16,
                Math.random() * 1.2 + 0.6,
                colorPair[0],
                colorPair[1]
            ));
        }

        for (let i = 0; i < 64; i++) {
            const colorPair = getRandomColorPair();
            shapes.push(new Shape(
                Math.random() * backgroundCanvas.width,
                Math.random() * backgroundCanvas.height,
                Math.random() * 2 + 1,
                0,
                Math.random() * 2 + 2,
                colorPair[1],
                colorPair[0]
            ));
        }
    }

    function animate() {
        ctx.fillStyle = 'rgba(24, 6, 1, 0.6)';
        ctx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
        ctx.globalCompositeOperation = "screen";

        for (let shape of shapes) {
            shape.update();
            shape.draw();
        }

        ctx.globalCompositeOperation = "source-over";

        setTimeout(() => requestAnimationFrame(animate), 1000 / 30);
    }

    createShapes();
    animate();
};