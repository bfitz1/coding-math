window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let p0 = {
        x: 100,
        y: 100
    };
    let p1 = {
        x: 500,
        y: 500
    };
    let p2 = {
        x: 600,
        y: 50
    };
    let p3 = {
        x: 80,
        y: 600
    }
    let handle, offset;

    document.body.addEventListener('mousedown', function(event) {
        for (let p of [p0, p1, p2, p3]) {
            let circle = { x: p.x, y: p.y, radius: 5 };
            if (utils.circlePointCollision(event.clientX, event.clientY, circle)) {
                document.body.addEventListener('mousemove', dragHandle);
                document.body.addEventListener('mouseup', releaseHandle);
                handle = p;
                offset = {
                    x: event.clientX - handle.x,
                    y: event.clientY - handle.y
                };
                return;
            }
        }
    })

    function dragHandle(event) {
        handle.x = event.clientX - offset.x;
        handle.y = event.clientY - offset.y;
        update();
    }

    function releaseHandle(event) {
        handle = undefined;
        document.body.removeEventListener('mousemove', dragHandle);
        document.body.removeEventListener('mouseup', releaseHandle);
    }

    function lineIntersect(p0, p1, p2, p3) {
        let a1 = p1.y - p0.y;
        let b1 = p0.x - p1.x;
        let c1 = a1 * p0.x + b1 * p0.y;
        let a2 = p3.y - p2.y;
        let b2 = p2.x - p3.x;
        let c2 = a2 * p2.x + b2 * p2.y;
        let denominator = a1 * b2 - a2 * b1;
        
        return {
            x: (b2 * c1 - b1 * c2) / denominator,
            y: (a1 * c2 - a2 * c1) / denominator
        };
    }

    update();

    function update() {
        context.clearRect(0, 0, width, height);

        context.beginPath();
        context.moveTo(p0.x, p0.y);
        context.lineTo(p1.x, p1.y);
        context.moveTo(p2.x, p2.y);
        context.lineTo(p3.x, p3.y);
        context.stroke();

        for (let p of [p0, p1, p2, p3]) {
            context.beginPath();
            context.arc(p.x, p.y, 5, 0, Math.PI * 2, false);
            context.fill();
        }
    
        let intersect = lineIntersect(p0, p1, p2, p3);
        context.beginPath();
        context.arc(intersect.x, intersect.y, 5, 0, Math.PI * 2, false);
        context.stroke();
    }
}