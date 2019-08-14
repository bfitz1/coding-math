window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let springPoint = { x: width / 2, y: height / 2 };
    let weight = Particle.fromParts(Math.random() * width, Math.random() * height, 50, Math.random() * Math.PI * 2, 0.5);
    let k = 0.1;
    let springLength = 100;

    weight.radius = 20;
    weight.friction = 0.9;

    document.body.addEventListener('mousemove', function(event) {
        springPoint.x = event.clientX;
        springPoint.y = event.clientY;
    });

    update();

    function update() {
        context.clearRect(0, 0, width, height);

        let dx = springPoint.x - weight.x;
        let dy = springPoint.y - weight.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let springForce = (distance - springLength) * k;
        let ax = dx / distance * springForce;
        let ay = dy / distance * springForce;

        weight.vx += ax;
        weight.vy += ay;

        weight.update();

        context.beginPath();
        context.arc(weight.x, weight.y, weight.radius, 0, Math.PI * 2, false);
        context.fill();

        context.beginPath();
        context.arc(springPoint.x, springPoint.y, 4, 0, Math.PI * 2, false);
        context.fill();

        context.beginPath();
        context.moveTo(weight.x, weight.y);
        context.lineTo(springPoint.x, springPoint.y);
        context.stroke();

        requestAnimationFrame(update);
    }
}