window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let centerY = height * .5;
    let centerX = width * .5;
    let baseRadius = 100;
    let offset = 50;
    let speed = 0.1;
    let angle = 0;

    render();

    function render() {
        let radius = baseRadius + Math.sin(angle) * offset;

        context.clearRect(0, 0, width, height);
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
        context.fill();

        angle += speed;

        requestAnimationFrame(render);
    }
}