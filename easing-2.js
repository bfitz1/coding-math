window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let target = {
        x: width,
        y: Math.random() * height
    };
    let points = [];
    let numPoints = 100;
    let ease = 0.5;
    
    for (let i = 0; i < numPoints; i += 1) {
        points.push({ x: 0, y: 0 })
    }

    document.body.addEventListener('mousemove', function(event) {
        target.x = event.clientX;
        target.y = event.clientY;
    })

    update();

    function update() {
        context.clearRect(0, 0, width, height);

        let leader = {
            x: target.x,
            y: target.y
        };

        for (let i = 0; i < numPoints; i += 1) {
            let point = points[i];
            point.x += (leader.x - point.x) * ease;
            point.y += (leader.y - point.y) * ease;

            context.beginPath();
            context.arc(point.x, point.y, 10, 0, Math.PI * 2, false);
            context.fill();

            leader.x = point.x;
            leader.y = point.y;

        }

        requestAnimationFrame(update);
    }

    function easeTo(position, target, ease) {
        let dx = target.x - position.x;
        let dy = target.y - position.y;

        position.x += dx * ease;
        position.y += dy * ease;

        if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
            position.x = target.x;
            position.y = target.y;
            return false;
        }
        return true;
    }
}