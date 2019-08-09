window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let centerX = width / 2;
    let centerY = height / 2;
    let xRadius = 200;
    let yRadius = 400;
    let angle = 0;
    let speed = .01;

    render();

    function render() {
        context.clearRect(0, 0, width, height);
        let x = centerX + Math.cos(angle) * xRadius;
        let y = centerY + Math.sin(angle) * yRadius;
        context.beginPath();
        context.arc(x, y, 10, 0, Math.PI * 2, false);
        context.fill();

        angle += speed;
        requestAnimationFrame(render);
    }

}