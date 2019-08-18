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
    let p3 = {
        x: Math.random() * width,
        y: Math.random() * height
    };

    context.beginPath();
    context.moveTo(p0.x, p0.y);
    context.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
    context.stroke();

    context.strokeStyle = 'red';
    context.beginPath();
    utils.multicurve([p0, p1, p2, p3], context);
    context.stroke();
}