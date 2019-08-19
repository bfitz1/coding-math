window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let fl = 300;
    let shapes = [];
    let numShapes = 100;

    for (let i = 0; i < numShapes; i += 1) {
        shapes.push({
            x: utils.randomRange(-1000, 1000),
            y: utils.randomRange(-1000, 1000),
            z: utils.randomRange(0, 10000)
        })
    }

    context.translate(width / 2, height / 2);

    update();

    function update() {
        context.clearRect(-width / 2, -height / 2, width, height);
        for (let i = 0; i < numShapes; i += 1) {
            let shape = shapes[i];
            let perspective = fl / (fl + shape.z);

            context.save();
            context.translate(shape.x * perspective, shape.y * perspective);
            context.scale(perspective, perspective);
            context.fillRect(-100, -100, 200, 200);
            context.restore();

            shape.z += 5;
            if (shape.z > 10000) {
                shape.z = 0;
            }
        }
        requestAnimationFrame(update);
    }
}