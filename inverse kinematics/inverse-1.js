window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let iks = IKSystem.of(width / 2, height / 2);
    for (let i = 0; i < 20; i += 1) {
        iks.addArm(30);
    }

    document.body.addEventListener('mousemove', function(event) {
        iks.drag(event.clientX, event.clientY);
    });

    update()

    function update() {
        context.clearRect(0, 0, width, height);

        iks.render(context);

        requestAnimationFrame(update);
    }
}