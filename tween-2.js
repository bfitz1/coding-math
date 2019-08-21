window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let ball = {
        x: 100,
        y: 100,
        alpha: 1
    };

    tween(ball, { x: 900, y: 700, alpha: 0 }, 1000, easeInOutQuad, render, tweenBack);

    function tweenBack() {
        tween(ball, { x: 100, y: 100, alpha: 1 }, 1000, easeInOutQuad, render, render);
    }

    function tween(obj, props, duration, easingFunc, onProgress, onComplete) {
        let starts = {};
        let changes = {};
        let startTime = new Date();

        for (let prop in props) {
            starts[prop] = obj[prop];
            changes[prop] = props[prop] - starts[prop];
        }

        update();

        function update() {
            let time = new Date() - startTime;
            if (time < duration) {
                for (let prop in props) {
                    obj[prop] = easingFunc(time, starts[prop], changes[prop], duration);
                }
                onProgress();
                requestAnimationFrame(update);
            } else {
                time = duration;
                for (let prop in props) {
                    obj[prop] = easingFunc(time, starts[prop], changes[prop], duration);
                }
                onComplete();
            }
        }
    }

    function render() {
        context.clearRect(0, 0, width, height);
        context.globalAlpha = ball.alpha;
        context.beginPath();
        context.arc(ball.x, ball.y, 20, 0, Math.PI * 2, false);
        context.fill();
    }

    // quadratic easing in/out - acceleration until halfway, then deceleration
    function easeInOutQuad(time, beginning, change, duration) {
        return ((time /= duration / 2) < 1)
            ?  change / 2 * time * time + beginning
            : -change / 2 * ((--time) * (time - 2) - 1) + beginning
    }
}