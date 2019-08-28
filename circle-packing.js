window.onload = function() {
    let canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d'),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    let circles = [],
        min = 5,
        max = 100;

    draw();

    function draw() {
        let c = createCircle();
        let counter = 0;
        while (!isValid(c)) {
            c.x = Math.random() * width;
            c.y = Math.random() * height;
            counter++;
            
            if (counter > 10000) { return; }
        }
        
        while(isValid(c)) {
            c.r++;
        }
        c.r -= 2;
        
        circles.push(c);
        drawCircle(c);
        requestAnimationFrame(draw);
    }

    function isValid(c) {
        if (c.r > max) {
            return false;
        }
        for (let i = 0; i < circles.length; i++) {
            let c2 = circles[i],
                dx = c2.x - c.x,
                dy = c2.y - c.y,
                dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < c2.r + c.r) {
            return false;
            }
        }
        return true;
    }

    function createCircle() {
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            r: min
        };
    }

    function drawCircle(c) {
        if (c.r > max * 0.30) { return; }
        
        context.beginPath();
        context.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        context.fill();
    }
}