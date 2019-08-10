window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let particles = [];
    let numParticles = 100;

    for (let i = 0; i < numParticles; i += 1) {
        particles.push(Particle.fromParts(width / 2, height / 2, Math.random() * 4 + 1, Math.random() * Math.PI * 2));
    }

    update();

    function update() {
        context.clearRect(0, 0, width, height);

        for (let i = 0; i < numParticles; i += 1) {
            let p = particles[i];
            p.update();
            context.beginPath();
            context.arc(p.position.x, p.position.y, 10, 0, Math.PI * 2, false);
            context.fill();
        }

        requestAnimationFrame(update);
    }
}