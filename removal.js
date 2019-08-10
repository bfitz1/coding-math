window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let particles = [];

    for (let i = 0; i < 100; i += 1) {
        let p = Particle.fromParts(
            width / 2,
            height / 3,
            Math.random() * 5 + 2,
            Math.random() * Math.PI * 2
        );
        p.radius = 10;
        particles.push(p);
    }

    update();

    function update() {
        context.clearRect(0, 0, width, height);

        console.log(particles.length);

        for (let i = 0; i < particles.length; i += 1) {
            let p = particles[i];
            
            p.update();
            context.beginPath();
            context.arc(p.position.x, p.position.y, p.radius, 0, Math.PI * 2, false);
            context.fill();
        }

        removeDeadParticles();

        function removeDeadParticles() {
            for (let i = particles.length - 1; i >= 0; i -= 1) {
                let p = particles[i];
                if (p.position.x - p.radius > width
                    || p.position.x + p.radius < 0
                    || p.position.y - p.radius > height
                    || p.position.y + p.radius < 0) {
                        particles.splice(i, 1);
                    }
            }
        }

        requestAnimationFrame(update);
    }
}