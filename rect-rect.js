window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let rect0 = {
        x: 200,
        y: 200,
        width: 200,
        height: 100
    };
    let rect1 = {
        x: 0,
        y: 0,
        width: 100,
        height: 200
    };

    document.body.addEventListener('mousemove', function(event) {
        rect1.x = event.clientX;
        rect1.y = event.clientY;

        if (utils.rectIntersect(rect0, rect1)) {
            context.fillStyle = "#f66";
        } else {
            context.fillStyle = "#999";
        }

        context.clearRect(0, 0, width, height);
        context.fillRect(rect0.x, rect0.y, rect0.width, rect0.height);
        context.fillRect(rect1.x, rect1.y, rect1.width, rect1.height);
    });
}