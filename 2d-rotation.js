window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let point = {
        x: 300,
        y: 200
    };
    let delta = 0.05;

    context.translate(width / 2, height / 2);

    update();

    function update() {
        context.clearRect(-width / 2, -height / 2, width, height);

        context.beginPath();
        context.arc(point.x, point.y, 20, 0, Math.PI * 2, false);
        context.fill();

        let cos = Math.cos(delta);
        let sin = Math.sin(delta);
        let x = point.x * cos - point.y * sin;
        let y = point.y * cos + point.x * sin;

        point.x = x;
        point.y = y;

        requestAnimationFrame(update);
    }
}