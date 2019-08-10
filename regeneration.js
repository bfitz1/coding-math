window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let particles = [];

    for (let i = 0; i < 100; i += 1) {
        let p = Particle.fromParts(
            width / 2,
            height,
            Math.random() * 8 + 5,
            -Math.PI / 2 + (Math.random() * .2 - .1),
            0.1
        );
        p.radius = Math.random() * 10 + 2;
        particles.push(p);
    }

    update();

    function update() {
        context.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i += 1) {
            let p = particles[i];

            p.update();
            context.beginPath();
            context.arc(p.position.x, p.position.y, p.radius, 0, Math.PI * 2, false);
            context.fill();
    
            if (p.position.y - p.radius > height) {
                p.position.x = width / 2;
                p.position.y = height;
                p.velocity.setLength(Math.random() * 8 + 5);
                p.velocity.setAngle(-Math.PI / 2 + (Math.random() * .2 - .1));
            }
        }

        requestAnimationFrame(update);
    }
}