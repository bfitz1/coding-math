window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let radius = 400;
    let circleAngle = 0;
    let arrowX, arrowY;
    let arrowAngle = 0;

    render();

    function render() {
        context.clearRect(0, 0, width, height);
        arrowX = width / 2 + radius * Math.cos(circleAngle);
        arrowY = height / 2 + radius * Math.sin(circleAngle);

        context.save();
        context.translate(arrowX, arrowY);
        context.rotate(arrowAngle);

        context.beginPath();
        context.moveTo(20, 0);
        context.lineTo(-20, 0);
        context.moveTo(20, 0);
        context.lineTo(10, -10);
        context.moveTo(20, 0);
        context.lineTo(10, 10);
        context.stroke();

        context.restore();

        circleAngle += 0.01;
        requestAnimationFrame(render);
    }

    document.body.addEventListener('mousemove', function(event) {
        let dx = event.clientX - arrowX;
        let dy = event.clientY - arrowY;
        arrowAngle = Math.atan2(dy, dx);
    });
}