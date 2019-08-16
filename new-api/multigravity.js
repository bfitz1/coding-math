window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let sun1 = Particle.fromParts(300, 200, 0, 0);
    let sun2 = Particle.fromParts(800, 600, 0, 0);
    let emitter = {
        x: 100,
        y: 0
    };
    let particles = []
    let numParticles = 100;

    sun1.mass = 10000;
    sun1.radius = 10;
    sun2.mass = 20000;
    sun2.radius = 20;

    for (let i = 0; i < numParticles; i += 1) {
        let p = Particle.fromParts(emitter.x, emitter.y, utils.randomRange(7, 8), Math.PI / 2 * utils.randomRange(-.1, .1));
        p.addGravitation(sun1);
        p.addGravitation(sun2);
        p.radius = 3;
        particles.push(p);
    }

    update();

    function update() {
        context.clearRect(0, 0, width, height);

        draw(sun1, "yellow");
        draw(sun2, "yellow");

        for (let i = 0; i < numParticles; i += 1) {
            let p = particles[i];
            p.update();
            draw(p, "black");
            if (p.x > width || p.x < 0 || p.y > height || p.y < 0) {
                p.x = emitter.x;
                p.y = emitter.y;
                p.setSpeed(utils.randomRange(7, 8));
                p.setHeading(Math.PI / 2 * utils.randomRange(-.1, .1));
            }
        }

        requestAnimationFrame(update);
    }

    function draw(p, color) {
        context.fillStyle = color;
        context.beginPath();
        context.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
        context.fill();
    }
}