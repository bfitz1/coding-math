window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let circle = {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 50 + Math.random() * 100
    };

    document.body.addEventListener('mousemove', function(event) {
        if (utils.circlePointCollision(event.clientX, event.clientY, circle)) {
            context.fillStyle = "#f66";
        } else {
            context.fillStyle = "#999";
        }

        context.clearRect(0, 0, width, height);
        context.beginPath();
        context.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, false);
        context.fill();
    });
}