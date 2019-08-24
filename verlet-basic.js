window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let points = [];
    let bounce = 0.9;
    let gravity = 0.5;
    let friction = 0.999;
    points.push({
        x: 100,
        y: 100,
        oldx: 95,
        oldy: 95
    });

    update();

    function update() {
        updatePoints();
        renderPoints();
        requestAnimationFrame(update);
    }

    function updatePoints() {
        for (let i = 0; i < points.length; i += 1) {
            let p = points[i];
            let vx = (p.x - p.oldx) * friction;
            let vy = (p.y - p.oldy) * friction;

            p.oldx = p.x;
            p.oldy = p.y;
            p.x += vx;
            p.y += vy;
            p.y += gravity;

            if (p.x > width) {
                p.x = width;
                p.oldx = p.x + vx * bounce;
            } else if (p.x < 0) {
                p.x = 0;
                p.oldx = p.x + vx * bounce;
            }

            if (p.y > height) {
                p.y = height;
                p.oldy = p.y + vy * bounce;
            } else if (p.y < 0) {
                p.y = 0;
                p.oldy = p.y + vy * bounce;
            }
        }
    }

    function renderPoints() {
        context.clearRect(0, 0, width, height);
        for (let i = 0; i < points.length; i += 1) {
            let p = points[i];
            context.beginPath();
            context.arc(p.x, p.y, 5, 0, Math.PI * 2);
            context.fill();
        }
    }
}