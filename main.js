window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    update();

    function update() {
        context.clearRect(0, 0, width, height);

        // animate code goes here

        requestAnimationFrame(update);
    }
}