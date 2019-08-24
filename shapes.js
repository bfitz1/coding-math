window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let star0 = {
        x: 200,
        y: 200,
        points: [
           { x: 0, y: 0 },
           { x: 0, y: 0 },
           { x: 0, y: 0 },
           { x: 0, y: 0 },
           { x: 0, y: 0 },
           { x: 0, y: 0 },
           { x: 0, y: 0 },
           { x: 0, y: 0 },
           { x: 0, y: 0 },
           { x: 0, y: 0 }
        ],
        offset: [
            { x: 100, y:   0 },
            { x:  40, y:  29 },
            { x:  31, y:  95 },
            { x: -15, y:  48 },
            { x: -81, y:  59 },
            { x: -50, y:   0 },
            { x: -81, y: -59 },
            { x: -15, y: -48 },
            { x:  31, y: -95 },
            { x:  40, y: -29 }
         ],
    }
    let star1 = {
        x: 600,
        y: 400,
        points: [
           { x: 0, y: 0 },
           { x: 0, y: 0 },
           { x: 0, y: 0 },
           { x: 0, y: 0 },
           { x: 0, y: 0 },
           { x: 0, y: 0 },
           { x: 0, y: 0 },
           { x: 0, y: 0 },
           { x: 0, y: 0 },
           { x: 0, y: 0 }
        ],
        offset: [
            { x: 100, y:   0 },
            { x:  40, y:  29 },
            { x:  31, y:  95 },
            { x: -15, y:  48 },
            { x: -81, y:  59 },
            { x: -50, y:   0 },
            { x: -81, y: -59 },
            { x: -15, y: -48 },
            { x:  31, y: -95 },
            { x:  40, y: -29 }
         ],
    }

    document.body.addEventListener('mousemove', function(event) {
        context.clearRect(0, 0, width, height);
        star0.x = event.clientX;
        star0.y = event.clientY;
        updateStar(star0);
        updateStar(star1);
        if (checkStarCollision(star0, star1)) {
            context.fillStyle = 'red';
        } else {
            context.fillStyle = 'black';
        }
        drawStar(star0);
        drawStar(star1);
    });

    function checkStarCollision(starA, starB) {
        for (let i = 0; i < starA.points.length; i += 1) {
            let p0 = starA.points[i];
            let p1 = starA.points[(i + 1) % starA.points.length];

            for (let j = 0; j < starB.points.length; j += 1) {
                let p2 = starB.points[j];
                let p3 = starB.points[(j + 1) % starB.points.length];

                if (segmentIntersect(p0, p1, p2, p3)) {
                    return true;
                }
            }
        }
        return false;
    }

    function updateStar(star) {
        for (let i = 0; i < star.points.length; i += 1) {
            star.points[i].x = star.x + star.offset[i].x;
            star.points[i].y = star.y + star.offset[i].y;
        }
    }

    function drawStar(star) {
        context.beginPath();
        context.moveTo(star.points[0].x, star.points[0].y);
        for (let i = 0; i < star.points.length; i += 1) {
            context.lineTo(star.points[i].x, star.points[i].y);
        }
        context.closePath();
        context.fill();
    }

    function lineIntersect(p0, p1, p2, p3) {
        let a1 = p1.y - p0.y;
        let b1 = p0.x - p1.x;
        let c1 = a1 * p0.x + b1 * p0.y;
        let a2 = p3.y - p2.y;
        let b2 = p2.x - p3.x;
        let c2 = a2 * p2.x + b2 * p2.y;
        let denominator = a1 * b2 - a2 * b1;
        
        return denominator === 0 ? null : {
            x: (b2 * c1 - b1 * c2) / denominator,
            y: (a1 * c2 - a2 * c1) / denominator
        };
    }

    function segmentIntersect(p0, p1, p2, p3) {
        let a1 = p1.y - p0.y;
        let b1 = p0.x - p1.x;
        let c1 = a1 * p0.x + b1 * p0.y;
        let a2 = p3.y - p2.y;
        let b2 = p2.x - p3.x;
        let c2 = a2 * p2.x + b2 * p2.y;
        let denominator = a1 * b2 - a2 * b1;
        
        if (denominator === 0) { return null; } 

        let intersectX = (b2 * c1 - b1 * c2) / denominator;
        let intersectY = (a1 * c2 - a2 * c1) / denominator;
        let rx0 = (intersectX - p0.x) / (p1.x - p0.x);
        let ry0 = (intersectY - p0.y) / (p1.y - p0.y);
        let rx1 = (intersectX - p2.x) / (p3.x - p2.x);
        let ry1 = (intersectY - p2.y) / (p3.y - p2.y);

        return ((rx0 >= 0 && rx0 <= 1) || (ry0 >= 0 && ry0 <= 1))
               && ((rx1 >= 0 && rx1 <= 1) || (ry1 >= 0 && ry1 <= 1))
            ? { x: intersectX, y: intersectY }
            : null;
    }
}