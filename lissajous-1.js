window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let centerX = width / 2;
    let centerY = height / 2;
    let xRadius = 200;
    let yRadius = 400;
    let xAngle = 0;
    let yAngle = 0;
    let xSpeed = .1;
    let ySpeed = .131;

    render();

    function render() {
        context.clearRect(0, 0, width, height);
        let x = centerX + Math.cos(xAngle) * xRadius;
        let y = centerY + Math.sin(yAngle) * yRadius;
        context.beginPath();
        context.arc(x, y, 10, 0, Math.PI * 2, false);
        context.fill();

        xAngle += xSpeed;
        yAngle += ySpeed;
        requestAnimationFrame(render);
    }

}