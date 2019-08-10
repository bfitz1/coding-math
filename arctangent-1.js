window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let arrowX = width / 2;
    let arrowY = height / 2;
    let angle = 0;

    render();

    function render() {
        context.clearRect(0, 0, width, height);

        context.save();
        context.translate(arrowX, arrowY);
        context.rotate(angle);

        context.beginPath();
        context.moveTo(20, 0);
        context.lineTo(-20, 0);
        context.moveTo(20, 0);
        context.lineTo(10, -10);
        context.moveTo(20, 0);
        context.lineTo(10, 10);
        context.stroke();

        context.restore();
        requestAnimationFrame(render);
    }

    document.body.addEventListener('mousemove', function(event) {
        let dx = event.clientX - arrowX;
        let dy = event.clientY - arrowY;
        angle = Math.atan2(dy, dx);
    });
}