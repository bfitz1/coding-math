window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let fl = 300;
    let points = [];
    let numPoints = 200;
    let centerZ = 2000;
    let radius = 1000;
    let baseAngle = 0;
    let rotationSpeed = 0.01;
    let ypos;

    for (let i = 0; i < numPoints; i += 1) {
        let point = {
            angle: 0.2 * i,
            y: 2000 - 4000 / numPoints * i + Math.random() * 500,
        };
        point.x = Math.cos(point.angle + baseAngle) * radius;
        point.z = centerZ + Math.sin(point.angle + baseAngle) * radius;
        points.push(point);
    }

    context.translate(width / 2, height / 2);

    document.body.addEventListener('mousemove', function(event) {
        rotationSpeed = (event.clientX - width / 2) * 0.00005;
        ypos = (event.clientY - height / 2) * 2;
    });

    update();

    function update() {
        baseAngle += rotationSpeed;
        context.clearRect(-width / 2, -height / 2, width, height);

        context.beginPath();
        for (let i = 0; i < numPoints; i += 1) {
            let point = points[i];
            let perspective = fl / (fl + point.z);

            context.save();
            context.scale(perspective, perspective);
            context.translate(point.x, point.y);

            if (i == 0) {
                context.moveTo(0, 0);
            } else {
                context.lineTo(0, 0);
            }

            context.restore();

            point.x = Math.cos(point.angle + baseAngle) * radius;
            point.z = centerZ + Math.sin(point.angle + baseAngle) * radius;
        }
        context.stroke();
        requestAnimationFrame(update);
    }
}