window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let start = {
        x: 100,
        y: 100
    };
    let target = {};
    let change = {};
    let startTime;
    let duration = 1000;

    drawCircle(start.x, start.y);

    document.body.addEventListener('click', function(event) {
        target.x = event.clientX;
        target.y = event.clientY;
        change.x = target.x - start.x;
        change.y = target.y - start.y;
        startTime = new Date();
        update();
    })

    function update() {
        context.clearRect(0, 0, width, height);

        let time = new Date() - startTime;
        if (time < duration) {
            let x = easeInOutQuad(time, start.x, change.x, duration);
            let y = easeInOutQuad(time, start.y, change.y, duration);
            drawCircle(x, y);
            requestAnimationFrame(update);
        } else {
            drawCircle(target.x, target.y);
            start.x = target.x;
            start.y = target.y;
        }
    }

    // simple linear tweening - no easing
    function linearTween(time, beginning, change, duration) {
        return change * time / duration + beginning;
    }

    // quadratic easing in - accelerating from zero velocity
    function easeInQuad(time, beginning, change, duration) {
        return change * (time /= duration) * time + beginning;
    }

    // quadratic easing out - decelerating to zero velocity
    function easeOutQuad(time, beginning, change, duration) {
        return -change * (time /= duration) * (time - 2) + beginning;
    }

    // quadratic easing in/out - acceleration until halfway, then deceleration
    function easeInOutQuad(time, beginning, change, duration) {
        return ((time /= duration / 2) < 1)
            ?  change / 2 * time * time + beginning
            : -change / 2 * ((--time) * (time - 2) - 1) + beginning
    }

    function drawCircle(x, y) {
        context.beginPath();
        context.arc(x, y, 20, 0, Math.PI * 2, false);
        context.fill();
    }
}