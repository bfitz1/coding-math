window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let p = Particle.fromParts(100, height, 10, -Math.PI / 2);
    let accel = new Vector(0.1, 0.1);

    update();

    function update() {
        context.clearRect(0, 0, width, height);

        p.accelerate(accel);
        p.update();

        context.beginPath();
        context.arc(p.position.x, p.position.y, 10, 0, Math.PI * 2, false);
        context.fill();

        requestAnimationFrame(update);
    }
}