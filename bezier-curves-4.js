window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let p0 = {
        x: Math.random() * width,
        y: Math.random() * height
    };
    let p1 = {
        x: Math.random() * width,
        y: Math.random() * height
    };
    let p2 = {
        x: Math.random() * width,
        y: Math.random() * height
    };

    let cp = {
        x: p1.x * 2 - (p0.x + p2.x) / 2,
        y: p1.y * 2 - (p0.y + p2.y) / 2
    }
    
    drawPoint(p0);
    drawPoint(p1);
    drawPoint(p2);
    drawPoint(cp);

    context.strokeStyle = 'lightgray';
    context.beginPath();
    context.moveTo(p0.x, p0.y);
    context.lineTo(cp.x, cp.y);
    context.lineTo(p2.x, p2.y);
    context.stroke();

    context.strokeStyle = 'black';
    context.beginPath();
    context.moveTo(p0.x, p0.y);
    context.quadraticCurveTo(cp.x, cp.y, p2.x, p2.y);
    context.stroke();

    function drawPoint(p) {
        context.beginPath();
        context.arc(p.x, p.y, 3, 0, Math.PI * 2, false);
        context.fill();
    }
}