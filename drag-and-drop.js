window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let handle = {
        x: width / 2,
        y: height / 2,
        radius: 20
    };
    let offset = {};

    draw();

    function draw() {
        context.clearRect(0, 0, width, height);

        context.fillStyle = "gray";
        context.beginPath();
        context.arc(handle.x, handle.y, handle.radius, 0, Math.PI * 2, false);
        context.fill();
    }

    document.body.addEventListener('mousedown', function(event) {
        if (utils.circlePointCollision(event.clientX, event.clientY, handle)) {
            document.body.addEventListener('mousemove', onMouseMove);
            document.body.addEventListener('mouseup', onMouseUp);
            offset = {
                x: event.clientX - handle.x,
                y: event.clientY - handle.y
            };
        }
    });

    function onMouseMove(event) {
        handle.x = event.clientX - offset.x;
        handle.y = event.clientY - offset.y;
        draw();
    }

    function onMouseUp(event) {
        document.body.removeEventListener('mousemove', onMouseMove);
        document.body.removeEventListener('mouseup', onMouseUp);
    }
}