window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let p0 = {
        x: 0,
        y: -321
    };
    let p1 = {
        x: 278,
        y: 160
    };
    let p2 = {
        x: -278,
        y: 160
    };

    context.translate(width / 2, height / 2);
    sierpinski(p0, p1, p2, 7);

    function sierpinski(p0, p1, p2, limit) {
        if (limit === 0) {
            drawTriangle(p0, p1, p2);
            return;
        }

        let pA = {
            x: (p0.x + p1.x) / 2,
            y: (p0.y + p1.y) / 2
        };
        let pB = {
            x: (p1.x + p2.x) / 2,
            y: (p1.y + p2.y) / 2
        };
        let pC = {
            x: (p2.x + p0.x) / 2,
            y: (p2.y + p0.y) / 2
        };

        sierpinski(p0, pA, pC, limit - 1);
        sierpinski(pA, p1, pB, limit - 1);
        sierpinski(pC, pB, p2, limit - 1);
    }
    
    function drawTriangle(p0, p1, p2) {
        context.moveTo(p0.x, p0.y);
        context.lineTo(p1.x, p1.y);
        context.lineTo(p2.x, p2.y);
        context.fill();
    }
}