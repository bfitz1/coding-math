window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let fl = 300;
    let points = [
        { x: -500, y: -500, z: 1000 },
        { x:  500, y: -500, z: 1000 },
        { x:  500, y: -500, z: 500  },
        { x: -500, y: -500, z: 500  },
        { x: -500, y:  500, z: 1000 },
        { x:  500, y:  500, z: 1000 },
        { x:  500, y:  500, z: 500  },
        { x: -500, y:  500, z: 500  }
    ];
    let needsUpdate = true;
    
    context.translate(width / 2, height / 2);

    function project() {
        for (let i = 0; i < points.length; i += 1) {
            let p = points[i];
            let scale = fl / (fl + p.z);

            p.sx = p.x * scale;
            p.sy = p.y * scale;
        }
    }

    function drawLine(first, ...rest) {
        let p = points[first];
        context.moveTo(p.sx, p.sy);
        for (let i of rest) {
            p = points[i];
            context.lineTo(p.sx, p.sy);
        }
    }

    function translateModel(x, y, z) {
        for (let i = 0; i < points.length; i += 1) {
            points[i].x += x;
            points[i].y += y;
            points[i].z += z;
        }
        needsUpdate = true;
    }

    document.body.addEventListener('keydown', function(event) {
        switch (event.keyCode) {
            case 37: // left
                translateModel(-20, 0, 0);
                break;
            case 39: // right
                translateModel(20, 0, 0);
                break;
            case 38: // up
                if (event.shiftKey) {
                    translateModel(0, 0, 20);
                } else {
                    translateModel(0, -20, 0);
                }
                break;
            case 40: // down
                if (event.shiftKey) {
                    translateModel(0, 0, -20);
                } else {
                    translateModel(0, 20, 0);
                }
                break;
            default:
                break;
        }
    })
    update();

    function update() {
        if (needsUpdate) {
            context.clearRect(-width / 2, -height / 2, width, height);
            project();
    
            context.beginPath();
            drawLine(0, 1, 2, 3, 0);
            drawLine(4, 5, 6, 7, 4);
            drawLine(0, 4);
            drawLine(1, 5);
            drawLine(2, 6);
            drawLine(3, 7);
            context.stroke();
            needsUpdate = false;
        }

        requestAnimationFrame(update);
    }
}