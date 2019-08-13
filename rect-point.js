window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let rect = {
        x: 300,
        y: 200,
        width: -200,
        height: -100
    };

    document.body.addEventListener('mousemove', function(event) {
        if (utils.pointInRect(event.clientX, event.clientY, rect)) {
            context.fillStyle = "#f66";
        } else {
            context.fillStyle = "#999";
        }

        context.clearRect(0, 0, width, height);
        context.fillRect(rect.x, rect.y, rect.width, rect.height);
    });
}