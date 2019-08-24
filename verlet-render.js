window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let points = [];
    let sticks = [];
    let forms = [];
    let images = [];
    let bounce = 0.9;
    let gravity = 0.5;
    let friction = 0.999;

    points.push({
        x: 100,
        y: 100,
        oldx: 100 + Math.random() * 100 - 50,
        oldy: 100 + Math.random() * 100 - 50
    });
    points.push({
        x: 420,
        y: 100,
        oldx: 420,
        oldy: 100
    });
    points.push({
        x: 420,
        y: 340,
        oldx: 420,
        oldy: 340
    });
    points.push({
        x: 100,
        y: 340,
        oldx: 100,
        oldy: 340
    });

    sticks.push({
        p0: points[0],
        p1: points[1],
        length: distance(points[0], points[1]),
        color: 'red',
        width: 5
    });
    sticks.push({
        p0: points[1],
        p1: points[2],
        length: distance(points[1], points[2])
    });
    sticks.push({
        p0: points[2],
        p1: points[3],
        length: distance(points[2], points[3])
    });
    sticks.push({
        p0: points[3],
        p1: points[0],
        length: distance(points[3], points[0])
    });
    sticks.push({
        p0: points[0],
        p1: points[2],
        length: distance(points[0], points[2]),
        hidden: true
    });

    forms.push({
        path: [
            points[0],
            points[1],
            points[2],
            points[3]
        ],
        color: 'green'
    });
    images.push({
        path: [
            points[0],
            points[1],
            points[2],
            points[3]
        ],
        img: loadImage('cat.jpg')
    });

    function loadImage(url) {
        let img = document.createElement('img');
        img.src = url;
        return img;
    }

    update();

    function update() {
        context.clearRect(0, 0, width, height);
        updatePoints();
        for (let i = 0; i < 3; i += 1) {
            updateSticks();
            constrainPoints();
        }
        //renderPoints();
        //renderSticks();
        //renderForms();
        renderImages();
        requestAnimationFrame(update);
    }

    function distance(p0, p1) {
        let dx = p1.x - p0.x;
        let dy = p1.y - p0.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    function updatePoints() {
        for (let i = 0; i < points.length; i += 1) {
            let p = points[i];
            let vx = (p.x - p.oldx) * friction;
            let vy = (p.y - p.oldy) * friction;

            p.oldx = p.x;
            p.oldy = p.y;
            p.x += vx;
            p.y += vy;
            p.y += gravity;
        }
    }

    function constrainPoints() {
        for (let i = 0; i < points.length; i += 1) {
            let p = points[i];
            let vx = (p.x - p.oldx) * friction;
            let vy = (p.y - p.oldy) * friction;

            if (p.x > width) {
                p.x = width;
                p.oldx = p.x + vx * bounce;
            } else if (p.x < 0) {
                p.x = 0;
                p.oldx = p.x + vx * bounce;
            }

            if (p.y > height) {
                p.y = height;
                p.oldy = p.y + vy * bounce;
            } else if (p.y < 0) {
                p.y = 0;
                p.oldy = p.y + vy * bounce;
            }
        }
    }

    function updateSticks() {
        for (let i = 0; i < sticks.length; i += 1) {
            let s = sticks[i];
            let dx = s.p1.x - s.p0.x;
            let dy = s.p1.y - s.p0.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let difference = s.length - distance;
            let percent = difference / distance / 2;
            let offsetX = dx * percent;
            let offsetY = dy * percent;

            s.p0.x -= offsetX;
            s.p0.y -= offsetY;
            s.p1.x += offsetX;
            s.p1.y += offsetY;
        }
    }

    function renderPoints() {
        for (let i = 0; i < points.length; i += 1) {
            let p = points[i];
            context.beginPath();
            context.arc(p.x, p.y, 5, 0, Math.PI * 2);
            context.fill();
        }
    }

    function renderSticks() {
        for (let i = 0; i < sticks.length; i += 1) {
            let s = sticks[i];
            if (s.hidden) { continue; }
            context.beginPath();
            context.strokeStyle = s.color ? s.color : 'black';
            context.lineWidth = s.width ? s.width : 1;
            context.moveTo(s.p0.x, s.p0.y);
            context.lineTo(s.p1.x, s.p1.y);
            context.stroke();
        }
    }

    function renderForms() {
        for (let i = 0; i < forms.length; i += 1) {
            let f = forms[i];
            context.beginPath();
            context.fillStyle = f.color;
            context.moveTo(f.path[0].x, f.path[0].y);
            for (let j = 1; j < f.path.length; j += 1) {
                context.lineTo(f.path[j].x, f.path[j].y);
            }
            context.fill();
        }
    }

    function renderImages() {
        for (let i = 0; i < images.length; i += 1) {
            let image = images[i];
            let w = distance(image.path[0], image.path[1]);
            let h = distance(image.path[0], image.path[3]);
            let dx = image.path[1].x - image.path[0].x;
            let dy = image.path[1].y - image.path[0].y;
            let angle = Math.atan2(dy, dx);

            context.save();
            context.translate(image.path[0].x, image.path[0].y);
            context.rotate(angle);
            context.drawImage(image.img, 0, 0, w, h);
            context.restore();
        }
    }
}