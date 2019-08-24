window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let particle = {
        x: width / 2,
        y: height / 2,
        vx: Math.random() * 10 - 5,
        vy: Math.random() * 10 - 5
    };
    let lines = [];

    for (let i = 0; i < 10; i += 1) {
        lines[i] = {
            p0: {
                x: Math.random() * width,
                y: Math.random() * height
            },
            p1: {
                x: Math.random() * width,
                y: Math.random() * height
            }
        }
    }

    update();

    function update() {
        context.clearRect(0, 0, width, height);
        drawLines();

        let p0 = {
            x: particle.x,
            y: particle.y
        };

        particle.x += particle.vx;
        particle.y += particle.vy;
        context.fillRect(particle.x - 2, particle.y - 2, 4, 4);

        let p1 = {
            x: particle.x,
            y: particle.y
        };

        for (let i = 0; i < lines.length; i += 1) {
            let p2 = lines[i].p0;
            let p3 = lines[i].p1;
            let intersect = segmentIntersect(p0, p1, p2, p3);
            if (intersect) {
                context.beginPath();
                context.strokeStyle = "red";
                context.arc(intersect.x, intersect.y, 20, 0, Math.PI * 2, false);
                context.stroke();
                return;
            }
        }
        
        requestAnimationFrame(update);
    }

    function drawLines() {
        context.beginPath();
        for (let i = 0; i < lines.length; i += 1) {
            context.moveTo(lines[i].p0.x, lines[i].p0.y);
            context.lineTo(lines[i].p1.x, lines[i].p1.y);
        }
        context.stroke();
    }

    function segmentIntersect(p0, p1, p2, p3) {
        let a1 = p1.y - p0.y;
        let b1 = p0.x - p1.x;
        let c1 = a1 * p0.x + b1 * p0.y;
        let a2 = p3.y - p2.y;
        let b2 = p2.x - p3.x;
        let c2 = a2 * p2.x + b2 * p2.y;
        let denominator = a1 * b2 - a2 * b1;
        
        if (denominator === 0) { return null; } 

        let intersectX = (b2 * c1 - b1 * c2) / denominator;
        let intersectY = (a1 * c2 - a2 * c1) / denominator;
        let rx0 = (intersectX - p0.x) / (p1.x - p0.x);
        let ry0 = (intersectY - p0.y) / (p1.y - p0.y);
        let rx1 = (intersectX - p2.x) / (p3.x - p2.x);
        let ry1 = (intersectY - p2.y) / (p3.y - p2.y);

        return ((rx0 >= 0 && rx0 <= 1) || (ry0 >= 0 && ry0 <= 1))
               && ((rx1 >= 0 && rx1 <= 1) || (ry1 >= 0 && ry1 <= 1))
            ? { x: intersectX, y: intersectY }
            : null;
    }
}