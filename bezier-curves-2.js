window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let p0 = {
        x: utils.randomRange(0, width),
        y: utils.randomRange(0, height)
    };
    let p1 = {
        x: utils.randomRange(0, width),
        y: utils.randomRange(0, height)
    };
    let p2 = {
        x: utils.randomRange(0, width),
        y: utils.randomRange(0, height)
    };
    let p3 = {
        x: utils.randomRange(0, width),
        y: utils.randomRange(0, height)
    };
    let maxT = 0;
    let pFinal = {};

    draw();

    function draw() {
        context.clearRect(0, 0, width, height);
        context.beginPath();
        context.moveTo(p0.x, p0.y);
        for (let t = 0; t <= maxT; t += 0.01) {
            utils.cubicBezier(p0, p1, p2, p3, t, pFinal);
            context.lineTo(pFinal.x, pFinal.y);
        }
        context.stroke();
        maxT += 0.01;
        if (maxT > 1) {
            maxT = 0;
        }

        requestAnimationFrame(draw);
    }
}