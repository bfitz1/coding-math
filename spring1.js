window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let springPoint = new Vector(width / 2, height / 2);
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

        let distance = springPoint.sub(weight.position);
        distance.setLength(distance.getLength() - springLength);
        let springForce = distance.mul(k);

        weight.velocity.addTo(springForce);

        weight.update();

        context.beginPath();
        context.arc(weight.position.x, weight.position.y, weight.radius, 0, Math.PI * 2, false);
        context.fill();

        context.beginPath();
        context.arc(springPoint.x, springPoint.y, 4, 0, Math.PI * 2, false);
        context.fill();

        context.beginPath();
        context.moveTo(weight.position.x, weight.position.y);
        context.lineTo(springPoint.x, springPoint.y);
        context.stroke();

        requestAnimationFrame(update);
    }
}