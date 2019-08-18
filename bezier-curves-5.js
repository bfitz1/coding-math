window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let points = [];
    let numPoints = 10;

    for (let i = 0; i < numPoints; i += 1) {
        let p = {
            x: Math.random() * width,
            y: Math.random() * height
        };

        context.beginPath();
        context.arc(p.x, p.y, 3, 0, Math.PI * 2, false);
        context.fill();

        points.push(p);
    }
    
    context.strokeStyle = 'lightgray';
    context.beginPath();
    context.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < numPoints; i += 1) {
        context.lineTo(points[i].x, points[i].y);
    }
    context.stroke();

    context.strokeStyle = 'black';
    context.beginPath();
    utils.multicurve(points, context);
    context.stroke();
}