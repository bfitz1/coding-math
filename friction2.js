window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let p = Particle.fromParts(width / 2, height / 2, 10, Math.random() * Math.PI * 2);
    let friction = 0.97;

    p.radius = 10;

    update();

    function update() {
        context.clearRect(0, 0, width, height);

        p.velocity.mulBy(friction);
        p.update();

        context.beginPath();
        context.arc(p.position.x, p.position.y, p.radius, 0, Math.PI * 2, false);
        context.fill();

        requestAnimationFrame(update);
    }
}