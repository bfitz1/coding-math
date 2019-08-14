window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let particleA = Particle.fromParts(
        utils.randomRange(0, width),
        utils.randomRange(0, height),
        utils.randomRange(0, 50),
        utils.randomRange(0, Math.PI * 2),
        0.1
    );
    let particleB = Particle.fromParts(
        utils.randomRange(0, width),
        utils.randomRange(0, height),
        utils.randomRange(0, 50),
        utils.randomRange(0, Math.PI * 2),
        0.1
    );
    let particleC = Particle.fromParts(
        utils.randomRange(0, width),
        utils.randomRange(0, height),
        utils.randomRange(0, 50),
        utils.randomRange(0, Math.PI * 2),
        0.1
    );
    let k = 0.01;
    let separation = 100;

    particleA.friction = 0.9;
    particleA.radius = 20;

    particleB.friction = 0.9;
    particleB.radius = 20;

    particleC.friction = 0.9;
    particleC.radius = 20;

    update();

    function update() {
        context.clearRect(0, 0, width, height);

        spring(particleA, particleB, separation);
        spring(particleB, particleC, separation);
        spring(particleC, particleA, separation);

        particleA.update();
        particleB.update();
        particleC.update();

        context.beginPath();
        context.arc(particleA.position.x, particleA.position.y,
            particleA.radius, 0, Math.PI * 2, false);
        context.fill();

        context.beginPath();
        context.arc(particleB.position.x, particleB.position.y,
            particleB.radius, 0, Math.PI * 2, false);
        context.fill();

        context.beginPath();
        context.arc(particleC.position.x, particleC.position.y,
            particleC.radius, 0, Math.PI * 2, false);
        context.fill();

        context.beginPath();
        context.moveTo(particleA.position.x, particleA.position.y);
        context.lineTo(particleB.position.x, particleB.position.y);
        context.lineTo(particleC.position.x, particleC.position.y);
        context.lineTo(particleA.position.x, particleA.position.y);
        context.stroke();

        if (particleA.position.y + particleA.radius > height) {
            particleA.position.y = height - particleA.radius;
            particleA.velocity.y *= particleA.bounce;
        }
        if (particleB.position.y + particleB.radius > height) {
            particleB.position.y = height - particleB.radius;
            particleB.velocity.y *= particleB.bounce;
        }
        if (particleC.position.y + particleC.radius > height) {
            particleC.position.y = height - particleC.radius;
            particleC.velocity.y *= particleC.bounce;
        }

        requestAnimationFrame(update);
    }

    function spring(p0, p1, separation) {
        let distance = p0.position.sub(p1.position);
        distance.setLength(distance.getLength() - separation);

        let springForce = distance.mul(k);

        p1.velocity.addTo(springForce);
        p0.velocity.subFrom(springForce);
    }
}